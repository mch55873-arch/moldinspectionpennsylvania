import shutil
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_DATA_DIR = os.path.join(os.path.dirname(BASE_DIR), "tree-services-pseo", "data")
DEST_DATA_DIR = os.path.join(BASE_DIR, "data")

mold_src = os.path.join(SRC_DATA_DIR, "mold_services.json")
mold_dest = os.path.join(DEST_DATA_DIR, "services.json")
if os.path.exists(mold_src):
    shutil.copy(mold_src, mold_dest)
    print(f"[OK] Successfully Copied 70 Mold Services to {mold_dest}")

articles_src = os.path.join(SRC_DATA_DIR, "articles.json")
articles_dest = os.path.join(DEST_DATA_DIR, "articles.json")
if os.path.exists(articles_src):
    shutil.copy(articles_src, articles_dest)
    print(f"[OK] Successfully Copied Articles to {articles_dest}")
