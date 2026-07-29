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

.btn-cta{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:12px 24px;border-radius:14px;background:linear-gradient(135deg,#10b981,#059669);color:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:16px;box-shadow:0 8px 24px rgba(16,185,129,.35);transition:.25s;border:none;cursor:pointer}
.btn-cta:hover{transform:translateY(-2px);box-shadow:0 14px 32px rgba(16,185,129,.5);background:linear-gradient(135deg,#34d399,#10b981)}
.btn-cyan{background:linear-gradient(135deg,#0ea5e9,#0284c7);box-shadow:0 8px 24px rgba(14,165,233,.35)}
.btn-cyan:hover{background:linear-gradient(135deg,#38bdf8,#0ea5e9)}
.btn-dark-navy{background:#0d1b2a;color:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;padding:14px 28px;border-radius:14px;display:inline-flex;align-items:center;gap:8px;font-size:16px;transition:.2s;box-shadow:0 8px 20px rgba(0,0,0,.2)}
.btn-dark-navy:hover{transform:translateY(-2px);background:#14263b}
.btn-glass-cyan{background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.4);color:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;padding:14px 28px;border-radius:14px;display:inline-flex;align-items:center;gap:8px;font-size:16px;transition:.2s;backdrop-filter:blur(8px)}
.btn-glass-cyan:hover{background:rgba(255,255,255,.3);transform:translateY(-2px)}
.btn-secondary{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);color:#fff;box-shadow:none}
.btn-secondary:hover{background:rgba(255,255,255,.18)}

/* HERO & FORM */
.hero{position:relative;padding:70px 0 80px;background:linear-gradient(rgba(13,27,42,.85),rgba(13,27,42,.92)),url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1920&q=80') center/cover no-repeat;overflow:hidden}
.hero-grid{display:grid;grid-template-columns:1.08fr .92fr;gap:50px;align-items:center}
.hero h1{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(38px,5vw,58px);font-weight:900;line-height:1.1;letter-spacing:-.03em;margin:14px 0;color:#fff}
.hero h1 span{color:#38bdf8}
.hero-desc{font-size:17px;line-height:1.7;color:#cbd5e1;margin-bottom:24px}
.hero-badge-bar{display:flex;gap:20px;margin-top:30px;padding-top:20px;border-top:1px solid rgba(255,255,255,.12);font-size:13px;font-weight:700;color:#38bdf8}

.card-form-hero{background:#fff;border-radius:20px;padding:30px;box-shadow:0 24px 60px rgba(0,0,0,.5);color:#0f172a}
.card-form-hero h2{font-family:'Plus Jakarta Sans',sans-serif;font-size:22px;font-weight:900;margin:0 0 6px;color:#0d1b2a}
.card-form-hero p{font-size:13px;color:#64748b;margin:0 0 18px}
.form-field{margin-bottom:14px}
.form-field input,.form-field select,.form-field textarea{width:100%;padding:12px 16px;border-radius:10px;border:1px solid #cbd5e1;background:#f8fafc;color:#0f172a;font-size:14px;outline:none;transition:.2s}
.form-field input:focus,.form-field select:focus,.form-field textarea:focus{border-color:#0ea5e9;background:#fff;box-shadow:0 0 0 3px rgba(14,165,233,.2)}

/* STATS COUNTER BAR */
.stats-bar-light{background:#f8fafc;border-bottom:1px solid #e2e8f0;padding:26px 0;color:#0f172a}
.stats-grid-light{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;text-align:center}
.stat-item-light h3{font-family:'Plus Jakarta Sans',sans-serif;font-size:32px;font-weight:900;color:#0ea5e9;margin:0}
.stat-item-light p{font-size:13px;font-weight:700;color:#64748b;margin:4px 0 0;text-transform:uppercase;letter-spacing:.05em}

/* SECTIONS & CARDS */
.sec-white{background:#fff;color:#0f172a;padding:84px 0}
.sec-dark{background:#0d1b2a;color:#fff;padding:84px 0}
.sec-slate{background:#14263b;color:#fff;padding:84px 0}

.tag-badge{display:inline-block;padding:6px 14px;border-radius:999px;background:#e0f2fe;color:#0284c7;font-size:12px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;margin-bottom:12px}
.tag-badge-dark{background:rgba(14,165,233,.15);color:#38bdf8}

.sec-title{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(30px,4vw,44px);font-weight:900;line-height:1.15;margin:0 0 14px;letter-spacing:-.03em}
.sec-subtitle{font-size:16px;color:#64748b;max-width:720px;line-height:1.68}
.sec-subtitle-dark{color:#94a3b8}

.about-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}
.about-img{width:100%;border-radius:20px;box-shadow:0 20px 50px rgba(0,0,0,.15);object-fit:cover;height:420px}

.service-card-light{background:#fff;border:1px solid #e2e8f0;border-radius:18px;padding:26px;box-shadow:0 10px 30px rgba(0,0,0,.04);transition:.25s;display:flex;flex-direction:column;justify-content:space-between}
.service-card-light:hover{transform:translateY(-5px);border-color:#0ea5e9;box-shadow:0 18px 40px rgba(14,165,233,.15)}
.service-card-light h3{font-family:'Plus Jakarta Sans',sans-serif;font-size:20px;font-weight:800;color:#0d1b2a;margin:14px 0 8px}
.service-card-light p{color:#64748b;font-size:14px;line-height:1.65;margin:0 0 16px}
.service-card-light a{color:#0ea5e9;font-weight:800;font-size:14px}

.why-card{background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:22px;margin-bottom:16px}
.why-card h4{font-family:'Plus Jakarta Sans',sans-serif;font-size:18px;font-weight:800;color:#0d1b2a;margin:0 0 6px}
.why-card p{color:#64748b;font-size:14px;line-height:1.6;margin:0}

.testimonial-card{background:#14263b;border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:28px;box-shadow:0 12px 30px rgba(0,0,0,.3)}
.testimonial-card p{color:#cbd5e1;font-size:15px;line-height:1.7;font-style:italic}
.user-info{display:flex;align-items:center;gap:12px;margin-top:20px}
.user-avatar{width:42px;height:42px;border-radius:50%;background:#0ea5e9;color:#fff;font-weight:800;display:grid;place-items:center;font-size:16px}

.faq-container{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center}
.faq-box{background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:20px;margin-bottom:14px}
.faq-box h4{font-family:'Plus Jakarta Sans',sans-serif;font-size:17px;font-weight:800;color:#0d1b2a;margin:0 0 8px}
.faq-box p{color:#64748b;font-size:14px;line-height:1.6;margin:0}

.article-card{background:#fff;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.05);transition:.25s}
.article-card:hover{transform:translateY(-5px);box-shadow:0 18px 40px rgba(0,0,0,.1)}
.article-img{width:100%;height:180px;object-fit:cover}
.article-body{padding:22px}
.article-body h4{font-family:'Plus Jakarta Sans',sans-serif;font-size:18px;font-weight:800;color:#0d1b2a;margin:8px 0}
.article-body p{color:#64748b;font-size:14px;line-height:1.6;margin:0 0 14px}

.map-container{border-radius:24px;overflow:hidden;border:1px solid rgba(255,255,255,.14);box-shadow:0 20px 50px rgba(0,0,0,.5);margin-top:28px}

.dir-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.dir-card{display:flex;align-items:center;justify-space:space-between;padding:18px 20px;background:#14263b;border:1px solid rgba(255,255,255,.1);border-radius:14px;color:#f1f5f9;font-weight:700;font-size:14px;transition:.2s}
.dir-card:hover{transform:translateY(-3px);border-color:#0ea5e9;color:#38bdf8}

/* FOOTER STYLES */
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
@media(max-width:960px){.nav-links{display:none}.hero-grid,.about-grid,.faq-container{grid-template-columns:1fr}.grid-3,.dir-grid{grid-template-columns:repeat(2,1fr)}.footer-grid,.footer-cta-flex{grid-template-columns:1fr;flex-direction:column;align-items:start}}
@media(max-width:640px){.hero{padding:60px 0}.hero h1{font-size:36px}.grid-3,.dir-grid,.footer-grid,.stats-grid-light{grid-template-columns:1fr}.sticky-bar{left:16px;right:16px;bottom:16px}.btn-cta{width:100%}}
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
        <h2>Emergency Water or Mold Damage? Call Now.</h2>
        <p>Same-day emergency restoration service across Pennsylvania &amp; USA. Friendly, licensed &amp; upfront.</p>
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

function mapEmbedHtml(query: string, height = 380): string {
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=12&ie=UTF8&iwloc=&output=embed`;
  return `<div class="map-container"><iframe width="100%" height="${height}" style="border:0;border-radius:20px;filter:contrast(1.05) brightness(0.95);" loading="lazy" allowfullscreen src="${mapUrl}"></iframe></div>`;
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

  const statePills = states.slice(0, 10).map(s => `<a class="dir-card" href="https://${s.slug}.${DOMAIN}/"><span>📍 ${esc(s.name)}</span></a>`).join("");

  const body = `<main>
  <!-- 1. HERO SECTION -->
  <section class="hero">
    <div class="wrap hero-grid">
      <div>
        <div style="font-size:14px;color:#38bdf8;font-weight:800;margin-bottom:12px;">★ ★ ★ ★ ★ 4.9/5 Rated Restoration Authority</div>
        <h1>Emergency Water &amp; Mold Restoration <span>Pennsylvania</span></h1>
        <p class="hero-desc">Rapid 30-minute arrival for water damage extraction, toxic black mold removal, and fire restoration across Pennsylvania &amp; nationwide.</p>
        <div style="display:flex;gap:14px;">
          <a class="btn-cta" href="${PHONE_HREF}">📞 Call ${PHONE_DISPLAY}</a>
          <a class="btn-cta btn-secondary" href="https://${DOMAIN}/contact-us/">Get Free Estimate</a>
        </div>
        <div class="hero-badge-bar">
          <span>🛡️ Top Rated Technicians</span>
          <span>⚡ 30-Min Fast Arrival</span>
          <span>💳 Direct Insurance Billing</span>
        </div>
      </div>
      <div>
        <div class="card-form-hero">
          <h2>Request Emergency Inspection</h2>
          <p>Instant price estimate &amp; 30-min technician dispatch.</p>
          <form action="${PHONE_HREF}" method="GET">
            <div class="form-field"><input type="text" placeholder="Your Full Name *" required></div>
            <div class="form-field"><input type="tel" placeholder="Phone Number *" required></div>
            <div class="form-field"><input type="text" placeholder="Zip Code / Location *" required></div>
            <div class="form-field">
              <select required>
                <option value="">Select Service Needed *</option>
                <option>Black Mold Removal &amp; Inspection</option>
                <option>Emergency Water Damage Extraction</option>
                <option>Fire &amp; Smoke Damage Restoration</option>
                <option>Basement Waterproofing &amp; Drying</option>
              </select>
            </div>
            <button type="submit" class="btn-cta" style="width:100%;">Get Estimate Now →</button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- 2. STATS COUNTER BAR -->
  <section class="stats-bar-light">
    <div class="wrap stats-grid-light">
      <div class="stat-item-light"><h3>22+</h3><p>Years Experience</p></div>
      <div class="stat-item-light"><h3>5,000+</h3><p>Projects Completed</p></div>
      <div class="stat-item-light"><h3>5.0★</h3><p>Overall Rating</p></div>
      <div class="stat-item-light"><h3>30 min</h3><p>Fast Arrival</p></div>
    </div>
  </section>

  <!-- 3. ABOUT US SECTION -->
  <section class="sec-white">
    <div class="wrap about-grid">
      <div>
        <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80" alt="Restoration Crew" class="about-img">
      </div>
      <div>
        <span class="tag-badge">ABOUT US</span>
        <h2 class="sec-title">Your Trusted Water &amp; Mold Restoration Experts in Pennsylvania</h2>
        <p style="color:#475569;font-size:15px;line-height:1.7;">Founded with a commitment to environmental safety and rapid structural drying, Mold Inspection Pennsylvania provides certified 24/7 emergency response across all 50 US states &amp; 30,900+ cities.</p>
        <div style="margin:20px 0;font-size:15px;font-weight:700;color:#0d1b2a;display:grid;gap:10px;">
          <div>✔ 24/7 Rapid Emergency Response Guarantee</div>
          <div>✔ IICRC Certified Master Technicians</div>
          <div>✔ FLIR Infrared Thermal Moisture Scanning</div>
          <div>✔ Direct Billing to All Insurance Companies</div>
        </div>
        <a class="btn-cta btn-cyan" href="https://${DOMAIN}/about-us/">Learn More About Us →</a>
      </div>
    </div>
  </section>

  <!-- 4. OUR SERVICES GRID -->
  <section class="sec-slate">
    <div class="wrap">
      <div style="text-align:center;margin-bottom:48px;">
        <span class="tag-badge tag-badge-dark">OUR SERVICES</span>
        <h2 class="sec-title">Our Water Damage &amp; Mold Restoration Services in Pennsylvania</h2>
        <p class="sec-subtitle sec-subtitle-dark" style="margin:auto;">Full-service environmental remediation, structural drying, and emergency fire damage restoration.</p>
      </div>
      <div class="grid-3">
        <div class="service-card-light">
          <div>
            <div style="font-size:32px;">🍄</div>
            <h3>Emergency Mold Remediation</h3>
            <p>Complete toxic black mold removal, containment chambers, and HEPA air scrubbing.</p>
          </div>
          <a href="https://${DOMAIN}/services/emergency-mold-remediation/">Read More →</a>
        </div>
        <div class="service-card-light">
          <div>
            <div style="font-size:32px;">💧</div>
            <h3>Water Damage Restoration</h3>
            <p>Fast water extraction, flooded basement pump-outs, and dehumidification.</p>
          </div>
          <a href="https://${DOMAIN}/services/emergency-water-damage-restoration/">Read More →</a>
        </div>
        <div class="service-card-light">
          <div>
            <div style="font-size:32px;">🔥</div>
            <h3>Fire &amp; Smoke Damage Cleanup</h3>
            <p>Soot removal, structural deodorization, and fire loss restoration.</p>
          </div>
          <a href="https://${DOMAIN}/services/fire-damage-restoration-cleanup/">Read More →</a>
        </div>
        <div class="service-card-light">
          <div>
            <div style="font-size:32px;">💨</div>
            <h3>Structural Dehumidification</h3>
            <p>Industrial desiccant drying and thermal moisture tracking inside walls.</p>
          </div>
          <a href="https://${DOMAIN}/services/dehumidifier-equipment-rental/">Read More →</a>
        </div>
        <div class="service-card-light">
          <div>
            <div style="font-size:32px;">🔬</div>
            <h3>Indoor Air Quality Testing</h3>
            <p>Certified spore trap sampling and accredited lab air analysis.</p>
          </div>
          <a href="https://${DOMAIN}/services/mold-testing/">Read More →</a>
        </div>
        <div class="service-card-light">
          <div>
            <div style="font-size:32px;">🏚️</div>
            <h3>Crawl Space Remediation</h3>
            <p>Vapor barrier encapsulation and sub-floor mold decontamination.</p>
          </div>
          <a href="https://${DOMAIN}/services/crawl-space-mold-remediation/">Read More →</a>
        </div>
      </div>
      <div style="text-align:center;margin-top:40px;">
        <a class="btn-cta btn-cyan" href="https://${DOMAIN}/services/">View All 70 Services →</a>
      </div>
    </div>
  </section>

  <!-- 5. WHY CHOOSE US -->
  <section class="sec-white">
    <div class="wrap about-grid">
      <div>
        <span class="tag-badge">WHY CHOOSE US</span>
        <h2 class="sec-title">Why Choose Mold Inspection Pennsylvania?</h2>
        <div class="why-card">
          <h4>24/7 Rapid Emergency Response</h4>
          <p>We arrive in 30 minutes or less with heavy-duty extraction trucks ready to stop water damage.</p>
        </div>
        <div class="why-card">
          <h4>Master Certified Technicians</h4>
          <p>Our team holds IICRC master certifications for water, mold, fire, and structural drying.</p>
        </div>
        <div class="why-card">
          <h4>Advanced FLIR Moisture Scanners</h4>
          <p>We discover hidden leaks inside subfloors and drywall using thermal infrared cameras.</p>
        </div>
      </div>
      <div>
        <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80" alt="Technician Working" class="about-img">
      </div>
    </div>
  </section>

  <!-- 6. TESTIMONIALS -->
  <section class="sec-dark">
    <div class="wrap">
      <div style="text-align:center;margin-bottom:48px;">
        <span class="tag-badge tag-badge-dark">TESTIMONIALS</span>
        <h2 class="sec-title">What Pennsylvania Residents Say About Us</h2>
      </div>
      <div class="grid-3">
        <div class="testimonial-card">
          <div style="color:#fbbf24;font-size:18px;">★★★★★</div>
          <p>"They arrived within 25 minutes after our basement flooded. Excellent mold removal and thermal inspection!"</p>
          <div class="user-info">
            <div class="user-avatar">JD</div>
            <div><b style="color:#fff;">John D.</b><br><small style="color:#94a3b8;">Philadelphia, PA</small></div>
          </div>
        </div>
        <div class="testimonial-card">
          <div style="color:#fbbf24;font-size:18px;">★★★★★</div>
          <p>"Extremely professional team! Handled our insurance claim directly and completely removed black mold from our attic."</p>
          <div class="user-info">
            <div class="user-avatar">MS</div>
            <div><b style="color:#fff;">Maria S.</b><br><small style="color:#94a3b8;">Pittsburgh, PA</small></div>
          </div>
        </div>
        <div class="testimonial-card">
          <div style="color:#fbbf24;font-size:18px;">★★★★★</div>
          <p>"Fast, honest, and upfront pricing. The thermal camera inspection gave us complete peace of mind."</p>
          <div class="user-info">
            <div class="user-avatar">RK</div>
            <div><b style="color:#fff;">Robert K.</b><br><small style="color:#94a3b8;">Allentown, PA</small></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 7. FAQS SECTION -->
  <section class="sec-white">
    <div class="wrap faq-container">
      <div>
        <span class="tag-badge">COMMON QUESTIONS</span>
        <h2 class="sec-title">Water Damage &amp; Mold Restoration FAQs</h2>
        <div class="faq-box">
          <h4>How fast can a technician arrive at my property?</h4>
          <p>Our emergency response crews are dispatched 24/7/365 and guarantee a fast 30-minute arrival across Pennsylvania and nationwide.</p>
        </div>
        <div class="faq-box">
          <h4>Will my homeowner insurance cover water &amp; mold damage?</h4>
          <p>Yes! We work directly with all major insurance carriers and provide Xactimate line-item estimate scoping to streamline your claim.</p>
        </div>
        <div class="faq-box">
          <h4>Is thermal moisture leak testing included?</h4>
          <p>Yes, all emergency inspections deploy high-resolution FLIR thermal infrared cameras to map hidden moisture in subfloors and drywall.</p>
        </div>
      </div>
      <div>
        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" alt="Support Rep" class="about-img">
      </div>
    </div>
  </section>

  <!-- 8. SERVICE AREAS -->
  <section class="sec-dark">
    <div class="wrap">
      <div style="text-align:center;margin-bottom:44px;">
        <span class="tag-badge tag-badge-dark">SERVICE AREAS</span>
        <h2 class="sec-title">Water Damage &amp; Mold Restoration in Pennsylvania &amp; Surrounding Areas</h2>
        <p class="sec-subtitle sec-subtitle-dark" style="margin:auto;">Explore local city subdomains and emergency restoration coverage.</p>
      </div>
      <div class="dir-grid">${statePills}</div>
      <div style="text-align:center;margin-top:36px;display:flex;justify-content:center;gap:16px;">
        <a class="btn-cta" href="${PHONE_HREF}">Call Us 24/7</a>
        <a class="btn-cta btn-secondary" href="https://${DOMAIN}/areas-we-serve/">View All Service Areas</a>
      </div>
    </div>
  </section>

  <!-- 9. GOOGLE MAP & GET IN TOUCH -->
  <section class="sec-slate">
    <div class="wrap about-grid">
      <div>
        ${mapEmbedHtml("236 Long Park Dr, Rochester, NY 14612", 400)}
      </div>
      <div style="background:#0d1b2a;padding:32px;border-radius:20px;border:1px solid rgba(255,255,255,.12);">
        <span class="tag-badge tag-badge-dark">GET IN TOUCH</span>
        <h3 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:24px;color:#fff;margin:6px 0 16px;">National Service Headquarters</h3>
        <p style="color:#94a3b8;font-size:15px;line-height:1.7;">📍 236 Long Park Dr, Rochester, NY 14612<br>📞 <a href="${PHONE_HREF}" style="color:#38bdf8;font-weight:800;">${PHONE_DISPLAY}</a><br>✉️ dispatch@${DOMAIN}<br>🕒 Mon–Sun: 24 Hours Open / 365 Days</p>
        <div style="display:flex;gap:12px;margin-top:24px;">
          <a class="btn-cta" href="${PHONE_HREF}">Call Now</a>
          <a class="btn-cta btn-secondary" href="https://maps.google.com/?q=236+Long+Park+Dr,+Rochester,+NY+14612" target="_blank">Get Directions</a>
        </div>
      </div>
    </div>
  </section>
  </main>`;

  return shell(`${BRAND} | 24/7 Water, Fire & Mold Restoration`, `Pennsylvania &amp; USA nationwide 24/7 emergency water damage restoration, mold remediation, air testing, and fire damage cleanup across all 50 US states.`, canonical, body, schema);
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

  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><div class="crumb-trail"><a href="https://${DOMAIN}/">Home</a> / Contact Us</div><span class="eyebrow-badge">24/7 Emergency Response</span><h1>Contact Our <span>Restoration Experts</span></h1><p class="hero-desc">Have a water leak, toxic black mold outbreak, or fire damage emergency? Contact our 24/7 national dispatch center for immediate inspection and rapid response.</p><div class="rating-pill"><span class="stars">★★★★★</span><span>24/7 Live Dispatch Operators Standing By</span></div><div style="margin-top:32px;"><a class="btn-cta" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></div></div><div><div class="card-form-hero"><h2>Request Immediate Inspection</h2><form action="${PHONE_HREF}" method="GET"><div class="form-field"><input type="text" placeholder="Your Name *" required></div><div class="form-field"><input type="tel" placeholder="Phone Number *" required></div><div class="form-field"><textarea rows="3" placeholder="Describe damage..."></textarea></div><button type="submit" class="btn-cta" style="width:100%;">Submit &amp; Call ${PHONE_DISPLAY}</button></form></div></div></div></section><section class="sec-dark"><div class="wrap"><div class="sec-head"><span class="sec-tag">Dispatch Map</span><h2>Our Headquarters &amp; Service Radius</h2></div>${mapEmbedHtml("236 Long Park Dr, Rochester, NY 14612", 420)}</div></section></main>`;
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

  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><div class="crumb-trail"><a href="https://${DOMAIN}/">Home</a> / About Us</div><span class="eyebrow-badge">22-Year Established Trust (Est. 2004)</span><h1>About Mold Inspection Pennsylvania &amp; <span>USA Network</span></h1><p class="hero-desc">Founded with a commitment to indoor environmental safety and rapid structural drying, Mold Inspection Pennsylvania has grown into America's premier 24/7 emergency restoration network operating across all 50 US states &amp; 30,900+ cities.</p><div style="margin-top:32px;"><a class="btn-cta" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></div></div><div><img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80" style="width:100%;border-radius:20px;"></div></div></section></main>`;
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

  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><div class="crumb-trail"><a href="https://${DOMAIN}/areas-we-serve/">Areas We Serve</a> / <a href="https://${state.slug}.${DOMAIN}/">${esc(state.name)}</a> / ${esc(cityName)}</div><span class="eyebrow-badge">Emergency Restoration Dispatch</span><h1>24/7 Mold &amp; Water Restoration in <span>${esc(cityName)}, ${esc(state.name)}</span></h1><p class="hero-desc">Our certified restoration technicians operate 24/7 in ${esc(cityName)}. Explore our complete 70-service directory for ${esc(cityName)}, review thermal moisture leak assessments, and request immediate inspection.</p><div style="display:flex;gap:14px;margin-top:32px;"><a class="btn-cta" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a><a class="btn-cta btn-secondary" href="#services">Browse All 70 Services</a></div></div><div><div class="card-form-hero"><h2>Request Local Inspection in ${esc(cityName)}</h2><form action="${PHONE_HREF}" method="GET"><div class="form-field"><input type="text" placeholder="Your Name *" required></div><div class="form-field"><input type="tel" placeholder="Phone Number *" required></div><button type="submit" class="btn-cta" style="width:100%;">Submit &amp; Call ${PHONE_DISPLAY}</button></form></div></div></div></section><section class="sec-dark"><div class="wrap"><div class="sec-head"><span class="sec-tag">Local Coverage Map</span><h2>Emergency Restoration Radius in ${esc(cityName)}, ${esc(state.name)}</h2></div>${mapEmbedHtml(`${cityName}, ${state.name}`, 380)}</div></section></main>`;
  return shell(`Water &amp; Mold Restoration in ${cityName}, ${state.name} | ${BRAND}`, `Browse 70 mold removal, water damage extraction, and fire restoration topics for ${cityName}, ${state.name}.`, canonical, body, schema);
}

export function statePage(state: StateItem) {
  const stateSlug = state.slug || state.code.toLowerCase();
  const canonical = `https://${stateSlug}.${DOMAIN}/`;
  const cities = state.cities || [];

  const cityDirectoryHtml = cities
    .map(([slug, name]) => `<a class="dir-card" href="https://${slug}-${stateSlug}.${DOMAIN}/"><span>📍 ${esc(name)}</span></a>`)
    .join("");

  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><div class="crumb-trail"><a href="https://${DOMAIN}/areas-we-serve/">Areas We Serve</a> / ${esc(state.name)}</div><span class="eyebrow-badge">${esc(state.name)} State Network</span><h1>24/7 Mold &amp; Water Restoration in <span>${esc(state.name)}</span></h1><p class="hero-desc">Comprehensive emergency water damage extraction, black mold remediation, and fire damage cleanup serving all cities across ${esc(state.name)}.</p><div style="margin-top:32px;"><a class="btn-cta" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></div></div><div><div class="card-form-hero"><h2>Request State Inspection</h2><form action="${PHONE_HREF}" method="GET"><div class="form-field"><input type="text" placeholder="Your Name *" required></div><div class="form-field"><input type="tel" placeholder="Phone Number *" required></div><button type="submit" class="btn-cta" style="width:100%;">Submit &amp; Call ${PHONE_DISPLAY}</button></form></div></div></div></section><section class="sec-dark"><div class="wrap"><div class="sec-head"><span class="sec-tag">Cities Served</span><h2>Select Your City in ${esc(state.name)}</h2></div><div class="dir-grid">${cityDirectoryHtml}</div><div class="sec-head" style="margin-top:54px;margin-bottom:16px;"><span class="sec-tag">State Coverage Map</span><h2>${esc(state.name)} Regional Service Radius</h2></div>${mapEmbedHtml(`${state.name}, USA`, 380)}</div></section></main>`;
  return shell(`Mold &amp; Water Restoration in ${state.name} | ${BRAND}`, `24/7 emergency mold inspection, water damage extraction, and fire restoration across ${state.name}.`, canonical, body);
}

export function nationalServicePage(service: (typeof services)[number]) {
  const canonical = `https://${DOMAIN}/services/${service.slug}/`;
  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><div class="crumb-trail"><a href="https://${DOMAIN}/">Home</a> / <a href="https://${DOMAIN}/services/">Services</a> / ${esc(service.name)}</div><span class="eyebrow-badge">${esc(service.category)} Restoration</span><h1>24/7 <span>${esc(service.name)}</span></h1><p class="hero-desc">${esc(service.description)} Certified inspectors, thermal moisture detection, and HEPA air scrubbing deployed 24/7 across all 50 US states.</p><div style="margin-top:32px;"><a class="btn-cta" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></div></div><div><div class="card-form-hero"><h2>Request Estimate for ${esc(service.name)}</h2><form action="${PHONE_HREF}" method="GET"><div class="form-field"><input type="text" placeholder="Your Name *" required></div><div class="form-field"><input type="tel" placeholder="Phone Number *" required></div><button type="submit" class="btn-cta" style="width:100%;">Submit &amp; Call ${PHONE_DISPLAY}</button></form></div></div></div></section></main>`;
  return shell(`${service.name} | 24/7 Emergency Service | ${BRAND}`, `${service.description} Fast 24/7 dispatch nationwide across all 50 US states.`, canonical, body);
}

export function localServicePage(state: StateItem, city: [string, string], service: (typeof services)[number], host: string) {
  const [, cityName] = city;
  const canonical = `https://${host}/${service.slug}/`;
  const body = `<main><section class="hero"><div class="wrap hero-grid"><div><div class="crumb-trail"><a href="https://${state.slug}.${DOMAIN}/">${esc(state.name)}</a> / <a href="https://${host}/">${esc(cityName)}</a> / ${esc(service.name)}</div><span class="eyebrow-badge">${esc(service.category)} Restoration</span><h1>${esc(service.name)} in <span>${esc(cityName)}, ${esc(state.name)}</span></h1><p class="hero-desc">${esc(service.description)} Local 24/7 emergency dispatch crews stationed directly in ${esc(cityName)}.</p><div style="margin-top:32px;"><a class="btn-cta" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></div></div><div><div class="card-form-hero"><h2>Request Inspection in ${esc(cityName)}</h2><form action="${PHONE_HREF}" method="GET"><div class="form-field"><input type="text" placeholder="Your Name *" required></div><div class="form-field"><input type="tel" placeholder="Phone Number *" required></div><button type="submit" class="btn-cta" style="width:100%;">Submit &amp; Call ${PHONE_DISPLAY}</button></form></div></div></div></section></main>`;
  return shell(`${service.name} in ${cityName}, ${state.name} | ${BRAND}`, `${service.description} Review local restoration info for ${cityName}, ${state.name}.`, canonical, body);
}

export function servicesHubPage() {
  const canonical = `https://${DOMAIN}/services/`;
  const serviceCardsHtml = services.map((s, idx) => `<a class="service-card-light" href="https://${DOMAIN}/${s.slug}/"><div><div style="font-size:24px;">💧</div><h3>${esc(s.name)}</h3><p>${esc(s.description)}</p></div><span style="color:#0ea5e9;font-weight:800;">Read More →</span></a>`).join("");
  const body = `<main><section class="hero"><div class="wrap"><h1>24/7 Water, Fire &amp; Mold <span>Restoration Services</span></h1></div></section><section class="sec-slate"><div class="wrap"><div class="grid-3">${serviceCardsHtml}</div></div></section></main>`;
  return shell(`Restoration Services Directory | All 70 Topics | ${BRAND}`, "Browse all 70 water damage extraction, toxic black mold remediation, and fire restoration services offered nationwide.", canonical, body);
}

export function areasWeServePage(states: StateItem[]) {
  const canonical = `https://${DOMAIN}/areas-we-serve/`;
  const allDirectoryHtml = states.map((s) => `<a class="dir-card" href="https://${s.slug}.${DOMAIN}/"><span>📍 ${esc(s.name)}</span></a>`).join("");
  const body = `<main><section class="hero"><div class="wrap"><h1>Water, Fire &amp; Mold Restoration Across <span>USA &amp; Pennsylvania</span></h1></div></section><section class="sec-dark"><div class="wrap"><div class="dir-grid">${allDirectoryHtml}</div></div></section></main>`;
  return shell(`Service Areas | 50-State Restoration Directory | ${BRAND}`, "Explore 24/7 water damage, black mold remediation, and fire restoration service areas across all 50 US states.", canonical, body);
}

export function linkSheetPage() {
  const canonical = `https://${DOMAIN}/link-sheet/`;
  const body = `<main><section class="hero"><div class="wrap"><h1>pSEO Network Authority &amp; LinkSheet</h1></div></section></main>`;
  return shell("Xagio pSEO LinkSheet Authority Hub", "Official interlinking LinkSheet directory.", canonical, body);
}

export function articlesHubPage() {
  const canonical = `https://${DOMAIN}/articles/`;
  const body = `<main><section class="hero"><div class="wrap"><h1>Restoration Safety &amp; Inspection Guides</h1></div></section></main>`;
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
