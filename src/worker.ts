import database from "../data/usa_database.json";
import services from "../data/services.json";
import articles from "../data/articles.json";
import {
  aboutUsPage,
  areasWeServePage,
  articlePage,
  articlesHubPage,
  cityPage,
  contactUsPage,
  homePage,
  linkSheetPage,
  localServicePage,
  nationalServicePage,
  notFoundPage,
  servicesHubPage,
  statePage,
} from "./locationTemplates";
import { coreSitemap, sitemapIndex, stateSitemap, type StateItem } from "./sitemaps";
import { SITE } from "../lib/site";

type Env = { ASSETS: { fetch(input: Request | string): Promise<Response> } };
type Ctx = { waitUntil(promise: Promise<unknown>): void };

const DOMAIN = SITE.domain;
const rawStates = (database as any).states || [];

function getStateSlug(state: any): string {
  if (state.slug) return state.slug.toLowerCase();
  if (state.name) return state.name.toLowerCase().replace(/\s+/g, "-");
  if (state.code) return state.code.toLowerCase();
  return "";
}

const STATES: StateItem[] = rawStates.map((s: any) => {
  const slug = getStateSlug(s);
  const cities: [string, string][] = (s.cities || []).map((c: any) => {
    if (Array.isArray(c)) return [c[0], c[1]];
    return [c.slug || c.name.toLowerCase().replace(/\s+/g, "-"), c.name];
  });
  return { ...s, slug, cities };
});

const STATE_BY_SLUG = new Map(STATES.map((s) => [s.slug, s]));
const STATE_SLUGS = STATES.map((s) => s.slug).filter(Boolean).sort((a, b) => b.length - a.length);

function parseSubdomain(subdomain: string): { state: StateItem; city?: [string, string] } | null {
  const sub = subdomain.toLowerCase();
  const directState = STATE_BY_SLUG.get(sub);
  if (directState) return { state: directState };

  const stateSlug = STATE_SLUGS.find((slug) => sub.endsWith(`-${slug}`));
  if (!stateSlug) return null;

  const state = STATE_BY_SLUG.get(stateSlug)!;
  const citySlug = sub.slice(0, -(stateSlug.length + 1));
  const city = state.cities.find(([slug]) => slug.toLowerCase() === citySlug);
  return city ? { state, city } : null;
}

function htmlResponse(html: string, method = "GET", status = 200, extra: Record<string, string> = {}) {
  const bytes = new TextEncoder().encode(html);
  const body = method === "HEAD" ? null : bytes;
  return new Response(body, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, s-maxage=86400, stale-while-revalidate=604800",
      "content-length": String(bytes.byteLength),
      ...extra,
    },
  });
}

function redirect(targetUrl: string, status = 301) {
  return new Response(null, {
    status,
    headers: {
      Location: targetUrl,
      "cache-control": "public, s-maxage=86400",
    },
  });
}

async function cached(request: Request, ctx: Ctx, render: () => Response) {
  if (request.method === "HEAD") return render();
  const cache = (caches as CacheStorage & { default: Cache }).default;
  const hit = await cache.match(request);
  if (hit && hit.status === 200) {
    const text = await hit.clone().text();
    if (text.length > 5000) return hit;
  }
  const result = render();
  if (result.status === 200) ctx.waitUntil(cache.put(request, result.clone()));
  return result;
}

export default {
  async fetch(request: Request, env: Env, ctx: Ctx): Promise<Response> {
    if (!["GET", "HEAD"].includes(request.method)) return new Response("Method Not Allowed", { status: 405 });

    const url = new URL(request.url);
    const hostname = url.hostname.toLowerCase();
    const path = url.pathname;
    const method = request.method;

    // FORCED 301 PERMANENT REDIRECT HTTP -> HTTPS
    if (url.protocol === "http:" && !url.hostname.includes("localhost")) {
      url.protocol = "https:";
      return new Response(null, { status: 301, headers: { Location: url.toString() } });
    }

    if (hostname === `www.${DOMAIN}`) {
      url.hostname = DOMAIN;
      return redirect(url.toString());
    }

    if (hostname === DOMAIN || hostname.endsWith(".workers.dev")) {
      if (path === "/" || path === "") {
        return cached(request, ctx, () => htmlResponse(homePage(STATES), method));
      }

      if (path === "/robots.txt") {
        const body = `User-agent: *\nAllow: /\nSitemap: https://${DOMAIN}/sitemap.xml\n`;
        return new Response(method === "HEAD" ? null : body, {
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "public, s-maxage=86400",
            "content-length": String(new TextEncoder().encode(body).byteLength),
          },
        });
      }

      if (path === "/sitemap.xml") return cached(request, ctx, () => sitemapIndex(STATES, method));
      if (path === "/sitemaps/core.xml") return cached(request, ctx, () => coreSitemap(STATES, method));

      const sitemapMatch = path.match(/^\/sitemaps\/(.+)-(\d+)\.xml$/);
      if (sitemapMatch) {
        const stateSlug = sitemapMatch[1].toLowerCase();
        const state = STATE_BY_SLUG.get(stateSlug) || STATES.find((s) => s.code.toLowerCase() === stateSlug);
        if (!state) return new Response("Not Found", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
        const sitemap = stateSitemap(state, Number(sitemapMatch[2]), method);
        if (!sitemap) return new Response("Not Found", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
        return cached(request, ctx, () => sitemap);
      }

      if (path === "/about-us" || path === "/about-us/" || path === "/about" || path === "/about/" || path === "/about.html") {
        return cached(request, ctx, () => htmlResponse(aboutUsPage(), method));
      }

      if (path === "/contact-us" || path === "/contact-us/" || path === "/contact" || path === "/contact/" || path === "/contact.html") {
        return cached(request, ctx, () => htmlResponse(contactUsPage(), method));
      }

      if (path === "/services" || path === "/services/" || path === "/services.html") {
        return cached(request, ctx, () => htmlResponse(servicesHubPage(), method));
      }

      if (path === "/areas" || path === "/areas/" || path === "/areas.html" || path === "/areas-we-serve" || path === "/areas-we-serve/") {
        return cached(request, ctx, () => htmlResponse(areasWeServePage(STATES), method));
      }

      if (path === "/link-sheet" || path === "/link-sheet/") {
        return cached(request, ctx, () => htmlResponse(linkSheetPage(), method));
      }

      if (path.startsWith("/services/")) {
        const slug = path.split("/")[2]?.replace(/\/$/, "");
        const service = services.find((s) => s.slug === slug);
        if (service) {
          return cached(request, ctx, () => htmlResponse(nationalServicePage(service as any), method));
        }
      }

      // Support root service slugs e.g. /emergency-mold-remediation/
      const cleanSlug = path.replace(/^\/|\/$/g, "");
      const directService = services.find((s) => s.slug === cleanSlug);
      if (directService) {
        return cached(request, ctx, () => htmlResponse(nationalServicePage(directService as any), method));
      }

      if (path === "/areas-we-serve" || path === "/areas-we-serve/" || path === "/locations" || path === "/locations/") {
        return cached(request, ctx, () => htmlResponse(areasWeServePage(STATES), method));
      }

      if (path === "/articles" || path === "/articles/") {
        return cached(request, ctx, () => htmlResponse(articlesHubPage(), method));
      }

      if (path.startsWith("/articles/")) {
        const slug = path.split("/")[2];
        const article = (articles as any[]).find((a) => a.slug === slug);
        if (article) {
          return cached(request, ctx, () => htmlResponse(articlePage(article), method));
        }
      }

      return cached(request, ctx, () => htmlResponse(notFoundPage("Page Not Found"), method, 404));
    }

    if (hostname.endsWith(`.${DOMAIN}`)) {
      const subdomain = hostname.slice(0, -(DOMAIN.length + 1));
      const parsed = parseSubdomain(subdomain);

      if (!parsed) {
        return redirect(`https://${DOMAIN}${path}`);
      }

      const { state, city } = parsed;

      if (!city) {
        if (path === "/" || path === "") {
          return cached(request, ctx, () => htmlResponse(statePage(state), method));
        }
        if (path === "/services" || path === "/services/") {
          return cached(request, ctx, () => htmlResponse(servicesHubPage(), method));
        }
        const stateServiceSlug = path.replace(/^\/services\/|^\/|\/$/g, "");
        const service = services.find((s) => s.slug === stateServiceSlug);
        if (service) {
          return cached(request, ctx, () => htmlResponse(nationalServicePage(service as any), method));
        }
        return redirect(`https://${DOMAIN}${path}`);
      }

      if (path === "/" || path === "") {
        return cached(request, ctx, () => htmlResponse(cityPage(state, city, hostname), method));
      }

      if (path === "/services" || path === "/services/") {
        return cached(request, ctx, () => htmlResponse(servicesHubPage(), method));
      }

      const serviceSlug = path.replace(/^\/services\/|^\/|\/$/g, "");
      const service = services.find((s) => s.slug === serviceSlug);
      if (service) {
        return cached(request, ctx, () => htmlResponse(localServicePage(state, city, service as any, hostname), method));
      }

      return cached(request, ctx, () => htmlResponse(notFoundPage("City Service Not Found"), method, 404));
    }

    return cached(request, ctx, () => htmlResponse(notFoundPage("Page Not Found"), method, 404));
  },
};
