#!/usr/bin/env python3
"""Draw the Open Graph card served at /og.png.

    python3 scripts/make-og-image.py

This is the image LinkedIn, Slack and X show when the link is pasted. It is
drawn from code rather than exported from a design tool so it stays in step with
the palette in global.css — the tokens below are the same values.

macOS only: it uses the system SF Pro, which carries the weight axis as a
variable font. Re-run after changing the name, role or headline chips.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parent.parent / "public" / "og.png"
PORTRAIT = Path(__file__).resolve().parent.parent / "public" / "portrait-400.webp"

# 1200x630 is the size every major scraper crops to.
W, H = 1200, 630
PAD = 76

# The portrait occupies the right-hand zone; text must stop before it.
PORTRAIT_D = 268
PORTRAIT_CX = W - PAD - PORTRAIT_D // 2
PORTRAIT_CY = 262
TEXT_RIGHT = PORTRAIT_CX - PORTRAIT_D // 2 - 48

# Straight from the dark theme in src/styles/global.css.
BG = "#101211"
BG_SUNKEN = "#0b0d0c"
TEXT = "#e8e8e4"
TEXT_MUTED = "#9b9d99"
TEXT_FAINT = "#7a7d79"
ACCENT = "#4ecfe0"
ACCENT_SOFT = "#10312f"
BORDER = "#282c2b"

SANS = "/System/Library/Fonts/SFNS.ttf"
MONO = "/System/Library/Fonts/SFNSMono.ttf"

NAME = "Iván Greve"
ROLE = "Frontend Engineer"
BLURB = "I build products end to end — React, React Native\nand TypeScript at CookUnity."
LOCATION = "San Carlos de Bariloche, Argentina · remote"
CHIPS = ["React", "React Native", "Angular", "TypeScript", "Next.js", "Node.js"]
DOMAIN = "ivangreve.com"


def sans(size: int, weight: str = "Regular") -> ImageFont.FreeTypeFont:
    font = ImageFont.truetype(SANS, size)
    font.set_variation_by_name(weight)
    return font


def mono(size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(MONO, size)


def rounded(draw, box, radius, fill=None, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def text_width(draw, text: str, font) -> int:
    return int(draw.textlength(text, font=font))


def paste_portrait(img: Image.Image) -> None:
    """Drop the portrait in as a circle with a soft ring.

    A face is the single biggest lever on whether a shared link gets clicked,
    so the card carries the same photo the page does.
    """
    if not PORTRAIT.exists():
        print(f"warning: {PORTRAIT.name} missing — card rendered without a portrait")
        return

    photo = Image.open(PORTRAIT).convert("RGB").resize((PORTRAIT_D, PORTRAIT_D), Image.LANCZOS)

    # Draw the mask 4x oversized and downsample: PIL has no antialiased ellipse.
    scale = 4
    mask = Image.new("L", (PORTRAIT_D * scale, PORTRAIT_D * scale), 0)
    ImageDraw.Draw(mask).ellipse([0, 0, PORTRAIT_D * scale - 1, PORTRAIT_D * scale - 1], fill=255)
    mask = mask.resize((PORTRAIT_D, PORTRAIT_D), Image.LANCZOS)

    left = PORTRAIT_CX - PORTRAIT_D // 2
    top = PORTRAIT_CY - PORTRAIT_D // 2

    ring = ImageDraw.Draw(img)
    for offset, colour in ((10, ACCENT_SOFT), (5, BORDER)):
        ring.ellipse(
            [left - offset, top - offset, left + PORTRAIT_D + offset, top + PORTRAIT_D + offset],
            fill=colour,
        )

    img.paste(photo, (left, top), mask)


def main() -> None:
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)

    # A soft accent wash bleeding in from the right edge, drawn as concentric
    # rounded rectangles because PIL has no gradient primitive.
    for i in range(70, 0, -1):
        t = i / 70
        colour = tuple(
            round(int(BG[j : j + 2], 16) + (int(ACCENT_SOFT[j : j + 2], 16) - int(BG[j : j + 2], 16)) * (1 - t) * 0.5)
            for j in (1, 3, 5)
        )
        d.ellipse(
            [W - 260 - i * 9, -200 - i * 5, W + 200 + i * 9, 300 + i * 5],
            fill=colour,
        )

    paste_portrait(img)

    y = PAD

    # Availability pill
    pill_font = sans(21, "Semibold")
    pill_text = "Open to frontend and product engineering roles"
    pill_w = text_width(d, pill_text, pill_font) + 62
    rounded(d, [PAD, y, PAD + pill_w, y + 46], radius=23, fill=ACCENT_SOFT)
    d.ellipse([PAD + 24, y + 19, PAD + 32, y + 27], fill=ACCENT)
    d.text((PAD + 44, y + 23), pill_text, font=pill_font, fill=ACCENT, anchor="lm")
    y += 46 + 44

    # Name
    name_font = sans(92, "Bold")
    d.text((PAD, y), NAME, font=name_font, fill=TEXT)
    y += 104

    # Role
    d.text((PAD, y), ROLE, font=sans(42, "Semibold"), fill=ACCENT)
    y += 62

    # Blurb
    d.multiline_text((PAD, y), BLURB, font=sans(27), fill=TEXT_MUTED, spacing=12)
    y += 92

    # Chip row
    chip_font = mono(21)
    x = PAD
    for chip in CHIPS:
        w = text_width(d, chip, chip_font) + 30
        # Stop at the portrait's edge, not the canvas edge.
        if x + w > TEXT_RIGHT:
            break
        rounded(d, [x, y, x + w, y + 40], radius=8, fill=BG_SUNKEN, outline=BORDER, width=1)
        d.text((x + w / 2, y + 21), chip, font=chip_font, fill=TEXT_MUTED, anchor="mm")
        x += w + 10

    # Footer rule, then location on the left and the domain on the right.
    foot = H - PAD - 26
    d.line([PAD, foot - 30, W - PAD, foot - 30], fill=BORDER, width=1)
    d.text((PAD, foot + 6), LOCATION, font=sans(23), fill=TEXT_FAINT, anchor="lm")
    d.text((W - PAD, foot + 6), DOMAIN, font=sans(23, "Semibold"), fill=TEXT_FAINT, anchor="rm")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    img.save(OUT, "PNG", optimize=True)
    print(f"{OUT.relative_to(OUT.parent.parent)}: {img.size[0]}x{img.size[1]}, {OUT.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
