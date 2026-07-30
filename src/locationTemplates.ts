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
.top-bar .wrap{display:flex;align-items:center;justify-space:space-between;padding:8px 0}
.top-left,.top-right{display:flex;align-items:center;gap:14px}
.pulse-dot{width:8px;height:8px;border-radius:50%;background:#10b981;display:inline-block;box-shadow:0 0 10px #10b981}
.sep{color:#475569}
.stars{color:#fbbf24;letter-spacing:2px;font-size:14px}

.navbar{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.98);backdrop-filter:blur(16px);border-bottom:1px solid #e2e8f0;box-shadow:0 8px 30px rgba(0,0,0,.08);color:#0f172a}
.navbar .wrap{display:flex;align-items:center;justify-space:space-between;padding:14px 0}
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

.service-main-grid{display:grid;grid-template-columns:1fr 380px;gap:44px;align-items:start}
.service-content-box{background:#fff;color:#0f172a;padding:40px;border-radius:20px;box-shadow:0 10px 40px rgba(0,0,0,.04);border:1px solid #e2e8f0}
.service-content-box h2{font-family:'Plus Jakarta Sans',sans-serif;font-size:28px;font-weight:900;color:#0d1b2a;margin:0 0 16px;letter-spacing:-.02em}
.service-content-box p{color:#475569;font-size:15px;line-height:1.75;margin:0 0 16px}

.warning-cards-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:20px 0 32px}
.warning-card{background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px;display:flex;align-items:center;gap:12px;font-weight:700;font-size:14px;color:#0d1b2a}
.warning-card span{color:#f97316;font-size:18px}

.checklist-2col{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:20px 0 32px;font-size:14px;font-weight:700;color:#1e293b}
.check-item-line{display:flex;align-items:center;gap:8px}
.check-item-line span{color:#0ea5e9;font-weight:900}

.white-form-card{background:#fff;border-radius:20px;padding:28px;box-shadow:0 20px 50px rgba(0,0,0,.08);border:1px solid #e2e8f0;color:#0f172a}
.white-form-card h3{font-family:'Plus Jakarta Sans',sans-serif;font-size:22px;font-weight:900;color:#0d1b2a;margin:0 0 4px}
.white-form-card p{font-size:12px;color:#64748b;margin:0 0 18px}

.faq-item-white{border:1px solid #e2e8f0;border-radius:14px;padding:18px 22px;margin-bottom:12px;background:#fff}
.faq-item-white summary{font-family:'Plus Jakarta Sans',sans-serif;font-size:16px;font-weight:800;color:#0d1b2a;cursor:pointer;list-style:none;display:flex;align-items:center;justify-space:space-between}
.faq-item-white summary:after{content:"▼";font-size:12px;color:#0ea5e9}
.faq-item-white p{color:#64748b;font-size:14px;line-height:1.65;margin:12px 0 0}

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
@media(max-width:960px){.nav-links{display:none}.contact-main-grid,.service-main-grid,.story-grid,.grid-3,.grid-4,.dir-grid,.stats-grid{grid-template-columns:repeat(2,1fr)}.footer-grid,.footer-cta-flex{grid-template-columns:1fr;flex-direction:column;align-items:start}}
@media(max-width:640px){.dir-grid,.grid-3,.grid-4,.stats-grid,.warning-cards-grid,.checklist-2col{grid-template-columns:1fr}.sticky-bar{left:16px;right:16px;bottom:16px}.btn-cta{width:100%}}
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
        <h2>Hazardous Water Leak or Emergency Mold Damage? Let's Fix That Today.</h2>
        <p>Same-day certified technician &amp; emergency mold removal across all 50 states. Friendly, licensed &amp; upfront pricing.</p>
      </div>
      <div class="footer-cta-btns">
        <a class="btn-dark-navy" href="${PHONE_HREF}">📞 Call ${PHONE_DISPLAY}</a>
        <a class="btn-glass-cyan" href="https://${DOMAIN}/contact-us/">Request Online Quote</a>
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
            Nationwide certified environmental &amp; emergency restoration provider. Licensed, fully insured, and independent referral network.
          </p>
          <p style="font-size:13px;color:#fbbf24;margin:0 0 6px;">★★★★★ 4.9/5 · 18,000+ Verified Reviews</p>
          <p style="font-size:12px;color:#64748b;margin:0;">Master Certified Network · Fully Insured &amp; Bonded</p>
        </div>
        <div>
          <h3>Services</h3>
          <a href="https://${DOMAIN}/services/emergency-mold-remediation/">Emergency Mold Remediation</a>
          <a href="https://${DOMAIN}/services/black-mold-removal/">Black Mold Removal</a>
          <a href="https://${DOMAIN}/services/emergency-water-damage-restoration/">Water Damage Restoration</a>
          <a href="https://${DOMAIN}/services/fire-damage-restoration-cleanup/">Fire Damage Restoration</a>
          <a href="https://${DOMAIN}/services/dehumidifier-equipment-rental/">Dehumidification &amp; Drying</a>
          <a href="https://${DOMAIN}/services/" style="color:#38bdf8;font-weight:700;">All 70 Services →</a>
        </div>
        <div>
          <h3>Service Areas</h3>
          <a href="https://${DOMAIN}/areas-we-serve/">All 50 States &amp; DC</a>
          <a href="https://california.${DOMAIN}/">California Services</a>
          <a href="https://texas.${DOMAIN}/">Texas Services</a>
          <a href="https://florida.${DOMAIN}/">Florida Services</a>
          <a href="https://pennsylvania.${DOMAIN}/">Pennsylvania Services</a>
          <a href="https://${DOMAIN}/areas-we-serve/" style="color:#38bdf8;font-weight:700;">All 30,900+ Cities →</a>
        </div>
        <div>
          <h3>Get In Touch</h3>
          <a href="${PHONE_HREF}" style="color:#fff;font-weight:800;font-size:16px;">📞 ${PHONE_DISPLAY}</a>
          <p style="font-size:14px;color:#94a3b8;margin:10px 0 6px;">✉️ dispatch@${DOMAIN}</p>
          <p style="font-size:14px;color:#94a3b8;margin:0 0 6px;">📍 ${PA_ADDRESS}</p>
          <p style="font-size:14px;color:#38bdf8;margin:0;font-weight:700;">🕒 Mon–Sun 24 Hours · 24/7 Emergency Response</p>
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

/* 1. ARTICLES HUB PAGE */
export function articlesHubPage() {
  const canonical = `https://${DOMAIN}/articles/`;
  const blogCardsHtml = (articles as any[]).map((art) => `
    <div class="blog-card">
      <img src="${art.image}" alt="${esc(art.title)}" class="blog-card-img">
      <div class="blog-card-body">
        <div>
          <div class="blog-date">${art.date} · By ${esc(art.author)}</div>
          <h3>${esc(art.title)}</h3>
          <p>${esc(art.excerpt)}</p>
        </div>
        <a href="https://${DOMAIN}/articles/${art.slug}/">Read Master Guide →</a>
      </div>
    </div>
  `).join("");

  const body = `<main>
  <section class="page-hero">
    <div class="wrap">
      <div class="crumb-trail"><a href="https://${DOMAIN}/">Home</a> / Guides &amp; Articles</div>
      <span class="tag-badge" style="background:rgba(14,165,233,.18);color:#38bdf8;">TECHNICAL RESTORATION GUIDES</span>
      <h1>Environmental &amp; Water Restoration <span style="color:#38bdf8;">Knowledge Base</span></h1>
      <p style="font-size:16px;line-height:1.7;color:#cbd5e1;max-width:780px;">In-depth technical guides, IICRC standards, mold spore safety protocols, and insurance claim navigation written by certified environmental specialists.</p>
    </div>
  </section>

  <section class="sec-gray" style="padding:70px 0;">
    <div class="wrap">
      <div class="grid-3">${blogCardsHtml}</div>
    </div>
  </section>
  </main>`;

  return shell(`Restoration Knowledge Base &amp; Technical Guides | ${BRAND}`, "In-depth technical guides on mold remediation, water damage extraction, HEPA air containment, and insurance claims.", canonical, body);
}

/* 2. INDIVIDUAL ARTICLE PAGE (1,500 - 2,500 WORDS DETAILED TECHNICAL CONTENT) */
export function articlePage(article: any) {
  const canonical = `https://${DOMAIN}/articles/${article.slug}/`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    author: { "@type": "Person", name: article.author },
    publisher: { "@type": "Organization", name: BRAND }
  };

  const body = `<main>
  <!-- HERO SECTION -->
  <section class="page-hero">
    <div class="wrap">
      <div class="crumb-trail"><a href="https://${DOMAIN}/">Home</a> / <a href="https://${DOMAIN}/articles/">Articles</a> / ${esc(article.title)}</div>
      <span class="tag-badge" style="background:rgba(14,165,233,.18);color:#38bdf8;">TECHNICAL GUIDE · 12 MIN READ</span>
      <h1 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(32px,4vw,48px);font-weight:900;color:#fff;line-height:1.15;margin:12px 0 16px;">
        ${esc(article.title)}
      </h1>
      <p style="font-size:15px;color:#cbd5e1;">Published: ${article.date} | Author: <b>${esc(article.author)}</b></p>
    </div>
  </section>

  <!-- MAIN ARTICLE CONTENT SECTION -->
  <section class="sec-white" style="padding:70px 0;">
    <div class="wrap service-main-grid">
      <!-- LEFT CONTENT COLUMN -->
      <div class="service-content-box">
        <img src="${article.image}" alt="${esc(article.title)}" style="width:100%;height:380px;object-fit:cover;border-radius:16px;margin-bottom:32px;border:1px solid #e2e8f0;">
        <div style="font-size:16px;line-height:1.8;color:#334155;">
          ${article.content}
        </div>

        <div style="background:#f0f9ff;border-left:4px solid #0ea5e9;padding:24px;border-radius:12px;margin:40px 0 24px;">
          <h4 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:18px;font-weight:800;color:#0d1b2a;margin:0 0 8px;">Need Emergency Mold or Water Extraction Service?</h4>
          <p style="font-size:14px;color:#475569;margin:0 0 16px;">Our certified mobile restoration dispatch units operate 24/7 across all 50 US states with a 30-minute target arrival guarantee.</p>
          <a class="btn-cta" href="${PHONE_HREF}">📞 Call Dispatch ${PHONE_DISPLAY}</a>
        </div>
      </div>

      <!-- RIGHT SIDEBAR -->
      <div>
        <div class="white-form-card">
          <h3>Request Free Estimate</h3>
          <p>Speak to a certified restoration specialist now</p>
          <form action="${PHONE_HREF}" method="GET">
            <div style="margin-bottom:12px;"><input type="text" placeholder="Your Full Name *" required style="width:100%;padding:12px 14px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;font-size:14px;"></div>
            <div style="margin-bottom:12px;"><input type="tel" placeholder="Phone Number *" required style="width:100%;padding:12px 14px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;font-size:14px;"></div>
            <div style="margin-bottom:12px;">
              <select style="width:100%;padding:12px 14px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;font-size:14px;" required>
                <option value="">Select Service Needed *</option>
                <option>Emergency Mold Remediation</option>
                <option>Water Damage Extraction</option>
                <option>Fire Damage Cleanup</option>
              </select>
            </div>
            <button type="submit" class="btn-cta" style="width:100%;min-height:50px;">Get Estimate Now →</button>
          </form>
        </div>
      </div>
    </div>
  </section>
  </main>`;

  return shell(`${article.title} | ${BRAND}`, article.excerpt, canonical, body, schema);
}

/* 3. LOCAL SERVICE PAGE */
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
  <section class="page-hero">
    <div class="wrap" style="display:grid;grid-template-columns:1fr 380px;gap:44px;align-items:start;">
      <div>
        <div class="crumb-trail"><a href="https://${state.slug}.${DOMAIN}/">${esc(state.name)}</a> / <a href="https://${host}/">${esc(cityName)}</a> / ${esc(service.name)}</div>
        <span class="tag-badge" style="background:rgba(14,165,233,.18);color:#38bdf8;">📍 LOCAL ${esc(cityName).toUpperCase()} DISPATCH</span>
        <h1 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(36px,4.5vw,52px);font-weight:900;color:#fff;line-height:1.1;margin:12px 0 16px;">
          ${esc(service.name)} in <span style="color:#38bdf8;">${esc(cityName)}, ${esc(state.name)}</span>
        </h1>
        <p style="font-size:16px;line-height:1.7;color:#cbd5e1;margin-bottom:24px;">
          Tile grout mold remediation, sub-floor water damage repair, and moisture exhaust optimization. Local 24/7 emergency dispatch crews stationed directly in ${esc(cityName)} for rapid arrival.
        </p>

        <div style="display:flex;gap:14px;">
          <a class="btn-cta" href="${PHONE_HREF}">Submit &amp; Call ${PHONE_DISPLAY}</a>
          <a class="btn-glass-cyan" href="https://${DOMAIN}/contact-us/">Request Free Quote</a>
        </div>
      </div>

      <div>
        <div class="white-form-card">
          <h3>Request Free Quote</h3>
          <p>Get best estimate in ${esc(cityName)}</p>
          <form action="${PHONE_HREF}" method="GET">
            <div style="margin-bottom:12px;"><input type="text" placeholder="Your Full Name *" required style="width:100%;padding:12px 14px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;font-size:14px;"></div>
            <div style="margin-bottom:12px;"><input type="tel" placeholder="Phone Number *" required style="width:100%;padding:12px 14px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;font-size:14px;"></div>
            <button type="submit" class="btn-cta" style="width:100%;min-height:50px;font-size:15px;">Submit &amp; Call ${PHONE_DISPLAY}</button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <section class="sec-white" style="padding:70px 0;">
    <div class="wrap service-main-grid">
      <div class="service-content-box">
        <span class="tag-badge">LOCAL DISPATCH</span>
        <h2>Trusted ${esc(service.name)} Specialists in ${esc(cityName)}</h2>
        <p>When managing toxic black mold, bathroom tiles moisture, basement flooding, or structural water leaks in <b>${esc(cityName)}</b>, you need experienced local technicians who prioritize safety and property protection. For over 15 years, our network of certified restoration specialists has delivered safe, compliant, and honest water damage services across ${esc(cityName)}, ${esc(state.name)}.</p>
        <p>Every project in ${esc(cityName)} starts with a detailed risk assessment and a clear, flat-rate quote you approve before we begin. No hidden charges, no unnecessary removals, and complete property cleanup on every job.</p>

        <h3 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:22px;font-weight:900;color:#0d1b2a;margin:32px 0 12px;">Signs You Need ${esc(service.name)} in ${esc(cityName)}</h3>
        <div class="warning-cards-grid">
          <div class="warning-card"><span>⚠️</span> Sudden moisture leaks or wall discoloration</div>
          <div class="warning-card"><span>⚠️</span> Cracked, damp, or warping drywall</div>
          <div class="warning-card"><span>⚠️</span> Overhanging dampness near power lines</div>
          <div class="warning-card"><span>⚠️</span> Deadwood &amp; fungal mushroom conks</div>
        </div>

        <h3 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:22px;font-weight:900;color:#0d1b2a;margin:32px 0 12px;">Capabilities &amp; Services We Handle in ${esc(cityName)}</h3>
        <div class="checklist-2col">
          <div class="check-item-line"><span>✔</span> Certified Moisture &amp; Air Evaluation</div>
          <div class="check-item-line"><span>✔</span> Heavy-Duty LGR Dehumidification</div>
          <div class="check-item-line"><span>✔</span> Full HEPA Negative Air Containment</div>
          <div class="check-item-line"><span>✔</span> On-Site Mold Sanitization &amp; Antimicrobial</div>
          <div class="check-item-line"><span>✔</span> Vapor Barrier &amp; Subfloor Drying</div>
          <div class="check-item-line"><span>✔</span> Emergency Storm Damage Response</div>
        </div>

        <h3 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:24px;font-weight:900;color:#0d1b2a;margin:40px 0 16px;">Frequently Asked Questions</h3>
        <details class="faq-item-white" open>
          <summary>What is included in ${esc(service.name)} in ${esc(cityName)}?</summary>
          <p>Proactive safety restoration to reduce risk near play structures, driveways, and living spaces in ${esc(cityName)}. Our certified specialists handle site evaluation, heavy extraction, HEPA containment, and full debris haul-away.</p>
        </details>
        <details class="faq-item-white">
          <summary>How much does ${esc(service.name)} cost in ${esc(cityName)}?</summary>
          <p>Costs depend on square footage and moisture levels. We provide 100% upfront flat-rate quotes before any work begins.</p>
        </details>
        <details class="faq-item-white">
          <summary>Is emergency service available 24/7 in ${esc(cityName)}?</summary>
          <p>Yes! We operate round-the-clock emergency response units across ${esc(cityName)} and ${esc(state.name)}.</p>
        </details>
      </div>

      <div>
        <div class="white-form-card">
          <h3>Request Free Quote</h3>
          <p>Get best estimate for certified restoration in ${esc(cityName)}</p>
          <form action="${PHONE_HREF}" method="GET">
            <div style="margin-bottom:12px;"><input type="text" placeholder="Your Full Name *" required style="width:100%;padding:12px 14px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;"></div>
            <div style="margin-bottom:12px;"><input type="tel" placeholder="Phone Number *" required style="width:100%;padding:12px 14px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;"></div>
            <button type="submit" class="btn-cta" style="width:100%;min-height:50px;">Submit &amp; Call ${PHONE_DISPLAY}</button>
          </form>
        </div>
      </div>
    </div>
  </section>
  </main>`;

  return shell(`${service.name} in ${cityName}, ${state.name} | ${BRAND}`, service.description, canonical, body, schema);
}

/* 4. NATIONAL SERVICE PAGE */
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
  <section class="page-hero">
    <div class="wrap" style="display:grid;grid-template-columns:1fr 380px;gap:44px;align-items:start;">
      <div>
        <div class="crumb-trail"><a href="https://${DOMAIN}/">Home</a> / <a href="https://${DOMAIN}/services/">Services</a> / ${esc(service.name)}</div>
        <span class="tag-badge" style="background:rgba(14,165,233,.18);color:#38bdf8;">⚡ SAME-DAY SERVICE AVAILABLE</span>
        <h1 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(36px,4.5vw,52px);font-weight:900;color:#fff;line-height:1.1;margin:12px 0 16px;">
          ${esc(service.name)} <span style="color:#38bdf8;">Guide &amp; Referral Hub</span>
        </h1>
        <p style="font-size:16px;line-height:1.7;color:#cbd5e1;margin-bottom:24px;">Proactive safety restoration to reduce risk near structures, basements, and living spaces. Fast, licensed, and certified technician response across all 50 states.</p>
        <div style="display:flex;gap:14px;"><a class="btn-cta" href="${PHONE_HREF}">Submit &amp; Call ${PHONE_DISPLAY}</a><a class="btn-glass-cyan" href="https://${DOMAIN}/contact-us/">Request Free Quote</a></div>
      </div>
      <div>
        <div class="white-form-card">
          <h3>Request Free Quote</h3>
          <p>Get best estimate for certified restoration</p>
          <form action="${PHONE_HREF}" method="GET">
            <div style="margin-bottom:12px;"><input type="text" placeholder="Your Full Name *" required style="width:100%;padding:12px 14px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;"></div>
            <div style="margin-bottom:12px;"><input type="tel" placeholder="Phone Number *" required style="width:100%;padding:12px 14px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;"></div>
            <button type="submit" class="btn-cta" style="width:100%;min-height:50px;">Submit &amp; Call ${PHONE_DISPLAY}</button>
          </form>
        </div>
      </div>
    </div>
  </section>
  <section class="sec-white" style="padding:70px 0;">
    <div class="wrap service-main-grid">
      <div class="service-content-box">
        <span class="tag-badge">COMPREHENSIVE CARE</span>
        <h2>Trusted ${esc(service.name)} Specialists</h2>
        <p>When managing toxic black mold, basement flooding, or structural water leaks, you need experienced technicians who prioritize safety and property protection.</p>
      </div>
      <div>
        <div class="white-form-card">
          <h3>Request Free Quote</h3>
          <p>Get best estimate</p>
          <form action="${PHONE_HREF}" method="GET"><div style="margin-bottom:12px;"><input type="text" placeholder="Your Full Name *" required style="width:100%;padding:12px 14px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;"></div><div style="margin-bottom:12px;"><input type="tel" placeholder="Phone Number *" required style="width:100%;padding:12px 14px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;"></div><button type="submit" class="btn-cta" style="width:100%;">Submit &amp; Call ${PHONE_DISPLAY}</button></form>
        </div>
      </div>
    </div>
  </section>
  </main>`;

  return shell(`${service.name} Guide &amp; Referral Hub | ${BRAND}`, service.description, canonical, body, schema);
}

/* 5. SERVICES HUB PAGE */
export function servicesHubPage() {
  const canonical = `https://${DOMAIN}/services/`;
  const all70ServiceCardsHtml = services.map((s) => `<div class="service-hub-card"><div><div class="service-hub-icon">💧</div><h3>${esc(s.name)}</h3><p>${esc(s.description)}</p></div><a href="https://${DOMAIN}/services/${s.slug}/">Review service →</a></div>`).join("");
  const body = `<main><section class="page-hero"><div class="wrap"><h1>Complete Water, Fire &amp; Mold <span>Restoration Services Directory</span></h1></div></section><section class="sec-gray" style="padding:70px 0;"><div class="wrap"><div class="grid-3">${all70ServiceCardsHtml}</div></div></section></main>`;
  return shell(`Restoration Services Directory | All 70 Services | ${BRAND}`, "Browse all 70 water damage extraction services.", canonical, body);
}

/* 6. AREAS WE SERVE PAGE */
export function areasWeServePage(states: StateItem[]) {
  const canonical = `https://${DOMAIN}/areas-we-serve/`;
  const stateCardsHtml = states.map((s) => `<a class="dir-card-white" href="https://${s.slug}.${DOMAIN}/"><span>📍 ${esc(s.name)} (${(s.cities || []).length || 60} cities)</span></a>`).join("");
  const body = `<main><section class="page-hero"><div class="wrap"><h1>Water &amp; Mold Restoration Locations by <span>State &amp; City</span></h1></div></section><section class="sec-gray" style="padding:70px 0;"><div class="wrap"><div class="dir-grid">${stateCardsHtml}</div></div></section></main>`;
  return shell(`Service Areas | All 50 US States | ${BRAND}`, "Explore 24/7 water damage extraction across all 50 US states.", canonical, body);
}

/* 7. STATE PAGE */
export function statePage(state: StateItem) {
  const stateSlug = state.slug || state.code.toLowerCase();
  const canonical = `https://${stateSlug}.${DOMAIN}/`;
  const cities = (state.cities || []).slice(0, 60);
  const cityDirectoryHtml = cities.map(([cSlug, cName]) => `<a class="dir-card-white" href="https://${cSlug}-${stateSlug}.${DOMAIN}/"><span>📍 ${esc(cName)}</span></a>`).join("");
  const stateServicesCards = services.map(s => `<div class="service-hub-card"><div><div class="service-hub-icon">💧</div><h3>${esc(s.name)} in ${esc(state.name)}</h3><p>${esc(s.description)}</p></div><a href="https://${DOMAIN}/services/${s.slug}/">Review service →</a></div>`).join("");
  const body = `<main><section class="page-hero"><div class="wrap"><h1>Water &amp; Mold Restoration Services across <span>${esc(state.name)}</span></h1></div></section><section class="sec-gray" style="padding:70px 0;"><div class="wrap"><div class="dir-grid">${cityDirectoryHtml}</div></div></section><section class="sec-white" style="padding:70px 0;"><div class="wrap"><div class="grid-3">${stateServicesCards}</div></div></section></main>`;
  return shell(`Water &amp; Mold Restoration Services across ${state.name} | ${BRAND}`, `24/7 emergency mold inspection across ${state.name}.`, canonical, body);
}

/* 8. CITY PAGE */
export function cityPage(state: StateItem, city: [string, string], host: string) {
  const [, cityName] = city;
  const stateSlug = state.slug || state.code.toLowerCase();
  const canonical = `https://${host}/`;
  const nearbyCities = (state.cities || []).filter(([cSlug]) => cSlug !== city[0]).slice(0, 8);
  const nearbyCardsHtml = nearbyCities.map(([cSlug, cName]) => `<a class="dir-card-white" href="https://${cSlug}-${stateSlug}.${DOMAIN}/"><span>📍 ${esc(cName)}</span></a>`).join("");
  const allServicesDirectoryHtml = services.map(s => `<div class="service-hub-card"><div><div class="service-hub-icon">💧</div><h3>${esc(s.name)} in ${esc(cityName)}</h3><p>${esc(s.description)}</p></div><a href="https://${host}/${s.slug}/">Review service →</a></div>`).join("");
  const body = `<main><section class="page-hero"><div class="wrap"><h1>24/7 Water &amp; Mold Restoration in <span>${esc(cityName)}, ${esc(state.name)}</span></h1></div></section><section class="sec-gray" style="padding:60px 0;"><div class="wrap"><div class="dir-grid">${nearbyCardsHtml}</div></div></section><section class="sec-white" style="padding:70px 0;"><div class="wrap"><div class="grid-3">${allServicesDirectoryHtml}</div></div></section></main>`;
  return shell(`24/7 Water &amp; Mold Restoration in ${cityName}, ${state.name} | ${BRAND}`, `24/7 local water damage extraction in ${cityName}, ${state.name}.`, canonical, body);
}

/* 9. HOMEPAGE */
export function homePage(states: StateItem[]) {
  const canonical = `https://${DOMAIN}/`;
  const statePills = states.map(s => `<a class="dir-card-white" href="https://${s.slug}.${DOMAIN}/"><span>📍 ${esc(s.name)}</span></a>`).join("");
  const topServicesCards = services.slice(0, 6).map(s => `<div class="service-hub-card"><div><div class="service-hub-icon">💧</div><h3>${esc(s.name)}</h3><p>${esc(s.description)}</p></div><a href="https://${DOMAIN}/services/${s.slug}/">Read More →</a></div>`).join("");
  const body = `<main><section class="page-hero"><div class="wrap"><h1>Emergency Water &amp; Mold Restoration <span>Pennsylvania</span></h1></div></section><section class="sec-gray"><div class="wrap"><div class="grid-3">${topServicesCards}</div></div></section><section class="sec-white"><div class="wrap"><div class="dir-grid">${statePills}</div></div></section></main>`;
  return shell(`${BRAND} | 24/7 Water, Fire & Mold Restoration`, `Pennsylvania &amp; USA nationwide 24/7 emergency water damage restoration across all 50 US states.`, canonical, body);
}

export function aboutUsPage() {
  const canonical = `https://${DOMAIN}/about-us/`;
  const body = `<main><section class="page-hero"><div class="wrap"><h1>Your Neighbors in the <span>Water &amp; Mold Restoration</span> Business</h1></div></section></main>`;
  return shell(`About Us | ${BRAND}`, "Learn about Mold Inspection Pennsylvania & USA Network.", canonical, body);
}

export function contactUsPage() {
  const canonical = `https://${DOMAIN}/contact-us/`;
  const body = `<main><section class="page-hero"><div class="wrap"><h1>Get In Touch for <span>Fast Service</span></h1></div></section></main>`;
  return shell(`Contact Us | ${BRAND}`, "Contact us.", canonical, body);
}

export function linkSheetPage() {
  const canonical = `https://${DOMAIN}/link-sheet/`;
  const body = `<main><section class="page-hero"><div class="wrap"><h1>LinkSheet Hub</h1></div></section></main>`;
  return shell("Xagio LinkSheet", "LinkSheet.", canonical, body);
}

export function notFoundPage(message: string) {
  return `<!doctype html><html><head><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width,initial-scale=1"><title>404 | ${BRAND}</title><style>${CSS}</style></head><body>${header()}<main class="sec-dark"><div class="wrap"><h1>404</h1><p>${esc(message)}</p><a class="btn-cta" href="https://${DOMAIN}/">Back to Home</a></div></main>${footer()}</body></html>`;
}
