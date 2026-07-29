import services from "../data/services.json";
import { SITE } from "../lib/site";

export type CityItem = [string, string];
export type StateItem = {
  code: string;
  name: string;
  slug: string;
  cities: CityItem[];
};

const DOMAIN = SITE.domain;
const CHUNK_SIZE = 2000;

function xmlResponse(xml: string, method = "GET") {
  const body = method === "HEAD" ? null : xml;
  return new Response(body, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}

export function sitemapIndex(states: StateItem[], method = "GET") {
  const coreUrl = `https://${DOMAIN}/sitemaps/core.xml`;

  const stateUrls = states
    .map((state) => {
      const cityCount = state.cities.length;
      const totalUrls = cityCount * (services.length + 1) + 1;
      const totalChunks = Math.max(1, Math.ceil(totalUrls / CHUNK_SIZE));
      const stateSlug = state.slug || state.code.toLowerCase();

      return Array.from({ length: totalChunks }, (_, idx) => {
        return `  <sitemap>\n    <loc>https://${DOMAIN}/sitemaps/${stateSlug}-${idx + 1}.xml</loc>\n  </sitemap>`;
      }).join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${coreUrl}</loc>
  </sitemap>
${stateUrls}
</sitemapindex>`;

  return xmlResponse(xml, method);
}

export function coreSitemap(states: StateItem[], method = "GET") {
  const urls: string[] = [];

  urls.push(`https://${DOMAIN}/`);
  urls.push(`https://${DOMAIN}/services/`);
  urls.push(`https://${DOMAIN}/areas-we-serve/`);
  urls.push(`https://${DOMAIN}/link-sheet/`);

  for (const s of services) {
    urls.push(`https://${DOMAIN}/services/${s.slug}/`);
  }

  for (const st of states) {
    const slug = st.slug || st.code.toLowerCase();
    urls.push(`https://${slug}.${DOMAIN}/`);
  }

  const urlEntries = urls
    .map((u) => `  <url>\n    <loc>${u}</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.8</priority>\n  </url>`)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

  return xmlResponse(xml, method);
}

export function stateSitemap(state: StateItem, chunkIndex: number, method = "GET") {
  const stateSlug = state.slug || state.code.toLowerCase();
  const urls: string[] = [];

  for (const [cSlug] of state.cities) {
    const host = `${cSlug}-${stateSlug}.${DOMAIN}`;
    urls.push(`https://${host}/`);
    for (const s of services) {
      urls.push(`https://${host}/${s.slug}/`);
    }
  }

  const startIndex = (chunkIndex - 1) * CHUNK_SIZE;
  const slicedUrls = urls.slice(startIndex, startIndex + CHUNK_SIZE);

  if (slicedUrls.length === 0) return null;

  const urlEntries = slicedUrls
    .map((u) => `  <url>\n    <loc>${u}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.6</priority>\n  </url>`)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

  return xmlResponse(xml, method);
}
