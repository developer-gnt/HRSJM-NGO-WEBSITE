import os
from PIL import Image, ImageFilter, ImageEnhance
import numpy as np

out_dir = r'public\images\news'
os.makedirs(out_dir, exist_ok=True)

user_dir = r'C:\Users\Sunil\.gemini\antigravity-ide\brain\bfc075b7-8f73-42a5-8da7-975724f3c531\.user_uploaded'

im_grid = Image.open(os.path.join(user_dir, 'media_1792579646648.png')).convert('RGB')
im_edu = Image.open(os.path.join(user_dir, 'media_1792579654567.png')).convert('RGB')
im_wom = Image.open(os.path.join(user_dir, 'media_1792579654596.png')).convert('RGB')
im_rti = Image.open(os.path.join(user_dir, 'media_1792579654623.png')).convert('RGB')

def enhance_and_save(img, path, scale=3):
    w, h = img.size
    up = img.resize((w * scale, h * scale), Image.Resampling.LANCZOS)
    up = up.filter(ImageFilter.UnsharpMask(radius=1.5, percent=130, threshold=2))
    up = ImageEnhance.Contrast(up).enhance(1.04)
    up.save(path)
    print(f"Saved: {path} ({up.size[0]}x{up.size[1]})")

# 1. Six card images from grid
cards = [
    ('card-rti.png', (19, 65, 303, 242)),
    ('card-education.png', (322, 65, 606, 242)),
    ('card-womens-rights.png', (625, 65, 909, 242)),
    ('card-maharashtra.png', (19, 520, 303, 725)),
    ('card-child-rights.png', (322, 520, 606, 725)),
    ('card-media-coverage.png', (625, 520, 909, 725))
]
for fname, box in cards:
    crop = im_grid.crop(box)
    enhance_and_save(crop, os.path.join(out_dir, fname), scale=3)

# 2. Main banners for the 3 detail pages
# RTI banner
crop_rti_b = im_rti.crop((15, 148, 301, 280))
enhance_and_save(crop_rti_b, os.path.join(out_dir, 'banner-rti.png'), scale=3)

# Edu banner
crop_edu_b = im_edu.crop((15, 149, 301, 289))
enhance_and_save(crop_edu_b, os.path.join(out_dir, 'banner-education.png'), scale=3)

# Women banner
crop_wom_b = im_wom.crop((15, 147, 301, 289))
enhance_and_save(crop_wom_b, os.path.join(out_dir, 'banner-womens-rights.png'), scale=3)

# 3. Sidebar quote posters
# RTI quote poster: (311, 500, 454, 719)
crop_rti_q = im_rti.crop((311, 513, 453, 715))
enhance_and_save(crop_rti_q, os.path.join(out_dir, 'quote-poster-rti.png'), scale=3)

# Edu quote poster: (313, 470, 452, 719)
crop_edu_q = im_edu.crop((312, 483, 453, 718))
enhance_and_save(crop_edu_q, os.path.join(out_dir, 'quote-poster-education.png'), scale=3)

# Women quote poster: (313, 470, 452, 729)
crop_wom_q = im_wom.crop((312, 483, 453, 718))
enhance_and_save(crop_wom_q, os.path.join(out_dir, 'quote-poster-womens-rights.png'), scale=3)

# 4. Testimonial Avatars
# Pooja (Class 7) in Edu: (24, 601, 64, 641)
crop_pooja = im_edu.crop((23, 601, 65, 643))
enhance_and_save(crop_pooja, os.path.join(out_dir, 'avatar-pooja.png'), scale=4)

# Rajesh (Parent) in Edu: (169, 601, 211, 643)
crop_rajesh = im_edu.crop((169, 601, 211, 643))
enhance_and_save(crop_rajesh, os.path.join(out_dir, 'avatar-rajesh.png'), scale=4)

# Anjali (College Student) in Women: (23, 556, 65, 598)
crop_anjali = im_wom.crop((23, 556, 65, 598))
enhance_and_save(crop_anjali, os.path.join(out_dir, 'avatar-anjali.png'), scale=4)

# Sunita (Entrepreneur) in Women: (169, 556, 211, 598)
crop_sunita = im_wom.crop((169, 556, 211, 598))
enhance_and_save(crop_sunita, os.path.join(out_dir, 'avatar-sunita.png'), scale=4)

# 5. Trending thumbnails from RTI sidebar
trending = [
    ('trending-1.png', (318, 213, 354, 237)),
    ('trending-2.png', (318, 250, 354, 274)),
    ('trending-3.png', (318, 287, 354, 311)),
    ('trending-4.png', (318, 324, 354, 348)),
    ('trending-5.png', (318, 361, 354, 385)),
]
for fname, box in trending:
    crop = im_rti.crop(box)
    enhance_and_save(crop, os.path.join(out_dir, fname), scale=3)

print("\nALL NEWS & BLOG ASSETS EXTRACTED AND ENHANCED IN HD!")
