#!/usr/bin/env python3
"""
Import the owner's HEIC photographs into the four contractual web-ready slots.

WHY THIS SCRIPT EXISTS
----------------------
The owner uploads straight from an iPhone, which produces:

  1. **HEIC files.** Safari renders HEIC; Chrome, Firefox and Edge do not. Shipping
     HEIC would mean the photographs are invisible to most of the audience — and
     silently so, which is the worst kind of broken.
  2. **Camera filenames** (`IMG_0774.HEIC`). The components reference fixed paths.
  3. **2:3 aspect ratio.** The chapter panels reserve 3:4.

So the raw uploads cannot be used directly, and renaming alone is not enough. This
script does the conversion deterministically and records the mapping, so re-running it
after a fresh upload produces the same result rather than depending on someone
remembering which photo was which.

MAPPING (identified by inspecting each image)
---------------------------------------------
  IMG_1689 → chapter-01-diplomacy  (formal suit, national flags)
  IMG_0775 → chapter-02-authority  (seated, leather chair, marble lobby)
  IMG_0779 → chapter-03-presence   (ARISTO event, guests behind)
  IMG_0774 → chapter-04-vision     (terrace at dusk, Dubai skyline)

CROPPING
--------
Sources are 2:3; the panels want 3:4, which is *wider* relative to height. So height is
trimmed, biased toward removing floor rather than headroom — `top_bias` controls how
much of the excess comes off the top. Because the output is exactly 3:4 and the
containers are exactly 3:4, this crop is the final composition: `object-position` in the
components has nothing left to do. That is deliberate — the crop belongs in one
reviewable place, not spread across CSS.

Usage:
    python3 scripts/import_photos.py --src <dir-with-HEIC-files>
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

try:
    import pillow_heif
except ImportError:
    sys.exit("pillow-heif is required:  pip install pillow pillow-heif")

from PIL import Image

pillow_heif.register_heif_opener()

ROOT = Path(__file__).resolve().parent.parent
DEST_DIR = ROOT / "public" / "photos"

TARGET_RATIO = 3 / 4  # width / height

# source stem, destination stem, fraction of the trimmed height taken off the TOP
#
# Verified by opening each converted file individually. Do not trust a batch listing
# for this — an earlier pass had IMG_0774 and IMG_0775 transposed, which put the Dubai
# skyline under the heading "Authority is quiet" and the marble-lobby portrait under
# "I build where the skyline is still going up". Both files are the same subject in the
# same black suit, so nothing looked obviously broken. Re-verify visually after any
# change here.
MAPPING: list[tuple[str, str, float]] = [
    ("IMG_1689", "chapter-01-diplomacy", 0.00),  # formal suit, national flags
    ("IMG_0774", "chapter-02-authority", 0.15),  # seated, leather chair, marble lobby
    ("IMG_0779", "chapter-03-presence", 0.00),  # ARISTO event, guests behind
    ("IMG_0775", "chapter-04-vision", 0.00),  # terrace at dusk, Dubai skyline
]

# Source for the circular Constellation portrait: the marble-lobby frame is the
# strongest direct-to-camera shot of the four.
PORTRAIT_SOURCE = "IMG_0774"

# Do not upscale. Enlarging a small source invents no detail, it only inflates bytes.
MAX_WIDTH = 1600
QUALITY = 84


def crop_to_ratio(im: Image.Image, top_bias: float) -> Image.Image:
    """Centre-crop to 3:4, trimming whichever dimension is in excess."""
    w, h = im.size
    current = w / h

    if abs(current - TARGET_RATIO) < 0.001:
        return im

    if current < TARGET_RATIO:
        # Too tall — trim height.
        new_h = int(round(w / TARGET_RATIO))
        excess = h - new_h
        top = int(round(excess * top_bias))
        return im.crop((0, top, w, top + new_h))

    # Too wide — trim width, centred.
    new_w = int(round(h * TARGET_RATIO))
    left = (w - new_w) // 2
    return im.crop((left, 0, left + new_w, h))


def make_constellation_portrait(src_dir: Path) -> None:
    """
    Square head-and-shoulders crop for the Constellation centre.

    The Constellation portrait is rendered inside a 200px circle. Feeding it the same
    full-length 3:4 chapter image makes a weak avatar — a tiny seated figure lost in a
    circle. A circular portrait wants head and shoulders, so it gets its own crop.

    Derived from the same source as chapter-02 (seated, marble lobby), which is the
    strongest direct-to-camera frame of the four.
    """
    matches = [p for p in src_dir.iterdir() if p.stem.upper() == PORTRAIT_SOURCE.upper()]
    if not matches:
        print(
            f"  SKIP  constellation portrait — {PORTRAIT_SOURCE} not found",
            file=sys.stderr,
        )
        return

    im = Image.open(matches[0]).convert("RGB")
    w, h = im.size

    # Face sits slightly right of centre and around 42% down in this frame.
    face_x, face_y = 0.52, 0.42
    side = int(round(min(w, h) * 0.62))

    cx, cy = int(w * face_x), int(h * face_y)
    left = max(0, min(cx - side // 2, w - side))
    # Bias upward so the crop keeps chin-to-collar rather than centring on the nose.
    top = max(0, min(cy - int(side * 0.44), h - side))

    portrait = im.crop((left, top, left + side, top + side))

    target = 640
    if portrait.width != target:
        portrait = portrait.resize((target, target), Image.LANCZOS)

    dest = DEST_DIR / "portrait-constellation.jpg"
    portrait.save(dest, "JPEG", quality=86, optimize=True, progressive=True)
    print(
        f"  {matches[0].name:18} -> {dest.name:28} "
        f"{w}x{h} -> {target}x{target}  {dest.stat().st_size / 1024:6.1f} KB"
    )


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--src", required=True, help="directory containing the HEIC uploads")
    args = ap.parse_args()

    src_dir = Path(args.src).expanduser().resolve()
    if not src_dir.is_dir():
        sys.exit(f"source directory not found: {src_dir}")

    DEST_DIR.mkdir(parents=True, exist_ok=True)
    low_res: list[str] = []
    failures = 0

    for src_stem, dest_stem, top_bias in MAPPING:
        # Accept any case/extension the phone happened to use.
        matches = [
            p
            for p in src_dir.iterdir()
            if p.stem.upper() == src_stem.upper()
            and p.suffix.lower() in {".heic", ".heif", ".jpg", ".jpeg", ".png"}
        ]
        if not matches:
            print(f"  MISSING  {src_stem}.* not found in {src_dir}", file=sys.stderr)
            failures += 1
            continue

        src = matches[0]
        im = Image.open(src).convert("RGB")
        orig = im.size

        im = crop_to_ratio(im, top_bias)

        if im.width > MAX_WIDTH:
            new_h = int(round(im.height * MAX_WIDTH / im.width))
            im = im.resize((MAX_WIDTH, new_h), Image.LANCZOS)

        dest = DEST_DIR / f"{dest_stem}.jpg"
        im.save(dest, "JPEG", quality=QUALITY, optimize=True, progressive=True)

        kb = dest.stat().st_size / 1024
        print(
            f"  {src.name:18} -> {dest.name:28} "
            f"{orig[0]}x{orig[1]} -> {im.width}x{im.height}  {kb:6.1f} KB"
        )

        # 1200px wide is the practical floor for a panel rendered at ~46% of a
        # 1200px shell on a 2x display. Below that it will look soft.
        if im.width < 1200:
            low_res.append(f"{dest.name} ({im.width}x{im.height})")

    make_constellation_portrait(src_dir)

    if low_res:
        print("\n  NOTE — below the 1200px width target, will look soft on retina:")
        for item in low_res:
            print(f"    - {item}")
        print("  Not upscaled deliberately: enlarging adds bytes, not detail.")
        print("  Re-export these from the original camera files to fix properly.")

    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
