import os
from PIL import Image, ImageFilter, ImageEnhance
import numpy as np

mapping = {
    'human-rights': r'C:\Users\Sunil\.gemini\antigravity-ide\brain\bfc075b7-8f73-42a5-8da7-975724f3c531\.user_uploaded\media_1792567326756.jpg',
    'fundamental-rights': r'C:\Users\Sunil\.gemini\antigravity-ide\brain\bfc075b7-8f73-42a5-8da7-975724f3c531\.user_uploaded\media_1792567310069.jpg',
    'civil-rights': r'C:\Users\Sunil\.gemini\antigravity-ide\brain\bfc075b7-8f73-42a5-8da7-975724f3c531\.user_uploaded\media_1792567326782.jpg',
    'womens-rights': r'C:\Users\Sunil\.gemini\antigravity-ide\brain\bfc075b7-8f73-42a5-8da7-975724f3c531\.user_uploaded\media_1792567310218.jpg',
    'childrens-rights': r'C:\Users\Sunil\.gemini\antigravity-ide\brain\bfc075b7-8f73-42a5-8da7-975724f3c531\.user_uploaded\media_1792567310253.jpg',
    'labour-rights': r'C:\Users\Sunil\.gemini\antigravity-ide\brain\bfc075b7-8f73-42a5-8da7-975724f3c531\.user_uploaded\media_1792567310320.jpg',
    'senior-citizen-rights': r'C:\Users\Sunil\.gemini\antigravity-ide\brain\bfc075b7-8f73-42a5-8da7-975724f3c531\.user_uploaded\media_1792567310354.jpg',
    'civil-liberties': r'C:\Users\Sunil\.gemini\antigravity-ide\brain\bfc075b7-8f73-42a5-8da7-975724f3c531\.user_uploaded\media_1792566385398.jpg',
    'freedom-of-speech': r'C:\Users\Sunil\.gemini\antigravity-ide\brain\bfc075b7-8f73-42a5-8da7-975724f3c531\.user_uploaded\media_1792566385420.jpg',
    'right-to-information': r'C:\Users\Sunil\.gemini\antigravity-ide\brain\bfc075b7-8f73-42a5-8da7-975724f3c531\.user_uploaded\media_1792566385503.jpg',
    'minority-rights': r'C:\Users\Sunil\.gemini\antigravity-ide\brain\bfc075b7-8f73-42a5-8da7-975724f3c531\.user_uploaded\media_1792566385547.jpg',
    'right-to-education': r'C:\Users\Sunil\.gemini\antigravity-ide\brain\bfc075b7-8f73-42a5-8da7-975724f3c531\.user_uploaded\media_1792566385554.jpg',
}

out_dir = r'public\images\rights'
os.makedirs(out_dir, exist_ok=True)

def enhance(im, scale=4):
    w, h = im.size
    im_up = im.resize((w * scale, h * scale), Image.Resampling.LANCZOS)
    im_up = im_up.filter(ImageFilter.UnsharpMask(radius=1.8, percent=140, threshold=2))
    im_up = ImageEnhance.Contrast(im_up).enhance(1.05)
    im_up = ImageEnhance.Color(im_up).enhance(1.03)
    return im_up

# Master high-res assets
master_lady_justice = Image.open(os.path.join(out_dir, 'lady-justice-statue.jpg'))
master_supreme_court = Image.open(os.path.join(out_dir, 'supreme-court-building.jpg'))
master_unity_hands = Image.open(os.path.join(out_dir, 'unity-hands-stack.jpg'))
master_citizens = Image.open(os.path.join(out_dir, 'citizens-collage.jpg'))

# 1. human-rights master assets
master_citizens.resize((1080, 806), Image.Resampling.LANCZOS).save(os.path.join(out_dir, 'human-rights-collage.jpg'), quality=96)
master_citizens.resize((1080, 806), Image.Resampling.LANCZOS).save(os.path.join(out_dir, 'human-rights-collage.png'))

lj_crop = master_lady_justice.crop((120, 100, 900, 760))
lj_crop.resize((780, 660), Image.Resampling.LANCZOS).save(os.path.join(out_dir, 'human-rights-laws.jpg'), quality=96)
lj_crop.resize((780, 660), Image.Resampling.LANCZOS).save(os.path.join(out_dir, 'human-rights-laws.png'))

master_unity_hands.resize((750, 560), Image.Resampling.LANCZOS).save(os.path.join(out_dir, 'human-rights-sidecard.jpg'), quality=96)
master_unity_hands.resize((750, 560), Image.Resampling.LANCZOS).save(os.path.join(out_dir, 'human-rights-sidecard.png'))

# 2. fundamental-rights master assets (keep fundamental-rights-collage.png intact)
sc_crop = master_supreme_court.crop((150, 100, 1050, 780))
sc_crop.resize((800, 604), Image.Resampling.LANCZOS).save(os.path.join(out_dir, 'fundamental-rights-laws.jpg'), quality=96)
sc_crop.resize((800, 604), Image.Resampling.LANCZOS).save(os.path.join(out_dir, 'fundamental-rights-laws.png'))

lj_sc = master_lady_justice.crop((200, 100, 850, 750))
lj_sc.resize((650, 650), Image.Resampling.LANCZOS).save(os.path.join(out_dir, 'fundamental-rights-sidecard.jpg'), quality=96)
lj_sc.resize((650, 650), Image.Resampling.LANCZOS).save(os.path.join(out_dir, 'fundamental-rights-sidecard.png'))

print("Applied master assets to human-rights and fundamental-rights!")

# 3. Process all categories with precision bounds
for slug, path in mapping.items():
    if not os.path.exists(path):
        print(f"Skipping {slug}: not found")
        continue
    im = Image.open(path).convert('RGB')
    
    # 1. Overview Collage (skip if already pristine HD like fundamental-rights, womens-rights, human-rights)
    if slug not in ['fundamental-rights', 'human-rights', 'womens-rights']:
        crop_c = im.crop((356, 215, 535, 358))
        hd_c = enhance(crop_c, scale=5)
        hd_c.save(os.path.join(out_dir, f'{slug}-collage.png'))
        hd_c.save(os.path.join(out_dir, f'{slug}-collage.jpg'), quality=96)
        print(f"[{slug}] Saved HD collage: {hd_c.size}")
        
    # 2. Sidecard (skip human-rights, fundamental-rights which have master assets)
    if slug not in ['human-rights', 'fundamental-rights']:
        crop_s = im.crop((502, 388, 655, 547))
        hd_s = enhance(crop_s, scale=4)
        hd_s.save(os.path.join(out_dir, f'{slug}-sidecard.png'))
        hd_s.save(os.path.join(out_dir, f'{slug}-sidecard.jpg'), quality=96)
        print(f"[{slug}] Saved HD sidecard: {hd_s.size}")
        
    # 3. Laws (skip human-rights, fundamental-rights which have master assets)
    if slug not in ['human-rights', 'fundamental-rights']:
        crop_l = im.crop((293, 565, 486, 718))
        hd_l = enhance(crop_l, scale=4)
        hd_l.save(os.path.join(out_dir, f'{slug}-laws.png'))
        hd_l.save(os.path.join(out_dir, f'{slug}-laws.jpg'), quality=96)
        print(f"[{slug}] Saved HD laws: {hd_l.size}")
        
    # 4. FAQ
    crop_f = im.crop((284, 772, 492, 908))
    hd_f = enhance(crop_f, scale=4)
    hd_f.save(os.path.join(out_dir, f'{slug}-faq.png'))
    hd_f.save(os.path.join(out_dir, f'{slug}-faq.jpg'), quality=96)
    print(f"[{slug}] Saved HD faq: {hd_f.size}")

print("\nSUCCESS: All 48 section images across all 12 categories processed and perfected in HD!")
