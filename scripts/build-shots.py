#!/usr/bin/env python3
"""Build the project carousel slides that come from static files.

    python3 scripts/build-shots.py

Every slide is letterboxed to the same 16:10 frame so the carousel never changes
height between projects, and the padding is TRANSPARENT rather than a colour:
the frame supplies its own background, so one file reads correctly in both
themes.

Only solar-fs is built here, from the screenshots committed in its repo.

SnowRide and Agro Alerta slides are NOT built by this script and must not be:
they are captured from the RUNNING apps (SnowRide via `expo start --web`
against the local API with its seeded users; Agro from its Vite frontend with
the local backend), at 390x844 for phone screens paired two to a slide, and
1440x900 for desktop screens. Regenerating them from files would silently
resurrect screenshots of the old UI. If they need refreshing, run the apps and
capture again.

This runs on a machine that has the sibling repositories checked out beside
this one; it skips, loudly, whatever is missing. The committed .webp files are
the artefacts that actually ship.
"""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image

HERE = Path(__file__).resolve().parent.parent
SIBLINGS = HERE.parent
OUT = HERE / "public" / "projects"

FRAME_W, FRAME_H = 1280, 800  # 16:10


def letterbox(images: list[Image.Image], gap: int = 28, pad: int = 24) -> Image.Image:
    """Fit one or more images side by side inside the frame, centred."""
    canvas = Image.new("RGBA", (FRAME_W, FRAME_H), (0, 0, 0, 0))

    avail_h = FRAME_H - pad * 2
    avail_w = FRAME_W - pad * 2 - gap * (len(images) - 1)
    each_w = avail_w // len(images)

    scaled = []
    for im in images:
        ratio = min(each_w / im.width, avail_h / im.height)
        scaled.append(
            im.resize((max(1, round(im.width * ratio)), max(1, round(im.height * ratio))), Image.LANCZOS)
        )

    total_w = sum(s.width for s in scaled) + gap * (len(scaled) - 1)
    x = (FRAME_W - total_w) // 2
    for s in scaled:
        canvas.paste(s, (x, (FRAME_H - s.height) // 2), s if s.mode == "RGBA" else None)
        x += s.width + gap
    return canvas


def save(canvas: Image.Image, name: str) -> None:
    p = OUT / name
    canvas.save(p, "WEBP", quality=84, method=6)
    print(f"  {name}: {canvas.size[0]}x{canvas.size[1]}, {p.stat().st_size // 1024} KB")


def build(name: str, paths: list[Path], pad: int = 24) -> None:
    missing = [p for p in paths if not p.exists()]
    if missing:
        print(f"  {name}: SKIPPED, missing {', '.join(str(m) for m in missing)}")
        return
    save(letterbox([Image.open(p).convert("RGBA") for p in paths], pad=pad), name)


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)

    sf = SIBLINGS / "solar-fs/docs/screenshots"
    print("solar-fs — dashboard captures, one per slide")
    for i, shot in enumerate(("overview.png", "devices.png", "energy.png", "home.png"), start=1):
        build(f"solar-fs-{i}.webp", [sf / shot], pad=16)

    return 0


if __name__ == "__main__":
    sys.exit(main())
