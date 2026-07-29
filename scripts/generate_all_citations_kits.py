import json
import os

# Automation script to generate SAB Citations Submission Kits for all 4 pSEO domains
DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "data")

DOMAINS_KITS = {
    "cantreeservice.com": {
        "business_name": "Can Tree Service",
        "website": "https://cantreeservice.com/",
        "phone": "(380) 209-1328",
        "primary_category": "Tree Service & Arborist Care",
        "secondary_categories": ["Emergency Tree Removal", "Tree Trimming & Pruning", "Stump Grinding Service", "Arborist Inspection"],
        "short_desc": "Nationwide 24/7 emergency tree removal, structural pruning, stump grinding, and arborist health inspections.",
        "long_desc": "Can Tree Service is a leading nationwide tree care provider operating across 50 US states. Our certified arborist network specializes in 24/7 emergency storm damage clearance, hazardous tree removal, structural trimming, stump grinding, and crane rigging."
    },
    "garagedoorgazette.com": {
        "business_name": "Garage Door Gazette",
        "website": "https://garagedoorgazette.com/",
        "phone": "+1 (773) 249-5939",
        "primary_category": "Garage Door Repair & Service",
        "secondary_categories": ["Emergency Garage Door Repair", "Garage Door Spring Replacement", "Garage Door Opener Installation", "Commercial Overhead Doors"],
        "short_desc": "Nationwide 24/7 emergency garage door repair, torsion spring replacement, and smart opener installation.",
        "long_desc": "Garage Door Gazette connects homeowners and commercial properties across all 50 states with licensed 24/7 garage door technicians. Specializing in broken torsion springs, off-track doors, cable replacements, and opener installations."
    },
    "batyspestcontrol.com": {
        "business_name": "Batys Pest Control",
        "website": "https://batyspestcontrol.com/",
        "phone": "(614) 926-0787",
        "primary_category": "Pest Control Service",
        "secondary_categories": ["Termite Inspection & Control", "Bed Bug Heat Treatment", "Rodent Exclusion", "Commercial Pest Control"],
        "short_desc": "Nationwide 24/7 emergency pest control, termite inspection, bed bug treatment, and rodent exclusion.",
        "long_desc": "Batys Pest Control provides comprehensive residential and commercial pest management across all 50 states. Licensed exterminators specializing in termite control, bed bug heat remediation, rodent exclusion, and eco-friendly pest prevention."
    },
    "villageplumbers.co.nz": {
        "business_name": "Village Plumbers NZ",
        "website": "https://villageplumbers.co.nz/",
        "phone": "0800 002 411",
        "primary_category": "Emergency Plumbing Service",
        "secondary_categories": ["Blocked Drain Unblocking", "Hot Water Cylinder Repair", "Gas Leak Detection", "Burst Pipe Repairs"],
        "short_desc": "24/7 emergency plumbing, drain unblocking, and hot water cylinder repair across New Zealand.",
        "long_desc": "Village Plumbers NZ is New Zealand's trusted emergency plumbing network operating across Auckland, Wellington, Christchurch, and all 16 NZ regions. Registered Kiwi plumbers specializing in hydro-jet drain unblocking, hot water repairs, and gas fitting."
    }
}

DIRECTORIES = [
    {"name": "Manta.com", "url": "https://www.manta.com/add-a-company", "sab_friendly": True, "dr": 88},
    {"name": "MerchantCircle.com", "url": "https://www.merchantcircle.com/signup", "sab_friendly": True, "dr": 86},
    {"name": "EZLocal.com", "url": "https://ezlocal.com/add", "sab_friendly": True, "dr": 84},
    {"name": "Cylex USA", "url": "https://www.cylex-usa.com/add-company", "sab_friendly": True, "dr": 82},
    {"name": "Hotfrog USA", "url": "https://www.hotfrog.com/add-your-business", "sab_friendly": True, "dr": 81},
    {"name": "ChamberofCommerce.com", "url": "https://www.chamberofcommerce.com/add-business", "sab_friendly": True, "dr": 85}
]

def generate_kits():
    os.makedirs(DATA_DIR, exist_ok=True)
    master_kit = {}
    
    for domain, info in DOMAINS_KITS.items():
        kit = {
            "business_info": {
                **info,
                "business_type": "Service Area Business (SAB)",
                "address_requirement": "Hide Street Address (SAB Mode Enabled)"
            },
            "directory_submission_urls": DIRECTORIES
        }
        
        path = os.path.join(DATA_DIR, f"citations_kit_{domain.replace('.', '_')}.json")
        with open(path, "w", encoding="utf-8") as f:
            json.dump(kit, f, indent=2)
        print(f"[OK] Generated Citations Kit: {path}")
        master_kit[domain] = kit
        
    master_path = os.path.join(DATA_DIR, "master_citations_portfolio_kit.json")
    with open(master_path, "w", encoding="utf-8") as f:
        json.dump(master_kit, f, indent=2)
    print(f"[OK] Generated Master Portfolio Citations Kit: {master_path}")

if __name__ == "__main__":
    generate_kits()
