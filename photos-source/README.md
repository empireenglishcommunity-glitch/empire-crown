# Original photographs (source of truth)

The owner's original camera files, kept **only** so the web-ready crops in
`public/photos/` stay reproducible. Nothing here is served to a browser.

```bash
pip install pillow pillow-heif
python3 scripts/import_photos.py --src photos-source
```

## Why these are not used directly

| Problem | Consequence |
|---|---|
| **HEIC format** | Safari renders it. Chrome, Firefox and Edge do **not** — the photographs would be invisible to most of the audience, and silently so |
| **Camera filenames** | The components reference fixed paths; `IMG_0774.HEIC` means nothing to them |
| **2:3 aspect ratio** | The chapter panels reserve 3:4, so an uncropped image gets cut arbitrarily by CSS |

`scripts/import_photos.py` fixes all three deterministically and records the crop
decisions in code, so they are reviewable rather than living in someone's memory.

## The mapping

| Source | Becomes | Scene | Manifesto line |
|---|---|---|---|
| `IMG_1689.HEIC` | `chapter-01-diplomacy.jpg` | Formal suit, national flags | "I represent something bigger than myself." |
| `IMG_0774.HEIC` | `chapter-02-authority.jpg` **+ `portrait-constellation.jpg`** | Seated, leather chair, marble lobby | "Authority is quiet." |
| `IMG_0779.HEIC` | `chapter-03-presence.jpg` | ARISTO event, guests behind | "I move in rooms I was told I'd never enter." |
| `IMG_0775.HEIC` | `chapter-04-vision.jpg` | Terrace at dusk, Dubai skyline | "I build where the skyline is still going up." |

**A warning worth heeding:** an earlier pass had `IMG_0774` and `IMG_0775` transposed.
That put the Dubai skyline under "Authority is quiet" and the marble-lobby portrait
under "I build where the skyline is still going up." Because all four photographs show
the same man in the same black suit, **nothing looked broken** — the page rendered
perfectly and the meaning was wrong. It was only caught by opening each converted file
one at a time.

So: after any change to the mapping, **open each output individually and check it
against its manifesto line.** A batch listing or a thumbnail grid is not sufficient
evidence here.

## Resolution caveat

These originals are smaller than ideal:

| File | Size | After 3:4 crop |
|---|---|---|
| `IMG_1689.HEIC` | 1080 × 1620 | 1080 × 1440 |
| `IMG_0774.HEIC` | 1026 × 1534 | 1026 × 1368 |
| `IMG_0779.HEIC` | 844 × 1264 | 844 × 1125 |
| `IMG_0775.HEIC` | 844 × 1264 | 844 × 1125 |

The practical floor for a chapter panel — rendered at roughly 46% of a 1200px shell on
a 2× display — is about **1200px wide**. All four are below it, so they will look
slightly soft on a modern phone or a retina laptop.

They are **deliberately not upscaled**: enlarging adds file size without adding detail,
and costs performance for nothing.

**To fix properly:** re-export from the originals on the phone or camera (AirDrop or
"Actual Size" rather than a resized share), at 1600 × 2400 or larger, drop them in here
under the same names, and re-run the script.
