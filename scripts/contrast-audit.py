#!/usr/bin/env python3
"""WCAG contrast audit for the site's colour tokens.

Reads the values straight out of src/styles/global.css so this can never drift
from what actually ships. Run it after changing any colour:

    python3 scripts/contrast-audit.py

Exits non-zero if any checked pair fails, so it can go in CI.

Not every pair is checked. --border and --border-strong separate cards and
sections; they identify no control and gate no content, so WCAG 1.4.11's 3:1
does not apply to them and holding them there would put a hard grey rule around
every chip. --border-interactive outlines the .control buttons, where the
outline is the affordance — that one is checked.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

CSS = Path(__file__).resolve().parent.parent / "src" / "styles" / "global.css"

AA_TEXT = 4.5  # WCAG 1.4.3, normal-size text
AA_UI = 3.0  # WCAG 1.4.11, non-text UI boundaries


# --- colour maths ------------------------------------------------------------


def _linear(channel: int) -> float:
    c = channel / 255
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def luminance(hex_colour: str) -> float:
    h = hex_colour.lstrip("#")
    r, g, b = (int(h[i : i + 2], 16) for i in (0, 2, 4))
    return 0.2126 * _linear(r) + 0.7152 * _linear(g) + 0.0722 * _linear(b)


def contrast(fg: str, bg: str) -> float:
    a, b = luminance(fg), luminance(bg)
    hi, lo = max(a, b), min(a, b)
    return (hi + 0.05) / (lo + 0.05)


# --- token extraction --------------------------------------------------------


def read_themes(css: str) -> dict[str, dict[str, str]]:
    """Pull the light and dark token blocks out of the stylesheet.

    Light comes from the `:root {}` block; dark from `:root[data-theme='dark']`.
    The prefers-color-scheme block duplicates the dark values, so checking one
    covers both — but they are compared here to catch them drifting apart.
    """
    blocks = {
        "light": r":root\s*\{(.*?)\}",
        "dark": r":root\[data-theme='dark'\]\s*\{(.*?)\}",
        "_dark_media": r"@media \(prefers-color-scheme: dark\) \{\s*:root \{(.*?)\}",
    }
    out: dict[str, dict[str, str]] = {}
    for name, pattern in blocks.items():
        match = re.search(pattern, css, re.S)
        if not match:
            sys.exit(f"could not find the {name} token block in {CSS.name}")
        out[name] = dict(re.findall(r"--([\w-]+):\s*(#[0-9a-fA-F]{6})", match.group(1)))
    return out


# --- what gets checked -------------------------------------------------------

# (what it styles, foreground token, background token, minimum ratio)
CHECKS: list[tuple[str, str, str, float]] = [
    ("hero name", "text", "bg", AA_TEXT),
    ("hero role", "accent-text", "bg", AA_TEXT),
    ("intro copy", "text-muted", "bg", AA_TEXT),
    ("bullet copy", "text-muted", "bg", AA_TEXT),
    ("section titles", "text-faint", "bg", AA_TEXT),
    ("date rail", "text-faint", "bg", AA_TEXT),
    ("company location", "text-faint", "bg", AA_TEXT),
    ("study note", "text-faint", "bg", AA_TEXT),
    ("cert issuer", "text-faint", "bg", AA_TEXT),
    ("footer", "text-faint", "bg", AA_TEXT),
    ("links", "accent-text", "bg", AA_TEXT),
    ("chip text", "text-muted", "bg-sunken", AA_TEXT),
    ("primary chip", "accent-text", "accent-soft", AA_TEXT),
    ("card copy", "text-muted", "bg-raised", AA_TEXT),
    # The private-source marker sits inside a card, so it is on --bg-raised
    # rather than the page background every other faint text sits on. That
    # difference is exactly why it uses --text-muted and not --text-faint.
    ("private-source marker", "text-muted", "bg-raised", AA_TEXT),
    # Company monogram tile — also on a raised/sunken surface, not the page bg.
    ("company monogram", "text-muted", "bg-sunken", AA_TEXT),
    ("project tagline", "accent-text", "bg-raised", AA_TEXT),
    ("button label", "text-muted", "bg-raised", AA_TEXT),
    ("primary button label", "bg", "accent", AA_TEXT),
    ("button outline", "border-interactive", "bg-raised", AA_UI),
    ("button outline on page", "border-interactive", "bg", AA_UI),
    ("focus ring", "accent", "bg", AA_UI),
]


def main() -> int:
    css = CSS.read_text(encoding="utf-8")
    themes = read_themes(css)

    drift = {
        k: (themes["dark"].get(k), v)
        for k, v in themes["_dark_media"].items()
        if themes["dark"].get(k) != v
    }
    if drift:
        print("dark tokens disagree between [data-theme='dark'] and the media query:")
        for token, (a, b) in drift.items():
            print(f"  --{token}: {a} vs {b}")
        return 1

    failures = 0
    for theme in ("light", "dark"):
        tokens = themes[theme]
        print(f"\n  {theme.upper()}")
        print(f"  {'-' * 58}")
        for label, fg, bg, need in CHECKS:
            if fg not in tokens or bg not in tokens:
                print(f"  ????  missing token --{fg} or --{bg}")
                failures += 1
                continue
            got = contrast(tokens[fg], tokens[bg])
            ok = got >= need
            failures += not ok
            print(f"  {'ok  ' if ok else 'FAIL'}  {got:5.2f} / {need:.1f}   {label}")

    print()
    if failures:
        print(f"  {failures} failing pair(s)")
        return 1
    print("  all pairs meet their target")
    return 0


if __name__ == "__main__":
    sys.exit(main())
