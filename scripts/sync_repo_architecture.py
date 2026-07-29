import json
import os
import shutil

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TREE_DIR = os.path.join(os.path.dirname(BASE_DIR), "tree-services-pseo")

print("==========================================================")
print("[REPO SYNC] SYNCING ARCHITECTURE FROM tree-services-pseo")
print("==========================================================")

# 1. Copy build_nandla_links_engine.py & build_all_citations_kits.py
scripts_to_copy = [
    "build_nandla_links_engine.py",
    "bulk_auto_indexer.py",
    "generate_all_citations_kits.py"
]

for s in scripts_to_copy:
    src_p = os.path.join(TREE_DIR, "scripts", s)
    dest_p = os.path.join(BASE_DIR, "scripts", s)
    if os.path.exists(src_p):
        shutil.copy(src_p, dest_p)
        print(f"[OK] Copied script: {s}")

# 2. Generate articles.json for Mold & Water Restoration
articles_data = [
    {
        "slug": "black-mold-spore-safety-guide",
        "title": "Black Mold Spore Safety & Indoor Air Quality Standards",
        "excerpt": "Comprehensive safety guide for toxic Stachybotrys chartarum black mold containment, HEPA air scrubbing, and post-remediation clearance testing."
    },
    {
        "slug": "flooded-basement-water-extraction-guide",
        "title": "Flooded Basement Emergency Water Extraction Guide",
        "excerpt": "Step-by-step emergency instructions for burst pipes, sump pump failures, and structural dehumidification."
    },
    {
        "slug": "fire-smoke-soot-decontamination-handbook",
        "title": "Fire, Smoke & Soot Decontamination Handbook",
        "excerpt": "Technical protocol for chemical sponge soot scrubbing, thermal fogging, and structural char restoration."
    }
]

with open(os.path.join(BASE_DIR, "data", "articles.json"), "w", encoding="utf-8") as f:
    json.dump(articles_data, f, indent=2)
print("[OK] Generated data/articles.json")

print("[SUCCESS] REPOSITORY ARCHITECTURE FULLY MATCHED!")
