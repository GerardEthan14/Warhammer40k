# WAAAGH! — Mekboy Companion

Compagnon de bataille mobile-friendly pour **Warhammer 40,000 (10e édition)** côté **Orks**. Plus de feuilles papier à la table : consulte tes datasheets, active tes buffs (Waaagh!, aura de Warboss…) et vois tes stats modifiées en temps réel, gère ton détachement et tes stratagèmes avec un compteur de PC.

## Lancer en local

```bash
npm install
npm run dev
```

Ouvre `http://127.0.0.1:5173` (ou scanne ton réseau local depuis ton téléphone : `npm run dev -- --host 0.0.0.0`).

## Build & déploiement

```bash
npm run build          # bundle inline dans dist/index.html (un seul fichier)
npm run preview        # sert dist/ pour vérifier
```

Le build produit **un seul `dist/index.html` self-contained** (JS + CSS inlinés via `vite-plugin-singlefile`). Tu peux donc :
- l'ouvrir directement (`file://`) sur ton téléphone/ordi
- ou le déployer sur GitHub Pages, Netlify, Vercel, etc.

## Structure

```
src/
├── routes/        # Home, Builder, Play, UnitDetail, Stratagems
├── components/    # NeonTitle, StatBlock, WeaponTable, BuffToggle, CPCounter, StratagemCard…
├── stores/        # armyLists / activeBuffs / commandPoints (Svelte 5 runes, persistance localStorage)
├── lib/           # modifiers.js (calcul des stats modifiées), buffs.js, storage.js
├── styles/        # theme.css (palette néon Ork), effects.css (scanlines, flicker)
└── data/
    ├── factions.json
    └── orks/
        ├── units/*.json
        ├── detachments.json
        └── stratagems.json
```

## Ajouter une unité

Crée un fichier `src/data/orks/units/mon_unite.json` avec ce schéma :

```json
{
  "id": "boyz",
  "name": "Boyz",
  "faction": "orks",
  "model_count": 10,
  "points": 80,
  "stats": { "M": 6, "T": 4, "Sv": 6, "W": 1, "Ld": 7, "OC": 2 },
  "invuln_save": null,
  "weapons": {
    "ranged": [{ "name": "Slugga", "range": 12, "A": 1, "BS": 5, "S": 4, "AP": 0, "D": 1, "keywords": ["Pistol"] }],
    "melee":  [{ "name": "Choppa", "A": 2, "WS": 3, "S": 4, "AP": -1, "D": 1, "keywords": [] }]
  },
  "abilities": [
    { "name": "Mob Rule", "type": "passive", "description": "..." }
  ],
  "keywords": ["Infantry", "Battleline", "Mob"],
  "faction_keywords": ["Orks"],
  "available_buffs": ["waaagh", "warboss_aura"]
}
```

`available_buffs` liste les buffs définis dans `src/lib/buffs.js` qui sont applicables à cette unité.

Vérifie ensuite :

```bash
python3 scripts/validate.py
```

## Parser un PDF de datasheets

```bash
pip install -r scripts/requirements.txt
python3 scripts/parse_pdf.py data-raw/orks-datasheets.pdf
```

Le script est un squelette à itérer : pour le moment il produit un JSON par page avec un placeholder. Une fois qu'on a vu la mise en page exacte de ton PDF, il extraira automatiquement stats, armes et capacités.

## Direction artistique

- Fond noir profond, palette **vert Ork** (`#39ff14`), **magenta** (`#ff2bd6`), **jaune dakka** (`#fff200`)
- Polices : `Press Start 2P` (arcade), `Orbitron` (titres), `Bangers` (peinture *WAAAGH!!*), `Share Tech Mono` (corps)
- Effets : glow néon (`text-shadow` / `box-shadow`), scanlines CSS, flicker du titre
- Mobile-first, optimisé 360–480 px

## Roadmap

- [ ] Parsing PDF complet (en attente du PDF source)
- [ ] Plus de datasheets Orks (Meganobz, Stompa, Boomdakka Snazzwagons…)
- [ ] Autres factions
- [ ] Mode hors-ligne (PWA) si besoin
