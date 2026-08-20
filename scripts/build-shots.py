#!/usr/bin/env python3
"""Build the project carousel slides.

    python3 scripts/build-shots.py

Every slide is letterboxed to the same 16:10 frame so the carousel never changes
height between projects, and the padding is TRANSPARENT rather than a colour —
the frame supplies its own background, so one file reads correctly in both
themes.

Phone screenshots are paired two to a slide: a single 0.46-ratio portrait shot
stranded in a 16:10 frame is mostly empty space.

Sources live in the sibling project repositories, so this only runs on a machine
that has them checked out beside this one. It skips, loudly, whatever is
missing — the committed .webp files are the artefacts that actually ship.

Agro Alerta's slides are not built here: they come from a design handoff shipped
as a self-contained HTML file inside that repo
(`frontend/Rediseño UIUX proyecto agrícola.zip`), captured in a browser and
letterboxed with the same `letterbox()` below.
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

    sr = SIBLINGS / "snowride/landing/assets/images"
    print("SnowRide — phone screens, two per slide")
    for i, pair in enumerate(
        [
            ("flujo-user/home-app.webp", "flujo-user/perfil-inst-app.webp"),
            ("flujo-user/reservas-app.webp", "flujo-user/chat-app.webp"),
            ("flujo-instructor/home-app.webp", "flujo-instructor/perfil-instructor-app.webp"),
            ("flujo-instructor/clase-detalle-app.webp", "flujo-instructor/alerts-app.webp"),
            ("flujo-instructor/calendario-syncro.webp", "flujo-instructor/google-calendar.webp"),
        ],
        start=1,
    ):
        build(f"snowride-{i}.webp", [sr / p for p in pair])

    sf = SIBLINGS / "solar-fs/docs/screenshots"
    print("solar-fs — dashboard captures, one per slide")
    for i, shot in enumerate(("overview.png", "devices.png", "energy.png", "home.png"), start=1):
        build(f"solar-fs-{i}.webp", [sf / shot], pad=16)

    return 0


if __name__ == "__main__":
    sys.exit(main())
