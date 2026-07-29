import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(BASE_DIR, "out")

os.makedirs(OUT_DIR, exist_ok=True)

with open(os.path.join(OUT_DIR, "index.html"), "w", encoding="utf-8") as f:
    f.write("<!doctype html><html><head><title>Mold Inspection Pennsylvania & USA Network</title></head><body><h1>Mold Inspection Pennsylvania</h1></body></html>")

print("[OK] Assets build complete: out/index.html generated!")
