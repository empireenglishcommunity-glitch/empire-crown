#!/usr/bin/env python3
"""
Guard the Arabic layer against the four failure modes that do not look like failures.

Run before every commit that touches Arabic:

    python3 scripts/check_arabic.py            # source only
    python3 scripts/check_arabic.py --export   # also audit out/ after a build

WHY EACH CHECK EXISTS
---------------------
1. **Bidi.** An Arabic line containing two or more embedded Latin tokens is reordered
   unpredictably by the bidirectional algorithm, and differently across browsers. It
   renders "fine" in review and scrambles on someone's phone.

2. **Tracking.** Arabic letters JOIN. This design tracks text 0.06–0.35em, and applying
   that to Arabic pulls joined forms apart so words visibly fracture. Every Arabic node
   must carry `.ar-text`, which forces `letter-spacing: 0`.

3. **Direction and language.** Missing `dir="rtl"` or `lang="ar"` degrades rendering and
   screen-reader pronunciation without throwing anything.

4. **Font coverage.** Cinzel and Playfair Display contain zero Arabic glyphs. If the
   Tajawal variable is absent from the CSS, Arabic silently falls back to the system UI
   font — the page still "works", it just stops looking premium.

None of these raise an error at build time. That is exactly why they need a script.
"""

from __future__ import annotations

import argparse
import re
import sys
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
AR_SOURCE = ROOT / "src" / "i18n" / "ar.ts"
EXPORT_HTML = ROOT / "out" / "index.html"
EXPORT_CSS_DIR = ROOT / "out" / "_next" / "static" / "chunks"

ARABIC_RANGE = r"[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]"

# Whitespace codepoints where Python's str.split() and JavaScript's /\s+/ disagree.
# Content containing these has caused silent divergence elsewhere in this ecosystem.
RISKY_WHITESPACE = ["\x1c", "\x1d", "\x1e", "\x1f", "\x85", "\ufeff"]


def strip_comments(src: str) -> str:
    """Remove comments so doc-comment prose is never mistaken for a string literal."""
    src = re.sub(r"/\*.*?\*/", "", src, flags=re.S)
    return re.sub(r"//.*", "", src)


def arabic_literals(src: str) -> list[str]:
    body = strip_comments(src)
    literals = re.findall(r"'([^'\\]*)'", body)
    return [s for s in literals if re.search(ARABIC_RANGE, s)]


def check_source() -> list[str]:
    problems: list[str] = []

    if not AR_SOURCE.exists():
        return [f"missing {AR_SOURCE.relative_to(ROOT)}"]

    src = AR_SOURCE.read_text(encoding="utf-8")
    strings = arabic_literals(src)
    print(f"  {len(strings)} Arabic string literals found")

    for s in strings:
        # 1. Bidi
        latin = re.findall(r"[A-Za-z]{2,}", s)
        if len(latin) >= 2:
            problems.append(f"BIDI: >=2 Latin tokens {latin} in: {s[:60]}")

        # 4b. Risky whitespace
        for ch in RISKY_WHITESPACE:
            if ch in s:
                problems.append(f"WHITESPACE: U+{ord(ch):04X} in: {s[:60]}")

        # Malformed codepoints
        for ch in s:
            if unicodedata.category(ch) in ("Cs", "Co", "Cn"):
                problems.append(f"CODEPOINT: U+{ord(ch):04X} invalid in: {s[:60]}")

    # Hand-written Arabic outside the i18n module
    for tsx in (ROOT / "src").rglob("*.tsx"):
        text = tsx.read_text(encoding="utf-8")
        if re.search(ARABIC_RANGE, strip_comments(text)):
            problems.append(
                f"STRAY ARABIC: {tsx.relative_to(ROOT)} contains Arabic inline — "
                "move it to src/i18n/ar.ts"
            )

    return problems


def check_export() -> list[str]:
    problems: list[str] = []

    if not EXPORT_HTML.exists():
        return [f"no export at {EXPORT_HTML.relative_to(ROOT)} — run `npm run build`"]

    html = EXPORT_HTML.read_text(encoding="utf-8")

    tags = re.findall(r"<(?:p|span|div|h[1-6])[^>]*lang=\"ar\"[^>]*>", html)
    print(f"  {len(tags)} lang=\"ar\" elements in the export")
    if not tags:
        problems.append("no Arabic rendered in the export at all")

    for t in tags:
        if 'dir="rtl"' not in t:
            problems.append(f'MISSING dir="rtl": {t[:100]}')
        if "ar-text" not in t:
            problems.append(f"MISSING .ar-text (tracking not reset): {t[:100]}")

    css_files = list(EXPORT_CSS_DIR.glob("*.css")) if EXPORT_CSS_DIR.exists() else []
    css = "\n".join(f.read_text(encoding="utf-8") for f in css_files)
    compact = css.replace(" ", "")

    if ".ar-text" not in css:
        problems.append(".ar-text rule absent from the built CSS")
    if "letter-spacing:0" not in compact:
        problems.append("letter-spacing:0 not enforced in the built CSS")
    if "text-transform:none" not in compact:
        problems.append("text-transform:none not enforced in the built CSS")
    if "tajawal" not in css.lower():
        problems.append("Tajawal font variable absent — Arabic will fall back")

    return problems


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--export", action="store_true", help="also audit out/")
    args = ap.parse_args()

    print("Arabic source checks")
    problems = check_source()

    if args.export:
        print("Arabic export checks")
        problems += check_export()

    print()
    if problems:
        print(f"FAIL — {len(problems)} problem(s):", file=sys.stderr)
        for p in problems:
            print(f"  - {p}", file=sys.stderr)
        return 1

    print("PASS — bidi clean, tracking reset, dir/lang present, font wired.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
