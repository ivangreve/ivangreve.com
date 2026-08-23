#!/usr/bin/env python3
"""Draw public/apple-touch-icon.png — the 180x180 icon iOS uses when the site
is saved to a home screen.

    python3 scripts/make-touch-icon.py

Same design as favicon.svg (the accent-teal rounded square with the IG
monogram), drawn as a PNG because iOS ignores SVG favicons for touch icons.
macOS only: uses the system SF Pro, like the OG card generator.
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parent.parent / "public" / "apple-touch-icon.png"

SIZE = 180
# Same values as favicon.svg.
BG = "#0d6f7f"
FG = "#fbfbfa"
SANS = "/System/Library/Fonts/SFNS.ttf"


def main() -> None:
    # iOS rounds the corners itself, so the artwork fills the square — a
    # pre-rounded tile inside the rounded mask shows dark wedges in the corners.
    img = Image.new("RGB", (SIZE, SIZE), BG)
    d = ImageDraw.Draw(img)

    font = ImageFont.truetype(SANS, 84)
    font.set_variation_by_name("Bold")
    d.text((SIZE / 2, SIZE / 2 + 2), "IG", font=font, fill=FG, anchor="mm")

    img.save(OUT, "PNG", optimize=True)
    print(f"{OUT.name}: {SIZE}x{SIZE}, {OUT.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
