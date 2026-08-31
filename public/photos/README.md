# Photographs — drop-in guide

The four files in this folder are **placeholders**. Replace them with the real
photographs, keeping the filenames **exactly** as they are.

## Why the filenames matter

The paths are referenced directly in the components. They are a contract, not a
convention. Rename a file and that panel renders a broken image.

| File | Scene | Used in | Manifesto line |
|---|---|---|---|
| `chapter-01-diplomacy.jpg` | Standing before national flags | Chapter I | "I represent something bigger than myself." |
| `chapter-02-authority.jpg` | Seated, leather chair, marble lobby | Chapter II **and the Constellation centre portrait** | "Authority is quiet." |
| `chapter-03-presence.jpg` | Evening event, guests behind | Chapter III | "I move in rooms I was told I'd never enter." |
| `chapter-04-vision.jpg` | Terrace at dusk, Dubai skyline | Chapter IV **and the hero backdrop** | "I build where the skyline is still going up." |

Note that two files do double duty:

- **`chapter-02-authority.jpg`** is also the circular portrait at the centre of the
  Constellation. It is cropped to a circle with `object-position: center 25%`, so the
  face must sit in the upper-middle of the frame.
- **`chapter-04-vision.jpg`** is also the full-bleed hero backdrop at 28% opacity. It
  wants visible sky or city lights — a very dark frame will read as an empty page.

## Specification

| Property | Target |
|---|---|
| Aspect ratio | **3:4 portrait** (the panels reserve this; other ratios get cropped) |
| Minimum size | 1200 × 1600 px |
| Ideal size | 1600 × 2133 px |
| Format | `.jpg` — **the extension must stay `.jpg`** |
| File size | Under ~400 KB each after compression |
| Colour | Warm/neutral. The page is gold on near-black; a cool blue cast will fight it |
| Framing | Face in the upper third. The lower third gets a dark scrim and the numeral plate |

## Compressing before you commit

Large photographs are the single easiest way to break the performance budget
(R-PERF-1: LCP under 2.5s on 4G). A 6 MB camera JPEG will do it on its own.

```bash
# With ImageMagick
magick input.jpg -resize 1600x2133^ -gravity center -extent 1600x2133 \
  -quality 82 -strip public/photos/chapter-01-diplomacy.jpg

# Or squoosh.app in a browser — target 300–400 KB, quality ~80
```

## Regenerating the placeholders

If you need the placeholders back:

```bash
pip install pillow
python3 scripts/make_placeholders.py
```

That also regenerates `public/og-image.jpg`, the social share card. Once the real
photographs are in, replacing the OG card with a properly designed 1200×630 image is
worth doing — it is the first thing anyone sees when the link is shared on WhatsApp.
