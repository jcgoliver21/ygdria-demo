"""Normalize generated Light Realm animation grids to the 256px runtime cells."""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image


def normalize(
    source: Path, destination: Path, columns: int, trim_bottom_row_top: int = 0
) -> None:
    sheet = Image.open(source).convert("RGBA")
    if sheet.width % columns or sheet.height % 2:
        raise ValueError(f"Invalid {columns}x2 grid: {sheet.size}")

    source_width = sheet.width // columns
    source_height = sheet.height // 2
    scale = 204.8 / source_width  # Same occupancy for 2x2 and 3x2 sheets.
    output = Image.new("RGBA", (columns * 256, 512))

    for row in range(2):
        for column in range(columns):
            cell = sheet.crop(
                (
                    column * source_width,
                    row * source_height,
                    (column + 1) * source_width,
                    (row + 1) * source_height,
                )
            )
            if row and trim_bottom_row_top:
                # Some generated grids carry the previous row's boot pixels
                # over the horizontal seam. Remove only that seam band.
                cell.paste(
                    (0, 0, 0, 0), (0, 0, source_width, trim_bottom_row_top)
                )
            alpha = cell.getchannel("A")
            bbox = alpha.point(lambda value: 255 if value >= 24 else 0).getbbox()
            if bbox is None:
                raise ValueError(f"Empty frame {column},{row}: {source}")
            cell = cell.crop(bbox)
            new_size = (round(cell.width * scale), round(cell.height * scale))
            if max(new_size) > 224:
                raise ValueError(f"Frame {column},{row} overflows: {new_size}")
            cell = cell.resize(new_size, Image.Resampling.LANCZOS)
            cleaned_alpha = cell.getchannel("A").point(
                lambda value: 0 if value < 12 else value
            )
            cell.putalpha(cleaned_alpha)
            x = column * 256 + (256 - cell.width) // 2
            y = row * 256 + 240 - cell.height
            if y < row * 256:
                raise ValueError(f"Frame {column},{row} crosses top edge")
            output.alpha_composite(cell, (x, y))

    destination.parent.mkdir(parents=True, exist_ok=True)
    output.save(destination)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("destination", type=Path)
    parser.add_argument("--columns", type=int, choices=(2, 3), required=True)
    parser.add_argument("--trim-bottom-row-top", type=int, default=0)
    arguments = parser.parse_args()
    normalize(
        arguments.source,
        arguments.destination,
        arguments.columns,
        arguments.trim_bottom_row_top,
    )
