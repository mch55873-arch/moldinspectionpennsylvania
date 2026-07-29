import os
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, BASE_DIR)

OUT_DIR = os.path.join(BASE_DIR, "out")
os.makedirs(OUT_DIR, exist_ok=True)

# Generate rich Davey-style HTML shell for static out/index.html
html = """<!doctype html><html lang="en-US"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Mold Inspection Pennsylvania &amp; USA Network | 24/7 Water, Fire &amp; Mold Restoration</title><meta name="description" content="Pennsylvania's premier mold &amp; water restoration authority — operating 24/7 nationwide across all 50 US states &amp; 30,900+ cities."><link rel="canonical" href="https://moldinspectionpennsylvania.com/"><meta name="robots" content="index,follow"><style>*{box-sizing:border-box}body{margin:0;font-family:Inter,ui-sans-serif,system-ui,sans-serif;color:#1e293b;background:#fff}.hero{background:linear-gradient(135deg,#042f2e 0%,#064e3b 100%);color:#fff;padding:80px 20px;text-align:center}.hero h1{font-size:48px;margin:0 0 16px}.hero p{font-size:18px;max-width:700px;margin:0 auto 24px;color:#ccfbf1}.btn{display:inline-block;padding:16px 28px;background:#0d9488;color:#fff;border-radius:10px;font-weight:900;text-decoration:none;font-size:18px;box-shadow:0 10px 24px rgba(13,148,136,.4)}</style></head><body><div class="hero"><h1>24/7 Mold, Water &amp; Fire Restoration</h1><p>Pennsylvania &amp; USA Nationwide 24/7 Emergency Restoration Network. Certified inspectors, 70 restoration services, and 50-state coverage.</p><a class="btn" href="tel:+13216550460">⚡ Call (321) 655-0460</a></div></body></html>"""

with open(os.path.join(OUT_DIR, "index.html"), "w", encoding="utf-8") as f:
    f.write(html)

print("[OK] Rich Out HTML generated successfully!")
