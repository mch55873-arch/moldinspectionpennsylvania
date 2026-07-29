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
.btn-secondary{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);color:#fff;box-shadow:none}
.btn-secondary:hover{background:rgba(255,255,255,.18)}

/* ABOUT US SPECIFIC STYLES */
.about-hero{position:relative;padding:76px 0 88px;background:#0d1b2a;overflow:hidden}
.about-hero h1{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(38px,5vw,56px);font-weight:900;line-height:1.1;margin:16px 0 14px;color:#fff;max-width:800px;letter-spacing:-.03em}
.about-hero h1 span{color:#38bdf8}
.crumb-trail{font-size:14px;color:#38bdf8;font-weight:700;margin-bottom:14px}
.crumb-trail a{color:#94a3b8;transition:.2s}.crumb-trail a:hover{color:#fff}

.story-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}
.story-img-container{position:relative}
.story-img{width:100%;border-radius:20px;box-shadow:0 20px 50px rgba(0,0,0,.12);object-fit:cover;height:440px}
.trust-badge-overlay{position:absolute;bottom:24px;left:24px;background:#fff;border-radius:14px;padding:14px 20px;box-shadow:0 12px 30px rgba(0,0,0,.15);display:flex;align-items:center;gap:12px;color:#0d1b2a;font-weight:800;font-size:14px}

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

/* GENERAL SECTIONS & FOOTER */
.sec-white{background:#fff;color:#0f172a;padding:84px 0}
.sec-dark{background:#0d1b2a;color:#fff;padding:84px 0}
.sec-slate{background:#14263b;color:#fff;padding:84px 0}
.sec-gray{background:#f8fafc;color:#0f172a;padding:84px 0}

.tag-badge{display:inline-block;padding:6px 14px;border-radius:999px;background:#e0f2fe;color:#0284c7;font-size:12px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;margin-bottom:12px}
.sec-title{font-family:'Plus Jakarta Sans',sans-serif;font-size:clamp(30px,4vw,44px);font-weight:900;line-height:1.15;margin:0 0 14px;letter-spacing:-.03em}

.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.dir-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.dir-card{display:flex;align-items:center;justify-space:space-between;padding:18px 20px;background:#14263b;border:1px solid rgba(255,255,255,.1);border-radius:14px;color:#f1f5f9;font-weight:700;font-size:14px;transition:.2s}
.dir-card:hover{transform:translateY(-3px);border-color:#0ea5e9;color:#38bdf8}

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
@media(max-width:960px){.nav-links{display:none}.story-grid,.grid-3,.grid-4{grid-template-columns:1fr 1fr}.footer-grid,.footer-cta-flex{grid-template-columns:1fr;flex-direction:column;align-items:start}}
@media(max-width:640px){.grid-3,.grid-4,.dir-grid,.story-grid{grid-template-columns:1fr}.sticky-bar{left:16px;right:16px;bottom:16px}.btn-cta{width:100%}}
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
        <a href="https://${DOMAIN}/about-us/" class="nav-pill">About</a>
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
        <h2>Experience the Difference Yourself</h2>
        <p>Join thousands of happy Pennsylvania homeowners. Call today.</p>
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

function mapEmbedHtml(query: string, height = 320): string {
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=12&ie=UTF8&iwloc=&output=embed`;
  return `<div style="border-radius:18px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 10px 30px rgba(0,0,0,.08);"><iframe width="100%" height="${height}" style="border:0;border-radius:18px;filter:contrast(1.05) brightness(0.95);" loading="lazy" allowfullscreen src="${mapUrl}"></iframe></div>`;
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

  const body = `<main>
  <!-- HERO SECTION -->
  <section class="about-hero">
    <div class="wrap">
      <div class="crumb-trail"><a href="https://${DOMAIN}/">Home</a> / About</div>
      <h1>Your Neighbors in the <span>Water &amp; Mold Restoration</span> Business</h1>
      <p style="font-size:18px;line-height:1.75;color:#cbd5e1;max-width:700px;margin-bottom:0;">Family-owned, licensed and rooted in Pennsylvania since 2004. We've built our reputation one honest job at a time.</p>
    </div>
  </section>

  <!-- 1. OUR STORY SECTION -->
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
      <div class="story-img-container">
        <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80" alt="Restoration Interior" class="story-img">
        <div class="trust-badge-overlay">
          <div style="font-size:22px;color:#0ea5e9;">🛡️</div>
          <div>Licensed &amp; Insured<br><small style="color:#64748b;font-weight:600;">Master Certified Network</small></div>
        </div>
      </div>
    </div>
  </section>

  <!-- 2. WHAT WE STAND FOR -->
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
          <p>If it can be dried and sanitized without full tear-out, we'll tell you. We never upsell a replacement or remediation you don't need.</p>
        </div>
        <div class="promise-card">
          <div class="promise-icon">⚡</div>
          <h3>Show Up Fast</h3>
          <p>24/7 same-day and emergency dispatch service because water damage and toxic mold spores can't wait.</p>
        </div>
        <div class="promise-card">
          <div class="promise-icon">🏷️</div>
          <h3>Fair, Upfront Pricing</h3>
          <p>Flat-rate quotes you approve before we start. No hidden surprises or extra charges on the bill.</p>
        </div>
        <div class="promise-card">
          <div class="promise-icon">🛡️</div>
          <h3>Respect Your Home</h3>
          <p>Floor protection, negative-pressure HEPA containment chambers, and thorough cleanup on every single project.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 3. MEET THE TEAM -->
  <section class="sec-white">
    <div class="wrap">
      <div style="text-align:center;margin-bottom:48px;">
        <span class="tag-badge">MEET THE TEAM</span>
        <h2 class="sec-title" style="color:#0d1b2a;">The People Who Show Up</h2>
        <p style="color:#64748b;font-size:16px;max-width:680px;margin:auto;">Background-checked, master-certified, and genuinely friendly restoration professionals.</p>
      </div>
      <div class="grid-3">
        <div class="team-card">
          <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80" alt="Mike Alvarez" class="team-img">
          <h3>Mike Alvarez</h3>
          <span>Owner / Master Restoration Specialist</span>
          <p>Founded the company in 2004. 20+ years of environmental remediation and structural drying experience.</p>
        </div>
        <div class="team-card">
          <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80" alt="David Chen" class="team-img">
          <h3>David Chen</h3>
          <span>Lead Inspection Technician</span>
          <p>Thermal moisture scanning specialist, certified in IICRC WRT (Water) and AMRT (Applied Microbial Remediation).</p>
        </div>
        <div class="team-card">
          <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" alt="Sarah Nguyen" class="team-img">
          <h3>Sarah Nguyen</h3>
          <span>Customer Care Dispatch Manager</span>
          <p>The friendly voice who schedules your same-day inspection and manages direct insurance claims.</p>
        </div>
      </div>
    </div>
  </section>
  </main>`;

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

  const neighboringCities = (state.cities || [])
    .filter(([cSlug]) => cSlug !== city[0])
    .slice(0, 4);

  const nearbyLinksHtml = neighboringCities
    .map(([cSlug, cName]) => `<a class="nearby-link" href="https://${cSlug}-${state.slug}.${DOMAIN}/">→ ${esc(cName)}</a>`)
    .join("");

  const body = `<main>
  <section class="about-hero">
    <div class="wrap">
      <div class="crumb-trail"><a href="https://${DOMAIN}/">Home</a> / <a href="https://${DOMAIN}/areas-we-serve/">Service Areas</a> / ${esc(cityName)}</div>
      <span class="tag-badge" style="background:rgba(14,165,233,.18);color:#38bdf8;">📍 Now Serving ${esc(cityName)}</span>
      <h1>Water Damage &amp; Mold Remediation in <span>${esc(cityName)}, ${esc(state.name)}</span></h1>
      <p style="font-size:17px;line-height:1.7;color:#cbd5e1;max-width:740px;margin-bottom:26px;">Your trusted local water extraction and mold remediation specialists for the ${esc(cityName)} community. Same-day repairs, toxic black mold removal, thermal leak detection, and basement drying — licensed, insured and just minutes away.</p>
      <div style="display:flex;gap:14px;">
        <a class="btn-cta" href="${PHONE_HREF}">📞 Call ${PHONE_DISPLAY}</a>
        <a class="btn-glass-cyan" href="https://${DOMAIN}/contact-us/">Book Online</a>
      </div>
    </div>
  </section>

  <section class="sec-white" style="padding:60px 0 80px;">
    <div class="wrap story-grid" style="grid-template-columns:1fr 340px;">
      <div style="background:#fff;padding:36px;border-radius:20px;box-shadow:0 10px 40px rgba(0,0,0,.04);">
        <h2>Your Local Water &amp; Mold Restoration Experts in ${esc(cityName)}</h2>
        <p>${esc(cityName)}'s mix of established single-family homes and growing residential neighborhoods means water leaks and humidity outbreaks can happen when least expected — <i>until the day they do</i>. As a local certified restoration company serving <b>${esc(cityName)}</b>, we understand how local weather and plumbing age affect property structures along main local corridors, nearby schools like <b>${esc(cityName)} High School</b>, and local parks near <b>${esc(cityName)} Park</b>.</p>
        <p>From an aging 50-gallon water heater leak in your basement to toxic black mold thriving behind drywall after heavy rainfall, our licensed technicians reach every neighborhood in <b>${esc(cityName)}</b> with upfront transparent pricing and master workmanship you can count on.</p>

        <h3 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:20px;font-weight:900;color:#0d1b2a;margin:28px 0 14px;">Water &amp; Mold Restoration Services We Offer in ${esc(cityName)}</h3>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;">
          <div style="background:#f8fafc;padding:16px;border-radius:12px;border:1px solid #e2e8f0;">
            <b style="color:#0d1b2a;">Mold Remediation</b>
            <p style="font-size:12px;color:#64748b;margin:6px 0;">Same-day spore removal.</p>
            <a href="https://${host}/emergency-mold-remediation/" style="color:#0ea5e9;font-weight:800;font-size:12px;">Learn more →</a>
          </div>
          <div style="background:#f8fafc;padding:16px;border-radius:12px;border:1px solid #e2e8f0;">
            <b style="color:#0d1b2a;">Water Damage</b>
            <p style="font-size:12px;color:#64748b;margin:6px 0;">Flooded drying.</p>
            <a href="https://${host}/emergency-water-damage-restoration/" style="color:#0ea5e9;font-weight:800;font-size:12px;">Learn more →</a>
          </div>
          <div style="background:#f8fafc;padding:16px;border-radius:12px;border:1px solid #e2e8f0;">
            <b style="color:#0d1b2a;">Fire &amp; Smoke</b>
            <p style="font-size:12px;color:#64748b;margin:6px 0;">Soot cleanup.</p>
            <a href="https://${host}/fire-damage-restoration-cleanup/" style="color:#0ea5e9;font-weight:800;font-size:12px;">Learn more →</a>
          </div>
        </div>
      </div>

      <div>
        <div style="background:#14263b;padding:24px;border-radius:18px;color:#fff;margin-bottom:20px;">
          <h3 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:20px;font-weight:900;margin:0 0 6px;">${esc(cityName)} Service Dispatch</h3>
          <p style="color:#94a3b8;font-size:13px;margin:0 0 16px;">Same-day appointments available.</p>
          <a class="btn-cta" href="${PHONE_HREF}" style="width:100%;">📞 Call ${PHONE_DISPLAY}</a>
        </div>
        ${mapEmbedHtml(`${cityName}, ${state.name}`)}
        <div style="background:#f8fafc;padding:22px;border-radius:18px;border:1px solid #e2e8f0;color:#0f172a;">
          <h4 style="font-family:'Plus Jakarta Sans',sans-serif;font-size:16px;margin:0 0 10px;">Nearby Areas We Serve</h4>
          ${nearbyLinksHtml}
        </div>
      </div>
    </div>
  </section>
  </main>`;

  return shell(`Water &amp; Mold Restoration in ${cityName}, ${state.name} | ${BRAND}`, `Local 24/7 water damage, mold removal, and fire restoration specialists in ${cityName}, ${state.name}.`, canonical, body, schema);
}

export function statePage(state: StateItem) {
  const stateSlug = state.slug || state.code.toLowerCase();
  const canonical = `https://${stateSlug}.${DOMAIN}/`;
  const cities = state.cities || [];
  const cityDirectoryHtml = cities.map(([slug, name]) => `<a class="dir-card" href="https://${slug}-${stateSlug}.${DOMAIN}/"><span>📍 ${esc(name)}</span></a>`).join("");

  const body = `<main>
  <section class="about-hero">
    <div class="wrap">
      <div class="crumb-trail"><a href="https://${DOMAIN}/">Home</a> / <a href="https://${DOMAIN}/areas-we-serve/">Service Areas</a> / ${esc(state.name)}</div>
      <h1>Water Damage &amp; Mold Restoration in <span>${esc(state.name)}</span></h1>
    </div>
  </section>
  <section class="sec-dark">
    <div class="wrap"><div class="dir-grid">${cityDirectoryHtml}</div></div>
  </section>
  </main>`;

  return shell(`Mold &amp; Water Restoration in ${state.name} | ${BRAND}`, `24/7 emergency mold inspection, water damage extraction, and fire restoration across ${state.name}.`, canonical, body);
}

export function homePage(states: StateItem[]) {
  const canonical = `https://${DOMAIN}/`;
  const statePills = states.slice(0, 10).map(s => `<a class="dir-card" href="https://${s.slug}.${DOMAIN}/"><span>📍 ${esc(s.name)}</span></a>`).join("");

  const body = `<main>
  <section class="about-hero" style="padding:70px 0 80px;background:linear-gradient(rgba(13,27,42,.85),rgba(13,27,42,.92)),url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1920&q=80') center/cover no-repeat;">
    <div class="wrap story-grid">
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
  const body = `<main><section class="about-hero"><div class="wrap"><div class="crumb-trail"><a href="https://${DOMAIN}/">Home</a> / Contact Us</div><h1>Contact Our <span>Restoration Experts</span></h1><div style="margin-top:24px;"><a class="btn-cta" href="${PHONE_HREF}">Call ${PHONE_DISPLAY}</a></div></div></section><section class="sec-dark"><div class="wrap">${mapEmbedHtml("236 Long Park Dr, Rochester, NY 14612", 420)}</div></section></main>`;
  return shell(`Contact Us | 24/7 Emergency Dispatch | ${BRAND}`, "Contact Mold Inspection Pennsylvania & USA Network for 24/7 water, fire & mold restoration dispatch.", canonical, body);
}

export function nationalServicePage(service: (typeof services)[number]) {
  const canonical = `https://${DOMAIN}/services/${service.slug}/`;
  const body = `<main><section class="about-hero"><div class="wrap"><h1>24/7 <span>${esc(service.name)}</span></h1><p style="color:#cbd5e1;font-size:17px;">${esc(service.description)}</p></div></section></main>`;
  return shell(`${service.name} | 24/7 Emergency Service | ${BRAND}`, service.description, canonical, body);
}

export function localServicePage(state: StateItem, city: [string, string], service: (typeof services)[number], host: string) {
  const [, cityName] = city;
  const canonical = `https://${host}/${service.slug}/`;
  const body = `<main><section class="about-hero"><div class="wrap"><h1>${esc(service.name)} in <span>${esc(cityName)}, ${esc(state.name)}</span></h1><p style="color:#cbd5e1;font-size:17px;">${esc(service.description)}</p></div></section></main>`;
  return shell(`${service.name} in ${cityName}, ${state.name} | ${BRAND}`, service.description, canonical, body);
}

export function servicesHubPage() {
  const canonical = `https://${DOMAIN}/services/`;
  const serviceCardsHtml = services.map((s) => `<a class="promise-card" href="https://${DOMAIN}/${s.slug}/"><h3>${esc(s.name)}</h3><p>${esc(s.description)}</p><span style="color:#0ea5e9;font-weight:800;display:inline-block;margin-top:10px;">Read More →</span></a>`).join("");
  const body = `<main><section class="about-hero"><div class="wrap"><h1>24/7 Water, Fire &amp; Mold <span>Restoration Services</span></h1></div></section><section class="sec-slate"><div class="wrap"><div class="grid-3">${serviceCardsHtml}</div></div></section></main>`;
  return shell(`Restoration Services Directory | All 70 Topics | ${BRAND}`, "Browse all 70 water damage extraction, toxic black mold remediation, and fire restoration services offered nationwide.", canonical, body);
}

export function areasWeServePage(states: StateItem[]) {
  const canonical = `https://${DOMAIN}/areas-we-serve/`;
  const allDirectoryHtml = states.map((s) => `<a class="dir-card" href="https://${s.slug}.${DOMAIN}/"><span>📍 ${esc(s.name)}</span></a>`).join("");
  const body = `<main><section class="about-hero"><div class="wrap"><h1>Water, Fire &amp; Mold Restoration Across <span>USA &amp; Pennsylvania</span></h1></div></section><section class="sec-dark"><div class="wrap"><div class="dir-grid">${allDirectoryHtml}</div></div></section></main>`;
  return shell(`Service Areas | 50-State Restoration Directory | ${BRAND}`, "Explore 24/7 water damage, black mold remediation, and fire restoration service areas across all 50 US states.", canonical, body);
}

export function linkSheetPage() {
  const canonical = `https://${DOMAIN}/link-sheet/`;
  const body = `<main><section class="about-hero"><div class="wrap"><h1>pSEO Network Authority &amp; LinkSheet</h1></div></section></main>`;
  return shell("Xagio pSEO LinkSheet Authority Hub", "Official interlinking LinkSheet directory.", canonical, body);
}

export function articlesHubPage() {
  const canonical = `https://${DOMAIN}/articles/`;
  const body = `<main><section class="about-hero"><div class="wrap"><h1>Restoration Safety &amp; Inspection Guides</h1></div></section></main>`;
  return shell(`Restoration Guides | ${BRAND}`, "Restoration safety & inspection guides.", canonical, body);
}

export function articlePage(article: any) {
  const canonical = `https://${DOMAIN}/articles/${article.slug}/`;
  const body = `<main><section class="about-hero"><div class="wrap"><h1>${esc(article.title)}</h1></div></section></main>`;
  return shell(`${article.title} | ${BRAND}`, article.excerpt, canonical, body);
}

export function notFoundPage(message: string) {
  return `<!doctype html><html><head><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width,initial-scale=1"><title>404 | ${BRAND}</title><style>${CSS}</style></head><body>${header()}<main class="sec-dark"><div class="wrap"><h1>404</h1><p>${esc(message)}</p><a class="btn-cta" href="https://${DOMAIN}/">Back to Home</a></div></main>${footer()}</body></html>`;
}
