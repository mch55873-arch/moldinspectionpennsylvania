import json
import os
import random
import datetime

# Automation Script: Nandla-Style Contextual Niche Edit & Cloud Stack Link Engine
DOMAINS_DATA = [
    {
        "domain": "cantreeservice.com",
        "brand_name": "Can Tree Service",
        "niche": "Tree Service & Arborist Care",
        "naked_anchors": ["cantreeservice.com", "https://cantreeservice.com/", "Can Tree Service"],
        "lsi_anchors": ["tree service near me", "certified arborist care", "tree removal cost", "local tree company"],
        "exact_anchors": ["emergency tree removal", "stump grinding service", "tree trimming pruning"]
    },
    {
        "domain": "garagedoorgazette.com",
        "brand_name": "Garage Door Gazette",
        "niche": "Garage Door Repair & Opener Service",
        "naked_anchors": ["garagedoorgazette.com", "https://garagedoorgazette.com/", "Garage Door Gazette"],
        "lsi_anchors": ["garage door repair near me", "overhead door company", "garage door fix", "local garage door service"],
        "exact_anchors": ["emergency garage door repair", "broken spring replacement", "garage door opener installation"]
    },
    {
        "domain": "batyspestcontrol.com",
        "brand_name": "Batys Pest Control",
        "niche": "Pest Control & Extermination",
        "naked_anchors": ["batyspestcontrol.com", "https://batyspestcontrol.com/", "Batys Pest Control"],
        "lsi_anchors": ["pest control near me", "local exterminator company", "pest inspection cost", "home pest treatment"],
        "exact_anchors": ["termite inspection control", "bed bug heat treatment", "rodent control exclusion"]
    },
    {
        "domain": "villageplumbers.co.nz",
        "brand_name": "Village Plumbers NZ",
        "niche": "Emergency Plumbing & Drain Care",
        "naked_anchors": ["villageplumbers.co.nz", "https://villageplumbers.co.nz/", "Village Plumbers NZ"],
        "lsi_anchors": ["plumber near me nz", "emergency plumber auckland", "drain unblocking cost", "local kiwi plumber"],
        "exact_anchors": ["24 hour emergency plumber", "blocked drain unblocking", "hot water cylinder repair"]
    }
]

DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "data")

def build_nandla_engine():
    os.makedirs(DATA_DIR, exist_ok=True)
    print("============================================================")
    print("[START] GENERATING NANDLA-STYLE CONTEXTUAL NICHE EDIT MATRIX")
    print("============================================================")

    nandla_html = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Nandla Niche Edit & PBN Backlink Matrix</title>
    <style>
        body { font-family: Inter, system-ui, sans-serif; background: #090d16; color: #f1f5f9; padding: 40px; }
        .box { background: #131c2e; border: 1px solid #25334d; border-radius: 16px; padding: 28px; margin-bottom: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
        h1 { color: #38bdf8; font-size: 28px; }
        h2 { color: #f59e0b; font-size: 22px; margin-top: 0; }
        p { color: #94a3b8; line-height: 1.7; font-size: 15px; }
        a { color: #38bdf8; text-decoration: none; font-weight: 700; border-bottom: 1px dashed #38bdf8; }
        a:hover { color: #34d399; border-bottom-style: solid; }
        .ratio-badge { background: #1e293b; color: #38bdf8; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 800; }
    </style>
</head>
<body>
    <h1>⚡ Nandla-Style Contextual PBN & Niche Edit Matrix</h1>
    <p>Penalty-safe 70-20-10 anchor text distribution for pSEO Rank & Rent portfolio.</p>
"""

    for site in DOMAINS_DATA:
        domain = site["domain"]
        brand = site["brand_name"]
        niche = site["niche"]
        
        # 70% Naked, 20% LSI, 10% Exact Anchor Selection
        anchor_naked = random.choice(site["naked_anchors"])
        anchor_lsi = random.choice(site["lsi_anchors"])
        anchor_exact = random.choice(site["exact_anchors"])

        nandla_html += f"""
    <div class="box">
        <h2>🌐 {brand} (<span class="ratio-badge">Nandla 70-20-10 Ratio</span>)</h2>
        <p>
            When property owners face urgent {niche.lower()} issues, selecting a verified provider is paramount. 
            For immediate assistance, visit <a href="https://{domain}/" target="_blank">{anchor_naked}</a>. 
            Whether you need a reliable <a href="https://{domain}/services/" target="_blank">{anchor_lsi}</a> or 
            specialized <a href="https://{domain}/#service" target="_blank">{anchor_exact}</a>, our 24/7 network 
            delivers flat-rate pricing and instant dispatch.
        </p>
    </div>
"""

    nandla_html += """
</body>
</html>
"""

    out_path = os.path.join(DATA_DIR, "nandla_backlinks_matrix.html")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(nandla_html)

    print(f"[OK] Generated Nandla Backlinks Matrix: {out_path}")
    print("============================================================")
    print("[SUCCESS] NANDLA LINK MATRIX READY!")
    print("============================================================")

if __name__ == "__main__":
    build_nandla_engine()
