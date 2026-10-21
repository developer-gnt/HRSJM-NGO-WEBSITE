import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance

os.makedirs('public/images/news', exist_ok=True)

# 1. quote-poster-maharashtra.png
try:
    canvas = Image.new('RGB', (400, 600), color=(253, 248, 237))
    base_img = Image.open('public/images/activities/human-rights-awareness-rally.png')
    bw, bh = base_img.size
    base_crop = base_img.crop((int(bw * 0.1), int(bh * 0.2), int(bw * 0.9), bh)).resize((400, 360), Image.LANCZOS)
    canvas.paste(base_crop, (0, 240))
    
    gradient = Image.new('RGBA', (400, 600), (0, 0, 0, 0))
    draw_grad = ImageDraw.Draw(gradient)
    for y in range(160, 290):
        alpha = int(255 * (1 - (y - 160) / 130))
        draw_grad.line([(0, y), (400, y)], fill=(253, 248, 237, alpha))
    canvas.paste(Image.alpha_composite(Image.new('RGBA', (400, 600), (253, 248, 237, 255)), gradient).convert('RGB'), (0, 0))
    # repaste bottom photo
    canvas.paste(base_crop, (0, 260))
    
    draw_top = ImageDraw.Draw(canvas)
    try:
        font_quote = ImageFont.truetype('georgiab.ttf', 44)
        font_text = ImageFont.truetype('georgiab.ttf', 20)
    except:
        font_quote = ImageFont.load_default()
        font_text = ImageFont.load_default()
        
    draw_top.text((185, 35), '“', fill=(217, 119, 6), font=font_quote)
    lines = ['Together we protect', 'every voice,', 'every right.']
    y = 95
    for line in lines:
        draw_top.text((200, y), line, fill=(180, 100, 10), font=font_text, anchor='mm')
        y += 28
    draw_top.line([(150, y + 8), (250, y + 8)], fill=(217, 119, 6), width=3)
    canvas.save('public/images/news/quote-poster-maharashtra.png', quality=95)
    print('Created quote-poster-maharashtra.png')
except Exception as e:
    print('MH Error:', e)

# 2. quote-poster-child-rights.png
try:
    canvas = Image.new('RGB', (400, 600), color=(254, 249, 238))
    child_img = Image.open('public/images/rights/childrens-rights-hero-bg.png')
    cw, ch = child_img.size
    child_crop = child_img.crop((int(cw * 0.60), int(ch * 0.1), cw, ch)).resize((400, 350), Image.LANCZOS)
    canvas.paste(child_crop, (0, 250))
    
    draw_top = ImageDraw.Draw(canvas)
    try:
        font_quote = ImageFont.truetype('georgiab.ttf', 44)
        font_text = ImageFont.truetype('georgiab.ttf', 19)
    except:
        font_quote = ImageFont.load_default()
        font_text = ImageFont.load_default()
        
    draw_top.text((185, 35), '“', fill=(217, 119, 6), font=font_quote)
    lines = ['Every child deserves', 'a childhood of safety,', 'learning and joy.']
    y = 95
    for line in lines:
        draw_top.text((200, y), line, fill=(180, 100, 10), font=font_text, anchor='mm')
        y += 28
    draw_top.line([(150, y + 8), (250, y + 8)], fill=(217, 119, 6), width=3)
    canvas.save('public/images/news/quote-poster-child-rights.png', quality=95)
    print('Created quote-poster-child-rights.png')
except Exception as e:
    print('Child Error:', e)

# 3. quote-poster-media-coverage.png
try:
    canvas = Image.new('RGB', (400, 600), color=(253, 248, 237))
    sc_img = Image.open('public/images/news-hero-bg.png')
    sw, sh = sc_img.size
    sc_crop = sc_img.crop((int(sw * 0.40), int(sh * 0.1), sw, sh)).resize((400, 350), Image.LANCZOS)
    canvas.paste(sc_crop, (0, 250))
    
    draw_top = ImageDraw.Draw(canvas)
    try:
        font_quote = ImageFont.truetype('georgiab.ttf', 44)
        font_text = ImageFont.truetype('georgiab.ttf', 19)
    except:
        font_quote = ImageFont.load_default()
        font_text = ImageFont.load_default()
        
    draw_top.text((185, 35), '“', fill=(217, 119, 6), font=font_quote)
    lines = ['Informed citizens and', 'public awareness build', 'true accountability.']
    y = 95
    for line in lines:
        draw_top.text((200, y), line, fill=(180, 100, 10), font=font_text, anchor='mm')
        y += 28
    draw_top.line([(150, y + 8), (250, y + 8)], fill=(217, 119, 6), width=3)
    canvas.save('public/images/news/quote-poster-media-coverage.png', quality=95)
    print('Created quote-poster-media-coverage.png')
except Exception as e:
    print('Media Error:', e)

# Also create story photos and avatars
# For Maharashtra
try:
    mh_woman = Image.open('public/images/news/card-maharashtra.png')
    mh_woman.resize((480, 320), Image.LANCZOS).save('public/images/news/story-photo-rekha.png')
    
    mh_elder = Image.open('public/images/news/card-child-rights.png')
    mh_elder.resize((480, 320), Image.LANCZOS).save('public/images/news/story-photo-ramesh.png')
    print('Created story photos for Maharashtra')
except Exception as e:
    print('Story photos error:', e)
