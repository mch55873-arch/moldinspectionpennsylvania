import database from "../data/usa_database.json";
import services from "../data/services.json";
import { SITE } from "../lib/site";
import type { StateItem } from "./sitemaps";

const DOMAIN = SITE.domain;
const BRAND = SITE.name;
const PHONE_DISPLAY = SITE.phoneDisplay;
const PHONE_HREF = `tel:${SITE.phoneRaw}`;

function esc(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

const CSS = `
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#fff;color:#1e293b;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;-webkit-font-smoothing:antialiased}a{color:inherit;text-decoration:none}.wrap{width:min(1180px,calc(100% - 32px));margin:auto}.top{background:#042f2e;color:#ccfbf1;font-size:12px}.top .wrap,.nav .wrap{display:flex;align-items:center;justify-content:space-between;gap:20px}.top .wrap{padding:9px 0}.top b{color:#2dd4bf}.nav{position:sticky;top:0;z-index:30;background:rgba(255,255,255,.97);backdrop-filter:blur(14px);border-bottom:1px solid #e2e8f0;box-shadow:0 10px 32px rgba(4,47,46,.08)}.nav .wrap{padding:14px 0}.brand{display:flex;align-items:center;gap:11px;font-size:20px;font-weight:950;color:#0f172a;letter-spacing:-.02em}.logo{width:44px;height:44px;border-radius:12px;display:grid;place-items:center;background:linear-gradient(135deg,#0d9488,#0f766e);color:#fff;box-shadow:0 10px 24px rgba(13,148,136,.3)}.brand small{display:block;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:#64748b}.links{display:flex;gap:22px;font-size:14px;font-weight:850}.links a:hover{color:#0d9488}.btn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:14px 21px;border-radius:10px;background:#0d9488;color:#fff;font-weight:900;box-shadow:0 10px 24px rgba(13,148,136,.3);transition:.2s;border:none;cursor:pointer}.btn:hover{transform:translateY(-2px);background:#0f766e}.btn.dark{background:#0f172a}.btn.ghost{background:transparent;border:1px solid rgba(255,255,255,.38);box-shadow:none}.hero{position:relative;overflow:hidden;background:linear-gradient(135deg,#042f2e 0%,#064e3b 58%,#115e59 100%);color:#fff;padding:78px 0}.hero-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:48px;align-items:center}.hero h1{font-size:clamp(40px,5.5vw,64px);line-height:1.05;letter-spacing:-.04em;margin:18px 0}.hero h1 em{font-style:normal;color:#2dd4bf}.hero p{font-size:17px;line-height:1.75;color:#ccfbf1;max-width:760px}.form-card{background:#fff;color:#0f172a;border-radius:22px;padding:28px;box-shadow:0 24px 60px rgba(0,0,0,.35);border:1px solid rgba(255,255,255,.2)}.form-card h2{font-size:22px;font-weight:900;margin:0 0 6px;color:#0f172a}.form-card p{font-size:13px;color:#64748b;margin:0 0 20px}.form-group{margin-bottom:14px}.form-group input,.form-group select,.form-group textarea{width:100%;padding:13px 16px;border-radius:10px;border:1px solid #cbd5e1;font-size:14px;outline:none;background:#f8fafc}.form-group input:focus,.form-group select:focus,.form-group textarea:focus{border-color:#0d9488;background:#fff;box-shadow:0 0 0 3px rgba(13,148,136,.2)}.rating-badge{display:inline-flex;align-items:center;gap:10px;padding:8px 14px;border-radius:999px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);font-size:13px;font-weight:800;color:#fff;margin-top:16px}.stars{color:#f59e0b;letter-spacing:2px}.crumb{font-size:13px;color:#99f6e4}.crumb a{color:#2dd4bf}.eyebrow{display:inline-flex;padding:8px 12px;border-radius:999px;background:rgba(45,212,191,.18);border:1px solid rgba(45,212,191,.35);color:#5eead4;font-size:11px;font-weight:900;letter-spacing:.14em;text-transform:uppercase}.buttons{display:flex;flex-wrap:wrap;gap:12px;margin-top:24px}.stats{border-bottom:1px solid #e2e8f0;background:#fff}.stats .wrap{display:grid;grid-template-columns:repeat(4,1fr)}.stat{text-align:center;padding:27px 15px;border-left:1px solid #e2e8f0}.stat:first-child{border-left:0}.stat strong{display:block;font-size:31px;color:#0f172a}.stat span{display:block;margin-top:5px;color:#64748b;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.1em}.section{padding:78px 0}.soft{background:#f8fafc}.head{display:flex;align-items:end;justify-content:space-between;gap:28px;margin-bottom:32px}.eyeline{display:inline-block;color:#0d9488;font-size:11px;font-weight:900;letter-spacing:.13em;text-transform:uppercase}.section h2{font-size:clamp(34px,4vw,50px);line-height:1.08;margin:8px 0 0;letter-spacing:-.038em}.muted{max-width:760px;color:#64748b;line-height:1.75}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.card{display:block;background:#fff;border:1px solid #e2e8f0;border-radius:18px;padding:25px;box-shadow:0 8px 26px rgba(4,47,46,.06);transition:.2s}.card:hover{transform:translateY(-4px);border-color:#0d9488;box-shadow:0 18px 40px rgba(13,148,136,.18)}.card b{display:grid;place-items:center;width:46px;height:46px;border-radius:13px;background:#ccfbf1;color:#0f766e;font-size:14px}.card h3{font-size:20px;margin:17px 0 9px;color:#0f172a;letter-spacing:-.02em}.card p{color:#64748b;line-height:1.68;margin:0;font-size:14px}.more{display:inline-block;margin-top:17px;color:#0d9488;font-weight:900;font-size:14px}.directory{display:grid;grid-template-columns:repeat(4,1fr);gap:13px}.directory a{display:flex;align-items:center;justify-content:space-between;gap:15px;padding:17px 18px;border:1px solid #e2e8f0;border-radius:13px;background:#fff;color:#334155;font-size:14px;font-weight:850;box-shadow:0 6px 18px rgba(4,47,46,.04);transition:.18s}.directory a:after{content:"→";color:#0d9488}.directory a:hover{transform:translateY(-2px);color:#0d9488;border-color:#0d9488}.zip-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.zip-card{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:18px;text-align:center;box-shadow:0 6px 18px rgba(4,47,46,.04);transition:.18s}.zip-card:hover{transform:translateY(-3px);border-color:#0d9488;box-shadow:0 12px 30px rgba(13,148,136,.2)}.zip-card span{display:block;font-size:20px;margin-bottom:6px}.zip-card strong{display:block;font-size:16px;color:#0f172a}.zip-card small{display:block;font-size:12px;color:#64748b;margin-top:4px;font-weight:700}.checklist{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:20px}.check-item{display:flex;align-items:center;gap:10px;font-size:14px;font-weight:700;color:#1e293b}.check-item span{color:#0d9488;font-size:16px}.footer{background:#042f2e;color:#99f6e4;padding:54px 0 22px}.footer .wrap{display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:36px}.footer h3{color:#fff}.footer a{display:block;margin:10px 0}.legal{grid-column:1/-1;border-top:1px solid rgba(255,255,255,.1);padding-top:20px;font-size:12px}.sticky{position:fixed;right:18px;bottom:18px;z-index:80}@media(max-width:920px){.links{display:none}.hero-grid{grid-template-columns:1fr}.grid,.zip-grid,.checklist{grid-template-columns:repeat(2,1fr)}.directory{grid-template-columns:repeat(2,1fr)}.footer .wrap{grid-template-columns:1fr 1fr}}@media(max-width:620px){.hero{padding:58px 0}.hero h1{font-size:38px}.grid,.directory,.zip-grid,.checklist,.footer .wrap{grid-template-columns:1fr}.stats .wrap{grid-template-columns:1fr 1fr}.btn{width:100%}.sticky{left:12px;right:12px;bottom:12px}}
`;

function header(): string {
  return `<div class="top"><div class="wrap"><span>● &nbsp; Nationwide Water, Fire &amp; Mold Restoration Network</span><span><b>24/7 Emergency Dispatch</b> &nbsp; | &nbsp; Call ${PHONE_DISPLAY}</span></div></div><header class="nav"><div class="wrap"><a class="brand" href="https://${DOMAIN}/"><span class="logo">MI</span><span>${BRAND}<small>Mold · Water · Fire · 24/7 Restoration</small></span></a><nav class="links"><a href="https://${DOMAIN}/services/">Services</a><a href="https://${DOMAIN}/areas-we-serve/">Areas We Serve</a><a href="https://${DOMAIN}/link-sheet/">LinkSheet</a></nav><a class="btn" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></div></header>`;
}

function footer(): string {
  return `<footer class="footer"><div class="wrap"><div><h3>${BRAND}</h3><p>Nationwide 24/7 emergency water damage restoration, black mold remediation, air testing, and fire damage cleanup across all 50 US states.</p></div><div><h3>Core Services</h3><a href="https://${DOMAIN}/services/emergency-mold-remediation/">Emergency Mold Remediation</a><a href="https://${DOMAIN}/services/black-mold-removal/">Black Mold Removal</a><a href="https://${DOMAIN}/services/emergency-water-damage-restoration/">Water Damage Restoration</a><a href="https://${DOMAIN}/services/fire-damage-restoration-cleanup/">Fire Damage Restoration</a></div><div><h3>Emergency Contact</h3><p>24/7 Emergency Dispatch Line:</p><a class="btn" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></div><div class="legal"><p>© ${new Date().getFullYear()} ${BRAND}. All rights reserved. Service Area Business Network.</p></div></div></footer><div class="sticky"><a class="btn" href="${PHONE_HREF}">⚡ Call ${PHONE_DISPLAY}</a></div>`;
}

function shell(title: string, description: string, canonical: string, body: string, schema?: object): string {
  const jsonLd = schema ? `<script type="application/ld+json">${JSON.stringify(schema)}</script>` : "";
  return `<!doctype html><html lang="en-US"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${canonical}"><meta name="robots" content="index,follow"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${canonical}"><style>${CSS}</style>${jsonLd}</head><body>${header()}${body}${footer()}</body></html>`;
}

function trustChecklistHtml(): string {
  return `<div class="checklist"><div class="check-item"><span>✔</span> 24/7 Emergency Rapid Dispatch</div><div class="check-item"><span>✔</span> Upfront Pricing &amp; Inspection</div><div class="check-item"><span>✔</span> Licensed &amp; Certified Technicians</div><div class="check-item"><span>✔</span> Coverage Across All 50 US States</div><div class="check-item"><span>✔</span> Thermal Moisture Leak Detection</div><div class="check-item"><span>✔</span> 100% Customer Satisfaction</div></div>`;
}

function leadFormHtml(locationName = "Your Area"): string {
  return `<div class="form-card"><h2>Request Inspection</h2><p>Get instant price estimate for water, fire &amp; mold restoration in ${esc(locationName)}</p><form action="${PHONE_HREF}" method="GET"><div class="form-group"><input type="text" placeholder="Your Full Name *" required></div><div class="form-group"><input type="tel" placeholder="Phone Number *" required></div><div class="form-group"><select required><option value="">Select Service Needed *</option><option>Black Mold Removal &amp; Inspection</option><option>Water Damage &amp; Basement Drying</option><option>Fire &amp; Smoke Damage Cleanup</option><option>Attic &amp; Crawl Space Remediation</option><option>Commercial Decontamination</option></select></div><div class="form-group"><textarea rows="2" placeholder="Describe damage or affected rooms..."></textarea></div><button type="submit" class="btn" style="width:100%">Submit &amp; Call ${PHONE_DISPLAY}</button></form></div>`;
}

function serviceCards(host: string, isLocal = false): string {
  return services
    .map((s, idx) => {
      const url = `https://${host}/${s.slug}/`;
      const num = String(idx + 1).padStart(2, "0");
      return `<a class="card" href="${url}"><b>${num}</b><h3>${esc(s.name)}</h3><p>${esc(s.description)}</p><span class="more">Review service →</span></a>`;
    })
    .join("");
}

export function homePage(states: StateItem[]) {
  const canonical = `https://${DOMAIN}/`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
        "@id": `https://${DOMAIN}/#organization`,
        name: BRAND,
        url: canonical,
        telephone: SITE.phone,
        logo: `https://${DOMAIN}/favicon.ico`,
        areaServed: states.map((s) => s.name)
      },
      {
        "@type": "WebSite",
        name: BRAND,
        url: canonical
      }
    ]
  };

  const directoryHtml = states
    .map((s) => `<a href="https://${s.slug}.${DOMAIN}/"><span>${esc(s.name)}</span></a>`)
    .join("");

  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><span class="eyebrow">Pennsylvania &amp; USA 24/7 Network</span><h1>24/7 Mold, Water &amp; Fire <em>Restoration</em></h1><p>Pennsylvania's premier mold &amp; water restoration authority — now operating 24/7 nationwide across all 50 US states &amp; 30,900+ cities. Certified inspectors and thermal moisture extraction.</p><div class="rating-badge"><span class="stars">★★★★★</span><span>Rated 4.9/5 by 18,000+ Homeowners Nationwide</span></div>${trustChecklistHtml()}<div class="buttons"><a class="btn" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a><a class="btn ghost" href="#services">View 70 Services</a></div></div><div>${leadFormHtml()}</div></div></section><section class="stats"><div class="wrap"><div class="stat"><strong>50</strong><span>US States</span></div><div class="stat"><strong>70</strong><span>Restoration Topics</span></div><div class="stat"><strong>2004</strong><span>22-Year Established Trust</span></div><div class="stat"><strong>24/7</strong><span>Emergency Dispatch</span></div></div></section><section class="section soft" id="states"><div class="wrap"><div class="head"><div><span class="eyeline">Areas We Serve</span><h2>Restoration Directory by State</h2><p class="muted">Select your state to explore local city subdomains and emergency restoration coverage.</p></div></div><div class="directory">${directoryHtml}</div></div></section><section class="section" id="services"><div class="wrap"><div class="head"><div><span class="eyeline">Restoration Services</span><h2>All 70 Water, Fire &amp; Mold Topics</h2><p class="muted">Explore specialized black mold removal, basement water extraction, sewage cleanup, and fire restoration services.</p></div></div><div class="grid">${serviceCards(DOMAIN)}</div></div></section></main>`;
  return shell(`${BRAND} | 24/7 Water, Fire & Mold Restoration`, `Pennsylvania &amp; USA nationwide 24/7 emergency water damage restoration, mold remediation, air testing, and fire damage cleanup across all 50 US states.`, canonical, body, schema);
}

export function statePage(state: StateItem) {
  const stateSlug = state.slug || state.code.toLowerCase();
  const canonical = `https://${stateSlug}.${DOMAIN}/`;
  const cities = state.cities || [];

  const cityDirectoryHtml = cities
    .map(([slug, name]) => `<a href="https://${slug}-${stateSlug}.${DOMAIN}/"><span>${esc(name)}</span></a>`)
    .join("");

  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><div class="crumb"><a href="https://${DOMAIN}/areas-we-serve/">Areas We Serve</a> / ${esc(state.name)}</div><span class="eyebrow">${esc(state.name)} State Network</span><h1>24/7 Mold &amp; Water Restoration in <em>${esc(state.name)}</em></h1><p>Comprehensive emergency water damage extraction, black mold remediation, and fire damage cleanup serving all cities across ${esc(state.name)}.</p><div class="rating-badge"><span class="stars">★★★★★</span><span>4.9/5 ⭐ Rating across ${esc(state.name)}</span></div>${trustChecklistHtml()}<div class="buttons"><a class="btn" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></div></div><div>${leadFormHtml(state.name)}</div></div></section><section class="section soft"><div class="wrap"><div class="head"><div><span class="eyeline">Cities Served</span><h2>Select Your City in ${esc(state.name)}</h2></div></div><div class="directory">${cityDirectoryHtml}</div></div></section></main>`;
  return shell(`Mold &amp; Water Restoration in ${state.name} | ${BRAND}`, `24/7 emergency mold inspection, water damage extraction, and fire restoration across ${state.name}.`, canonical, body);
}

export function cityPage(state: StateItem, city: [string, string], host: string) {
  const [, cityName] = city;
  const canonical = `https://${host}/`;
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    name: `${BRAND} - ${cityName}`,
    url: canonical,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: cityName,
      addressRegion: state.code.toUpperCase(),
      addressCountry: "US"
    }
  };

  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><div class="crumb"><a href="https://${DOMAIN}/areas-we-serve/">Areas We Serve</a> / <a href="https://${state.slug}.${DOMAIN}/">${esc(state.name)}</a> / ${esc(cityName)}</div><span class="eyebrow">Emergency Restoration Dispatch</span><h1>24/7 Mold &amp; Water Restoration in <em>${esc(cityName)}, ${esc(state.name)}</em></h1><p>Our certified restoration technicians operate 24/7 in ${esc(cityName)}. Explore our complete 70-service directory for ${esc(cityName)}, review thermal moisture leak assessments, and request immediate inspection.</p><div class="rating-badge"><span class="stars">★★★★★</span><span>4.9/5 Rating · 184+ Local Reviews in ${esc(cityName)}</span></div>${trustChecklistHtml()}<div class="buttons"><a class="btn" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a><a class="btn ghost" href="#services">Browse All 70 Services</a></div></div><div>${leadFormHtml(cityName)}</div></div></section><section class="section" id="services"><div class="wrap"><div class="head"><div><span class="eyeline">City Services</span><h2>Restoration Topics in ${esc(cityName)}</h2></div></div><div class="grid">${serviceCards(host, true)}</div></div></section></main>`;
  return shell(`Water &amp; Mold Restoration in ${cityName}, ${state.name} | ${BRAND}`, `Browse 70 mold removal, water damage extraction, and fire restoration topics for ${cityName}, ${state.name}.`, canonical, body, schema);
}

export function localServicePage(state: StateItem, city: [string, string], service: (typeof services)[number], host: string) {
  const [, cityName] = city;
  const canonical = `https://${host}/${service.slug}/`;
  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><div class="crumb"><a href="https://${state.slug}.${DOMAIN}/">${esc(state.name)}</a> / <a href="https://${host}/">${esc(cityName)}</a> / ${esc(service.name)}</div><span class="eyebrow">${esc(service.category)} Restoration</span><h1>${esc(service.name)} in <em>${esc(cityName)}, ${esc(state.name)}</em></h1><p>${esc(service.description)}</p><div class="rating-badge"><span class="stars">★★★★★</span><span>4.9/5 ⭐ Rating for ${esc(service.name)} in ${esc(cityName)}</span></div>${trustChecklistHtml()}<div class="buttons"><a class="btn" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></div></div><div>${leadFormHtml(`${service.name} ${cityName}`)}</div></div></section></main>`;
  return shell(`${service.name} in ${cityName}, ${state.name}`, `${service.description} Review local restoration info for ${cityName}, ${state.name}.`, canonical, body);
}

export function linkSheetPage() {
  const canonical = `https://${DOMAIN}/link-sheet/`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Xagio pSEO LinkSheet Authority Hub",
    url: canonical
  };
  const body = `<main><section class="hero" style="padding:60px 0;background:linear-gradient(135deg,#042f2e,#064e3b);color:#fff;"><div class="wrap" style="text-align:center;max-width:800px;"><span class="eyebrow">Xagio Network Hub</span><h1 style="font-size:36px;margin:12px 0;">pSEO Network Authority &amp; LinkSheet</h1><p style="color:#ccfbf1;font-size:16px;">Central interlinking directory for nationwide home services, mold remediation, tree care, garage door repairs, and plumbing.</p></div></section><section class="section"><div class="wrap"><div class="grid" style="grid-template-columns:repeat(2,1fr);gap:24px;"><div class="card" style="padding:28px;"><span style="font-size:24px;">🍄</span><h3 style="margin:12px 0 6px;">Mold Inspection Pennsylvania</h3><p style="font-size:13px;color:#64748b;margin-bottom:14px;">24/7 Water, Fire &amp; Mold Restoration Network</p><ul style="list-style:none;padding:0;font-size:14px;line-height:1.8;"><li>• <a href="https://moldinspectionpennsylvania.com/services/emergency-mold-remediation/" style="color:#0d9488;font-weight:700;">Emergency Mold Remediation</a></li><li>• <a href="https://moldinspectionpennsylvania.com/services/black-mold-removal/" style="color:#0d9488;font-weight:700;">Black Mold Removal</a></li><li>• <a href="https://moldinspectionpennsylvania.com/services/emergency-water-damage-restoration/" style="color:#0d9488;font-weight:700;">Water Damage Restoration</a></li></ul></div><div class="card" style="padding:28px;"><span style="font-size:24px;">🌲</span><h3 style="margin:12px 0 6px;">Can Tree Service</h3><p style="font-size:13px;color:#64748b;margin-bottom:14px;">24/7 Emergency Tree Removal &amp; Arborist Care</p><ul style="list-style:none;padding:0;font-size:14px;line-height:1.8;"><li>• <a href="https://cantreeservice.com/services/tree-removal/" style="color:#059669;font-weight:700;">Emergency Tree Removal</a></li></ul></div></div></div></section></main>`;
  return shell("Xagio pSEO LinkSheet Authority Hub", "Official interlinking LinkSheet directory.", canonical, body, schema);
}

export function servicesHubPage() {
  const canonical = `https://${DOMAIN}/services/`;
  const body = `<main><section class="hero"><div class="wrap"><span class="eyebrow">Services Directory</span><h1>All 70 Water, Fire &amp; Mold Services</h1><p>Browse our complete service catalog across all 50 states.</p></div></section><section class="section"><div class="wrap"><div class="grid">${serviceCards(DOMAIN)}</div></div></section></main>`;
  return shell(`Restoration Services Directory | ${BRAND}`, "Browse 70 water, fire & mold restoration services.", canonical, body);
}

export function nationalServicePage(service: (typeof services)[number]) {
  const canonical = `https://${DOMAIN}/services/${service.slug}/`;
  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><span class="eyebrow">Nationwide Service</span><h1>${esc(service.name)}</h1><p>${esc(service.description)}</p><div class="buttons"><a class="btn" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></div></div><div>${leadFormHtml(service.name)}</div></div></section></main>`;
  return shell(`${service.name} | ${BRAND}`, service.description, canonical, body);
}

export function areasWeServePage(states: StateItem[]) {
  const canonical = `https://${DOMAIN}/areas-we-serve/`;
  const directoryHtml = states.map((s) => `<a href="https://${s.slug}.${DOMAIN}/"><span>${esc(s.name)}</span></a>`).join("");
  const body = `<main><section class="hero"><div class="wrap"><span class="eyebrow">Coverage Map</span><h1>Areas We Serve Across America</h1></div></section><section class="section"><div class="wrap"><div class="directory">${directoryHtml}</div></div></section></main>`;
  return shell(`Areas We Serve | ${BRAND}`, "Explore our 50-state coverage map.", canonical, body);
}

export function articlesHubPage() {
  const canonical = `https://${DOMAIN}/articles/`;
  const body = `<main><section class="hero"><div class="wrap"><span class="eyebrow">Guides &amp; Articles</span><h1>Restoration Safety &amp; Inspection Guides</h1></div></section></main>`;
  return shell(`Restoration Guides | ${BRAND}`, "Restoration safety & inspection guides.", canonical, body);
}

export function articlePage(article: any) {
  const canonical = `https://${DOMAIN}/articles/${article.slug}/`;
  const body = `<main><section class="hero"><div class="wrap"><h1>${esc(article.title)}</h1></div></section></main>`;
  return shell(`${article.title} | ${BRAND}`, article.excerpt, canonical, body);
}

export function notFoundPage(message: string) {
  return `<!doctype html><html><head><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width,initial-scale=1"><title>404 | ${BRAND}</title><style>${CSS}</style></head><body>${header()}<main class="section"><div class="wrap"><h1>404</h1><p>${esc(message)}</p><a class="btn dark" href="https://${DOMAIN}/">Back to Home</a></div></main>${footer()}</body></html>`;
}
