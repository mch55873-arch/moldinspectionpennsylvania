import database from "../data/usa_database.json";
import services from "../data/services.json";
import articles from "../data/articles.json";
import { SITE } from "../lib/site";
import type { StateItem } from "./sitemaps";

const DOMAIN = SITE.domain;
const BRAND = SITE.name;
const PHONE_DISPLAY = SITE.phoneDisplay;
const PHONE_HREF = `tel:${SITE.phoneRaw}`;
const PA_ADDRESS = SITE.address;

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
.btn-glass-cyan{background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.4);color:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;padding:14px 28px;border-radius:14px;display:inline-flex;align-items:center;gap:8px;font-size:16px;transition:.2s;backdrop-filter:blur(8px)}
.btn-glass-cyan:hover{background:rgba(255,255,255,.3);transform:translateY(-2px)}

/* HERO & GENERAL SECTIONS */
.page-hero{position:relative;padding:76px 0 88px;background:linear-gradient(rgba(13,27,42,.88),rgba(13,27,42,.95)),url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1920&q=80') center/cover no-repeat;overflow:hidden}
.page-hero h1{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(38px,5vw,56px);font-weight:900;line-height:1.1;margin:16px 0 14px;color:#fff;max-width:820px;letter-spacing:-.03em}
.page-hero h1 span{color:#38bdf8}
.crumb-trail{font-size:14px;color:#38bdf8;font-weight:700;margin-bottom:14px}
.crumb-trail a{color:#94a3b8;transition:.2s}.crumb-trail a:hover{color:#fff}
.tag-badge{display:inline-block;padding:6px 14px;border-radius:999px;background:#e0f2fe;color:#0284c7;font-size:12px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;margin-bottom:12px}

.sec-white{background:#fff;color:#0f172a;padding:84px 0}
.sec-dark{background:#0d1b2a;color:#fff;padding:84px 0}
.sec-slate{background:#14263b;color:#fff;padding:84px 0}
.sec-gray{background:#f8fafc;color:#0f172a;padding:84px 0}
.sec-title{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(30px,4vw,44px);font-weight:900;line-height:1.15;margin:0 0 14px;letter-spacing:-.03em}

/* STATS BAR */
.stats-bar{background:#0b1320;border-top:1px solid rgba(255,255,255,.08);border-bottom:1px solid rgba(255,255,255,.08);padding:32px 0}
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;text-align:center}
.stat-item h3{font-family:'Plus Jakarta Sans',sans-serif;font-size:36px;font-weight:900;color:#38bdf8;margin:0}
.stat-item p{font-size:13px;font-weight:700;color:#94a3b8;margin:4px 0 0;text-transform:uppercase;letter-spacing:.05em}

/* GRIDS */
.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.dir-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:20px}
.dir-card-white{display:flex;align-items:center;justify-space:space-between;padding:16px 20px;background:#fff;border:1px solid #e2e8f0;border-radius:14px;color:#0d1b2a;font-weight:700;font-size:14px;transition:.25s;box-shadow:0 4px 12px rgba(0,0,0,.02);text-decoration:none}
.dir-card-white:hover{transform:translateY(-3px);border-color:#0ea5e9;color:#0ea5e9;box-shadow:0 12px 28px rgba(14,165,233,.15)}
.dir-card-white:after{content:"→";color:#0ea5e9;font-weight:900}

/* CARDS */
.service-hub-card{background:#fff;border:1px solid #e2e8f0;border-radius:18px;padding:26px;box-shadow:0 8px 24px rgba(0,0,0,.03);transition:.25s;display:flex;flex-direction:column;justify-space:space-between}
.service-hub-card:hover{transform:translateY(-5px);border-color:#0ea5e9;box-shadow:0 16px 36px rgba(14,165,233,.12)}
.service-hub-icon{width:42px;height:42px;border-radius:12px;background:#e0f2fe;color:#0284c7;display:grid;place-items:center;font-size:20px;margin-bottom:16px}
.service-hub-card h3{font-family:'Plus Jakarta Sans',sans-serif;font-size:19px;font-weight:800;color:#0d1b2a;margin:0 0 8px}
.service-hub-card p{color:#64748b;font-size:14px;line-height:1.6;margin:0 0 16px}
.service-hub-card a{color:#0ea5e9;font-weight:800;font-size:14px}

.blog-card{background:#fff;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,.03);transition:.25s;display:flex;flex-direction:column;justify-space:space-between}
.blog-card:hover{transform:translateY(-5px);border-color:#0ea5e9;box-shadow:0 16px 36px rgba(14,165,233,.12)}
.blog-card-img{width:100%;height:190px;object-fit:cover}
.blog-card-body{padding:22px;display:flex;flex-direction:column;flex-grow:1;justify-space:between}
.blog-date{font-size:12px;font-weight:700;color:#94a3b8;margin-bottom:8px}
.blog-card-body h3{font-family:'Plus Jakarta Sans',sans-serif;font-size:17px;font-weight:800;color:#0d1b2a;line-height:1.35;margin:0 0 10px}
.blog-card-body p{color:#64748b;font-size:13px;line-height:1.6;margin:0 0 16px}
.blog-card-body a{color:#0ea5e9;font-weight:800;font-size:13px;display:inline-flex;align-items:center;gap:4px}

.story-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}
.story-img{width:100%;border-radius:20px;box-shadow:0 20px 50px rgba(0,0,0,.12);object-fit:cover;height:440px}
.story-stats-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:28px}
.story-stat-box{background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:18px;text-align:center}
.story-stat-box h4{font-family:'Plus Jakarta Sans',sans-serif;font-size:26px;font-weight:900;color:#0ea5e9;margin:0}
.story-stat-box p{font-size:12px;font-weight:700;color:#64748b;margin:4px 0 0;text-transform:uppercase}

.promise-card{background:#fff;border:1px solid #e2e8f0;border-radius:18px;padding:26px;box-shadow:0 10px 30px rgba(0,0,0,.03);transition:.25s}
.promise-card:hover{transform:translateY(-5px);border-color:#0ea5e9;box-shadow:0 16px 40px rgba(14,165,233,.12)}
.promise-icon{width:42px;height:42px;border-radius:12px;background:#e0f2fe;color:#0284c7;display:grid;place-items:center;font-size:20px;margin-bottom:16px}
.promise-card h3{font-family:'Plus Jakarta Sans',sans-serif;font-size:18px;font-weight:800;color:#0d1b2a;margin:0 0 8px}
.promise-card p{color:#64748b;font-size:14px;line-height:1.65;margin:0}

.team-card{background:#f8fafc;border:1px solid #e2e8f0;border-radius:20px;padding:28px;text-align:center}
.team-img{width:86px;height:86px;border-radius:50%;object-fit:cover;margin:0 auto 16px;box-shadow:0 8px 20px rgba(0,0,0,.1);border:3px solid #0ea5e9}
.team-card h3{font-family:'Plus Jakarta Sans',sans-serif;font-size:20px;font-weight:800;color:#0d1b2a;margin:0 0 4px}
.team-card span{display:block;font-size:13px;font-weight:700;color:#0ea5e9;margin-bottom:12px}
.team-card p{color:#64748b;font-size:14px;line-height:1.6;margin:0}

/* FAQ & CONTACT */
.faq-box-centered{background:#14263b;border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:22px;margin-bottom:14px;max-width:860px;margin-left:auto;margin-right:auto;color:#fff}
.faq-box-centered h4{font-family:'Plus Jakarta Sans',sans-serif;font-size:17px;font-weight:800;color:#38bdf8;margin:0 0 8px}
.faq-box-centered p{color:#cbd5e1;font-size:14px;line-height:1.65;margin:0}

.contact-main-grid{display:grid;grid-template-columns:1fr 420px;gap:40px;align-items:start}
.contact-form-box{background:#fff;color:#0f172a;padding:40px;border-radius:20px;box-shadow:0 10px 40px rgba(0,0,0,.04);border:1px solid #e2e8f0}
.contact-form-box h2{font-family:'Plus Jakarta Sans',sans-serif;font-size:26px;font-weight:900;color:#0d1b2a;margin:0 0 8px}
.contact-form-box p{color:#64748b;font-size:14px;line-height:1.6;margin:0 0 24px}

.form-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px}
.form-group-full{margin-bottom:16px}
.form-label{display:block;font-size:13px;font-weight:700;color:#334155;margin-bottom:6px}
.form-input{width:100%;padding:13px 16px;border-radius:12px;border:1px solid #cbd5e1;background:#f8fafc;color:#0f172a;font-size:14px;outline:none;transition:.2s}
.form-input:focus{border-color:#0ea5e9;background:#fff;box-shadow:0 0 0 3px rgba(14,165,233,.18)}

.contact-details-box{background:#0d1b2a;border:1px solid rgba(255,255,255,.14);border-radius:20px;padding:30px;color:#fff;margin-bottom:20px}
.contact-details-box h3{font-family:'Plus Jakarta Sans',sans-serif;font-size:22px;font-weight:900;margin:0 0 20px;color:#fff}
.detail-item{display:flex;align-items:flex-start;gap:14px;margin-bottom:18px}
.detail-icon{width:36px;height:36px;border-radius:10px;background:rgba(14,165,233,.15);color:#38bdf8;display:grid;place-items:center;font-size:18px;flex-shrink:0}
.detail-text label{display:block;font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#64748b}
.detail-text span{display:block;font-size:15px;font-weight:700;color:#fff;margin-top:2px}

.hours-table{border-top:1px solid rgba(255,255,255,.1);padding-top:18px;margin-top:20px}
.hours-table h4{font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:800;margin:0 0 12px;color:#cbd5e1}
.hours-row{display:flex;align-items:center;justify-space:between;font-size:13px;color:#94a3b8;padding:6px 0}
.hours-row b{color:#fff}
.hours-row.highlight b{color:#f97316;font-weight:800}

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
@media(max-width:960px){.nav-links{display:none}.contact-main-grid,.story-grid,.grid-3,.grid-4,.dir-grid,.stats-grid{grid-template-columns:repeat(2,1fr)}.footer-grid,.footer-cta-flex{grid-template-columns:1fr;flex-direction:column;align-items:start}}
@media(max-width:640px){.dir-grid,.grid-3,.grid-4,.stats-grid{grid-template-columns:1fr}.sticky-bar{left:16px;right:16px;bottom:16px}.btn-cta{width:100%}}
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
        <h2>Emergency? Don't Wait — Call Now.</h2>
        <p>We answer 24/7 for black mold outbreaks, water damage &amp; leaking pipe emergencies in Pennsylvania.</p>
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
          <p style="font-size:14px;color:#94a3b8;margin:0 0 6px;">📍 ${PA_ADDRESS}</p>
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

function mapEmbedHtml(query: string, height = 380): string {
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=12&ie=UTF8&iwloc=&output=embed`;
  return `<div style="border-radius:18px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 10px 30px rgba(0,0,0,.08);"><iframe width="100%" height="${height}" style="border:0;border-radius:18px;filter:contrast(1.05) brightness(0.95);" loading="lazy" allowfullscreen src="${mapUrl}"></iframe></div>`;
}

/* 1. ABOUT US PAGE */
export function aboutUsPage() {
  const canonical = `https://${DOMAIN}/about-us/`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About Us | ${BRAND}`,
    url: canonical,
    description: "Learn about Mold Inspection Pennsylvania & USA Network — 22-year established authority providing 24/7 water, fire & mold restoration across all 50 US states."
  };

  const body = `<main>
  <section class="page-hero">
    <div class="wrap">
      <div class="crumb-trail"><a href="https://${DOMAIN}/">Home</a> / About</div>
      <h1>Your Neighbors in the <span>Water &amp; Mold Restoration</span> Business</h1>
      <p style="font-size:18px;line-height:1.75;color:#cbd5e1;max-width:700px;margin-bottom:0;">Family-owned, licensed and rooted in Pennsylvania since 2004. We've built our reputation one honest job at a time.</p>
    </div>
  </section>

  <section class="sec-white">
    <div class="wrap story-grid">
      <div>
        <span class="tag-badge">OUR STORY</span>
        <h2 class="sec-title" style="color:#0d1b2a;">Built on Honesty, One Restoration at a Time</h2>
        <p style="color:#475569;font-size:15px;line-height:1.75;">Mold Inspection Pennsylvania began in 2004 with one truck, one technician, and a frustration shared by many homeowners: it was hard to find an environmental specialist who'd give a straight answer and a fair price. We set out to be that company — specialists who do water extraction and mold remediation right, explain things plainly, and stand behind every job.</p>
        <p style="color:#475569;font-size:15px;line-height:1.75;">More than two decades later, we've serviced over 18,000 homes across Pennsylvania and the nation. We've grown, but the promise hasn't changed: treat every home like our own, never sell you something you don't need, and always pick up the phone 24/7.</p>
        
        <div class="story-stats-grid">
          <div class="story-stat-box">
            <h4>22+</h4>
            <p>Years in PA</p>
          </div>
          <div class="story-stat-box">
            <h4>18,000+</h4>
            <p>Homes Serviced</p>
          </div>
          <div class="story-stat-box">
            <h4>4.9★</h4>
            <p>Avg. Rating</p>
          </div>
        </div>
      </div>
      <div style="position:relative;">
        <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80" alt="Restoration Interior" class="story-img">
      </div>
    </div>
  </section>

  <section class="sec-gray">
    <div class="wrap">
      <div style="text-align:center;margin-bottom:48px;">
        <span class="tag-badge">WHAT WE STAND FOR</span>
        <h2 class="sec-title" style="color:#0d1b2a;">The Promises Behind Every Job</h2>
      </div>
      <div class="grid-4">
        <div class="promise-card">
          <div class="promise-icon">✔</div>
          <h3>Honesty First</h3>
          <p>If it can be dried and sanitized without full tear-out, we'll tell you. We never upsell unnecessary remediation.</p>
        </div>
        <div class="promise-card">
          <div class="promise-icon">⚡</div>
          <h3>Show Up Fast</h3>
          <p>24/7 same-day emergency dispatch because water leaks and toxic mold spores can't wait.</p>
        </div>
        <div class="promise-card">
          <div class="promise-icon">🏷️</div>
          <h3>Fair, Upfront Pricing</h3>
          <p>Flat-rate quotes you approve before we start. No surprises on the bill.</p>
        </div>
        <div class="promise-card">
          <div class="promise-icon">🛡️</div>
          <h3>Respect Your Home</h3>
          <p>Floor protection, negative-pressure HEPA containment, and thorough cleanup on every project.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="sec-white">
    <div class="wrap">
      <div style="text-align:center;margin-bottom:48px;">
        <span class="tag-badge">MEET THE TEAM</span>
        <h2 class="sec-title" style="color:#0d1b2a;">The People Who Show Up</h2>
      </div>
      <div class="grid-3">
        <div class="team-card">
          <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80" alt="Mike Alvarez" class="team-img">
          <h3>Mike Alvarez</h3>
          <span>Owner / Master Restoration Specialist</span>
          <p>Founded the company in 2004. 20+ years of environmental remediation experience.</p>
        </div>
        <div class="team-card">
          <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80" alt="David Chen" class="team-img">
          <h3>David Chen</h3>
          <span>Lead Inspection Technician</span>
          <p>Thermal moisture scanning specialist, certified in IICRC WRT &amp; AMRT.</p>
        </div>
        <div class="team-card">
          <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" alt="Sarah Nguyen" class="team-img">
          <h3>Sarah Nguyen</h3>
          <span>Customer Care Dispatch Manager</span>
          <p>Schedules your same-day inspection and manages direct insurance claims.</p>
        </div>
      </div>
    </div>
  </section>
  </main>`;

  return shell(`About Us | ${BRAND}`, "Learn about Mold Inspection Pennsylvania & USA Network.", canonical, body, schema);
}

/* 2. CONTACT US PAGE */
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
      streetAddress: "1500 Market St",
      addressLocality: "Philadelphia",
      addressRegion: "PA",
      postalCode: "19102",
      addressCountry: "US"
    }
  };

  const body = `<main>
  <section class="page-hero">
    <div class="wrap">
      <div class="crumb-trail"><a href="https://${DOMAIN}/">Home</a> / Contact</div>
      <h1>Get In Touch for <span>Fast Service</span></h1>
      <p style="font-size:18px;line-height:1.75;color:#cbd5e1;max-width:720px;margin-bottom:0;">Call for same-day help, or request a free quote and we'll get right back to you. Friendly, licensed, and local to Pennsylvania.</p>
    </div>
  </section>

  <section class="sec-gray" style="padding:60px 0 80px;">
    <div class="wrap contact-main-grid">
      <!-- LEFT FORM CARD -->
      <div class="contact-form-box">
        <h2>Request a Free Quote</h2>
        <p>Fill out the form and we'll call to confirm your appointment. For emergencies, please call <a href="${PHONE_HREF}" style="color:#0ea5e9;font-weight:800;">${PHONE_DISPLAY}</a>.</p>
        
        <form action="${PHONE_HREF}" method="GET">
          <div class="form-grid-2">
            <div>
              <label class="form-label">Full name</label>
              <input type="text" class="form-input" placeholder="Jane Doe" required>
            </div>
            <div>
              <label class="form-label">Phone</label>
              <input type="tel" class="form-input" placeholder="(321) 655-0460" required>
            </div>
          </div>

          <div class="form-group-full">
            <label class="form-label">Email</label>
            <input type="email" class="form-input" placeholder="you@example.com">
          </div>

          <div class="form-grid-2">
            <div>
              <label class="form-label">Service needed</label>
              <select class="form-input" required>
                <option value="">Select Service...</option>
                <option>Black Mold Removal &amp; Inspection</option>
                <option>Emergency Water Damage Extraction</option>
                <option>Fire &amp; Smoke Restoration</option>
                <option>Dehumidification &amp; Drying</option>
              </select>
            </div>
            <div>
              <label class="form-label">Neighborhood / Area</label>
              <select class="form-input">
                <option value="">Select Location...</option>
                <option>Philadelphia</option>
                <option>Pittsburgh</option>
                <option>Allentown</option>
                <option>Erie</option>
                <option>Reading</option>
              </select>
            </div>
          </div>

          <div class="form-group-full">
            <label class="form-label">What's going on?</label>
            <textarea class="form-input" rows="4" placeholder="e.g. Musty odors in basement, leaking pipe behind drywall, black mold growth..."></textarea>
          </div>

          <button type="submit" class="btn-cta" style="width:100%;min-height:52px;font-size:17px;">Send My Request</button>
          <p style="font-size:12px;color:#94a3b8;margin:12px 0 0;text-align:center;">By submitting, you agree to be contacted about your request. We never share your info.</p>
        </form>
      </div>

      <!-- RIGHT CONTACT DETAILS & MAP -->
      <div>
        <div class="contact-details-box">
          <h3>Contact Details</h3>
          
          <div class="detail-item">
            <div class="detail-icon">📞</div>
            <div class="detail-text">
              <label>PHONE</label>
              <span><a href="${PHONE_HREF}" style="color:#fff;">${PHONE_DISPLAY}</a></span>
            </div>
          </div>

          <div class="detail-item">
            <div class="detail-icon">✉️</div>
            <div class="detail-text">
              <label>EMAIL</label>
              <span>dispatch@${DOMAIN}</span>
            </div>
          </div>

          <div class="detail-item">
            <div class="detail-icon">📍</div>
            <div class="detail-text">
              <label>ADDRESS</label>
              <span>${PA_ADDRESS}</span>
            </div>
          </div>

          <div class="hours-table">
            <h4>Hours of Operation</h4>
            <div class="hours-row"><span>Monday – Friday</span><b>7:00 AM – 7:00 PM</b></div>
            <div class="hours-row"><span>Saturday</span><b>7:00 AM – 7:00 PM</b></div>
            <div class="hours-row"><span>Sunday</span><b>Emergency only</b></div>
            <div class="hours-row highlight"><span>Emergencies</span><b>24/7</b></div>
          </div>
        </div>

        ${mapEmbedHtml(PA_ADDRESS, 280)}
      </div>
    </div>
  </section>
  </main>`;

  return shell(`Contact Us | 24/7 Emergency Dispatch | ${BRAND}`, "Contact Mold Inspection Pennsylvania & USA Network for 24/7 water, fire & mold restoration dispatch.", canonical, body, schema);
}

/* 3. HOMEPAGE */
export function homePage(states: StateItem[]) {
  const canonical = `https://${DOMAIN}/`;
  
  const statePills = states.map(s => `<a class="dir-card-white" href="https://${s.slug}.${DOMAIN}/"><span>📍 ${esc(s.name)}</span></a>`).join("");

  const topServicesCards = services.slice(0, 6).map(s => `
    <div class="service-hub-card">
      <div>
        <div class="service-hub-icon">💧</div>
        <h3>${esc(s.name)}</h3>
        <p>${esc(s.description)}</p>
      </div>
      <a href="https://${DOMAIN}/services/${s.slug}/">Read More →</a>
    </div>
  `).join("");

  const blogCardsHtml = articles.slice(0, 4).map((art) => `
    <div class="blog-card">
      <img src="${art.image}" alt="${esc(art.title)}" class="blog-card-img">
      <div class="blog-card-body">
        <div>
          <div class="blog-date">${art.date}</div>
          <h3>${esc(art.title)}</h3>
          <p>${esc(art.excerpt)}</p>
        </div>
        <a href="https://${DOMAIN}/articles/${art.slug}/">Read More →</a>
      </div>
    </div>
  `).join("");

  const body = `<main>
  <!-- 1. HERO SECTION -->
  <section class="page-hero" style="padding:76px 0 88px;background:linear-gradient(rgba(13,27,42,.88),rgba(13,27,42,.95)),url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1920&q=80') center/cover no-repeat;">
    <div class="wrap" style="display:grid;grid-template-columns:1fr 340px;gap:44px;align-items:start;">
      <div>
        <div style="font-size:14px;color:#38bdf8;font-weight:800;margin-bottom:12px;">★ ★ ★ ★ ★ 4.9/5 Rated Restoration Authority</div>
        <h1 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(38px,5vw,58px);font-weight:900;color:#fff;">Emergency Water &amp; Mold Restoration <span style="color:#38bdf8;">Pennsylvania</span></h1>
        <p style="font-size:17px;line-height:1.7;color:#cbd5e1;margin-bottom:24px;">Rapid 30-minute arrival for water damage extraction, toxic black mold removal, and fire restoration across Pennsylvania &amp; nationwide.</p>
        <div style="display:flex;gap:14px;">
          <a class="btn-cta" href="${PHONE_HREF}">📞 Call ${PHONE_DISPLAY}</a>
          <a class="btn-glass-cyan" href="https://${DOMAIN}/contact-us/">Get Free Estimate</a>
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

  <!-- 2. STATS COUNTER BAR -->
  <section class="stats-bar">
    <div class="wrap">
      <div class="stats-grid">
        <div class="stat-item"><h3>22+</h3><p>Years Experience</p></div>
        <div class="stat-item"><h3>18,000+</h3><p>Homes Serviced</p></div>
        <div class="stat-item"><h3>4.9★</h3><p>Avg Customer Rating</p></div>
        <div class="stat-item"><h3>30 Min</h3><p>Emergency Response</p></div>
      </div>
    </div>
  </section>

  <!-- 3. ABOUT US SECTION -->
  <section class="sec-white">
    <div class="wrap story-grid">
      <div>
        <span class="tag-badge">OUR STORY</span>
        <h2 class="sec-title" style="color:#0d1b2a;">Pennsylvania's Premier Environmental &amp; Water Restoration Company</h2>
        <p style="color:#475569;font-size:15px;line-height:1.75;">Since 2004, Mold Inspection Pennsylvania has provided round-the-clock emergency water extraction, thermal leak detection, and toxic black mold remediation for residential and commercial properties across PA.</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:20px;font-weight:700;color:#0d1b2a;font-size:14px;">
          <div><span style="color:#0ea5e9;font-weight:900;">✔</span> IICRC Master Certified</div>
          <div><span style="color:#0ea5e9;font-weight:900;">✔</span> HEPA Negative Air Scrubbing</div>
          <div><span style="color:#0ea5e9;font-weight:900;">✔</span> Direct Insurance Billing</div>
          <div><span style="color:#0ea5e9;font-weight:900;">✔</span> 100% Upfront Pricing</div>
        </div>
      </div>
      <div>
        <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80" alt="Restoration Technicians" class="story-img">
      </div>
    </div>
  </section>

  <!-- 4. SERVICES GRID SECTION -->
  <section class="sec-gray">
    <div class="wrap">
      <div style="text-align:center;margin-bottom:44px;">
        <span class="tag-badge">OUR SERVICES</span>
        <h2 class="sec-title" style="color:#0d1b2a;">Comprehensive Water, Fire &amp; Mold Solutions</h2>
        <p style="color:#64748b;font-size:15px;margin:0;">Explore our specialized restoration services designed for long-term health &amp; safety.</p>
      </div>
      <div class="grid-3">${topServicesCards}</div>
      <div style="text-align:center;margin-top:36px;">
        <a class="btn-cta" href="https://${DOMAIN}/services/">View All 70 Services →</a>
      </div>
    </div>
  </section>

  <!-- 5. BLOG / ARTICLES TIPS & RESOURCES SECTION -->
  <section class="sec-white">
    <div class="wrap">
      <div style="text-align:center;margin-bottom:44px;">
        <span class="tag-badge">FROM OUR BLOG</span>
        <h2 class="sec-title" style="color:#0d1b2a;">Water Damage Restoration Tips &amp; Resources</h2>
        <p style="color:#64748b;font-size:15px;max-width:700px;margin:0 auto;">Expert water damage restoration advice, tips, and insights from Mold Inspection Pennsylvania to help you make informed decisions.</p>
      </div>
      <div class="grid-4">${blogCardsHtml}</div>
    </div>
  </section>

  <!-- 6. FAQS SECTION -->
  <section class="sec-dark">
    <div class="wrap">
      <div style="text-align:center;margin-bottom:40px;">
        <h2 class="sec-title" style="color:#fff;">Water Damage &amp; Mold Restoration FAQs</h2>
      </div>
      <div class="faq-box-centered">
        <h4>How quickly can your emergency restoration team arrive?</h4>
        <p>Our 24/7 dispatch centers dispatch local technicians across Pennsylvania with a target 30-minute rapid arrival guarantee.</p>
      </div>
      <div class="faq-box-centered">
        <h4>Do you offer free mold inspections and moisture scanning?</h4>
        <p>Yes! We provide on-site thermal camera moisture assessments and transparent itemized estimates before any work begins.</p>
      </div>
      <div class="faq-box-centered">
        <h4>Will my insurance policy cover water extraction and mold remediation?</h4>
        <p>Most homeowners insurance policies cover sudden water losses and resultant mold claims. We handle direct insurance claims billing.</p>
      </div>
    </div>
  </section>

  <!-- 7. ALL 50 STATES DIRECTORY SECTION -->
  <section class="sec-white">
    <div class="wrap">
      <div style="text-align:center;margin-bottom:40px;">
        <span class="tag-badge">SERVICE AREAS</span>
        <h2 class="sec-title" style="color:#0d1b2a;">Water Damage &amp; Mold Restoration in All 50 States</h2>
        <p style="color:#64748b;font-size:15px;margin:0;">Explore local city subdomains and emergency restoration coverage across all 50 US States.</p>
      </div>
      <div class="dir-grid">${statePills}</div>
    </div>
  </section>
  </main>`;

  return shell(`${BRAND} | 24/7 Water, Fire & Mold Restoration`, `Pennsylvania &amp; USA nationwide 24/7 emergency water damage restoration, mold remediation, air testing, and fire damage cleanup across all 50 US states.`, canonical, body);
}

/* 4. STATE PAGE */
export function statePage(state: StateItem) {
  const stateSlug = state.slug || state.code.toLowerCase();
  const canonical = `https://${stateSlug}.${DOMAIN}/`;
  const cities = (state.cities || []).slice(0, 60);
  
  const cityDirectoryHtml = cities.map(([cSlug, cName]) => {
    return `<a class="dir-card-white" href="https://${cSlug}-${stateSlug}.${DOMAIN}/"><span>📍 ${esc(cName)}</span></a>`;
  }).join("");

  const body = `<main>
  <section class="page-hero">
    <div class="wrap">
      <div class="crumb-trail"><a href="https://${DOMAIN}/">Home</a> / <a href="https://${DOMAIN}/areas-we-serve/">Service Areas</a> / ${esc(state.name)}</div>
      <span class="tag-badge" style="background:rgba(14,165,233,.18);color:#38bdf8;">📍 State Directory</span>
      <h1>Water Damage &amp; Mold Restoration in <span>${esc(state.name)}</span></h1>
      <p style="font-size:18px;line-height:1.75;color:#cbd5e1;max-width:760px;margin-bottom:26px;">Rapid 24/7 emergency dispatch across all cities and municipalities in ${esc(state.name)}. Thermal leak detection, toxic black mold removal, and basement drying.</p>
      <div style="display:flex;gap:14px;">
        <a class="btn-cta" href="${PHONE_HREF}">📞 Call ${PHONE_DISPLAY}</a>
        <a class="btn-glass-cyan" href="https://${DOMAIN}/contact-us/">Book Online</a>
      </div>
    </div>
  </section>

  <section class="sec-white">
    <div class="wrap">
      <div style="margin-bottom:32px;">
        <span class="tag-badge">CITIES DIRECTORY</span>
        <h2 class="sec-title" style="color:#0d1b2a;">Select Your City in ${esc(state.name)}</h2>
        <p style="color:#64748b;font-size:15px;margin:0;">Select your local city to view 24/7 emergency dispatch phone numbers, local technician arrival times, and services.</p>
      </div>
      <div class="dir-grid">${cityDirectoryHtml}</div>
    </div>
  </section>
  </main>`;

  return shell(`Mold &amp; Water Restoration in ${state.name} | ${BRAND}`, `24/7 emergency mold inspection, water damage extraction, and fire restoration across ${state.name}.`, canonical, body);
}

/* 5. SERVICES HUB PAGE */
export function servicesHubPage() {
  const canonical = `https://${DOMAIN}/services/`;
  const serviceCardsHtml = services.slice(0, 9).map((s) => `<div class="service-hub-card"><div><div class="service-hub-icon">💧</div><h3>${esc(s.name)}</h3><p>${esc(s.description)}</p></div><a href="https://${DOMAIN}/services/${s.slug}/">Learn more →</a></div>`).join("");
  const body = `<main><section class="page-hero"><div class="wrap"><div class="crumb-trail"><a href="https://${DOMAIN}/">Home</a> / Services</div><h1>Complete Water, Fire &amp; Mold <span>Restoration Services</span></h1></div></section><section class="sec-gray"><div class="wrap"><div class="grid-3">${serviceCardsHtml}</div></div></section></main>`;
  return shell(`Restoration Services Directory | All 70 Topics | ${BRAND}`, "Browse all 70 water damage extraction, toxic black mold remediation, and fire restoration services offered nationwide.", canonical, body);
}

/* 6. AREAS WE SERVE PAGE */
export function areasWeServePage(states: StateItem[]) {
  const canonical = `https://${DOMAIN}/areas-we-serve/`;
  const allDirectoryHtml = states.map((s) => `<a class="dir-card-white" href="https://${s.slug}.${DOMAIN}/"><span>📍 ${esc(s.name)}</span></a>`).join("");
  const body = `<main><section class="page-hero"><div class="wrap"><h1>Water, Fire &amp; Mold Restoration Across <span>USA</span></h1></div></section><section class="sec-dark"><div class="wrap"><div class="dir-grid">${allDirectoryHtml}</div></div></section></main>`;
  return shell(`Service Areas | ${BRAND}`, "Directory.", canonical, body);
}

/* 7. NATIONAL SERVICE PAGE */
export function nationalServicePage(service: (typeof services)[number]) {
  const canonical = `https://${DOMAIN}/services/${service.slug}/`;
  const body = `<main><section class="page-hero"><div class="wrap"><h1>24/7 <span>${esc(service.name)}</span></h1></div></section></main>`;
  return shell(`${service.name} | ${BRAND}`, service.description, canonical, body);
}

/* 8. LOCAL SERVICE PAGE */
export function localServicePage(state: StateItem, city: [string, string], service: (typeof services)[number], host: string) {
  const [, cityName] = city;
  const canonical = `https://${host}/${service.slug}/`;
  const body = `<main><section class="page-hero"><div class="wrap"><h1>${esc(service.name)} in <span>${esc(cityName)}, ${esc(state.name)}</span></h1></div></section></main>`;
  return shell(`${service.name} in ${cityName}, ${state.name} | ${BRAND}`, service.description, canonical, body);
}

/* 9. CITY PAGE */
export function cityPage(state: StateItem, city: [string, string], host: string) {
  const [, cityName] = city;
  const canonical = `https://${host}/`;
  const body = `<main><section class="page-hero"><div class="wrap"><h1>Water Damage &amp; Mold Remediation in <span>${esc(cityName)}, ${esc(state.name)}</span></h1></div></section></main>`;
  return shell(`Water &amp; Mold Restoration in ${cityName}, ${state.name} | ${BRAND}`, `Local restoration in ${cityName}.`, canonical, body);
}

export function linkSheetPage() {
  const canonical = `https://${DOMAIN}/link-sheet/`;
  const body = `<main><section class="page-hero"><div class="wrap"><h1>LinkSheet Hub</h1></div></section></main>`;
  return shell("Xagio LinkSheet", "LinkSheet.", canonical, body);
}

export function articlesHubPage() {
  const canonical = `https://${DOMAIN}/articles/`;
  const body = `<main><section class="page-hero"><div class="wrap"><h1>Restoration Guides</h1></div></section></main>`;
  return shell(`Restoration Guides | ${BRAND}`, "Guides.", canonical, body);
}

export function articlePage(article: any) {
  const canonical = `https://${DOMAIN}/articles/${article.slug}/`;
  const body = `<main><section class="page-hero"><div class="wrap"><h1>${esc(article.title)}</h1></div></section></main>`;
  return shell(`${article.title} | ${BRAND}`, article.excerpt, canonical, body);
}

export function notFoundPage(message: string) {
  return `<!doctype html><html><head><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width,initial-scale=1"><title>404 | ${BRAND}</title><style>${CSS}</style></head><body>${header()}<main class="sec-dark"><div class="wrap"><h1>404</h1><p>${esc(message)}</p><a class="btn-cta" href="https://${DOMAIN}/">Back to Home</a></div></main>${footer()}</body></html>`;
}
