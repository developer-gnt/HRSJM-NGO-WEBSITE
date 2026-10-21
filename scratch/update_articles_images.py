with open('src/data/articles.ts', 'r', encoding='utf-8') as f:
    text = f.read()

replacements = {
    'image: "/images/story-6.png"': 'image: "/images/news/card-rti.png"',
    'image: "/images/story-2.png"': 'image: "/images/news/card-education.png"',
    'image: "/images/story-3.png"': 'image: "/images/news/card-womens-rights.png"',
    'image: "/images/story-1.png"': 'image: "/images/news/card-maharashtra.png"',
    'image: "/images/story-5.png"': 'image: "/images/news/card-child-rights.png"',
    'image: "/images/story-4.png"': 'image: "/images/news/card-media-coverage.png"',
}

for k, v in replacements.items():
    text = text.replace(k, v)

with open('src/data/articles.ts', 'w', encoding='utf-8') as f:
    f.write(text)

print('Updated src/data/articles.ts with card images!')
