#!/usr/bin/env python3
"""
Extracteur de datasheets depuis un PDF Warhammer 40k (10e éd.) → JSON.

Usage : python parse_pdf.py <chemin/vers/datasheets.pdf>

Squelette à itérer une fois qu'on a vu la mise en page exacte du PDF que tu
enverras. Stratégie générale :
  1. Lire le PDF page par page avec pdfplumber.
  2. Détecter le titre de l'unité (police la plus grande de la page).
  3. Repérer le bloc de statistiques M / T / SV / W / LD / OC.
  4. Parser le tableau d'armes (ranged + melee).
  5. Extraire la section "Abilities" (texte libre).
  6. Extraire les keywords (souvent en pied de page).
  7. Écrire un JSON par unité dans src/data/orks/units/.

À adapter selon la mise en page exacte de ton PDF.
"""

import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "src" / "data" / "orks" / "units"

STAT_HEADER_RE = re.compile(
    r"\bM\b.+\bT\b.+\bSV\b.+\bW\b.+\bLD\b.+\bOC\b", re.IGNORECASE
)


def slugify(name):
    return re.sub(r"[^a-z0-9]+", "_", name.lower()).strip("_")


def parse_pdf(pdf_path):
    try:
        import pdfplumber
    except ImportError:
        print("✗ pdfplumber requis : pip install -r scripts/requirements.txt", file=sys.stderr)
        sys.exit(2)

    units = []
    with pdfplumber.open(pdf_path) as pdf:
        for page_num, page in enumerate(pdf.pages, 1):
            text = page.extract_text() or ""
            # TODO: identifier le titre de l'unité (plus gros texte).
            # TODO: chercher la ligne d'en-tête de stats.
            # TODO: la ligne suivante contient les valeurs.
            # TODO: tableau d'armes : pdfplumber.extract_tables().
            # TODO: bloc Abilities entre "ABILITIES" et "KEYWORDS".
            # TODO: keywords en pied de page.
            #
            # Placeholder qui produit un squelette pour chaque page :
            title_line = next((l for l in text.splitlines() if l.strip()), f"Page {page_num}")
            units.append(
                {
                    "id": slugify(title_line)[:40],
                    "name": title_line.strip(),
                    "faction": "orks",
                    "model_count": 1,
                    "points": 0,
                    "stats": {"M": 0, "T": 0, "Sv": 0, "W": 0, "Ld": 0, "OC": 0},
                    "invuln_save": None,
                    "weapons": {"ranged": [], "melee": []},
                    "abilities": [],
                    "keywords": [],
                    "faction_keywords": ["Orks"],
                    "available_buffs": ["waaagh"],
                    "_TODO": "Squelette généré automatiquement, à compléter (parse_pdf.py n'extrait pas encore les vraies données — partage le PDF pour itérer).",
                }
            )

    return units


def write_units(units, dry_run=False):
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for u in units:
        path = OUT_DIR / f"{u['id']}.json"
        if dry_run:
            print(f"would write {path.relative_to(ROOT)}")
        else:
            with open(path, "w") as f:
                json.dump(u, f, indent=2, ensure_ascii=False)
            print(f"✓ {path.relative_to(ROOT)}")


def main():
    p = argparse.ArgumentParser(description="Parse Warhammer 40k datasheets PDF → JSON")
    p.add_argument("pdf", help="chemin vers le PDF")
    p.add_argument("--dry-run", action="store_true")
    args = p.parse_args()

    pdf_path = Path(args.pdf)
    if not pdf_path.exists():
        print(f"✗ Fichier introuvable : {pdf_path}", file=sys.stderr)
        sys.exit(1)

    units = parse_pdf(pdf_path)
    print(f"Trouvé {len(units)} unités candidates")
    write_units(units, dry_run=args.dry_run)


if __name__ == "__main__":
    main()
