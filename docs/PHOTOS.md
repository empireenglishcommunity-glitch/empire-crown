# Photographs — web-ready assets

**These files are generated. Do not hand-edit them.**

They are produced from the owner's originals in [`photos-source/`](../photos-source/)
by `scripts/import_photos.py`, which converts HEIC → JPEG, crops 2:3 → 3:4, and caps
width at 1600px.

```bash
pip install pillow pillow-heif
python3 scripts/import_photos.py --src photos-source
```

## The five assets

| File | Dimensions | Used in | Manifesto line |
|---|---|---|---|
| `chapter-01-diplomacy.jpg` | 1080 × 1440 | Chapter I | "I represent something bigger than myself." |
| `chapter-02-authority.jpg` | 1026 × 1368 | Chapter II | "Authority is quiet." |
| `chapter-03-presence.jpg` | 844 × 1125 | Chapter III | "I move in rooms I was told I'd never enter." |
| `chapter-04-vision.jpg` | 844 × 1125 | Chapter IV **and the hero backdrop** (28% opacity) | "I build where the skyline is still going up." |
| `portrait-constellation.jpg` | 640 × 640 | The Constellation centre portrait | — |

Filenames are **contractual** — they are referenced directly in the components. Renaming
one breaks that panel.

## Why the Constellation has its own file

The Constellation portrait sits inside a 200px circle. Filling a circle with a
full-length 3:4 frame produces a tiny figure lost in a ring, which undercuts the section
that carries the page's central argument. So it gets a dedicated square
head-and-shoulders crop instead, derived from the same marble-lobby source as Chapter II
— the strongest direct-to-camera frame of the four.

## Replacing a photograph

Do **not** drop a new file here. Put it in `photos-source/` under the matching name and
re-run the script — otherwise the next person to run it silently overwrites your work.

If you are changing *which* source maps to *which* chapter, edit `MAPPING` in
`scripts/import_photos.py`, then **open each output file individually** and check it
against its manifesto line above.

That last step is not ceremony. An earlier pass had two sources transposed, which put
the Dubai skyline under "Authority is quiet." All four photographs show the same man in
the same black suit, so the page rendered perfectly and simply meant the wrong thing. A
thumbnail grid will not catch this.

## Current resolution caveat

All four chapter images are **below the ~1200px width** that a panel wants on a 2×
display, so they will look slightly soft. They are deliberately not upscaled —
enlarging adds bytes, not detail.

To improve: re-export the originals at 1600 × 2400 or larger (AirDrop or "Actual Size",
not a resized share), drop them into `photos-source/` under the same names, re-run the
script. No code changes needed.

## Social share card

`public/og-image.jpg` (1200 × 630) is still the generated placeholder from
`scripts/make_placeholders.py`. It is the first thing anyone sees when this link is
shared on WhatsApp, so replacing it with a properly designed card is worth doing.
