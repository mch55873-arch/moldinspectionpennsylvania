import json
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
os.makedirs(DATA_DIR, exist_ok=True)

mold_kit = {
    "business_name": "Mold Inspection Pennsylvania & USA Network",
    "domain": "moldinspectionpennsylvania.com",
    "phone": "(321) 655-0460",
    "phone_raw": "+13216550460",
    "sab_address": "236 Long Park Dr, Rochester, NY 14612",
    "category": "Water, Fire & Mold Restoration",
    "description": "Pennsylvania & USA nationwide 24/7 emergency water damage restoration, black mold remediation, air quality testing, and fire damage cleanup across all 50 US states.",
    "citations_targets": [
        {"name": "Manta USA", "url": "https://www.manta.com/", "dr": 88},
        {"name": "MerchantCircle", "url": "https://www.merchantcircle.com/", "dr": 86},
        {"name": "Chamber of Commerce USA", "url": "https://www.chamberofcommerce.com/", "dr": 85},
        {"name": "EZLocal USA", "url": "https://ezlocal.com/", "dr": 84},
        {"name": "Cylex USA", "url": "https://www.cylex.us.com/", "dr": 82},
        {"name": "Hotfrog USA", "url": "https://www.hotfrog.com/", "dr": 81}
    ]
}

out_path = os.path.join(DATA_DIR, "citations_kit_moldinspectionpennsylvania_com.json")
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(mold_kit, f, indent=2)

print(f"[OK] Generated Mold Citations Kit at: {out_path}")
