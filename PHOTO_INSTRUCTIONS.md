# How to Add Your Photos

## Option 1: Replace Placeholder Images

1. Add your photos to the Portfolio2026 folder:
   - `profile.jpg` - Your headshot (square, 400x400px recommended)
   - `about.jpg` - Your about image (portrait, 400x500px recommended)

2. Update index.html:
   - Line with hero image: Change `src="https://via.placeholder.com/200/667eea/ffffff?text=MV"` to `src="profile.jpg"`
   - Line with about image: Change `src="https://via.placeholder.com/400x500/667eea/ffffff?text=MV"` to `src="about.jpg"`

## Option 2: Use Image URLs

If your images are hosted online, just replace the src URLs in index.html with your image URLs.

## Current Image Locations in index.html:
- Hero image: Line ~20 (inside hero-avatar div)
- About image: Line ~50 (inside about-image div)
