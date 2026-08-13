from pathlib import Path
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets/characters/runtime-v7/adriel-jovem/attack-2x3.png"
OUTPUT = ROOT / "assets/characters/runtime-v7/adriel-jovem/attack-2x3.png"

COLS, ROWS = 3, 2
FRAME_W = FRAME_H = 384
TARGET_BODY_HEIGHT = 310
GROUND_Y = 360


def main():
    sheet = Image.open(SOURCE).convert("RGBA")
    result = Image.new("RGBA", sheet.size, (0, 0, 0, 0))

    frames = []
    bounds = []
    for index in range(COLS * ROWS):
        col, row = index % COLS, index // COLS
        frame = sheet.crop((col * FRAME_W, row * FRAME_H, (col + 1) * FRAME_W, (row + 1) * FRAME_H))
        bbox = frame.getchannel("A").getbbox()
        if not bbox:
            raise RuntimeError(f"Frame {index + 1} vazio")
        frames.append(frame)
        bounds.append(bbox)

    max_height = max(bottom - top for _, top, _, bottom in bounds)
    scale = TARGET_BODY_HEIGHT / max_height

    for index, (frame, bbox) in enumerate(zip(frames, bounds)):
        col, row = index % COLS, index // COLS
        cropped = frame.crop(bbox)
        size = (round(cropped.width * scale), round(cropped.height * scale))
        sprite = cropped.resize(size, Image.Resampling.LANCZOS)

        # Mesmo chão e mesmo centro corporal em todos os quadros.
        # A espada permanece dentro da célula sem alterar a escala entre poses.
        x = (FRAME_W - sprite.width) // 2
        y = GROUND_Y - sprite.height
        result.alpha_composite(sprite, (col * FRAME_W + x, row * FRAME_H + y))

    result.save(OUTPUT, optimize=True)


if __name__ == "__main__":
    main()
