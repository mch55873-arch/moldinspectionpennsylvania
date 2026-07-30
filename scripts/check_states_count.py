import json

with open('data/usa_database.json', 'r', encoding='utf-8') as f:
    db = json.load(f)

states = db.get('states', [])
print(f"Total States in database: {len(states)}")
for i, s in enumerate(states, 1):
    slug = s.get('slug') or s.get('name').lower().replace(' ', '-')
    print(f"{i:02d}. {s.get('name')} -> {slug}-1.xml")
