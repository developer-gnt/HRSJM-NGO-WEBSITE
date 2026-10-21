import re

with open('src/data/rightsDetailData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

categories = [
    'womens-rights', 'childrens-rights', 'labour-rights', 'senior-citizen-rights',
    'human-rights', 'fundamental-rights', 'civil-rights', 'civil-liberties',
    'freedom-of-speech', 'right-to-information', 'minority-rights', 'right-to-education'
]

for cat in categories:
    m = re.search(r'"' + cat + r'"\s*:\s*\{([\s\S]*?)(?=\n  "[a-z\-]+"\s*:|\n\};)', content)
    if m:
        block = m.group(1)
        hero = re.findall(r'heroImage:\s*"([^"]+)"', block)
        heroBg = re.findall(r'heroBgImage:\s*"([^"]+)"', block)
        ov = re.findall(r'overview:\s*\{[\s\S]*?image:\s*"([^"]+)"', block)
        side = re.findall(r'quoteCard:\s*\{[\s\S]*?image:\s*"([^"]+)"', block)
        laws = re.findall(r'laws:\s*\{[\s\S]*?centerImage:\s*"([^"]+)"', block)
        faq = re.findall(r'faqsSection:\s*\{[\s\S]*?centerImage:\s*"([^"]+)"', block)
        print(f'{cat}:')
        print('  heroBgImage:', heroBg)
        print('  overview.image:', ov)
        print('  keyRights.quoteCard.image:', side)
        print('  laws.centerImage:', laws)
        print('  faqsSection.centerImage:', faq)
