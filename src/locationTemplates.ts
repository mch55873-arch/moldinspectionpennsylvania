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
.btn-cyan{background:linear-gradient(135deg,#0ea5e9,#0284c7);box-shadow:0 8px 24px rgba(14,165,233,.35)}
.btn-cyan:hover{background:linear-gradient(135deg,#38bdf8,#0ea5e9)}
.btn-dark-navy{background:#0d1b2a;color:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;padding:14px 28px;border-radius:14px;display:inline-flex;align-items:center;gap:8px;font-size:16px;transition:.2s;box-shadow:0 8px 20px rgba(0,0,0,.2)}
.btn-dark-navy:hover{transform:translateY(-2px);background:#14263b}
.btn-glass-cyan{background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.4);color:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;padding:14px 28px;border-radius:14px;display:inline-flex;align-items:center;gap:8px;font-size:16px;transition:.2s;backdrop-filter:blur(8px)}
.btn-glass-cyan:hover{background:rgba(255,255,255,.3);transform:translateY(-2px)}

/* HERO & LAYOUT */
.service-page-hero{position:relative;padding:76px 0 88px;background:linear-gradient(rgba(13,27,42,.88),rgba(13,27,42,.95)),url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1920&q=80') center/cover no-repeat;overflow:hidden}
.service-page-hero h1{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(38px,5vw,56px);font-weight:900;line-height:1.1;margin:16px 0 14px;color:#fff;max-width:820px;letter-spacing:-.03em}
.service-page-hero h1 span{color:#38bdf8}
.crumb-trail{font-size:14px;color:#38bdf8;font-weight:700;margin-bottom:14px}
.crumb-trail a{color:#94a3b8;transition:.2s}.crumb-trail a:hover{color:#fff}
.tag-badge{display:inline-block;padding:6px 14px;border-radius:999px;background:#e0f2fe;color:#0284c7;font-size:12px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;margin-bottom:12px}

.sec-white{background:#fff;color:#0f172a;padding:84px 0}
.sec-dark{background:#0d1b2a;color:#fff;padding:84px 0}
.sec-slate{background:#14263b;color:#fff;padding:84px 0}
.sec-gray{background:#f8fafc;color:#0f172a;padding:84px 0}
.sec-title{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(30px,4vw,44px);font-weight:900;line-height:1.15;margin:0 0 14px;letter-spacing:-.03em}

.service-main-grid{display:grid;grid-template-columns:1fr 340px;gap:44px;align-items:start}
.service-content-box{background:#fff;color:#0f172a;padding:40px;border-radius:20px;box-shadow:0 10px 40px rgba(0,0,0,.04)}
.service-content-box h2{font-family:'Plus Jakarta Sans',sans-serif;font-size:28px;font-weight:900;color:#0d1b2a;margin:0 0 16px;letter-spacing:-.02em}
.service-content-box p{color:#475569;font-size:15px;line-height:1.75;margin:0 0 16px}

/* WARNING SIGNS GRID */
.warning-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:24px 0 32px}
.warning-item{background:#fff7ed;border:1px solid #ffedd5;border-radius:12px;padding:16px;font-size:14px;font-weight:700;color:#9a3412;display:flex;align-items:center;gap:10px}

.checklist-2col{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:24px 0;font-size:14px;font-weight:700;color:#1e293b}
.check-item-line{display:flex;align-items:center;gap:8px}
.check-item-line span{color:#0ea5e9;font-weight:900}

/* SIDEBAR CARDS */
.sidebar-cta-card{background:#14263b;border:1px solid rgba(255,255,255,.14);border-radius:18px;padding:24px;color:#fff;margin-bottom:20px}
.sidebar-cta-card h3{font-family:'Plus Jakarta Sans',sans-serif;font-size:20px;font-weight:900;margin:0 0 6px}
.sidebar-cta-card p{color:#94a3b8;font-size:13px;line-height:1.6;margin:0 0 18px}

.green-trust-card{background:#ecfdf5;border:1px solid #a7f3d0;border-radius:18px;padding:20px;color:#065f46;margin-bottom:20px}
.green-trust-card h4{font-family:'Plus Jakarta Sans',sans-serif;font-size:16px;font-weight:800;margin:0 0 6px;color:#047857}
.green-trust-card p{font-size:13px;line-height:1.55;margin:0}

.sidebar-related-box{background:#f8fafc;border:1px solid #e2e8f0;border-radius:18px;padding:22px;color:#0f172a}
.sidebar-related-box h4{font-family:'Plus Jakarta Sans',sans-serif;font-size:17px;font-weight:800;color:#0d1b2a;margin:0 0 12px}
.related-link{display:block;color:#0ea5e9;font-weight:700;font-size:14px;margin:8px 0;transition:.2s}
.related-link:hover{color:#0284c7;transform:translateX(3px)}

/* 4-STEP PROCESS CARDS */
.grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.process-step-card{background:#fff;border:1px solid #e2e8f0;border-radius:18px;padding:26px;box-shadow:0 10px 30px rgba(0,0,0,.03)}
.process-step-card span{display:inline-block;width:38px;height:38px;border-radius:12px;background:#e0f2fe;color:#0284c7;font-weight:900;text-align:center;line-height:38px;font-size:16px;margin-bottom:14px}
.process-step-card h3{font-family:'Plus Jakarta Sans',sans-serif;font-size:18px;font-weight:800;color:#0d1b2a;margin:0 0 8px}
.process-step-card p{color:#64748b;font-size:13px;line-height:1.6;margin:0}

.faq-box-centered{background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:22px;margin-bottom:14px;max-width:860px;margin-left:auto;margin-right:auto}
.faq-box-centered h4{font-family:'Plus Jakarta Sans',sans-serif;font-size:17px;font-weight:800;color:#0d1b2a;margin:0 0 8px}
.faq-box-centered p{color:#64748b;font-size:14px;line-height:1.65;margin:0}

.location-pills{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:12px;margin-top:20px}
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
@media(max-width:960px){.nav-links{display:none}.service-main-grid,.grid-4{grid-template-columns:1fr}.footer-grid,.footer-cta-flex{grid-template-columns:1fr;flex-direction:column;align-items:start}}
@media(max-width:640px){.warning-grid,.checklist-2col{grid-template-columns:1fr}.sticky-bar{left:16px;right:16px;bottom:16px}.btn-cta{width:100%}}
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
        <h2>Get Your Property Restored Today</h2>
        <p>Same-day emergency restoration across Pennsylvania &amp; USA. Upfront pricing, guaranteed work.</p>
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
  </div
  <div class="sticky-bar"><a class="btn-cta" href="${PHONE_HREF}">⚡ Call ${PHONE_DISPLAY}</a></div>`;
}

function shell(title: string, description: string, canonical: string, body: string, schema?: object): string {
  const jsonLd = schema ? `<script type="application/ld+json">${JSON.stringify(schema)}</script>` : "";
  return `<!doctype html><html lang="en-US"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${canonical}"><meta name="robots" content="index,follow"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${canonical}"><style>${CSS}</style>${jsonLd}</head><body>${header()}${body}${footer()}</body></html>`;
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
      url: canonical
    }
  };

  const body = `<main>
  <!-- HERO SECTION -->
  <section class="service-page-hero">
    <div class="wrap">
      <div class="crumb-trail"><a href="https://${DOMAIN}/">Home</a> / <a href="https://${DOMAIN}/services/">Services</a> / ${esc(service.name)}</div>
      <span class="tag-badge" style="background:rgba(14,165,233,.18);color:#38bdf8;">📍 Same-Day ${esc(service.category)} Available</span>
      <h1>${esc(service.name)} <span>Pennsylvania &amp; Nationwide</span></h1>
      <p style="font-size:17px;line-height:1.7;color:#cbd5e1;max-width:760px;margin-bottom:26px;">${esc(service.description)} Our licensed environmental specialists diagnose and remediate every type of water loss, toxic black mold, or fire damage — fast, honestly, and upfront.</p>
      <div style="display:flex;gap:14px;">
        <a class="btn-cta" href="${PHONE_HREF}">📞 Call ${PHONE_DISPLAY}</a>
        <a class="btn-glass-cyan" href="https://${DOMAIN}/contact-us/">Book Online</a>
      </div>
    </div>
  </section>

  <!-- 2-COLUMN MAIN CONTENT & SIDEBAR -->
  <section class="sec-white" style="padding:60px 0 80px;">
    <div class="wrap service-main-grid">
      <!-- LEFT COLUMN TECHNICAL CONTENT -->
      <div class="service-content-box">
        <h2>Pennsylvania's Trusted ${esc(service.name)} Specialists</h2>
        <p>When environmental issues strike your home or property, you don't want to wait days for a response. As a master-certified environmental remediation company serving <b>Pennsylvania and nationwide</b>, we deploy thermal infrared cameras and industrial-grade HEPA air scrubbers to isolate moisture migration and eliminate toxic spores before structural damage spreads.</p>
        <p>Every restoration project begins with a comprehensive moisture inspection and a flat-rate quote you approve before work begins. No surprises, no hidden fees, and zero unnecessary upsells.</p>

        <h3 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:22px;font-weight:900;color:#0d1b2a;margin:32px 0 10px;">Same-Day ${esc(service.name)} — Warning Signs You Need It</h3>
        <p style="color:#64748b;font-size:14px;margin:0 0 14px;">Is your property exhibiting these red flags? These are the most common warning signs our technicians treat:</p>
        
        <div class="warning-grid">
          <div class="warning-item">⚠️ Visible dark spots on drywall or ceiling</div>
          <div class="warning-item">⚠️ Unexplained damp, musty indoor odors</div>
          <div class="warning-item">⚠️ Water pooling near baseboards or floors</div>
          <div class="warning-item">⚠️ Peeling wallpaper or bubbled wall paint</div>
          <div class="warning-item">⚠️ Persistent allergic reactions indoors</div>
          <div class="warning-item">⚠️ Unusually high humidity or water bills</div>
        </div>

        <h3 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:22px;font-weight:900;color:#0d1b2a;margin:28px 0 12px;">${esc(service.name)} Solutions We Handle</h3>
        <div class="checklist-2col">
          <div class="check-item-line"><span>✔</span> Black mold testing &amp; lab sampling</div>
          <div class="check-item-line"><span>✔</span> HEPA negative-pressure containment</div>
          <div class="check-item-line"><span>✔</span> FLIR thermal moisture scanning</div>
          <div class="check-item-line"><span>✔</span> Emergency water damage extraction</div>
          <div class="check-item-line"><span>✔</span> Botanical antimicrobial sanitization</div>
          <div class="check-item-line"><span>✔</span> LGR desiccant dehumidification</div>
          <div class="check-item-line"><span>✔</span> Attic &amp; subfloor decontamination</div>
          <div class="check-item-line"><span>✔</span> Post-remediation lab air clearance</div>
        </div>
      </div>

      <!-- RIGHT SIDEBAR CARDS -->
      <div>
        <div class="sidebar-cta-card">
          <h3>Need ${esc(service.name)} Now?</h3>
          <p>Same-day appointments available. Call our local dispatch team.</p>
          <a class="btn-cta" href="${PHONE_HREF}" style="width:100%;margin-bottom:10px;">📞 Call ${PHONE_DISPLAY}</a>
          <a class="btn-glass-cyan" href="https://${DOMAIN}/contact-us/" style="width:100%;text-align:center;">Request a Quote</a>
        </div>

        <div class="green-trust-card">
          <h4>24/7 30-Min Arrival Guarantee</h4>
          <p>Emergency restoration technicians dispatched immediately to prevent structural loss.</p>
        </div>

        <div class="sidebar-related-box">
          <h4>Related Services</h4>
          <a class="related-link" href="https://${DOMAIN}/services/emergency-mold-remediation/">→ Emergency Mold Remediation</a>
          <a class="related-link" href="https://${DOMAIN}/services/emergency-water-damage-restoration/">→ Water Damage Extraction</a>
          <a class="related-link" href="https://${DOMAIN}/services/fire-damage-restoration-cleanup/">→ Fire Damage Restoration</a>
          <a class="related-link" href="https://${DOMAIN}/services/" style="color:#0d1b2a;font-weight:800;margin-top:12px;">→ All Restoration Services</a>
        </div>
      </div>
    </div>
  </section>

  <!-- 4-STEP PROCESS SECTION -->
  <section class="sec-gray" style="padding:70px 0;">
    <div class="wrap">
      <div style="text-align:center;margin-bottom:44px;">
        <h2 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:32px;font-weight:900;color:#0d1b2a;margin:0;">Our Simple Restoration Process</h2>
      </div>
      <div class="grid-4">
        <div class="process-step-card">
          <span>01</span>
          <h3>Call &amp; Schedule</h3>
          <p>24/7 live dispatch operators schedule your same-day rapid technician arrival.</p>
        </div>
        <div class="process-step-card">
          <span>02</span>
          <h3>Thermal Inspection</h3>
          <p>Infrared camera moisture scanning discovers hidden leaks inside subfloors and drywall.</p>
        </div>
        <div class="process-step-card">
          <span>03</span>
          <h3>Flat-Rate Quote</h3>
          <p>Upfront itemized scope you approve before work begins. No bill surprises.</p>
        </div>
        <div class="process-step-card">
          <span>04</span>
          <h3>Clearance Warranty</h3>
          <p>HEPA air scrubbing, sanitization, and lab clearance testing verification.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- SERVING LOCATIONS PILLS -->
  <section class="sec-white" style="padding:60px 0;">
    <div class="wrap" style="text-align:center;">
      <h3 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:24px;font-weight:900;color:#0d1b2a;margin:0 0 8px;">Serving Pennsylvania &amp; Nearby Communities</h3>
      <p style="color:#64748b;font-size:14px;margin:0 0 18px;">Every service above is available throughout Pennsylvania and surrounding state subdomains.</p>
      <div class="location-pills">
        <a class="loc-pill" href="https://pennsylvania.${DOMAIN}/">Pennsylvania</a>
        <a class="loc-pill" href="https://texas.${DOMAIN}/">Texas</a>
        <a class="loc-pill" href="https://florida.${DOMAIN}/">Florida</a>
        <a class="loc-pill" href="https://california.${DOMAIN}/">California</a>
        <a class="loc-pill" href="https://${DOMAIN}/areas-we-serve/" style="background:#0ea5e9;color:#fff;border-color:#0ea5e9;">All Service Areas →</a>
      </div>
    </div>
  </section>

  <!-- FAQS SECTION -->
  <section class="sec-dark" style="padding:70px 0;">
    <div class="wrap">
      <div style="text-align:center;margin-bottom:36px;">
        <h2 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:32px;font-weight:900;color:#fff;margin:0;">${esc(service.name)} FAQs</h2>
      </div>
      <div class="faq-box-centered">
        <h4>What is the most common cause of hidden water &amp; mold damage?</h4>
        <p>Hidden plumbing leaks behind drywall and excessive humidity in unventilated basements or attics account for over 80% of mold outbreaks.</p>
      </div>
      <div class="faq-box-centered">
        <h4>Will homeowner insurance cover ${esc(service.name)}?</h4>
        <p>Yes! Most sudden water losses and resultant mold claims are covered under standard homeowner policies. We assist directly with Xactimate claims.</p>
      </div>
      <div class="faq-box-centered">
        <h4>How many days does structural drying usually take?</h4>
        <p>Standard dehumidification and structural drying takes between 2 to 4 days depending on material saturation and humidity levels.</p>
      </div>
    </div>
  </section>
  </main>`;

  return shell(`${service.name} | 24/7 Emergency Service | ${BRAND}`, service.description, canonical, body, schema);
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

  const body = `<main>
  <section class="service-page-hero">
    <div class="wrap">
      <div class="crumb-trail"><a href="https://${state.slug}.${DOMAIN}/">${esc(state.name)}</a> / <a href="https://${host}/">${esc(cityName)}</a> / ${esc(service.name)}</div>
      <span class="tag-badge" style="background:rgba(14,165,233,.18);color:#38bdf8;">📍 Local ${esc(cityName)} Dispatch</span>
      <h1>${esc(service.name)} in <span>${esc(cityName)}, ${esc(state.name)}</span></h1>
      <p style="font-size:17px;line-height:1.7;color:#cbd5e1;max-width:760px;margin-bottom:26px;">${esc(service.description)} Local 24/7 emergency dispatch crews stationed directly in ${esc(cityName)} for rapid 30-minute arrival.</p>
      <div style="display:flex;gap:14px;">
        <a class="btn-cta" href="${PHONE_HREF}">📞 Call ${PHONE_DISPLAY}</a>
        <a class="btn-glass-cyan" href="https://${DOMAIN}/contact-us/">Book Online</a>
      </div>
    </div>
  </section>

  <section class="sec-white" style="padding:60px 0 80px;">
    <div class="wrap service-main-grid">
      <div class="service-content-box">
        <h2>Local ${esc(service.name)} Services in ${esc(cityName)}</h2>
        <p>Our certified restoration specialists operate 24/7 throughout <b>${esc(cityName)}</b>. Whether you are dealing with a burst pipe in your basement or toxic black mold inside drywall, our team arrives in 30 minutes with high-tech FLIR thermal moisture cameras and HEPA air scrubbers.</p>

        <h3 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:20px;font-weight:900;color:#0d1b2a;margin:24px 0 12px;">4-Step Restoration Protocol for ${esc(cityName)} Properties</h3>
        <div class="checklist-2col">
          <div class="check-item-line"><span>✔</span> Rapid 30-min arrival in ${esc(cityName)}</div>
          <div class="check-item-line"><span>✔</span> Infrared moisture leak detection</div>
          <div class="check-item-line"><span>✔</span> Negative-pressure HEPA isolation</div>
          <div class="check-item-line"><span>✔</span> Hospital-grade sanitization</div>
          <div class="check-item-line"><span>✔</span> LGR desiccant dehumidification</div>
          <div class="check-item-line"><span>✔</span> Direct insurance claim billing</div>
        </div>
      </div>

      <div>
        <div class="sidebar-cta-card">
          <h3>${esc(cityName)} Emergency Dispatch</h3>
          <p>Same-day appointments available in ${esc(cityName)}.</p>
          <a class="btn-cta" href="${PHONE_HREF}" style="width:100%;">📞 Call ${PHONE_DISPLAY}</a>
        </div>
        ${mapEmbedHtml(`${cityName}, ${state.name}`)}
      </div>
    </div>
  </section>
  </main>`;

  return shell(`${service.name} in ${cityName}, ${state.name} | ${BRAND}`, service.description, canonical, body, schema);
}

export function homePage(states: StateItem[]) {
  const canonical = `https://${DOMAIN}/`;
  const statePills = states.slice(0, 10).map(s => `<a class="dir-card" href="https://${s.slug}.${DOMAIN}/"><span>📍 ${esc(s.name)}</span></a>`).join("");

  const body = `<main>
  <section class="service-page-hero">
    <div class="wrap service-main-grid">
      <div>
        <div style="font-size:14px;color:#38bdf8;font-weight:800;margin-bottom:12px;">★ ★ ★ ★ ★ 4.9/5 Rated Restoration Authority</div>
        <h1 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(38px,5vw,58px);font-weight:900;color:#fff;">Emergency Water &amp; Mold Restoration <span style="color:#38bdf8;">Pennsylvania</span></h1>
        <p style="font-size:17px;line-height:1.7;color:#cbd5e1;margin-bottom:24px;">Rapid 30-minute arrival for water damage extraction, toxic black mold removal, and fire restoration across Pennsylvania &amp; nationwide.</p>
        <div style="display:flex;gap:14px;">
          <a class="btn-cta" href="${PHONE_HREF}">📞 Call ${PHONE_DISPLAY}</a>
          <a class="btn-cta btn-secondary" href="https://${DOMAIN}/contact-us/">Get Free Estimate</a>
        </div>
      </div>
      <div>
        <div style="background:#fff;border-radius:20px;padding:30px;box-shadow:0 24px 60px rgba(0,0,0,.5);color:#0f172a;">
          <h2 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:22px;font-weight:900;margin:0 0 6px;color:#0d1b2a;">Request Emergency Inspection</h2>
          <form action="${PHONE_HREF}" method="GET">
            <div style="margin-bottom:12px;"><input type="text" placeholder="Your Full Name *" required style="width:100%;padding:12px 16px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;"></div>
            <div style="margin-bottom:12px;"><input type="tel" placeholder="Phone Number *" required style="width:100%;padding:12px 16px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;"></div>
            <button type="submit" class="btn-cta" style="width:100%;">Get Estimate Now →</button>
          </form>
        </div>
      </div>
    </div>
  </section>
  <section class="sec-dark"><div class="wrap"><div class="dir-grid">${statePills}</div></div></section>
  </main>`;

  return shell(`${BRAND} | 24/7 Water, Fire & Mold Restoration`, `Pennsylvania &amp; USA nationwide 24/7 emergency water damage restoration, mold remediation, air testing, and fire damage cleanup across all 50 US states.`, canonical, body);
}

export function contactUsPage() {
  const canonical = `https://${DOMAIN}/contact-us/`;
  const body = `<main><section class="service-page-hero"><div class="wrap"><div class="crumb-trail"><a href="https://${DOMAIN}/">Home</a> / Contact Us</div><h1>Contact Our <span>Restoration Experts</span></h1><div style="margin-top:24px;"><a class="btn-cta" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></div></div></section><section class="sec-dark"><div class="wrap">${mapEmbedHtml("236 Long Park Dr, Rochester, NY 14612", 420)}</div></section></main>`;
  return shell(`Contact Us | ${BRAND}`, "Contact Mold Inspection Pennsylvania & USA Network for 24/7 water, fire & mold restoration dispatch.", canonical, body);
}

export function statePage(state: StateItem) {
  const stateSlug = state.slug || state.code.toLowerCase();
  const canonical = `https://${stateSlug}.${DOMAIN}/`;
  const cities = state.cities || [];
  const cityDirectoryHtml = cities.map(([slug, name]) => `<a class="dir-card" href="https://${slug}-${stateSlug}.${DOMAIN}/"><span>📍 ${esc(name)}</span></a>`).join("");

  const body = `<main><section class="service-page-hero"><div class="wrap"><h1>Water Damage &amp; Mold Restoration in <span>${esc(state.name)}</span></h1></div></section><section class="sec-dark"><div class="wrap"><div class="dir-grid">${cityDirectoryHtml}</div></div></section></main>`;
  return shell(`Mold &amp; Water Restoration in ${state.name} | ${BRAND}`, `Restoration across ${state.name}.`, canonical, body);
}

export function areasWeServePage(states: StateItem[]) {
  const canonical = `https://${DOMAIN}/areas-we-serve/`;
  const allDirectoryHtml = states.map((s) => `<a class="dir-card" href="https://${s.slug}.${DOMAIN}/"><span>📍 ${esc(s.name)}</span></a>`).join("");
  const body = `<main><section class="service-page-hero"><div class="wrap"><h1>Water, Fire &amp; Mold Restoration Across <span>USA</span></h1></div></section><section class="sec-dark"><div class="wrap"><div class="dir-grid">${allDirectoryHtml}</div></div></section></main>`;
  return shell(`Service Areas | ${BRAND}`, "Directory.", canonical, body);
}

export function linkSheetPage() {
  const canonical = `https://${DOMAIN}/link-sheet/`;
  const body = `<main><section class="service-page-hero"><div class="wrap"><h1>LinkSheet Hub</h1></div></section></main>`;
  return shell("Xagio LinkSheet", "LinkSheet.", canonical, body);
}

export function articlesHubPage() {
  const canonical = `https://${DOMAIN}/articles/`;
  const body = `<main><section class="service-page-hero"><div class="wrap"><h1>Restoration Guides</h1></div></section></main>`;
  return shell(`Restoration Guides | ${BRAND}`, "Guides.", canonical, body);
}

export function articlePage(article: any) {
  const canonical = `https://${DOMAIN}/articles/${article.slug}/`;
  const body = `<main><section class="service-page-hero"><div class="wrap"><h1>${esc(article.title)}</h1></div></section></main>`;
  return shell(`${article.title} | ${BRAND}`, article.excerpt, canonical, body);
}

export function notFoundPage(message: string) {
  return `<!doctype html><html><head><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width,initial-scale=1"><title>404 | ${BRAND}</title><style>${CSS}</style></head><body>${header()}<main class="sec-dark"><div class="wrap"><h1>404</h1><p>${esc(message)}</p><a class="btn-cta" href="https://${DOMAIN}/">Back to Home</a></div></main>${footer()}</body></html>`;
}
