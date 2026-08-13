"""Gera cinco pranchas de inspeção visual a partir do runtime v10 aprovado."""

from __future__ import annotations

import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
RUNTIME = ROOT / "assets" / "characters" / "runtime-v10"
OUTPUT = ROOT / "previews" / "v10-qc"
ACTIONS = ("idle", "attack", "cast", "hit", "victory")
COLS = 4
TILE_W = 300
TILE_H = 245
PAD = 12


def contain(image: Image.Image, width: int, height: int) -> Image.Image:
    copy = image.copy()
    copy.thumbnail((width, height), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (width, height), (12, 9, 19, 255))
    canvas.alpha_composite(copy, ((width - copy.width) // 2, (height - copy.height) // 2))
    return canvas


def main() -> None:
    manifest = json.loads((RUNTIME / "manifest.json").read_text(encoding="utf-8"))
    characters = list(manifest["characters"].items())
    rows = (len(characters) + COLS - 1) // COLS
    OUTPUT.mkdir(parents=True, exist_ok=True)
    font = ImageFont.load_default(size=15)

    for action in ACTIONS:
        board = Image.new("RGBA", (COLS * TILE_W, rows * TILE_H), (8, 6, 14, 255))
        draw = ImageDraw.Draw(board)
        for index, (character_id, specs) in enumerate(characters):
            spec = specs[action]
            sheet = Image.open(ROOT / spec["src"]).convert("RGBA")
            preview = contain(sheet, TILE_W - PAD * 2, TILE_H - 42)
            x = (index % COLS) * TILE_W
            y = (index // COLS) * TILE_H
            board.alpha_composite(preview, (x + PAD, y + 30))
            draw.rounded_rectangle(
                (x + 3, y + 3, x + TILE_W - 4, y + TILE_H - 4),
                radius=10,
                outline=(212, 175, 90, 110),
                width=2,
            )
            draw.text((x + PAD, y + 8), f"{character_id} · {action}", font=font, fill=(247, 226, 170, 255))
        target = OUTPUT / f"v10-{action}-24.png"
        board.convert("RGB").save(target, quality=92)
        print(target)


if __name__ == "__main__":
    main()
