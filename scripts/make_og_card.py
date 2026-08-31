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

from PIL import features, Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
FONT_DIR = Path(__file__).resolve().parent / ".fonts"
PORTRAIT = ROOT / "public" / "photos" / "chapter-02-authority.jpg"
DEST = ROOT / "public" / "og-image.jpg"
DEST_AR = ROOT / "public" / "og-image-ar.jpg"

W, H = 1200, 630
SPLIT = int(W * 0.42)  # where the photo ends and the black panel begins

GOLD = (201, 168, 76)
GOLD_LIT = (232, 212, 139)
CREAM = (232, 224, 208)
MUTED = (160, 138, 99)
DARK = (10, 10, 10)
CARD = (17, 17, 24)

# Tajawal for the Arabic card. Cinzel has no Arabic glyphs at all, so an Arabic card set
# in it would render as boxes or a fallback system face.
FONTS = {
    "Tajawal-Bold.ttf": "https://fonts.gstatic.com/s/tajawal/v12/Iurf6YBj_oCad4k1l4qkLrY.ttf",
    "Tajawal-Regular.ttf": "https://fonts.gstatic.com/s/tajawal/v12/Iura6YBj_oCad4k1rzY.ttf",
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


# Pillow in this environment is built with raqm/HarfBuzz/FriBiDi, so it can shape and
# reorder Arabic natively from base codepoints. That is the correct path.
#
# The first attempt used arabic_reshaper + python-bidi, which converts text into legacy
# Arabic Presentation Forms (U+FE70–FEFF). Modern fonts — Tajawal included — implement
# joining through OpenType GSUB features on the BASE codepoints and simply do not contain
# the presentation-form block, so every shaped glyph fell back to notdef and the card
# rendered as disconnected, reversed letters. It looked exactly like a shaping failure
# because it was one — just not where expected.
#
# Passing the original string with direction="rtl" lets HarfBuzz do joining and FriBiDi
# do reordering, which is what a browser does.
_HAS_RAQM = features.check("raqm")

RTL_KW = {"direction": "rtl", "language": "ar"} if _HAS_RAQM else {}


def ar_len(f: ImageFont.FreeTypeFont, text: str) -> float:
    """Measure Arabic with the same shaping used to draw it."""
    return f.getlength(text, **RTL_KW)  # type: ignore[arg-type]


def build_ar() -> Image.Image:
    """Arabic share card. Same composition, mirrored: portrait right, text right-aligned."""
    img = Image.new("RGB", (W, H), DARK)
    draw = ImageDraw.Draw(img)

    split_x = W - SPLIT  # photo on the RIGHT for an RTL reader

    for y in range(H):
        t = y / (H - 1)
        c = tuple(int(CARD[i] * (1 - t) + DARK[i] * t) for i in range(3))
        draw.line([(0, y), (split_x, y)], fill=c)

    if PORTRAIT.exists():
        p = Image.open(PORTRAIT).convert("RGB")
        target_w, target_h = SPLIT, H
        scale = max(target_w / p.width, target_h / p.height)
        p = p.resize((int(p.width * scale), int(p.height * scale)), Image.LANCZOS)
        left = max(0, (p.width - target_w) // 2)
        top = max(0, int((p.height - target_h) * 0.18))
        p = p.crop((left, top, left + target_w, top + target_h))
        img.paste(p, (split_x, 0))

        feather = 150
        grad = Image.new("L", (feather, H))
        gd = ImageDraw.Draw(grad)
        for x in range(feather):
            gd.line([(x, 0), (x, H)], fill=int(255 * (1 - x / feather) ** 1.4))
        black = Image.new("RGB", (feather, H), DARK)
        region = img.crop((split_x, 0, split_x + feather, H))
        img.paste(Image.composite(black, region, grad), (split_x, 0))

    draw.line([(split_x, 0), (split_x, H)], fill=GOLD, width=2)
    draw.line([(0, 0), (W, 0)], fill=GOLD, width=5)
    draw.line([(0, H - 1), (W, H - 1)], fill=(60, 50, 28), width=3)

    f_kicker = font("Tajawal-Regular.ttf", 22)
    f_name = font("Cinzel-Bold.ttf", 70)
    f_role = font("Tajawal-Bold.ttf", 28)
    f_thesis = font("Tajawal-Regular.ttf", 26)
    f_domain = font("JetBrainsMono-Medium.ttf", 16)

    right = split_x - 62  # text is right-aligned, growing leftward

    def rtl_text(y: int, text: str, f, fill):
        # anchor="ra" = right-aligned baseline-independent; combined with direction=rtl
        # this places the line's visual right edge at `right`.
        draw.text((right, y), text, font=f, fill=fill, anchor="rt", **RTL_KW)

    y = 72
    rtl_text(y, "ماكال إمباير", f_kicker, MUTED)

    # The NAME stays Latin — proper noun and brand mark — but right-aligned.
    y += 56
    for part in ("MAHMOUD", "ASHRI"):
        wid = sum(f_name.getlength(ch) + f_name.size * 0.05 for ch in part) - f_name.size * 0.05
        x = right - wid
        for ch in part:
            draw.text((x, y), ch, font=f_name, fill=GOLD)
            x += f_name.getlength(ch) + f_name.size * 0.05
        y += 82

    y += 22
    draw.line([(right - 92, y), (right, y)], fill=GOLD, width=2)

    y += 24
    rtl_text(y, "مؤسس · مشغّل · مُرشد", f_role, CREAM)

    y += 62
    thesis = "هذه ليست صفحة إنجازات. هذا نظامٌ متكامل لبناء القوة وإتقان الذات."
    words, line, lines = thesis.split(), "", []
    col = right - 62
    for word in words:
        # Words stay in LOGICAL order. An earlier version prepended each word to
        # reverse them by hand, which double-reversed the line: FriBiDi already
        # reorders for display, so the manual flip produced correctly-joined Arabic
        # with its words scrambled — subtly wrong in a way that still "looks Arabic".
        probe = f"{line} {word}".strip()
        if ar_len(f_thesis, probe) <= col:
            line = probe
        else:
            lines.append(line)
            line = word
    if line:
        lines.append(line)
    for ln in lines[:3]:
        rtl_text(y, ln, f_thesis, MUTED)
        y += 40

    dom = "MAHMOUD-ASHRI.EMPIREENGLISH.ONLINE"
    wid = sum(f_domain.getlength(ch) + f_domain.size * 0.13 for ch in dom) - f_domain.size * 0.13
    x = right - wid
    for ch in dom:
        draw.text((x, H - 74), ch, font=f_domain, fill=GOLD_LIT)
        x += f_domain.getlength(ch) + f_domain.size * 0.13

    return img


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

    if not _HAS_RAQM:
        print(
            "  ABORT: Pillow lacks raqm/HarfBuzz, so Arabic cannot be shaped correctly.\n"
            "  Refusing to write a broken Arabic card — the English one is better than a\n"
            "  card with disconnected, reversed letters.",
            file=sys.stderr,
        )
        return 1

    for builder, dest in ((build, DEST), (build_ar, DEST_AR)):
        img = builder()
        img.save(dest, "JPEG", quality=88, optimize=True, progressive=False)
        kb = dest.stat().st_size / 1024
        print(f"  wrote {dest.relative_to(ROOT)}  {img.width}x{img.height}  {kb:.1f} KB")
        if kb > 300:
            print(f"  NOTE: {dest.name} over ~300 KB — WhatsApp may skip the preview.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
