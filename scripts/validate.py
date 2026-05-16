#!/usr/bin/env python3
"""Valide la cohérence des fichiers JSON de données (unités, détachements, stratagèmes)."""

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "src" / "data"
ORKS = DATA / "orks"

REQUIRED_UNIT = {
    "id", "name", "faction", "model_count", "points",
    "stats", "weapons", "abilities", "keywords",
    "faction_keywords", "available_buffs",
}
REQUIRED_STATS = {"M", "T", "Sv", "W", "Ld", "OC"}

ALLOWED_BUFFS = {"waaagh", "warboss_aura", "painboy_heal"}


def load_json(path):
    with open(path) as f:
        return json.load(f)


def check_unit(path, unit, errs):
    prefix = f"{path.name}"
    missing = REQUIRED_UNIT - unit.keys()
    if missing:
        errs.append(f"{prefix}: champs manquants {missing}")
    if "stats" in unit:
        miss = REQUIRED_STATS - unit["stats"].keys()
        if miss:
            errs.append(f"{prefix}: stats manquants {miss}")
    if "weapons" in unit:
        w = unit["weapons"]
        if not isinstance(w, dict) or "ranged" not in w or "melee" not in w:
            errs.append(f"{prefix}: weapons doit avoir 'ranged' et 'melee'")
    for b in unit.get("available_buffs", []):
        if b not in ALLOWED_BUFFS:
            errs.append(f"{prefix}: buff inconnu '{b}'")


def main():
    errs = []

    # Unités
    units_dir = ORKS / "units"
    unit_ids = set()
    for p in sorted(units_dir.glob("*.json")):
        try:
            u = load_json(p)
        except json.JSONDecodeError as e:
            errs.append(f"{p.name}: JSON invalide ({e})")
            continue
        check_unit(p, u, errs)
        if u.get("id") in unit_ids:
            errs.append(f"{p.name}: id dupliqué '{u['id']}'")
        unit_ids.add(u.get("id"))

    # Détachements
    detachments = load_json(ORKS / "detachments.json")
    det_ids = {d["id"] for d in detachments}

    # Stratagèmes
    stratagems = load_json(ORKS / "stratagems.json")
    strat_ids = {s["id"] for s in stratagems}

    # Stratagèmes référencés par détachement existent ?
    for d in detachments:
        for sid in d.get("stratagems", []):
            if sid not in strat_ids:
                errs.append(f"détachement {d['id']}: stratagème inconnu '{sid}'")

    # Stratagème.detachment pointe vers un détachement existant (ou null) ?
    for s in stratagems:
        if s.get("detachment") and s["detachment"] not in det_ids:
            errs.append(f"stratagème {s['id']}: détachement inconnu '{s['detachment']}'")

    if errs:
        print("✗ Validation échouée :")
        for e in errs:
            print("  -", e)
        sys.exit(1)

    print(f"✓ Validation OK : {len(unit_ids)} unités, {len(det_ids)} détachements, {len(strat_ids)} stratagèmes.")


if __name__ == "__main__":
    main()
