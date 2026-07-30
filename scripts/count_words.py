import json

with open('data/articles.json', 'r', encoding='utf-8') as f:
    articles = json.load(f)

print(f"Total Articles Count: {len(articles)}")
for i, a in enumerate(articles, 1):
    words = len((a['title'] + ' ' + a['excerpt'] + ' ' + a['content']).split())
    print(f"{i:02d}. [{words} words] {a['slug']}")
