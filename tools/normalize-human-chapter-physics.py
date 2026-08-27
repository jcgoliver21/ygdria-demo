"""Normalize human-chapter sprite sheets around a shared body and feet anchor.

This is a production asset step, not a runtime animation trick.  Each frame is
measured from its opaque core (so a raised sword, arrow, or spell does not make
the character smaller), resized to the idle body's core height and placed on
the idle feet baseline.  Runtime can therefore advance poses without changing
scale or translating the body during an animation.

Defeat sheets are intentionally excluded: their lowered body is a deliberate
ground-contact pose, governed by the separate defeat physics contract.
"""

from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path
from statistics import median

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "physics-v11" / "humanos"
AUDIT = ROOT / "tmp" / "physics-v11-stage1-audit.json"

HEROES = (
    "gareth", "cedric", "elizier", "roland", "berenice-jovem",
    "galateia-jovem", "adriel-jovem", "acqua-jovem", "jules", "kalander",
    "bernyce", "julius",
)

ENEMIES = (
    "capitao", "soldado1", "soldado2", "sold-bib1", "sold-bib2",
    "sold-bib3", "infantaria", "cavalaria", "comandante", "trono",
    "morto", "vulto", "slime-cereja", "lobo-raivoso", "espectro",
)

ATTACK_SOURCE_OVERRIDES = {
    "gareth": "assets/characters/v11-review/gareth/attack-r2/processed/sheet-transparent.png",
    "julius": "assets/characters/v11-review/julius/attack-r2/processed/sheet-transparent.png",
}


@dataclass(frozen=True)
class Metrics:
    core_height: float
    feet_y: float


def quantile(values: list[int], q: float) -> float:
    if not values:
        raise ValueError("transparent frame")
    values.sort()
    index = (len(values) - 1) * q
    lo, hi = int(index), min(len(values) - 1, int(index) + 1)
    return values[lo] + (values[hi] - values[lo]) * (index - lo)


def metrics(frame: Image.Image) -> Metrics:
    # The vertical distribution of opaque pixels rejects sparse weapon trails
    # and raised blades while retaining the torso, dress, cape and legs.
    alpha = frame.getchannel("A")
    ys: list[int] = []
    for y in range(alpha.height):
        count = sum(1 for value in alpha.crop((0, y, alpha.width, y + 1)).getdata() if value > 20)
        ys.extend([y] * count)
    upper = quantile(ys, 0.06)
    lower = quantile(ys, 0.95)
    return Metrics(core_height=max(1.0, lower - upper), feet_y=quantile(ys, 0.992))


def cells(sheet: Image.Image, cols: int, rows: int) -> list[Image.Image]:
    if sheet.width % cols or sheet.height % rows:
        raise ValueError(f"invalid grid {sheet.size} for {cols}x{rows}")
    width, height = sheet.width // cols, sheet.height // rows
    return [sheet.crop((col * width, row * height, (col + 1) * width, (row + 1) * height))
            for row in range(rows) for col in range(cols)]


def normalize_sheet(source: Path, reference: Path, cols: int, rows: int, out: Path) -> dict:
    source_sheet = Image.open(source).convert("RGBA")
    reference_sheet = Image.open(reference).convert("RGBA")
    source_cells = cells(source_sheet, cols, rows)
    ref_cols, ref_rows = (2, 2) if "idle-2x2" in reference.name else (3, 3) if "idle-v3" in str(reference) else (3, 2)
    reference_cells = cells(reference_sheet, ref_cols, ref_rows)
    ref_metrics = [metrics(cell) for cell in reference_cells]
    # Sheets can use different cell resolutions (the historical idle sheets
    # are often 384px while current action sheets are 256px).  Normalize the
    # reference to cell space before deriving the destination pixels.
    ref_height = reference_cells[0].height
    target_core_ratio = median(item.core_height / ref_height for item in ref_metrics)
    target_feet_ratio = median(item.feet_y / ref_height for item in ref_metrics)
    width, height = source_cells[0].size
    target_core = target_core_ratio * height
    target_feet = target_feet_ratio * height
    result = Image.new("RGBA", source_sheet.size, (0, 0, 0, 0))
    frames = []
    for index, frame in enumerate(source_cells):
        before = metrics(frame)
        scale = target_core / before.core_height
        # Extreme values mean malformed art, not a pose.  Fail fast rather
        # than silently publishing a stretched character.
        if not 0.60 <= scale <= 1.70:
            raise ValueError(f"{source}: frame {index} needs invalid scale {scale:.3f}")
        resized = frame.resize((round(width * scale), round(height * scale)), Image.Resampling.LANCZOS)
        x = round((width - resized.width) / 2)
        y = round(target_feet - before.feet_y * scale)
        col, row = index % cols, index // cols
        result.alpha_composite(resized, (col * width + x, row * height + y))
        after = metrics(result.crop((col * width, row * height, (col + 1) * width, (row + 1) * height)))
        frames.append({"frame": index, "scale": round(scale, 4), "coreRatio": round(after.core_height / target_core, 4), "feetDelta": round(after.feet_y - target_feet, 3)})
    out.parent.mkdir(parents=True, exist_ok=True)
    result.save(out, optimize=True)
    return {"source": str(source.relative_to(ROOT)).replace("\\", "/"), "output": str(out.relative_to(ROOT)).replace("\\", "/"), "targetCore": round(target_core, 3), "targetFeet": round(target_feet, 3), "frames": frames}


def hero_sources(hero: str) -> list[tuple[str, Path, int, int, Path]]:
    base = ROOT / "assets" / "characters" / "runtime-v10" / hero
    idle = base / "idle-2x2.png"
    attack = ROOT / ATTACK_SOURCE_OVERRIDES.get(hero, f"assets/characters/v11-review/{hero}/attack/processed/sheet-transparent.png")
    return [
        ("idle", idle, 2, 2, idle),
        ("attack", attack, 3, 2, idle),
        ("cast", base / "cast-3x2.png", 3, 2, idle),
        ("hit", base / "hit-2x2.png", 2, 2, idle),
        ("victory", base / "victory-2x2.png", 2, 2, idle),
    ]


def enemy_sources(enemy: str) -> list[tuple[str, Path, int, int, Path]]:
    base = ROOT / "assets" / "enemies" / "runtime-v10" / enemy
    idle = base / ("idle-v3/processed/sheet-transparent.png" if enemy in {"capitao", "soldado1", "soldado2", "sold-bib1", "sold-bib2", "sold-bib3", "infantaria", "cavalaria", "comandante", "trono"} else "idle/processed/sheet-transparent.png")
    idle_grid = (3, 3) if "idle-v3" in str(idle) else (3, 2)
    return [
        ("idle", idle, *idle_grid, idle),
        ("actions", base / "processed/sheet-transparent.png", 3, 2, idle),
    ]


def main() -> None:
    audit: dict[str, dict] = {"heroes": {}, "enemies": {}}
    for hero in HEROES:
        audit["heroes"][hero] = {}
        for action, source, cols, rows, reference in hero_sources(hero):
            out = OUT / "heroes" / hero / action / "sheet-transparent.png"
            audit["heroes"][hero][action] = normalize_sheet(source, reference, cols, rows, out)
    for enemy in ENEMIES:
        audit["enemies"][enemy] = {}
        for action, source, cols, rows, reference in enemy_sources(enemy):
            out = OUT / "enemies" / enemy / action / "sheet-transparent.png"
            audit["enemies"][enemy][action] = normalize_sheet(source, reference, cols, rows, out)
    AUDIT.parent.mkdir(parents=True, exist_ok=True)
    AUDIT.write_text(json.dumps(audit, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"normalized {len(HEROES)} heroes and {len(ENEMIES)} enemies -> {AUDIT}")


if __name__ == "__main__":
    main()
