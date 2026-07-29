import database from "../data/usa_database.json";
import services from "../data/services.json";
import { SITE } from "../lib/site";
import type { StateItem } from "./sitemaps";

const DOMAIN = SITE.domain;
const BRAND = SITE.name;
const PHONE_DISPLAY = SITE.phoneDisplay;
const PHONE_HREF = `tel:${SITE.phoneRaw}`;

function esc(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&#039;");
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800;900&display=swap');
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;background:#0d1b2a;color:#f8fafc;font-family:'Inter',system-ui,sans-serif;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
.wrap{width:min(1280px,calc(100% - 36px));margin:auto}

/* HEADER & TOP BAR */
.top-bar{background:#0b1320;color:#cbd5e1;font-size:13px;border-bottom:1px solid rgba(255,255,255,.08)}
.top-bar .wrap{display:flex;align-items:center;justify-content:space-between;padding:8px 0}
.top-left,.top-right{display:flex;align-items:center;gap:14px}
.pulse-dot{width:8px;height:8px;border-radius:50%;background:#10b981;display:inline-block;box-shadow:0 0 10px #10b981}
.sep{color:#475569}
.stars{color:#fbbf24;letter-spacing:2px;font-size:14px}

.navbar{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.98);backdrop-filter:blur(16px);border-bottom:1px solid #e2e8f0;box-shadow:0 8px 30px rgba(0,0,0,.08);color:#0f172a}
.navbar .wrap{display:flex;align-items:center;justify-content:space-between;padding:14px 0}
.brand{display:flex;align-items:center;gap:12px;font-family:'Plus Jakarta Sans',sans-serif;font-size:20px;font-weight:900;color:#0d1b2a;letter-spacing:-.03em}
.logo-icon{width:44px;height:44px;border-radius:14px;display:grid;place-items:center;background:linear-gradient(135deg,#0ea5e9,#06b6d4);color:#fff;font-size:22px;box-shadow:0 8px 20px rgba(14,165,233,.3)}
.brand-sub{display:block;font-size:11px;letter-spacing:.02em;color:#64748b;font-family:'Inter',sans-serif;font-weight:500;margin-top:-2px}

.nav-links{display:flex;align-items:center;gap:20px;font-size:15px;font-weight:600;color:#334155}
.nav-links a{padding:8px 12px;border-radius:10px;transition:.2s}
.nav-links a:hover{color:#0ea5e9;background:#f8fafc}
.nav-pill{background:#e0f2fe;color:#0284c7!important;font-weight:700}
.nav-pill:hover{background:#bae6fd!important}

.dropdown{position:relative;display:inline-block}
.dropdown:hover .dropdown-menu{display:block}
.dropdown-menu{display:none;position:absolute;top:100%;left:0;width:280px;background:#fff;border-radius:16px;box-shadow:0 20px 48px rgba(0,0,0,.15);border:1px solid #e2e8f0;padding:10px;z-index:100}
.dropdown-menu a{display:block;padding:10px 14px;font-size:14px;color:#334155;border-radius:10px;font-weight:600}
.dropdown-menu a:hover{background:#f1f5f9;color:#0ea5e9}
.dropdown-menu a.highlight{color:#0ea5e9;font-weight:800;border-top:1px solid #f1f5f9;margin-top:6px;padding-top:12px}

.btn-cta{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:12px 24px;border-radius:14px;background:linear-gradient(135deg,#f97316,#ea580c);color:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:16px;box-shadow:0 8px 24px rgba(249,115,22,.35);transition:.25s;border:none;cursor:pointer}
.btn-cta:hover{transform:translateY(-2px);box-shadow:0 14px 32px rgba(249,115,22,.5);background:linear-gradient(135deg,#fb923c,#f97316)}
.btn-dark-navy{background:#0d1b2a;color:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;padding:14px 28px;border-radius:14px;display:inline-flex;align-items:center;gap:8px;font-size:16px;transition:.2s;box-shadow:0 8px 20px rgba(0,0,0,.2)}
.btn-dark-navy:hover{transform:translateY(-2px);background:#14263b}

/* HERO & GENERAL SECTIONS */
.services-hero{position:relative;padding:76px 0 88px;background:#0d1b2a;overflow:hidden}
.services-hero h1{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(38px,5vw,56px);font-weight:900;line-height:1.1;margin:16px 0 14px;color:#fff;max-width:820px;letter-spacing:-.03em}
.services-hero h1 span{color:#38bdf8}
.crumb-trail{font-size:14px;color:#38bdf8;font-weight:700;margin-bottom:14px}
.crumb-trail a{color:#94a3b8;transition:.2s}.crumb-trail a:hover{color:#fff}

.sec-white{background:#fff;color:#0f172a;padding:84px 0}
.sec-dark{background:#0d1b2a;color:#fff;padding:84px 0}
.sec-gray{background:#f8fafc;color:#0f172a;padding:84px 0}

.tag-badge{display:inline-block;padding:6px 14px;border-radius:999px;background:#e0f2fe;color:#0284c7;font-size:12px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;margin-bottom:12px}
.sec-title{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(30px,4vw,44px);font-weight:900;line-height:1.15;margin:0 0 14px;letter-spacing:-.03em}

/* SERVICE HUB CARDS GRID */
.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.service-hub-card{background:#fff;border:1px solid #e2e8f0;border-radius:18px;padding:26px;box-shadow:0 8px 24px rgba(0,0,0,.03);transition:.25s;display:flex;flex-direction:column;justify-content:space-between}
.service-hub-card:hover{transform:translateY(-5px);border-color:#0ea5e9;box-shadow:0 16px 36px rgba(14,165,233,.12)}
.service-hub-icon{width:42px;height:42px;border-radius:12px;background:#e0f2fe;color:#0284c7;display:grid;place-items:center;font-size:20px;margin-bottom:16px}
.service-hub-card h3{font-family:'Plus Jakarta Sans',sans-serif;font-size:19px;font-weight:800;color:#0d1b2a;margin:0 0 8px}
.service-hub-card p{color:#64748b;font-size:14px;line-height:1.6;margin:0 0 16px}
.service-hub-card a{color:#0ea5e9;font-weight:800;font-size:14px}

.checklist-card{background:#fff;border:1px solid #e2e8f0;border-radius:20px;padding:32px;box-shadow:0 10px 30px rgba(0,0,0,.03)}
.checklist-card h3{font-family:'Plus Jakarta Sans',sans-serif;font-size:22px;font-weight:900;color:#0d1b2a;margin:0 0 18px}
.checklist-items{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;font-size:14px;font-weight:700;color:#334155}
.checklist-items div{display:flex;align-items:center;gap:8px}
.checklist-items span{color:#0ea5e9;font-weight:900}

.brands-bar{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:36px;margin-top:28px;font-family:'Plus Jakarta Sans',sans-serif;font-size:20px;font-weight:800;color:#475569}

.location-pills{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:12px;margin-top:24px}
.loc-pill{padding:10px 20px;border-radius:999px;background:#fff;border:1px solid #cbd5e1;color:#0d1b2a;font-weight:700;font-size:14px;transition:.2s}
.loc-pill:hover{border-color:#0ea5e9;color:#0ea5e9;transform:translateY(-2px)}

/* FOOTER */
.footer-cta-banner{background:linear-gradient(135deg,#0ea5e9,#0284c7);color:#fff;padding:52px 0}
.footer-cta-flex{display:flex;align-items:center;justify-space:space-between;gap:24px}
.footer-cta-flex h2{font-family:'Plus Jakarta Sans',sans-serif;font-size:32px;font-weight:900;margin:0 0 6px;color:#fff}
.footer-cta-flex p{font-size:16px;margin:0;opacity:.95}
.footer-cta-btns{display:flex;align-items:center;gap:14px}

.footer-main{background:#0d1b2a;color:#94a3b8;padding:72px 0 32px;border-top:1px solid rgba(255,255,255,.08)}
.footer-grid{display:grid;grid-template-columns:1.3fr 1fr 1fr 1.2fr;gap:40px}
.footer-main h3{font-family:'Plus Jakarta Sans',sans-serif;color:#fff;margin-top:0;font-size:18px;font-weight:800}
.footer-main a{display:block;color:#94a3b8;margin:12px 0;transition:.2s;font-size:14px;font-weight:500}
.footer-main a:hover{color:#38bdf8}

.footer-bottom{background:#08101a;border-top:1px solid rgba(255,255,255,.08);padding:24px 0;font-size:13px;color:#64748b}
.footer-bottom .wrap{display:flex;align-items:center;justify-space:space-between}
.footer-bottom-links{display:flex;gap:20px}
.footer-bottom-links a{color:#94a3b8;transition:.2s}.footer-bottom-links a:hover{color:#fff}

.sticky-bar{position:fixed;bottom:20px;right:20px;z-index:90}
@media(max-width:960px){.nav-links{display:none}.grid-3,.checklist-grid-2{grid-template-columns:1fr}.footer-grid,.footer-cta-flex{grid-template-columns:1fr;flex-direction:column;align-items:start}}
@media(max-width:640px){.checklist-items{grid-template-columns:1fr}.sticky-bar{left:16px;right:16px;bottom:16px}.btn-cta{width:100%}}
`;

function header(): string {
  return `<div class="top-bar">
    <div class="wrap">
      <div class="top-left">
        <span class="pulse-dot"></span> <b>24/7 Emergency Dispatch</b>
        <span class="sep">|</span>
        <span>Mon–Sun 24 Hours Open</span>
      </div>
      <div class="top-right">
        <span class="stars">★★★★★</span> <b>4.9 (18,000+ reviews)</b>
        <span class="sep">|</span>
        <span>Licensed &amp; Insured · Master Certified</span>
      </div>
    </div>
  </div>
  <header class="navbar">
    <div class="wrap">
      <a class="brand" href="https://${DOMAIN}/">
        <span class="logo-icon">💧</span>
        <span>${BRAND}<small class="brand-sub">Mold · Water · Fire · 24/7 Restoration</small></span>
      </a>
      <nav class="nav-links">
        <a href="https://${DOMAIN}/">Home</a>
        <div class="dropdown">
          <a href="https://${DOMAIN}/services/" class="nav-pill">Services ▾</a>
          <div class="dropdown-menu">
            <a href="https://${DOMAIN}/services/emergency-mold-remediation/">Emergency Mold Remediation</a>
            <a href="https://${DOMAIN}/services/black-mold-removal/">Black Mold Removal</a>
            <a href="https://${DOMAIN}/services/emergency-water-damage-restoration/">Water Damage Restoration</a>
            <a href="https://${DOMAIN}/services/fire-damage-restoration-cleanup/">Fire Damage Restoration</a>
            <a href="https://${DOMAIN}/services/" class="highlight">View All 70 Services →</a>
          </div>
        </div>
        <div class="dropdown">
          <a href="https://${DOMAIN}/areas-we-serve/">Service Areas ▾</a>
          <div class="dropdown-menu">
            <a href="https://pennsylvania.${DOMAIN}/">Pennsylvania</a>
            <a href="https://texas.${DOMAIN}/">Texas</a>
            <a href="https://florida.${DOMAIN}/">Florida</a>
            <a href="https://california.${DOMAIN}/">California</a>
            <a href="https://${DOMAIN}/areas-we-serve/" class="highlight">All 50 States Directory →</a>
          </div>
        </div>
        <a href="https://${DOMAIN}/about-us/">About</a>
        <a href="https://${DOMAIN}/contact-us/">Contact</a>
      </nav>
      <a class="btn-cta" href="${PHONE_HREF}">📞 ${PHONE_DISPLAY}</a>
    </div>
  </header>`;
}

function footer(): string {
  return `<section class="footer-cta-banner">
    <div class="wrap footer-cta-flex">
      <div>
        <h2>Not Sure Which Service You Need?</h2>
        <p>Call and describe what's happening — we'll point you in the right direction.</p>
      </div>
      <div class="footer-cta-btns">
        <a class="btn-dark-navy" href="${PHONE_HREF}">📞 Call ${PHONE_DISPLAY}</a>
      </div>
    </div>
  </section>
  <footer class="footer-main">
    <div class="wrap">
      <div class="footer-grid">
        <div>
          <a class="brand" href="https://${DOMAIN}/" style="color:#fff;">
            <span class="logo-icon">💧</span>
            <span>${BRAND}</span>
          </a>
          <p style="font-size:14px;line-height:1.65;margin:16px 0;color:#94a3b8;">
            Pennsylvania's water &amp; mold restoration specialists. Licensed, insured and family-owned since 2004.
          </p>
          <p style="font-size:13px;color:#fbbf24;margin:0 0 6px;">★★★★★ 4.9/5 · 18,000+ reviews</p>
          <p style="font-size:12px;color:#64748b;margin:0;">Master Certified · Fully Insured Network</p>
        </div>
        <div>
          <h3>Services</h3>
          <a href="https://${DOMAIN}/services/emergency-mold-remediation/">Emergency Mold Remediation</a>
          <a href="https://${DOMAIN}/services/black-mold-removal/">Black Mold Removal</a>
          <a href="https://${DOMAIN}/services/emergency-water-damage-restoration/">Water Damage Restoration</a>
          <a href="https://${DOMAIN}/services/fire-damage-restoration-cleanup/">Fire Damage Restoration</a>
          <a href="https://${DOMAIN}/services/dehumidifier-equipment-rental/">Dehumidification &amp; Drying</a>
          <a href="https://${DOMAIN}/services/" style="color:#38bdf8;font-weight:700;">All Services →</a>
        </div>
        <div>
          <h3>Service Areas</h3>
          <a href="https://pennsylvania.${DOMAIN}/">Pennsylvania</a>
          <a href="https://texas.${DOMAIN}/">Texas</a>
          <a href="https://florida.${DOMAIN}/">Florida</a>
          <a href="https://california.${DOMAIN}/">California</a>
          <a href="https://new-york.${DOMAIN}/">New York</a>
          <a href="https://${DOMAIN}/areas-we-serve/" style="color:#38bdf8;font-weight:700;">All Areas →</a>
        </div>
        <div>
          <h3>Get In Touch</h3>
          <a href="${PHONE_HREF}" style="color:#fff;font-weight:800;font-size:16px;">📞 ${PHONE_DISPLAY}</a>
          <p style="font-size:14px;color:#94a3b8;margin:10px 0 6px;">✉️ dispatch@${DOMAIN}</p>
          <p style="font-size:14px;color:#94a3b8;margin:0 0 6px;">📍 236 Long Park Dr, Rochester, NY 14612</p>
          <p style="font-size:14px;color:#38bdf8;margin:0;font-weight:700;">🕒 Mon–Sun 24 Hours · 24/7 Emergency</p>
        </div>
      </div>
    </div>
  </footer>
  <div class="footer-bottom">
    <div class="wrap">
      <p>© ${new Date().getFullYear()} ${BRAND}. All rights reserved.</p>
      <div class="footer-bottom-links">
        <a href="https://${DOMAIN}/about-us/">About</a>
        <a href="https://${DOMAIN}/services/">Services</a>
        <a href="https://${DOMAIN}/areas-we-serve/">Areas</a>
        <a href="https://${DOMAIN}/contact-us/">Contact</a>
      </div>
    </div>
  </div>
  <div class="sticky-bar"><a class="btn-cta" href="${PHONE_HREF}">⚡ Call ${PHONE_DISPLAY}</a></div>`;
}

function shell(title: string, description: string, canonical: string, body: string, schema?: object): string {
  const jsonLd = schema ? `<script type="application/ld+json">${JSON.stringify(schema)}</script>` : "";
  return `<!doctype html><html lang="en-US"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${canonical}"><meta name="robots" content="index,follow"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${canonical}"><style>${CSS}</style>${jsonLd}</head><body>${header()}${body}${footer()}</body></html>`;
}

export function servicesHubPage() {
  const canonical = `https://${DOMAIN}/services/`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://${DOMAIN}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: canonical }
    ]
  };

  const serviceCardsHtml = services.slice(0, 9).map((s) => {
    return `<div class="service-hub-card">
      <div>
        <div class="service-hub-icon">💧</div>
        <h3>${esc(s.name)}</h3>
        <p>${esc(s.description)}</p>
      </div>
      <a href="https://${DOMAIN}/services/${s.slug}/">Learn more →</a>
    </div>`;
  }).join("");

  const body = `<main>
  <!-- HERO SECTION -->
  <section class="services-hero">
    <div class="wrap">
      <div class="crumb-trail"><a href="https://${DOMAIN}/">Home</a> / Services</div>
      <h1>Complete Water, Fire &amp; Mold <span>Restoration Services</span></h1>
      <p style="font-size:18px;line-height:1.75;color:#cbd5e1;max-width:760px;margin-bottom:0;">We specialize in water damage extraction, toxic black mold remediation, and structural fire loss recovery — and do it exceptionally well. Explore our full range of 70 specialized topics for every type of property.</p>
    </div>
  </section>

  <!-- 1. OUR SERVICES GRID -->
  <section class="sec-gray">
    <div class="wrap">
      <div style="margin-bottom:40px;">
        <h2 class="sec-title" style="color:#0d1b2a;">Our Restoration Services</h2>
        <p style="color:#64748b;font-size:15px;margin:0;">Dedicated service pages are linked below. Don't see exactly what you need? Call us — if it involves water, fire, or mold, we handle it.</p>
      </div>
      <div class="grid-3">${serviceCardsHtml}</div>
    </div>
  </section>

  <!-- 2. DETAILED CHECKLISTS BREAKDOWN -->
  <section class="sec-white">
    <div class="wrap" style="display:grid;grid-template-columns:1fr 1fr;gap:32px;">
      <div class="checklist-card">
        <h3>Mold &amp; Biohazard Remediation Services</h3>
        <div class="checklist-items">
          <div><span>✔</span> Black mold inspection &amp; testing</div>
          <div><span>✔</span> Toxic Stachybotrys removal</div>
          <div><span>✔</span> Attic &amp; crawl space remediation</div>
          <div><span>✔</span> Commercial decontamination</div>
          <div><span>✔</span> HEPA air scrubbing &amp; containment</div>
          <div><span>✔</span> Post-remediation lab clearance</div>
        </div>
        <a href="https://${DOMAIN}/services/emergency-mold-remediation/" style="color:#0ea5e9;font-weight:800;font-size:14px;">Mold remediation details →</a>
      </div>

      <div class="checklist-card">
        <h3>Water &amp; Fire Damage Restoration Services</h3>
        <div class="checklist-items">
          <div><span>✔</span> Emergency water extraction</div>
          <div><span>✔</span> Burst pipe repair &amp; drying</div>
          <div><span>✔</span> Flooded basement pump-out</div>
          <div><span>✔</span> Thermal moisture leak detection</div>
          <div><span>✔</span> Smoke &amp; soot deodorization</div>
          <div><span>✔</span> Structural fire loss repair</div>
        </div>
        <a href="https://${DOMAIN}/services/emergency-water-damage-restoration/" style="color:#0ea5e9;font-weight:800;font-size:14px;">Water damage repair details →</a>
      </div>
    </div>
  </section>

  <!-- 3. EQUIPMENT & BRANDS WE DEPLOY -->
  <section class="sec-white" style="padding-top:0;">
    <div class="wrap" style="text-align:center;">
      <h3 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:22px;font-weight:800;color:#0d1b2a;margin:0 0 8px;">Equipment &amp; Technologies We Deploy</h3>
      <p style="color:#64748b;font-size:14px;margin:0 0 20px;">Certified technicians equipped with industrial-grade tools found in top environmental laboratories.</p>
      <div class="brands-bar">
        <span>FLIR Thermal Imaging</span>
        <span>Phoenix LGR Dehumidifiers</span>
        <span>DriEaz Air Movers</span>
        <span>Abatement HEPA Filtration</span>
        <span>Xactimate Estimate Scoping</span>
      </div>
    </div>
  </section>

  <!-- 4. SERVING ALL OF PENNSYLVANIA & USA -->
  <section class="sec-gray">
    <div class="wrap" style="text-align:center;">
      <h3 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:24px;font-weight:900;color:#0d1b2a;margin:0 0 8px;">Serving All of Pennsylvania &amp; USA</h3>
      <p style="color:#64748b;font-size:15px;margin:0;">Every service above is available throughout Pennsylvania and surrounding communities.</p>
      <div class="location-pills">
        <a class="loc-pill" href="https://pennsylvania.${DOMAIN}/">Pennsylvania</a>
        <a class="loc-pill" href="https://texas.${DOMAIN}/">Texas</a>
        <a class="loc-pill" href="https://florida.${DOMAIN}/">Florida</a>
        <a class="loc-pill" href="https://california.${DOMAIN}/">California</a>
        <a class="loc-pill" href="https://new-york.${DOMAIN}/">New York</a>
        <a class="loc-pill" href="https://${DOMAIN}/areas-we-serve/" style="background:#0ea5e9;color:#fff;border-color:#0ea5e9;">All Areas →</a>
      </div>
    </div>
  </section>
  </main>`;

  return shell(`Restoration Services Directory | All 70 Topics | ${BRAND}`, "Browse all 70 water damage extraction, toxic black mold remediation, and fire restoration services offered nationwide.", canonical, body, schema);
}

export function aboutUsPage() {
  const canonical = `https://${DOMAIN}/about-us/`;
  const body = `<main><section class="services-hero"><div class="wrap"><h1>About Mold Inspection Pennsylvania &amp; <span>USA Network</span></h1></div></section></main>`;
  return shell(`About Us | ${BRAND}`, "Learn about Mold Inspection Pennsylvania.", canonical, body);
}

export function cityPage(state: StateItem, city: [string, string], host: string) {
  const [, cityName] = city;
  const canonical = `https://${host}/`;
  const body = `<main><section class="services-hero"><div class="wrap"><h1>Water Damage &amp; Mold Remediation in <span>${esc(cityName)}, ${esc(state.name)}</span></h1></div></section></main>`;
  return shell(`Water &amp; Mold Restoration in ${cityName}, ${state.name} | ${BRAND}`, `Water damage in ${cityName}.`, canonical, body);
}

export function statePage(state: StateItem) {
  const stateSlug = state.slug || state.code.toLowerCase();
  const canonical = `https://${stateSlug}.${DOMAIN}/`;
  const body = `<main><section class="services-hero"><div class="wrap"><h1>Water Damage &amp; Mold Restoration in <span>${esc(state.name)}</span></h1></div></section></main>`;
  return shell(`Mold &amp; Water Restoration in ${state.name} | ${BRAND}`, `Restoration in ${state.name}.`, canonical, body);
}

export function homePage(states: StateItem[]) {
  const canonical = `https://${DOMAIN}/`;
  const body = `<main><section class="services-hero"><div class="wrap"><h1>Emergency Water &amp; Mold Restoration <span>Pennsylvania</span></h1></div></section></main>`;
  return shell(`${BRAND} | 24/7 Water, Fire & Mold Restoration`, `Restoration in PA.`, canonical, body);
}

export function contactUsPage() {
  const canonical = `https://${DOMAIN}/contact-us/`;
  const body = `<main><section class="services-hero"><div class="wrap"><h1>Contact Our <span>Restoration Experts</span></h1></div></section></main>`;
  return shell(`Contact Us | ${BRAND}`, "Contact us.", canonical, body);
}

export function nationalServicePage(service: (typeof services)[number]) {
  const canonical = `https://${DOMAIN}/services/${service.slug}/`;
  const body = `<main><section class="services-hero"><div class="wrap"><h1>24/7 <span>${esc(service.name)}</span></h1></div></section></main>`;
  return shell(`${service.name} | ${BRAND}`, service.description, canonical, body);
}

export function localServicePage(state: StateItem, city: [string, string], service: (typeof services)[number], host: string) {
  const [, cityName] = city;
  const canonical = `https://${host}/${service.slug}/`;
  const body = `<main><section class="services-hero"><div class="wrap"><h1>${esc(service.name)} in <span>${esc(cityName)}, ${esc(state.name)}</span></h1></div></section></main>`;
  return shell(`${service.name} in ${cityName}, ${state.name} | ${BRAND}`, service.description, canonical, body);
}

export function areasWeServePage(states: StateItem[]) {
  const canonical = `https://${DOMAIN}/areas-we-serve/`;
  const body = `<main><section class="services-hero"><div class="wrap"><h1>Water, Fire &amp; Mold Restoration Across <span>USA</span></h1></div></section></main>`;
  return shell(`Service Areas | ${BRAND}`, "Directory.", canonical, body);
}

export function linkSheetPage() {
  const canonical = `https://${DOMAIN}/link-sheet/`;
  const body = `<main><section class="services-hero"><div class="wrap"><h1>LinkSheet Hub</h1></div></section></main>`;
  return shell("Xagio LinkSheet", "LinkSheet.", canonical, body);
}

export function articlesHubPage() {
  const canonical = `https://${DOMAIN}/articles/`;
  const body = `<main><section class="services-hero"><div class="wrap"><h1>Restoration Guides</h1></div></section></main>`;
  return shell(`Restoration Guides | ${BRAND}`, "Guides.", canonical, body);
}

export function articlePage(article: any) {
  const canonical = `https://${DOMAIN}/articles/${article.slug}/`;
  const body = `<main><section class="services-hero"><div class="wrap"><h1>${esc(article.title)}</h1></div></section></main>`;
  return shell(`${article.title} | ${BRAND}`, article.excerpt, canonical, body);
}

export function notFoundPage(message: string) {
  return `<!doctype html><html><head><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width,initial-scale=1"><title>404 | ${BRAND}</title><style>${CSS}</style></head><body>${header()}<main class="sec-dark"><div class="wrap"><h1>404</h1><p>${esc(message)}</p><a class="btn-cta" href="https://${DOMAIN}/">Back to Home</a></div></main>${footer()}</body></html>`;
}
