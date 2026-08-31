#!/usr/bin/env python3
"""
Re-derive every statistic published on the landing page, FROM SOURCE CODE.

WHY THIS SCRIPT EXISTS
----------------------
A number written in a document is a claim. A number produced by counting the files
that back it is a fact. This ecosystem has been burned by the difference: an internal
document asserted "630 passages" for a long time, and the real count is 90 — each
reading JSON file is a single passage, not seven. That error would have shipped onto a
public marketing page and been quotable back at the owner.

So: nothing gets published on this page unless this script can produce it.

USAGE
-----
    # Clone the source repos next to this one, then:
    python3 scripts/derive_stats.py \\
        --nexus ../empire-nexus/bots/discord-learning-bot \\
        --dojo  ../empire-dojo

Compare the output against STATS_PRIMARY / STATS_SECONDARY in src/site.config.ts.
If a number disagrees, the CONFIG is wrong, not the code.
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

LEVELS = ["a1", "a2", "b1", "b2", "c1", "c2"]
TRACKS = ["accent", "broadcast", "grammar", "mediation", "reading"]


def hr(title: str) -> None:
    print(f"\n{title}\n{'-' * len(title)}")


def derive_nexus(root: Path) -> dict[str, int]:
    """Counts from the curriculum content in empire-nexus."""
    out: dict[str, int] = {}
    content = root / "content"

    if not content.is_dir():
        print(f"  !! no content/ directory at {root}", file=sys.stderr)
        return out

    # ── Levels and weeks ──
    present = [lv for lv in LEVELS if (content / lv).is_dir()]
    out["cefr_levels"] = len(present)

    weeks_per_level: dict[str, int] = {}
    for lv in present:
        # Any track has one file per week; reading is the canonical one.
        weeks_per_level[lv] = len(list((content / lv / "reading").glob("*.json")))
    out["curriculum_weeks"] = sum(weeks_per_level.values())
    print(f"  weeks per level: {weeks_per_level}")

    # ── Content modules across all tracks ──
    modules = 0
    per_track: dict[str, int] = {}
    for track in TRACKS:
        n = sum(len(list((content / lv / track).glob("*.json"))) for lv in present)
        per_track[track] = n
        modules += n
    out["content_modules"] = modules
    print(f"  modules per track: {per_track}")

    # ── Reading passages, questions, glossary ──
    passages = questions = glossary = words = 0
    for lv in present:
        for f in (content / lv / "reading").glob("*.json"):
            d = json.loads(f.read_text(encoding="utf-8"))
            passages += 1  # one passage per file — this is the "630" correction
            questions += len(d.get("questions") or [])
            glossary += len(d.get("glossary") or [])
            words += d.get("word_count") or len((d.get("text") or "").split())
    out["reading_passages"] = passages
    out["comprehension_questions"] = questions
    out["glossary_entries"] = glossary
    out["reading_words"] = words

    # ── Extended-listening (broadcast) segments ──
    segments = 0
    for lv in present:
        for f in (content / lv / "broadcast").glob("*.json"):
            d = json.loads(f.read_text(encoding="utf-8"))
            for key in ("segments", "clips", "items", "script"):
                if isinstance(d.get(key), list):
                    segments += len(d[key])
                    break
    out["listening_segments"] = segments

    # ── Can-do descriptors ──
    can_do_path = content / "cefr" / "can_do.json"
    if can_do_path.is_file():
        cd = json.loads(can_do_path.read_text(encoding="utf-8"))
        total = 0
        for lv in ("A1", "A2", "B1", "B2", "C1", "C2"):
            for value in (cd.get(lv) or {}).values():
                if isinstance(value, list):
                    total += len(value)
        out["can_do_descriptors"] = total

    # ── Engine size and test count ──
    src = root / "src"
    if src.is_dir():
        py = sorted(src.glob("*.py"))
        out["engine_modules"] = len(py)
        out["engine_lines"] = sum(
            len(p.read_text(encoding="utf-8", errors="replace").splitlines()) for p in py
        )

    tests = root / "tests"
    if tests.is_dir():
        files = sorted(tests.glob("*.py"))
        out["test_files"] = len(files)
        out["test_functions"] = sum(
            sum(
                1
                for line in p.read_text(encoding="utf-8", errors="replace").splitlines()
                if line.lstrip().startswith("def test_")
            )
            for p in files
        )

    return out


def derive_dojo(root: Path) -> dict[str, int]:
    """Counts from the audio manifests in empire-dojo."""
    out: dict[str, int] = {}

    speech = root / "scripts" / "speech-rendered.json"
    if speech.is_file():
        d = json.loads(speech.read_text(encoding="utf-8"))
        declared = d.get("count")
        actual = len(d.get("clips") or [])
        out["speech_clips"] = actual
        # A manifest whose own header disagrees with its body is a real defect.
        if declared != actual:
            print(
                f"  !! MISMATCH: speech-rendered.json declares {declared} but holds {actual}",
                file=sys.stderr,
            )
        else:
            print(f"  speech manifest self-consistent: {actual}")

    audio = root / "scripts" / "audio-manifest.json"
    if audio.is_file():
        out["broadcast_clips"] = len(json.loads(audio.read_text(encoding="utf-8")))

    cast = root / "scripts" / "voice_cast.json"
    if cast.is_file():
        vc = json.loads(cast.read_text(encoding="utf-8"))
        available = vc.get("_american_voices_available") or {}
        out["voices"] = len(available)

    return out


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument(
        "--nexus",
        default="../empire-nexus/bots/discord-learning-bot",
        help="path to the discord-learning-bot directory in empire-nexus",
    )
    ap.add_argument("--dojo", default="../empire-dojo", help="path to empire-dojo")
    args = ap.parse_args()

    results: dict[str, int] = {}

    nexus = Path(args.nexus).expanduser().resolve()
    hr(f"empire-nexus  ({nexus})")
    if nexus.is_dir():
        results |= derive_nexus(nexus)
    else:
        print("  skipped — path not found")

    dojo = Path(args.dojo).expanduser().resolve()
    hr(f"empire-dojo  ({dojo})")
    if dojo.is_dir():
        results |= derive_dojo(dojo)
    else:
        print("  skipped — path not found")

    hr("DERIVED VALUES")
    if not results:
        print("  nothing derived — check the --nexus / --dojo paths")
        return 1

    for key in sorted(results):
        print(f"  {key:26} {results[key]:>10,}")

    hr("REMINDER")
    print("  Compare against STATS_PRIMARY / STATS_SECONDARY in src/site.config.ts.")
    print("  If they disagree, the config is wrong — fix the config, not this script.")
    print('  Historical trap: "630 passages" was never real. Reading passages = 90.')
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
