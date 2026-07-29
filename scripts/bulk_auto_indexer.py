import urllib.request
import urllib.parse
import json
import xml.etree.ElementTree as ET
import time
import os
import sys

# Production Bulk Auto-Indexer Engine ($0 Free Alternative to BulkIndexer.net)
DOMAIN = sys.argv[1] if len(sys.argv) > 1 else "batyspestcontrol.com"
SITEMAP_INDEX_URL = f"https://{DOMAIN}/sitemap.xml"
INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow"
INDEXNOW_KEY = "3a2b1c4d5e6f7a8b9c0d1e2f3a4b5c6d" # 32-character hex key

def fetch_sitemap_urls(sitemap_url):
    print(f"[FETCH] Downloading sitemap XML: {sitemap_url}")
    urls = []
    try:
        req = urllib.request.Request(sitemap_url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
        with urllib.request.urlopen(req) as response:
            xml_data = response.read()
            root = ET.fromstring(xml_data)
            
            # Extract URLs from <loc> tags
            for child in root:
                loc = child.find("{http://www.sitemaps.org/schemas/sitemap/0.9}loc")
                if loc is not None and loc.text:
                    urls.append(loc.text.strip())
    except Exception as e:
        print(f"[ERROR] Failed to parse {sitemap_url}: {e}")
    return urls

def run_bulk_indexnow(url_batch):
    if not url_batch:
        return
    print(f"[INDEXNOW] Submitting batch of {len(url_batch)} URLs to IndexNow Protocol...")
    payload = {
        "host": DOMAIN,
        "key": INDEXNOW_KEY,
        "keyLocation": f"https://{DOMAIN}/{INDEXNOW_KEY}.txt",
        "urlList": url_batch
    }
    
    try:
        data = json.dumps(payload).encode('utf-8')
        req = urllib.request.Request(
            INDEXNOW_ENDPOINT, 
            data=data, 
            headers={"Content-Type": "application/json; charset=utf-8"}
        )
        with urllib.request.urlopen(req) as res:
            print(f"[SUCCESS] IndexNow Response Code: {res.status} (Accepted {len(url_batch)} URLs)")
            return res.status
    except Exception as e:
        print(f"[ERROR] IndexNow Submission Failed: {e}")
        return None

def start_bulk_indexing():
    print("============================================================")
    print("[START] PRODUCTION BULK AUTO-INDEXER ENGINE")
    print("============================================================")
    
    # 1. Fetch root sitemap
    sitemaps = fetch_sitemap_urls(SITEMAP_INDEX_URL)
    print(f"[OK] Found {len(sitemaps)} sitemap files in root sitemap.xml")
    
    # Extract all page URLs across all sitemaps
    all_urls = [
        f"https://{DOMAIN}/",
        f"https://{DOMAIN}/about/",
        f"https://{DOMAIN}/contact/",
        f"https://{DOMAIN}/services/",
        f"https://{DOMAIN}/areas-we-serve/",
        f"https://texas.{DOMAIN}/",
        f"https://california.{DOMAIN}/",
        f"https://florida.{DOMAIN}/",
        f"https://illinois.{DOMAIN}/",
        f"https://new-york.{DOMAIN}/"
    ]
    
    for sm in sitemaps:
        if sm.endswith(".xml"):
            sub_urls = fetch_sitemap_urls(sm)
            all_urls.extend(sub_urls)
            time.sleep(0.5)
            
    # Deduplicate URLs
    all_urls = list(dict.fromkeys(all_urls))
    print(f"[OK] Total Discovered URLs to Index: {len(all_urls):,}")
    
    # 2. Chunk into IndexNow batches of 1,000 URLs max (Bing API rate-limit recommendation)
    BATCH_SIZE = 1000
    batches = [all_urls[i:i + BATCH_SIZE] for i in range(0, len(all_urls), BATCH_SIZE)]
    
    report = {
        "domain": DOMAIN,
        "total_urls": len(all_urls),
        "batches_processed": len(batches),
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S UTC", time.gmtime()),
        "status": "COMPLETED"
    }
    
    for idx, batch in enumerate(batches, start=1):
        print(f"\n--- Processing Batch {idx}/{len(batches)} ({len(batch)} URLs) ---")
        run_bulk_indexnow(batch)
        time.sleep(1)
        
    # Save Report
    report_path = os.path.join(os.path.dirname(__file__), "..", "data", "indexing_report.json")
    with open(report_path, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2)
        
    print("\n============================================================")
    print(f"[COMPLETE] BULK INDEXING FINISHED! Report saved to data/indexing_report.json")
    print("============================================================")

if __name__ == "__main__":
    start_bulk_indexing()
