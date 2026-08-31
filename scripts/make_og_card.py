#!/usr/bin/env python3
"""
Generate the Open Graph / Twitter share card (1200x630).

WHY THIS MATTERS MORE THAN IT LOOKS
-----------------------------------
Almost all traffic to this page arrives as a *shared link* — a TikTok bio tap, a
WhatsApp forward, a Telegram post. For most of those visitors the OG card is the
genuine first impression, seen before the page itself. A placeholder card is a wasted
first impression at the exact moment interest is highest.

DESIGN
------
Split composition, because a face raises click-through on social previews and a
text-only card reads as a document:

    left  40%  — the marble-lobby portrait, scrimmed toward the seam
    right 60%  — black, gold rule, crown, name, roles, thesis, domain

Rendered with the real brand faces (Cinzel, Playfair Display, JetBrains Mono) rather
than PIL's bitmap default, so the card is typographically identical to the page it
links to. Fonts are fetched into scripts/.fonts/ on demand and are not committed —
they are Google Fonts, freely redistributable, but there is no reason to vendor them.

WhatsApp is the important target and it is the fussiest: it prefers cards under
~300 KB and it does NOT reliably render WebP, so this outputs baseline JPEG.

Usage:
    python3 scripts/make_og_card.py
"""

from __future__ import annotations

import sys
import urllib.request
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
FONT_DIR = Path(__file__).resolve().parent / ".fonts"
PORTRAIT = ROOT / "public" / "photos" / "chapter-02-authority.jpg"
DEST = ROOT / "public" / "og-image.jpg"

W, H = 1200, 630
SPLIT = int(W * 0.42)  # where the photo ends and the black panel begins

GOLD = (201, 168, 76)
GOLD_LIT = (232, 212, 139)
CREAM = (232, 224, 208)
MUTED = (160, 138, 99)
DARK = (10, 10, 10)
CARD = (17, 17, 24)

FONTS = {
    "Cinzel-Bold.ttf": "https://fonts.gstatic.com/s/cinzel/v26/8vIU7ww63mVu7gtR-kwKxNvkNOjw-jHgTYo.ttf",
    "PlayfairDisplay-Italic.ttf": "https://fonts.gstatic.com/s/playfairdisplay/v40/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_qiTbtY.ttf",
    "JetBrainsMono-Medium.ttf": "https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8-qxjPQ.ttf",
}


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    FONT_DIR.mkdir(exist_ok=True)
    path = FONT_DIR / name
    if not path.exists():
        print(f"  fetching {name}")
        urllib.request.urlretrieve(FONTS[name], path)
    return ImageFont.truetype(str(path), size)


def tracked(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    text: str,
    f: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int],
    tracking: float = 0.0,
    center_width: int | None = None,
) -> int:
    """
    Draw text with manual letter-spacing, since PIL has no tracking support.

    Returns the rendered width, so callers can centre or measure. Tracking is what
    makes Cinzel read as *engraved* rather than merely set, and it is central to this
    brand's look — worth the manual loop.
    """
    space = f.size * tracking
    total = sum(f.getlength(ch) + space for ch in text) - space

    x, y = xy
    if center_width is not None:
        x = int(x + (center_width - total) / 2)

    for ch in text:
        draw.text((x, y), ch, font=f, fill=fill)
        x += f.getlength(ch) + space
    return int(total)


def build() -> Image.Image:
    img = Image.new("RGB", (W, H), DARK)
    draw = ImageDraw.Draw(img)

    # ── Right panel: subtle vertical wash so it isn't a flat black rectangle ──
    for y in range(H):
        t = y / (H - 1)
        c = tuple(int(CARD[i] * (1 - t) + DARK[i] * t) for i in range(3))
        draw.line([(SPLIT, y), (W, y)], fill=c)

    # ── Left: portrait ──
    if PORTRAIT.exists():
        p = Image.open(PORTRAIT).convert("RGB")
        # Cover-fit the left column.
        target_w, target_h = SPLIT, H
        scale = max(target_w / p.width, target_h / p.height)
        p = p.resize((int(p.width * scale), int(p.height * scale)), Image.LANCZOS)
        # Crop toward the top so the face is kept, not the floor.
        left = max(0, (p.width - target_w) // 2)
        top = max(0, int((p.height - target_h) * 0.18))
        p = p.crop((left, top, left + target_w, top + target_h))
        img.paste(p, (0, 0))

        # Feather the seam into the black panel so the split reads as one composition.
        feather = 150
        grad = Image.new("L", (feather, H))
        gd = ImageDraw.Draw(grad)
        for x in range(feather):
            gd.line([(x, 0), (x, H)], fill=int(255 * (x / feather) ** 1.4))
        black = Image.new("RGB", (feather, H), DARK)
        region = img.crop((SPLIT - feather, 0, SPLIT, H))
        img.paste(Image.composite(black, region, grad), (SPLIT - feather, 0))
    else:
        print(f"  WARNING: portrait not found at {PORTRAIT}", file=sys.stderr)

    # ── Gold seam ──
    draw.line([(SPLIT, 0), (SPLIT, H)], fill=GOLD, width=2)
    # Top and bottom brand rules.
    draw.line([(0, 0), (W, 0)], fill=GOLD, width=5)
    draw.line([(0, H - 1), (W, H - 1)], fill=(60, 50, 28), width=3)

    # ── Right panel content ──
    x0 = SPLIT + 62
    col = W - x0 - 62

    f_kicker = font("JetBrainsMono-Medium.ttf", 17)
    f_name = font("Cinzel-Bold.ttf", 74)
    f_role = font("Cinzel-Bold.ttf", 22)
    f_thesis = font("PlayfairDisplay-Italic.ttf", 25)
    f_domain = font("JetBrainsMono-Medium.ttf", 16)

    y = 74
    tracked(draw, (x0, y), "MACAL EMPIRE", f_kicker, MUTED, 0.30)

    y += 52
    tracked(draw, (x0, y), "MAHMOUD", f_name, GOLD, 0.05)
    y += 84
    tracked(draw, (x0, y), "ASHRI", f_name, GOLD, 0.05)

    y += 106
    draw.line([(x0, y), (x0 + 92, y)], fill=GOLD, width=2)

    y += 26
    tracked(draw, (x0, y), "FOUNDER · OPERATOR · MENTOR", f_role, CREAM, 0.10)

    # ── Thesis, wrapped by measured width ──
    y += 60
    thesis = "This is not a portfolio. It's an operating system for power and self-mastery."
    words, line, lines = thesis.split(), "", []
    for word in words:
        probe = f"{line} {word}".strip()
        if f_thesis.getlength(probe) <= col:
            line = probe
        else:
            lines.append(line)
            line = word
    if line:
        lines.append(line)

    for ln in lines[:3]:
        draw.text((x0, y), ln, font=f_thesis, fill=MUTED)
        y += 36

    # ── Domain, pinned to the bottom ──
    tracked(draw, (x0, H - 74), "MAHMOUD-ASHR.EMPIREENGLISH.ONLINE", f_domain, GOLD_LIT, 0.13)

    return img


def main() -> int:
    if not PORTRAIT.exists():
        print(f"portrait missing: {PORTRAIT}", file=sys.stderr)
        return 1

    img = build()
    img.save(DEST, "JPEG", quality=88, optimize=True, progressive=False)
    kb = DEST.stat().st_size / 1024
    print(f"  wrote {DEST.relative_to(ROOT)}  {img.width}x{img.height}  {kb:.1f} KB")

    if kb > 300:
        print("  NOTE: over ~300 KB — WhatsApp may skip the preview. Lower quality.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
