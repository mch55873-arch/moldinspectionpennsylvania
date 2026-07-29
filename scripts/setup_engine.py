import shutil
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_DATA_DIR = os.path.join(os.path.dirname(BASE_DIR), "tree-services-pseo", "data")
DEST_DATA_DIR = os.path.join(BASE_DIR, "data")

os.makedirs(DEST_DATA_DIR, exist_ok=True)

# Copy usa_database.json
usa_src = os.path.join(SRC_DATA_DIR, "usa_database.json")
usa_dest = os.path.join(DEST_DATA_DIR, "usa_database.json")
if os.path.exists(usa_src):
    shutil.copy(usa_src, usa_dest)
    print(f"[OK] Copied USA Database to {usa_dest}")

# Copy mold_services.json
mold_src = os.path.join(SRC_DATA_DIR, "mold_services.json")
mold_dest = os.path.join(DEST_DATA_DIR, "services.json")
if os.path.exists(mold_src):
    shutil.copy(mold_src, mold_dest)
    print(f"[OK] Copied Mold Services to {mold_dest}")

print("[SUCCESS] Setup Engine Assets Complete!")
