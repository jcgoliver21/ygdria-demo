"""Uniformly scale sprite-sheet cell contents without changing cell geometry.

Used only as a deterministic normalization step between approved art and the
strict generate2dsprite QC pass. Alpha, frame order and the feet-side anchor
are preserved; no pixels are painted or synthesized here.
"""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--rows", required=True, type=int)
    parser.add_argument("--cols", required=True, type=int)
    parser.add_argument("--scale", required=True, type=float)
    args = parser.parse_args()

    if not 0.5 <= args.scale <= 1.0:
        raise SystemExit("--scale must be between 0.5 and 1.0")

    source = Image.open(args.input).convert("RGBA")
    if source.width % args.cols or source.height % args.rows:
        raise SystemExit("sheet dimensions must be divisible by rows and cols")

    cell_w, cell_h = source.width // args.cols, source.height // args.rows
    target = Image.new("RGBA", source.size, (0, 0, 0, 0))
    scaled_w = max(1, round(cell_w * args.scale))
    scaled_h = max(1, round(cell_h * args.scale))

    for row in range(args.rows):
        for col in range(args.cols):
            left, top = col * cell_w, row * cell_h
            frame = source.crop((left, top, left + cell_w, top + cell_h))
            frame = frame.resize((scaled_w, scaled_h), Image.Resampling.LANCZOS)
            # Horizontal center; keep the bottom-side anchor within the cell.
            x = left + (cell_w - scaled_w) // 2
            y = top + (cell_h - scaled_h)
            target.alpha_composite(frame, (x, y))

    args.output.parent.mkdir(parents=True, exist_ok=True)
    target.save(args.output, optimize=True)


if __name__ == "__main__":
    main()
