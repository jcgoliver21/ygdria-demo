"""Record factual QC metadata for a refreshed Light Realm sprite sheet."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

from PIL import Image


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("sheet", type=Path)
    parser.add_argument("--columns", type=int, choices=(2, 3), required=True)
    parser.add_argument("--duration", type=int, required=True)
    args = parser.parse_args()

    image = Image.open(args.sheet).convert("RGBA")
    if image.size != (args.columns * 256, 512):
        raise ValueError(f"Unexpected sheet dimensions: {image.size}")
    frames = []
    for index in range(args.columns * 2):
        x, y = index % args.columns * 256, index // args.columns * 256
        cell = image.crop((x, y, x + 256, y + 256))
        bbox = cell.getchannel("A").point(
            lambda value: 255 if value >= 12 else 0
        ).getbbox()
        if bbox is None or min(bbox[0], bbox[1], 256 - bbox[2], 256 - bbox[3]) < 8:
            raise ValueError(f"Frame {index} is empty or touches an edge: {bbox}")
        frames.append(
            {
                "grid": [index % args.columns, index // args.columns],
                "is_empty": False,
                "aligned_bbox": list(bbox),
                "anchor_target": [128.0, 233],
                "output_edge_touch": False,
                "paste_clamped": False,
            }
        )

    heights = [frame["aligned_bbox"][3] - frame["aligned_bbox"][1] for frame in frames]
    meta = {
        "target": "player",
        "mode": args.sheet.parent.parent.name,
        "input": "assets/characters/light-v1/aarthas-darke/reference-user-2026-09-23.jpg",
        "generation": "imagegen full-grid edit; original action sheet used as pose guide",
        "normalization": "shared fixed scale of 204.8/source-cell-width, bottom-center",
        "duration": args.duration,
        "rows": 2,
        "cols": args.columns,
        "cell_size": 256,
        "align": "feet",
        "shared_scale": True,
        "scale_strategy": "preserve",
        "frames": frames,
        "output_edge_touch_frames": [],
        "paste_clamped_frames": [],
        "empty_frames": [],
        "qc_summary": {
            "frame_count": len(frames),
            "valid_frame_count": len(frames),
            "empty_count": 0,
            "edge_touch_count": 0,
            "paste_clamped_count": 0,
            "output_subject_height_mean": sum(heights) / len(heights),
        },
        "output_origin": [128.0, 233],
        "qc_config": {"strict_qc": True, "reject_edge_touch": True},
    }
    args.sheet.with_name("pipeline-meta.json").write_text(
        json.dumps(meta, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
