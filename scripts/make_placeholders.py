#!/usr/bin/env python3
"""
Generate placeholder photographs so the build is NEVER blocked on owner assets.

Why this exists (requirements.md R-PHO-3):
The four real photographs are supplied by the owner. Until they land, the page still
has to build, deploy and look deliberate — a broken-image icon on a premium landing
page is worse than no page. So every contractual path gets a dark, gold-framed plate
that says exactly which photograph belongs there.

The filenames are CONTRACTUAL. The owner overwrites these files in place, keeping the
same names. Renaming them breaks the page.

Usage:
    python3 scripts/make_placeholders.py
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

# ── Brand palette (design.md §2) ─────────────────────────────
DARK = (10, 10, 10)
CARD = (17, 17, 24)
CHARCOAL = (26, 26, 46)
GOLD = (201, 168, 76)
MUTED = (139, 115, 85)
CREAM = (232, 224, 208)

ROOT = Path(__file__).resolve().parent.parent
PHOTOS = ROOT / "public" / "photos"

# 3:4 portrait — matches the aspect ratio the chapter panels reserve.
W, H = 900, 1200

PLATES = [
    ("chapter-01-diplomacy.jpg", "I", "DIPLOMACY", "Standing before the flags"),
    ("chapter-02-authority.jpg", "II", "AUTHORITY", "Seated, marble lobby"),
    ("chapter-03-presence.jpg", "III", "PRESENCE", "The event, crowd behind"),
    ("chapter-04-vision.jpg", "IV", "VISION", "Dubai skyline at dusk"),
]


def gradient_backdrop(w: int, h: int) -> Image.Image:
    """Vertical charcoal→black wash, so the plate reads as intentional, not empty."""
    img = Image.new("RGB", (w, h), DARK)
    draw = ImageDraw.Draw(img)
    for y in range(h):
        t = y / max(h - 1, 1)
        # Ease so the darkening concentrates toward the bottom, like the real scrims.
        e = t * t
        r = int(CHARCOAL[0] * (1 - e) + DARK[0] * e)
        g = int(CHARCOAL[1] * (1 - e) + DARK[1] * e)
        b = int(CHARCOAL[2] * (1 - e) + DARK[2] * e)
        draw.line([(0, y), (w, y)], fill=(r, g, b))
    return img


def draw_plate(numeral: str, title: str, scene: str) -> Image.Image:
    img = gradient_backdrop(W, H)
    d = ImageDraw.Draw(img)

    # Gold frame
    inset = 28
    d.rectangle([inset, inset, W - inset, H - inset], outline=GOLD, width=2)

    # Corner brackets — the house framing device
    b, arm = 52, 46
    for cx, cy, dx, dy in (
        (b, b, 1, 1),
        (W - b, b, -1, 1),
        (b, H - b, 1, -1),
        (W - b, H - b, -1, -1),
    ):
        d.line([(cx, cy), (cx + arm * dx, cy)], fill=GOLD, width=4)
        d.line([(cx, cy), (cx, cy + arm * dy)], fill=GOLD, width=4)

    cx = W // 2

    # Numeral in a ring
    r = 62
    cy = int(H * 0.34)
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=GOLD, width=3)
    d.text((cx, cy), numeral, fill=GOLD, anchor="mm")

    # Title, scene, and the instruction
    d.text((cx, int(H * 0.50)), title, fill=CREAM, anchor="mm")
    d.text((cx, int(H * 0.545)), scene, fill=MUTED, anchor="mm")

    d.line(
        [(cx - 90, int(H * 0.60)), (cx + 90, int(H * 0.60))],
        fill=GOLD,
        width=1,
    )

    d.text(
        (cx, int(H * 0.655)),
        "PLACEHOLDER — REPLACE THIS FILE",
        fill=GOLD,
        anchor="mm",
    )
    d.text(
        (cx, int(H * 0.685)),
        "keep the same filename",
        fill=MUTED,
        anchor="mm",
    )

    # Footer mark
    d.text((cx, H - 66), "MACAL EMPIRE", fill=MUTED, anchor="mm")

    return img


def make_og() -> Image.Image:
    """1200x630 social card, same language as the plates."""
    ow, oh = 1200, 630
    img = Image.new("RGB", (ow, oh), DARK)
    d = ImageDraw.Draw(img)

    for y in range(oh):
        t = y / (oh - 1)
        r = int(CARD[0] * (1 - t) + DARK[0] * t)
        g = int(CARD[1] * (1 - t) + DARK[1] * t)
        b = int(CARD[2] * (1 - t) + DARK[2] * t)
        d.line([(0, y), (ow, y)], fill=(r, g, b))

    d.rectangle([22, 22, ow - 22, oh - 22], outline=GOLD, width=2)
    d.line([(0, 0), (ow, 0)], fill=GOLD, width=6)

    cx = ow // 2
    d.text((cx, 236), "MAHMOUD ASHRI", fill=GOLD, anchor="mm")
    d.text((cx, 296), "FOUNDER  ·  OPERATOR  ·  MENTOR", fill=CREAM, anchor="mm")
    d.line([(cx - 150, 340), (cx + 150, 340)], fill=GOLD, width=1)
    d.text((cx, 386), "This is not a portfolio.", fill=CREAM, anchor="mm")
    d.text(
        (cx, 416),
        "It's an operating system for power and self-mastery.",
        fill=MUTED,
        anchor="mm",
    )
    d.text((cx, oh - 70), "MACAL EMPIRE", fill=MUTED, anchor="mm")
    return img


def main() -> None:
    PHOTOS.mkdir(parents=True, exist_ok=True)

    for filename, numeral, title, scene in PLATES:
        out = PHOTOS / filename
        draw_plate(numeral, title, scene).save(out, "JPEG", quality=82, optimize=True)
        print(f"  wrote {out.relative_to(ROOT)}")

    og = ROOT / "public" / "og-image.jpg"
    make_og().save(og, "JPEG", quality=88, optimize=True)
    print(f"  wrote {og.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
