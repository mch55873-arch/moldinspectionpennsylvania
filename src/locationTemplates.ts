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
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800;900&display=swap');
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;background:#0d1b2a;color:#f8fafc;font-family:'Inter',system-ui,sans-serif;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
.wrap{width:min(1280px,calc(100% - 36px));margin:auto}

/* COVINA WATER HEATER HEADER STYLES */
.top-bar{background:#0d1b2a;color:#cbd5e1;font-size:13px;border-bottom:1px solid rgba(255,255,255,.08)}
.top-bar .wrap{display:flex;align-items:center;justify-content:space-between;padding:8px 0}
.top-left,.top-right{display:flex;align-items:center;gap:14px}
.pulse-dot{width:8px;height:8px;border-radius:50%;background:#f97316;display:inline-block;box-shadow:0 0 10px #f97316}
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
.btn-glass-cyan{background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.4);color:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;padding:14px 28px;border-radius:14px;display:inline-flex;align-items:center;gap:8px;font-size:16px;transition:.2s;backdrop-filter:blur(8px)}
.btn-glass-cyan:hover{background:rgba(255,255,255,.3);transform:translateY(-2px)}

.btn-secondary{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);color:#fff;box-shadow:none}
.btn-secondary:hover{background:rgba(255,255,255,.18)}

.hero{position:relative;padding:84px 0 90px;background:radial-gradient(circle at 50% 0%,rgba(14,165,233,.15) 0%,transparent 60%),linear-gradient(180deg,#0d1b2a 0%,#14263b 100%);overflow:hidden}
.hero-grid{display:grid;grid-template-columns:1.08fr .92fr;gap:54px;align-items:center}
.crumb-trail{font-size:14px;color:#38bdf8;font-weight:700;margin-bottom:14px}
.crumb-trail a{color:#94a3b8;transition:.2s}.crumb-trail a:hover{color:#fff}
.eyebrow-badge{display:inline-flex;align-items:center;gap:8px;padding:8px 16px;border-radius:999px;background:rgba(14,165,233,.12);border:1px solid rgba(14,165,233,.3);color:#38bdf8;font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}
.hero h1{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(40px,5.5vw,64px);font-weight:900;line-height:1.06;letter-spacing:-.04em;margin:16px 0 14px;color:#fff}
.hero h1 span{background:linear-gradient(135deg,#38bdf8,#0ea5e9);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero-desc{font-size:18px;line-height:1.75;color:#94a3b8;max-width:680px;margin-bottom:28px}
.rating-pill{display:inline-flex;align-items:center;gap:12px;padding:10px 18px;border-radius:999px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);font-size:14px;font-weight:700;color:#f1f5f9;margin-bottom:24px}

.card-form{background:#14263b;border:1px solid rgba(255,255,255,.14);border-radius:24px;padding:32px;box-shadow:0 24px 64px rgba(0,0,0,.6)}
.card-form h2{font-family:'Plus Jakarta Sans',sans-serif;font-size:24px;font-weight:900;margin:0 0 6px;color:#fff}
.card-form p{font-size:14px;color:#94a3b8;margin:0 0 22px}
.field-group{margin-bottom:16px}
.field-group input,.field-group select,.field-group textarea{width:100%;padding:14px 18px;border-radius:12px;border:1px solid rgba(255,255,255,.14);background:#0d1b2a;color:#fff;font-size:15px;outline:none;transition:.2s}
.field-group input:focus,.field-group select:focus,.field-group textarea:focus{border-color:#0ea5e9;box-shadow:0 0 0 3px rgba(14,165,233,.25)}

.stats-bar{background:#0b1320;border-top:1px solid rgba(255,255,255,.08);border-bottom:1px solid rgba(255,255,255,.08)}
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr)}
.stat-box{text-align:center;padding:32px 20px;border-left:1px solid rgba(255,255,255,.08)}
.stat-box:first-child{border-left:0}
.stat-num{font-family:'Plus Jakarta Sans',sans-serif;font-size:36px;font-weight:900;color:#fff}
.stat-lbl{font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.12em;color:#38bdf8;margin-top:6px}

.section{padding:86px 0}
.section-dark{background:#14263b}
.sec-head{margin-bottom:44px}
.sec-tag{color:#38bdf8;font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase}
.sec-head h2{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(34px,4.5vw,52px);font-weight:900;line-height:1.1;margin:10px 0 0;color:#fff;letter-spacing:-.035em}
.sec-desc{color:#94a3b8;font-size:16px;line-height:1.7;max-width:720px;margin-top:12px}

.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.card-item{background:#14263b;border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:30px;transition:.25s;box-shadow:0 12px 36px rgba(0,0,0,.3)}
.card-item:hover{transform:translateY(-5px);border-color:#0ea5e9;box-shadow:0 20px 48px rgba(14,165,233,.2)}
.card-num{width:48px;height:48px;border-radius:14px;display:grid;place-items:center;background:rgba(14,165,233,.15);color:#38bdf8;font-weight:900;font-size:16px}
.card-item h3{font-family:'Plus Jakarta Sans',sans-serif;font-size:22px;font-weight:800;margin:18px 0 10px;color:#fff}
.card-item p{color:#94a3b8;font-size:15px;line-height:1.68;margin:0}
.card-link{display:inline-flex;align-items:center;gap:6px;margin-top:20px;color:#38bdf8;font-weight:800;font-size:15px}

.map-container{border-radius:24px;overflow:hidden;border:1px solid rgba(255,255,255,.14);box-shadow:0 20px 50px rgba(0,0,0,.5);margin-top:28px}

.dir-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.dir-card{display:flex;align-items:center;justify-space:space-between;padding:20px 22px;background:#0d1b2a;border:1px solid rgba(255,255,255,.1);border-radius:16px;color:#f1f5f9;font-weight:850;font-size:15px;transition:.2s}
.dir-card:hover{transform:translateY(-3px);border-color:#0ea5e9;color:#38bdf8;box-shadow:0 12px 30px rgba(14,165,233,.2)}
.dir-card:after{content:"→";color:#0ea5e9}

.featured-area-card{background:#14263b;border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:26px;transition:.2s}
.featured-area-card:hover{transform:translateY(-4px);border-color:#0ea5e9;box-shadow:0 16px 40px rgba(14,165,233,.25)}
.featured-area-card h4{font-family:'Plus Jakarta Sans',sans-serif;font-size:20px;font-weight:800;margin:10px 0 6px;color:#fff}
.featured-area-card span{color:#38bdf8;font-weight:800;font-size:14px}

.contact-info-card{background:#14263b;border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:28px}
.contact-info-card div{width:46px;height:46px;border-radius:14px;background:rgba(14,165,233,.15);color:#38bdf8;display:grid;place-items:center;font-size:20px}
.contact-info-card h3{font-family:'Plus Jakarta Sans',sans-serif;font-size:20px;font-weight:800;color:#fff;margin:16px 0 8px}
.contact-info-card p{color:#94a3b8;font-size:14px;line-height:1.65;margin:0}

.step-card{background:#0d1b2a;border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:28px}
.step-card span{display:inline-block;width:40px;height:40px;border-radius:12px;background:rgba(14,165,233,.18);color:#38bdf8;font-weight:900;text-align:center;line-height:40px;font-size:16px}
.step-card h3{font-family:'Plus Jakarta Sans',sans-serif;font-size:20px;font-weight:800;color:#fff;margin:14px 0 8px}
.step-card p{color:#94a3b8;font-size:14px;line-height:1.65;margin:0}

.faq-item{background:#14263b;border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:24px;margin-bottom:16px}
.faq-item h3{font-family:'Plus Jakarta Sans',sans-serif;font-size:18px;font-weight:800;color:#fff;margin:0 0 8px}
.faq-item p{color:#94a3b8;font-size:15px;line-height:1.7;margin:0}

.checklist-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin-top:24px}
.check-row{display:flex;align-items:center;gap:12px;font-size:15px;font-weight:700;color:#e2e8f0}
.check-row span{color:#38bdf8;font-size:18px}

/* COVINA WATER HEATER FOOTER STYLES */
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
@media(max-width:960px){.nav-links{display:none}.hero-grid{grid-template-columns:1fr}.grid-3,.dir-grid{grid-template-columns:repeat(2,1fr)}.footer-grid,.footer-cta-flex{grid-template-columns:1fr;flex-direction:column;align-items:start}}
@media(max-width:640px){.hero{padding:60px 0}.hero h1{font-size:38px}.grid-3,.dir-grid,.checklist-grid,.footer-grid{grid-template-columns:1fr}.stats-grid{grid-template-columns:repeat(2,1fr)}.sticky-bar{left:16px;right:16px;bottom:16px}.btn-cta{width:100%}}
`;

function header(): string {
  return `<div class="top-bar">
    <div class="wrap">
      <div class="top-left">
        <span class="pulse-dot"></span> <b>24/7 Emergency Service</b>
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
          <a href="https://${DOMAIN}/services/">Services ▾</a>
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
        <a href="https://${DOMAIN}/contact-us/" class="nav-pill">Contact</a>
      </nav>
      <a class="btn-cta" href="${PHONE_HREF}">📞 ${PHONE_DISPLAY}</a>
    </div>
  </header>`;
}

function footer(): string {
  return `<section class="footer-cta-banner">
    <div class="wrap footer-cta-flex">
      <div>
        <h2>No Hot Water or Mold Damage? Let's Fix That Today.</h2>
        <p>Same-day restoration service across Pennsylvania &amp; USA. Friendly, licensed &amp; upfront.</p>
      </div>
      <div class="footer-cta-btns">
        <a class="btn-dark-navy" href="${PHONE_HREF}">📞 Call ${PHONE_DISPLAY}</a>
        <a class="btn-glass-cyan" href="https://${DOMAIN}/contact-us/">Book Online</a>
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
            Pennsylvania's water &amp; mold restoration specialists. Licensed, insured and family-owned since 2010.
          </p>
          <p style="font-size:13px;color:#fbbf24;margin:0 0 6px;">★★★★★ 4.9/5 · 187+ reviews</p>
          <p style="font-size:12px;color:#64748b;margin:0;">Master Certified · Fully Insured Network</p>
        </div>
        <div>
          <h3>Services</h3>
          <a href="https://${DOMAIN}/services/emergency-mold-remediation/">Water Heater Repair</a>
          <a href="https://${DOMAIN}/services/black-mold-removal/">Tankless Installation</a>
          <a href="https://${DOMAIN}/services/emergency-water-damage-restoration/">Water Heater Installation</a>
          <a href="https://${DOMAIN}/services/fire-damage-restoration-cleanup/">Maintenance &amp; Flushing</a>
          <a href="https://${DOMAIN}/services/dehumidifier-equipment-rental/">Replacement</a>
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
          <p style="font-size:14px;color:#94a3b8;margin:10px 0 6px;">✉️ service@${DOMAIN}</p>
          <p style="font-size:14px;color:#94a3b8;margin:0 0 6px;">📍 236 Long Park Dr, Rochester, NY 14612</p>
          <p style="font-size:14px;color:#38bdf8;margin:0;font-weight:700;">🕒 Mon–Sat 7am–7pm · 24/7 Emergency</p>
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

function trustChecklistHtml(): string {
  return `<div class="checklist-grid"><div class="check-row"><span>✔</span> 24/7 Emergency Rapid Dispatch</div><div class="check-row"><span>✔</span> Upfront Inspection &amp; Quote</div><div class="check-row"><span>✔</span> Licensed &amp; Insured Technicians</div><div class="check-row"><span>✔</span> All 50 US States Coverage</div><div class="check-row"><span>✔</span> Thermal Moisture Leak Detection</div><div class="check-row"><span>✔</span> 100% Satisfaction Guaranteed</div></div>`;
}

function leadFormHtml(locationName = "Your Area"): string {
  return `<div class="card-form"><h2>Request Emergency Inspection</h2><p>Get instant price estimate for water, fire &amp; mold restoration in ${esc(locationName)}</p><form action="${PHONE_HREF}" method="GET"><div class="field-group"><input type="text" placeholder="Your Full Name *" required></div><div class="field-group"><input type="tel" placeholder="Phone Number *" required></div><div class="field-group"><select required><option value="">Select Service Needed *</option><option>Black Mold Removal &amp; Inspection</option><option>Water Damage &amp; Basement Drying</option><option>Fire &amp; Smoke Damage Cleanup</option><option>Attic &amp; Crawl Space Remediation</option><option>Commercial Decontamination</option></select></div><div class="field-group"><textarea rows="2" placeholder="Describe damage or affected rooms..."></textarea></div><button type="submit" class="btn-cta" style="width:100%">Submit &amp; Call ${PHONE_DISPLAY}</button></form></div>`;
}

function mapEmbedHtml(query: string, height = 380): string {
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=12&ie=UTF8&iwloc=&output=embed`;
  return `<div class="map-container"><iframe width="100%" height="${height}" style="border:0;border-radius:20px;filter:contrast(1.05) brightness(0.95);" loading="lazy" allowfullscreen src="${mapUrl}"></iframe></div>`;
}

function serviceCards(host: string): string {
  return services
    .map((s, idx) => {
      const url = `https://${host}/${s.slug}/`;
      const num = String(idx + 1).padStart(2, "0");
      return `<a class="card-item" href="${url}"><div class="card-num">${num}</div><h3>${esc(s.name)}</h3><p>${esc(s.description)}</p><span class="card-link">Review service details →</span></a>`;
    })
    .join("");
}

export function contactUsPage() {
  const canonical = `https://${DOMAIN}/contact-us/`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact Us | ${BRAND}`,
    url: canonical,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "236 Long Park Dr",
      addressLocality: "Rochester",
      addressRegion: "NY",
      postalCode: "14612",
      addressCountry: "US"
    }
  };

  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><div class="crumb-trail"><a href="https://${DOMAIN}/">Home</a> / Contact Us</div><span class="eyebrow-badge">24/7 Emergency Response</span><h1>Contact Our <span>Restoration Experts</span></h1><p class="hero-desc">Have a water leak, toxic black mold outbreak, or fire damage emergency? Contact our 24/7 national dispatch center for immediate inspection and rapid response.</p><div class="rating-pill"><span class="stars">★★★★★</span><span>24/7 Live Dispatch Operators Standing By</span></div>${trustChecklistHtml()}<div style="margin-top:32px;"><a class="btn-cta" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></div></div><div>${leadFormHtml("Contact Center")}</div></div></section><section class="section section-dark"><div class="wrap"><div class="sec-head"><span class="sec-tag">Direct Lines</span><h2>Get In Touch With Our Dispatch Center</h2></div><div class="grid-3"><div class="contact-info-card"><div>📞</div><h3>24/7 Emergency Hotline</h3><p>Call our live dispatch operators anytime for immediate water extraction or mold inspection dispatch.</p><a class="btn-cta" href="${PHONE_HREF}" style="margin-top:18px;width:100%;">Call ${PHONE_DISPLAY}</a></div><div class="contact-info-card"><div>📍</div><h3>National Service Headquarters</h3><p>236 Long Park Dr<br>Rochester, NY 14612<br>United States</p></div><div class="contact-info-card"><div>🕒</div><h3>Operating Dispatch Hours</h3><p>Monday – Sunday: 24 Hours Open<br>365 Days Emergency Dispatch<br>Rapid Arrival Guarantee</p></div></div><div class="sec-head" style="margin-top:54px;margin-bottom:16px;"><span class="sec-tag">Dispatch Map</span><h2>Our Headquarters &amp; Service Radius</h2></div>${mapEmbedHtml("236 Long Park Dr, Rochester, NY 14612", 420)}</div></section></main>`;
  return shell(`Contact Us | 24/7 Emergency Dispatch | ${BRAND}`, "Contact Mold Inspection Pennsylvania & USA Network for 24/7 water, fire & mold restoration dispatch.", canonical, body, schema);
}

export function aboutUsPage() {
  const canonical = `https://${DOMAIN}/about-us/`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About Us | ${BRAND}`,
    url: canonical,
    description: "Learn about Mold Inspection Pennsylvania & USA Network — 22-year established authority providing 24/7 water, fire & mold restoration across all 50 US states."
  };

  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><div class="crumb-trail"><a href="https://${DOMAIN}/">Home</a> / About Us</div><span class="eyebrow-badge">22-Year Established Trust (Est. 2004)</span><h1>About Mold Inspection Pennsylvania &amp; <span>USA Network</span></h1><p class="hero-desc">Founded with a commitment to indoor environmental safety and rapid structural drying, Mold Inspection Pennsylvania has grown into America's premier 24/7 emergency restoration network operating across all 50 US states &amp; 30,900+ cities.</p><div class="rating-pill"><span class="stars">★★★★★</span><span>Trusted by 18,000+ Property Owners Nationwide</span></div>${trustChecklistHtml()}<div style="margin-top:32px;"><a class="btn-cta" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></div></div><div>${leadFormHtml("About Us")}</div></div></section><section class="stats-bar"><div class="wrap stats-grid"><div class="stat-box"><div class="stat-num">22+</div><div class="stat-lbl">Years Experience</div></div><div class="stat-box"><div class="stat-num">50</div><div class="stat-lbl">US States Served</div></div><div class="stat-box"><div class="stat-num">70</div><div class="stat-lbl">Restoration Topics</div></div><div class="stat-box"><div class="stat-num">24/7</div><div class="stat-lbl">Live Dispatch</div></div></div></section><section class="section section-dark"><div class="wrap"><div class="sec-head"><span class="sec-tag">Why Property Owners Trust Us</span><h2>Our Core Quality Standards</h2></div><div class="grid-3"><div class="card-item"><div class="card-num">01</div><h3>IICRC Certified Technicians</h3><p>Every restoration specialist holds master certifications in water damage extraction (WRT), mold remediation (AMRT), and fire loss cleanup.</p></div><div class="card-item"><div class="card-num">02</div><h3>FLIR Thermal Moisture Imaging</h3><p>We deploy high-resolution infrared thermal cameras to map hidden moisture pockets inside drywall and subfloors before mold spreads.</p></div><div class="card-item"><div class="card-num">03</div><h3>24/7 Nationwide Rapid Response</h3><p>Emergency crews available 24 hours a day, 7 days a week, 365 days a year with upfront transparent pricing.</p></div></div></div></section></main>`;
  return shell(`About Us | ${BRAND}`, "Learn about Mold Inspection Pennsylvania & USA Network — 22-year established authority providing 24/7 water, fire & mold restoration.", canonical, body, schema);
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

  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><div class="crumb-trail"><a href="https://${DOMAIN}/areas-we-serve/">Areas We Serve</a> / <a href="https://${state.slug}.${DOMAIN}/">${esc(state.name)}</a> / ${esc(cityName)}</div><span class="eyebrow-badge">Emergency Restoration Dispatch</span><h1>24/7 Mold &amp; Water Restoration in <span>${esc(cityName)}, ${esc(state.name)}</span></h1><p class="hero-desc">Our certified restoration technicians operate 24/7 in ${esc(cityName)}. Explore our complete 70-service directory for ${esc(cityName)}, review thermal moisture leak assessments, and request immediate inspection.</p><div class="rating-pill"><span class="stars">★★★★★</span><span>4.9/5 Rating · 184+ Local Reviews in ${esc(cityName)}</span></div>${trustChecklistHtml()}<div style="display:flex;gap:14px;margin-top:32px;"><a class="btn-cta" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a><a class="btn-cta btn-secondary" href="#services">Browse All 70 Services</a></div></div><div>${leadFormHtml(cityName)}</div></div></section><section class="section section-dark"><div class="wrap"><div class="sec-head"><span class="sec-tag">Local Coverage Map</span><h2>Emergency Restoration Radius in ${esc(cityName)}, ${esc(state.name)}</h2><p class="sec-desc">Our 24/7 mobile emergency crews cover all neighborhoods, commercial districts, and residential areas in ${esc(cityName)}.</p></div>${mapEmbedHtml(`${cityName}, ${state.name}`, 380)}</div></section><section class="section" id="services"><div class="wrap"><div class="sec-head"><span class="sec-tag">City Services</span><h2>Restoration Topics in ${esc(cityName)}</h2></div><div class="grid-3">${serviceCards(host)}</div></div></section></main>`;
  return shell(`Water &amp; Mold Restoration in ${cityName}, ${state.name} | ${BRAND}`, `Browse 70 mold removal, water damage extraction, and fire restoration topics for ${cityName}, ${state.name}.`, canonical, body, schema);
}

export function statePage(state: StateItem) {
  const stateSlug = state.slug || state.code.toLowerCase();
  const canonical = `https://${stateSlug}.${DOMAIN}/`;
  const cities = state.cities || [];

  const cityDirectoryHtml = cities
    .map(([slug, name]) => `<a class="dir-card" href="https://${slug}-${stateSlug}.${DOMAIN}/"><span>${esc(name)}</span></a>`)
    .join("");

  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><div class="crumb-trail"><a href="https://${DOMAIN}/areas-we-serve/">Areas We Serve</a> / ${esc(state.name)}</div><span class="eyebrow-badge">${esc(state.name)} State Network</span><h1>24/7 Mold &amp; Water Restoration in <span>${esc(state.name)}</span></h1><p class="hero-desc">Comprehensive emergency water damage extraction, black mold remediation, and fire damage cleanup serving all cities across ${esc(state.name)}.</p><div class="rating-pill"><span class="stars">★★★★★</span><span>4.9/5 ⭐ Rating across ${esc(state.name)}</span></div>${trustChecklistHtml()}<div style="margin-top:32px;"><a class="btn-cta" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></div></div><div>${leadFormHtml(state.name)}</div></div></section><section class="section section-dark"><div class="wrap"><div class="sec-head"><span class="sec-tag">Cities Served</span><h2>Select Your City in ${esc(state.name)}</h2></div><div class="dir-grid">${cityDirectoryHtml}</div><div class="sec-head" style="margin-top:54px;margin-bottom:16px;"><span class="sec-tag">State Coverage Map</span><h2>${esc(state.name)} Regional Service Radius</h2></div>${mapEmbedHtml(`${state.name}, USA`, 380)}</div></section><section class="section"><div class="wrap"><div class="sec-head"><span class="sec-tag">State Services</span><h2>70 Restoration Services in ${esc(state.name)}</h2></div><div class="grid-3">${serviceCards(`${stateSlug}.${DOMAIN}`)}</div></div></section></main>`;
  return shell(`Mold &amp; Water Restoration in ${state.name} | ${BRAND}`, `24/7 emergency mold inspection, water damage extraction, and fire restoration across ${state.name}.`, canonical, body);
}

export function nationalServicePage(service: (typeof services)[number]) {
  const canonical = `https://${DOMAIN}/services/${service.slug}/`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "LocalBusiness",
      name: BRAND,
      telephone: SITE.phone,
      url: `https://${DOMAIN}/`
    }
  };

  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><div class="crumb-trail"><a href="https://${DOMAIN}/">Home</a> / <a href="https://${DOMAIN}/services/">Services</a> / ${esc(service.name)}</div><span class="eyebrow-badge">${esc(service.category)} Restoration</span><h1>24/7 <span>${esc(service.name)}</span></h1><p class="hero-desc">${esc(service.description)} Certified inspectors, thermal moisture detection, and HEPA air scrubbing deployed 24/7 across all 50 US states.</p><div class="rating-pill"><span class="stars">★★★★★</span><span>4.9/5 ⭐ Rating · Master Certified Restoration Crew</span></div>${trustChecklistHtml()}<div style="margin-top:32px;"><a class="btn-cta" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></div></div><div>${leadFormHtml(service.name)}</div></div></section><section class="section section-dark"><div class="wrap"><div class="sec-head"><span class="sec-tag">How It Works</span><h2>Our 4-Step ${esc(service.name)} Process</h2></div><div class="grid-3" style="grid-template-columns:repeat(4,1fr);"><div class="step-card"><span>01</span><h3>Thermal Inspection</h3><p>Infrared camera leak scanning mapping hidden moisture migration in walls.</p></div><div class="step-card"><span>02</span><h3>Containment &amp; Scrubbing</h3><p>Negative air pressure containment chambers and HEPA air filtration.</p></div><div class="step-card"><span>03</span><h3>Decontamination</h3><p>Antimicrobial sanitization and structural dehumidification drying.</p></div><div class="step-card"><span>04</span><h3>Clearance &amp; Warranty</h3><p>Final lab air testing verification guaranteeing zero remaining mold spores.</p></div></div></div></section><section class="section"><div class="wrap"><div class="sec-head"><span class="sec-tag">Frequently Asked Questions</span><h2>Common Questions About ${esc(service.name)}</h2></div><div style="max-width:860px;"><div class="faq-item"><h3>How fast can your team be dispatched for ${esc(service.name)}?</h3><p>Our emergency restoration technicians are available 24/7/365 with rapid response dispatch options in all 50 US states.</p></div><div class="faq-item"><h3>Is thermal moisture inspection included?</h3><p>Yes, all emergency inspections utilize FLIR thermal imaging cameras to discover hidden moisture pockets inside drywall and subfloors.</p></div><div class="faq-item"><h3>Will insurance cover ${esc(service.name)}?</h3><p>We work directly with all major insurance carriers and provide line-item Xactimate estimate scoping to simplify your claim process.</p></div></div></div></section></main>`;
  return shell(`${service.name} | 24/7 Emergency Service | ${BRAND}`, `${service.description} Fast 24/7 dispatch nationwide across all 50 US states.`, canonical, body, schema);
}

export function localServicePage(state: StateItem, city: [string, string], service: (typeof services)[number], host: string) {
  const [, cityName] = city;
  const canonical = `https://${host}/${service.slug}/`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.name} in ${cityName}, ${state.name}`,
    description: service.description,
    provider: {
      "@type": "LocalBusiness",
      name: `${BRAND} - ${cityName}`,
      telephone: SITE.phone,
      url: canonical
    }
  };

  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><div class="crumb-trail"><a href="https://${state.slug}.${DOMAIN}/">${esc(state.name)}</a> / <a href="https://${host}/">${esc(cityName)}</a> / ${esc(service.name)}</div><span class="eyebrow-badge">${esc(service.category)} Restoration</span><h1>${esc(service.name)} in <span>${esc(cityName)}, ${esc(state.name)}</span></h1><p class="hero-desc">${esc(service.description)} Local 24/7 emergency dispatch crews stationed directly in ${esc(cityName)}.</p><div class="rating-pill"><span class="stars">★★★★★</span><span>4.9/5 ⭐ Rating for ${esc(service.name)} in ${esc(cityName)}</span></div>${trustChecklistHtml()}<div style="margin-top:32px;"><a class="btn-cta" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></div></div><div>${leadFormHtml(`${service.name} ${cityName}`)}</div></div></section><section class="section section-dark"><div class="wrap"><div class="sec-head"><span class="sec-tag">Restoration Protocol</span><h2>4-Step Process for ${esc(service.name)} in ${esc(cityName)}</h2></div><div class="grid-3" style="grid-template-columns:repeat(4,1fr);"><div class="step-card"><span>01</span><h3>Local Inspection</h3><p>Fast arrival in ${esc(cityName)} with thermal moisture scanners.</p></div><div class="step-card"><span>02</span><h3>Isolation</h3><p>HEPA air containment preventing spore migration throughout the property.</p></div><div class="step-card"><span>03</span><h3>Sanitization</h3><p>Hospital-grade botanical disinfectant application and dehumidification.</p></div><div class="step-card"><span>04</span><h3>Clearance</h3><p>Post-remediation air clearance verifying total spore removal.</p></div></div></div></section></main>`;
  return shell(`${service.name} in ${cityName}, ${state.name} | ${BRAND}`, `${service.description} Review local restoration info for ${cityName}, ${state.name}.`, canonical, body, schema);
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

  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><div class="crumb-trail"><a href="https://${DOMAIN}/">Home</a> / All Services</div><span class="eyebrow-badge">70 Specialized Topics</span><h1>24/7 Water, Fire &amp; Mold <span>Restoration Services</span></h1><p class="hero-desc">Explore our complete catalog of 70 specialized emergency restoration, toxic black mold containment, thermal leak detection, and structural fire loss solutions.</p><div class="rating-pill"><span class="stars">★★★★★</span><span>4.9/5 Rating Across All 70 Services</span></div>${trustChecklistHtml()}<div style="margin-top:32px;"><a class="btn-cta" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></div></div><div>${leadFormHtml("Services Directory")}</div></div></section><section class="section section-dark" id="all-services"><div class="wrap"><div class="sec-head"><span class="sec-tag">Complete Service Catalog</span><h2>All 70 Water, Fire &amp; Mold Restoration Topics</h2><p class="sec-desc">Click any service to view full technical protocols, equipment specifications, and local dispatch options.</p></div><div class="grid-3">${serviceCards(DOMAIN)}</div></div></section></main>`;
  return shell(`Restoration Services Directory | All 70 Topics | ${BRAND}`, "Browse all 70 water damage extraction, toxic black mold remediation, and fire restoration services offered nationwide.", canonical, body, schema);
}

export function areasWeServePage(states: StateItem[]) {
  const canonical = `https://${DOMAIN}/areas-we-serve/`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://${DOMAIN}/` },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: canonical }
    ]
  };

  const featuredStates = states.slice(0, 6);
  const featuredCardsHtml = featuredStates
    .map((s) => `<a class="featured-area-card" href="https://${s.slug}.${DOMAIN}/"><div style="color:#38bdf8;font-size:24px;">📍</div><h4>${esc(s.name)}</h4><p style="font-size:13px;color:#94a3b8;margin:4px 0 12px;">${(s.cities || []).length} Major Cities Covered</p><span>Explore state directory →</span></a>`)
    .join("");

  const allDirectoryHtml = states
    .map((s) => `<a class="dir-card" href="https://${s.slug}.${DOMAIN}/"><span>${esc(s.name)}</span></a>`)
    .join("");

  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><div class="crumb-trail"><a href="https://${DOMAIN}/">Home</a> / Service Areas</div><span class="eyebrow-badge">50 States &amp; 30,900+ Cities</span><h1>Water, Fire &amp; Mold Restoration Across <span>USA &amp; Pennsylvania</span></h1><p class="hero-desc">From major metropolitan centers to local suburban communities, our certified 24/7 emergency restoration crews cover every state and city in America.</p><div class="rating-pill"><span class="stars">★★★★★</span><span>4.9/5 Rating across 50 States</span></div>${trustChecklistHtml()}<div style="margin-top:32px;"><a class="btn-cta" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></div></div><div>${leadFormHtml("Service Areas")}</div></div></section><section class="section section-dark"><div class="wrap"><div class="sec-head"><span class="sec-tag">Top Covered Markets</span><h2>Featured Service Areas</h2><p class="sec-desc">Explore state-level subdomains with localized city directories and emergency response crews.</p></div><div class="grid-3">${featuredCardsHtml}</div></div></section><section class="section"><div class="wrap"><div class="sec-head"><span class="sec-tag">All 50 States</span><h2>Full USA State Directory</h2></div><div class="dir-grid">${allDirectoryHtml}</div></div></section></main>`;
  return shell(`Service Areas | 50-State Restoration Directory | ${BRAND}`, "Explore 24/7 water damage, black mold remediation, and fire restoration service areas across all 50 US states.", canonical, body, schema);
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
    .map((s) => `<a class="dir-card" href="https://${s.slug}.${DOMAIN}/"><span>${esc(s.name)}</span></a>`)
    .join("");

  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><span class="eyebrow-badge">Pennsylvania &amp; USA 24/7 Network</span><h1>24/7 Mold, Water &amp; Fire <span>Restoration</span></h1><p class="hero-desc">Pennsylvania's premier mold &amp; water restoration authority — operating 24/7 nationwide across all 50 US states &amp; 30,900+ cities. Licensed inspectors and thermal moisture extraction.</p><div class="rating-pill"><span class="stars">★★★★★</span><span>Rated 4.9/5 by 18,000+ Homeowners Nationwide</span></div>${trustChecklistHtml()}<div style="display:flex;gap:14px;margin-top:32px;"><a class="btn-cta" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a><a class="btn-cta btn-secondary" href="#services">View 70 Services</a></div></div><div>${leadFormHtml()}</div></div></section><section class="stats-bar"><div class="wrap stats-grid"><div class="stat-box"><div class="stat-num">50</div><div class="stat-lbl">US States</div></div><div class="stat-box"><div class="stat-num">70</div><div class="stat-lbl">Restoration Topics</div></div><div class="stat-box"><div class="stat-num">2004</div><div class="stat-lbl">22-Year Trust</div></div><div class="stat-box"><div class="stat-num">24/7</div><div class="stat-lbl">Emergency Dispatch</div></div></div></section><section class="section section-dark" id="states"><div class="wrap"><div class="sec-head"><span class="sec-tag">Areas We Serve</span><h2>Restoration Directory by State</h2><p class="sec-desc">Select your state to explore local city subdomains and emergency restoration coverage.</p></div><div class="dir-grid">${directoryHtml}</div></div></section><section class="section" id="services"><div class="wrap"><div class="sec-head"><span class="sec-tag">Restoration Services</span><h2>All 70 Water, Fire &amp; Mold Topics</h2><p class="sec-desc">Explore specialized black mold removal, basement water extraction, sewage cleanup, and fire restoration services.</p></div><div class="grid-3">${serviceCards(DOMAIN)}</div></div></section></main>`;
  return shell(`${BRAND} | 24/7 Water, Fire & Mold Restoration`, `Pennsylvania &amp; USA nationwide 24/7 emergency water damage restoration, mold remediation, air testing, and fire damage cleanup across all 50 US states.`, canonical, body, schema);
}

export function linkSheetPage() {
  const canonical = `https://${DOMAIN}/link-sheet/`;
  const body = `<main><section class="hero" style="padding:60px 0;"><div class="wrap" style="text-align:center;max-width:800px;"><span class="eyebrow-badge">Xagio Network Hub</span><h1 style="font-size:36px;margin:16px 0;">pSEO Network Authority &amp; LinkSheet</h1><p style="color:#94a3b8;font-size:16px;">Central interlinking directory for nationwide home services, mold remediation, tree care, garage door repairs, and plumbing.</p></div></section><section class="section section-dark"><div class="wrap"><div class="grid-3"><div class="card-item"><span style="font-size:28px;">🍄</span><h3>Mold Inspection Pennsylvania</h3><p>24/7 Water, Fire &amp; Mold Restoration Network</p><a class="card-link" href="https://moldinspectionpennsylvania.com/services/emergency-mold-remediation/">Emergency Mold Remediation →</a></div><div class="card-item"><span style="font-size:28px;">🌲</span><h3>Can Tree Service</h3><p>24/7 Emergency Tree Removal</p><a class="card-link" href="https://cantreeservice.com/services/tree-removal/">Tree Removal Services →</a></div></div></div></section></main>`;
  return shell("Xagio pSEO LinkSheet Authority Hub", "Official interlinking LinkSheet directory.", canonical, body);
}

export function articlesHubPage() {
  const canonical = `https://${DOMAIN}/articles/`;
  const body = `<main><section class="hero"><div class="wrap"><span class="eyebrow-badge">Guides &amp; Articles</span><h1>Restoration Safety &amp; Inspection Guides</h1></div></section></main>`;
  return shell(`Restoration Guides | ${BRAND}`, "Restoration safety & inspection guides.", canonical, body);
}

export function articlePage(article: any) {
  const canonical = `https://${DOMAIN}/articles/${article.slug}/`;
  const body = `<main><section class="hero"><div class="wrap"><h1>${esc(article.title)}</h1></div></section></main>`;
  return shell(`${article.title} | ${BRAND}`, article.excerpt, canonical, body);
}

export function notFoundPage(message: string) {
  return `<!doctype html><html><head><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width,initial-scale=1"><title>404 | ${BRAND}</title><style>${CSS}</style></head><body>${header()}<main class="section"><div class="wrap"><h1>404</h1><p>${esc(message)}</p><a class="btn-cta" href="https://${DOMAIN}/">Back to Home</a></div></main>${footer()}</body></html>`;
}
