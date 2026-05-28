// Résumé des règles du livret de base 10e édition, organisé par sections.
// Contenu paraphrasé, pas une copie du livret Games Workshop.

import { KEYWORDS } from '../lib/keywords.js';

// Mots-clés transverses (règles de jeu, pas des mots-clés d'arme).
// Affichés dans la même section que les mots-clés d'arme du popup.
const TRANSVERSE = [
  {
    name: 'Bénéfice du Couvert',
    description:
      "Quand au moins une figurine de l'unité ciblée est totalement derrière un élément de terrain qui le confère, +1 à la Sauvegarde contre cette attaque. Ne peut jamais améliorer une 3+ ou mieux via couvert seul.",
  },
  {
    name: 'Furtif',
    description:
      'Cette unité impose -1 au jet de Touche des attaques de Tir qui la ciblent.',
  },
  {
    name: 'Caché',
    description:
      "L'unité ne peut être ciblée par des attaques de Tir que si elle est entièrement visible depuis la figurine tireuse.",
  },
];

const keywordEntries = [
  ...KEYWORDS.map((k) => ({ name: k.name, description: k.description })),
  ...TRANSVERSE,
];

export const RULES = {
  command_phase: {
    name: 'Phase de Commandement',
    icon: '⚙',
    intro:
      "Première phase du tour : on remet le compteur à zéro et on prépare la machine. Le joueur actif gagne ses Points de Commandement (PC) et déclenche les capacités qui se résolvent en début de tour.",
    steps: [
      'Début de la phase de Commandement',
      'Gain de 1 PC (joueur actif)',
      'Ralliement des unités en déroute',
      'Aptitudes de Commandement',
      'Fin de la phase de Commandement',
    ],
    key_points: [
      'Le joueur actif gagne 1 PC en début de phase. Réserve max : 15 PC.',
      "Ralliement : chaque unité sous l'Effectif Initial fait un test de Commandement. Succès = elle se rallie. Échec = elle perd 1 figurine.",
      "Une unité ralliée ne peut pas Avancer, Charger, Tirer ou utiliser de stratagème ce tour.",
      "C'est ici que se déclenchent la plupart des aptitudes « au début de votre tour » et les stratagèmes de Commandement.",
      "Les détachements ont souvent une règle qui se résout en phase de Commandement (ex: désigner la Proie pour La Chasse au Gros).",
    ],
    pitfalls: [
      "Oublier de tester le ralliement avant de jouer une unité sous-effectif.",
      "Oublier de gagner son PC, ou dépasser le cap de 15 sans dépenser.",
    ],
  },
  movement_phase: {
    name: 'Phase de Mouvement',
    icon: '➤',
    intro:
      "On bouge chaque unité l'une après l'autre. Trois choix par unité : Mouvement Normal, Avance (avec D6 bonus) ou Vol et Élan (Fall Back). Les unités Engagées ne peuvent que désengager.",
    steps: [
      'Sélectionner une unité à déplacer',
      'Choisir : Mouvement Normal, Avance, ou Vol et Élan',
      'Déplacer chaque figurine jusqu\'à sa caractéristique M (+ D6 si Avance)',
      "Vérifier la cohésion d'unité",
      'Embarquer / Débarquer si transport',
      "Répéter pour toutes les unités",
    ],
    key_points: [
      'Cohésion : chaque figurine doit rester à 2 ps maxi d\'une autre du même groupe (2 figurines à 2 ps pour les unités de 6+).',
      "Avance : +D6 ps au mouvement, mais l'unité ne peut ni Tirer ni Charger ce tour (sauf armes Assaut).",
      "Vol et Élan : permet de quitter le corps à corps. L'unité perd Tir et Charge ce tour (sauf règle spéciale).",
      "Engagement : ne pas finir le mouvement à moins de 1 ps horizontal / 5 ps vertical d'un ennemi (sauf désengagement explicite).",
      "Le débarquement d'un transport se fait avant le mouvement du transport, et compte comme avoir bougé pour les passagers.",
    ],
    pitfalls: [
      'Casser la cohésion en étirant un flanc.',
      "Avancer une unité sans réaliser qu'on lui coupe le tir et la charge.",
      "Oublier qu'un transport qui a bougé empêche normalement ses passagers de charger.",
    ],
  },
  shooting_phase: {
    name: 'Phase de Tir',
    icon: '✦',
    intro:
      "Le joueur actif choisit ses unités tireuses une par une et résout toutes leurs armes. Une unité Engagée ne peut pas tirer, sauf avec des Pistolets.",
    steps: [
      'Sélectionner une unité tireuse éligible',
      'Choisir les armes à tirer',
      'Choisir les cibles (visibles, à portée, non engagées sauf exception)',
      'Résoudre la séquence : Touche → Blessure → Sauvegarde → Allocation des dégâts',
      "Passer à l'unité suivante",
    ],
    key_points: [
      "Séquence d'attaque : Jet de Touche (C/T), Jet de Blessure (F vs E), Sauvegarde (Sv modifiée par PA) ou Invulnérable, allocation des dégâts.",
      "Tableau de Blessure : F ≥ 2×E → blesse sur 2+ · F > E → 3+ · F = E → 4+ · F < E → 5+ · F ≤ E/2 → 6+.",
      'Pas de tir vers ou depuis une unité Engagée, sauf armes Pistolet.',
      "Le joueur ciblé alloue les blessures non sauvegardées sur une figurine de son choix, mais doit finir d'achever une figurine déjà blessée avant d'en entamer une autre.",
      'On peut répartir les tirs entre plusieurs cibles, mais toutes les cibles doivent être déclarées avant de jeter les dés.',
    ],
    pitfalls: [
      "Oublier qu'une unité ayant Avancé ne peut tirer qu'avec des armes Assaut.",
      'Mal appliquer le couvert (figurine entièrement visible = pas de couvert).',
      "Allouer les blessures en parallèle au lieu d'achever d'abord une figurine déjà blessée.",
    ],
  },
  charge_phase: {
    name: 'Phase de Charge',
    icon: '⚡',
    intro:
      "Le joueur actif désigne ses chargeurs, fait un jet de 2D6 et tente de placer la figurine la plus proche au contact (à 1 ps) d'au moins une figurine ennemie déclarée.",
    steps: [
      "Sélectionner une unité éligible (n'a ni Avancé, ni fait Vol et Élan, pas déjà Engagée)",
      "Déclarer une ou plusieurs unités cibles à 12 ps",
      'Jeter 2D6 pour la distance de charge',
      'Si la distance suffit pour atteindre chaque cible déclarée tout en gardant la cohésion, effectuer le mouvement',
      'Sinon, échec : pas de mouvement',
      "Le défenseur peut réagir (Tirs en État d'Alerte, Intervention Héroïque, etc. selon stratagèmes)",
    ],
    key_points: [
      "Toutes les cibles déclarées doivent être atteintes par au moins une figurine de l'unité chargeuse, sinon la charge rate.",
      "La première figurine déplacée doit finir à 1 ps horizontal / 5 ps vertical d'une figurine ennemie.",
      "Une unité ayant Avancé ou fait Vol et Élan ne peut PAS charger ce tour (sauf règle Assaut qui contourne).",
      "Le bonus de charge (« Charge » dans le profil) s'applique uniquement le tour où l'unité a effectivement chargé.",
      "Pas de charge possible si toutes les cibles sont déjà engagées au corps à corps avec l'unité chargeuse.",
    ],
    pitfalls: [
      'Déclarer plusieurs cibles puis se rendre compte qu\'on ne peut pas toutes les atteindre → la charge rate entièrement.',
      "Oublier qu'on ne peut pas charger après une Avance hors armes Assaut.",
      'Casser la cohésion à la fin du mouvement de charge.',
    ],
  },
  fight_phase: {
    name: 'Phase de Combat',
    icon: '⚔',
    intro:
      "Les deux joueurs alternent les unités engagées. On commence par celles qui ont chargé ce tour, puis on alterne, joueur actif d'abord. Chaque unité fait un Mouvement d'Engagement puis résout ses attaques.",
    steps: [
      'Combattre avec toutes les unités ayant chargé ce tour (joueur actif en premier)',
      "Alterner ensuite entre les joueurs, joueur actif d'abord",
      "Mouvement d'Engagement (jusqu'à 3 ps vers la figurine ennemie la plus proche)",
      'Choisir armes de mêlée et cibles, résoudre Touche/Blessure/Sauvegarde/Dégâts',
      "Mouvement de Consolidation (3 ps vers ennemi le plus proche, ou objectif si plus d'ennemi à 5 ps)",
    ],
    key_points: [
      "Une figurine peut attaquer si elle est à 1 ps d'un ennemi, OU à 1 ps d'une figurine de son unité elle-même à 1 ps d'un ennemi (rang arrière).",
      "Priorité aux charges : toutes les unités ayant chargé frappent avant les autres (joueur actif d'abord).",
      "On résout chaque unité entièrement (toutes ses attaques) avant de passer à la suivante.",
      "Mouvement d'Engagement : jusqu'à 3 ps, doit toujours réduire la distance à l'ennemi le plus proche.",
      'Consolidation : 3 ps soit vers ennemi le plus proche, soit vers un objectif contesté à moins de 5 ps si plus aucun ennemi proche.',
      "Si une cible est totalement détruite avant la fin des attaques, l'attaquant peut rediriger ses attaques restantes vers une autre unité engagée.",
    ],
    pitfalls: [
      "Oublier de faire d'abord combattre toutes les unités ayant chargé.",
      "Mal placer le Mouvement d'Engagement (doit toujours rapprocher de l'ennemi le plus proche).",
      "Consolider hors d'un objectif alors qu'on aurait pu le sécuriser.",
    ],
  },
  keywords: {
    name: 'Mots-clés universels',
    icon: '🏷',
    intro:
      "Les mots-clés universels qui apparaissent sur les profils d'armes et règles transverses. Tap sur le nom du mot-clé pour ouvrir le popup standard (le même que dans les fiches d'unité).",
    entries: keywordEntries,
  },
  terrain: {
    name: 'Terrain',
    icon: '▣',
    intro:
      "Le terrain n'est pas qu'esthétique : chaque catégorie change le mouvement, la ligne de vue et les sauvegardes. Une fois posé, le terrain est figé pour la bataille.",
    steps: [
      'Placement du terrain avant déploiement',
      'Catégoriser chaque élément (Ruines, Forêt, Colline, Obstacle, etc.)',
      'Appliquer les règles spécifiques à chaque catégorie',
    ],
    key_points: [
      "Ruines : bloquent la ligne de vue à travers les murs pour la plupart des unités. Confèrent le Bénéfice du Couvert. Cap la Sv à 3+ minimum via couvert seul.",
      'Forêts : pas de blocage de mouvement pour Infanterie/Bêtes. Bénéfice du Couvert si la figurine est entièrement dans la forêt.',
      "Collines : pas d'effet de couvert direct, mais permettent de voir par-dessus les obstacles plus bas.",
      "Obstacles : Bénéfice du Couvert si la figurine est dans les 3 ps d'un obstacle qui obscurcit la ligne de vue.",
      'Monstres et Véhicules : ne peuvent généralement pas entrer dans les ruines (sauf rez-de-chaussée ouvert). Vérifier la taille de socle.',
      "Mouvement vertical (escalade) : coûte le mouvement réel parcouru. Infanterie/Bêtes escaladent normalement les ruines.",
    ],
    pitfalls: [
      "Confondre « partiellement visible » et « entièrement visible » pour le couvert.",
      "Oublier que les ruines bloquent la ligne de vue entre étages pour l'infanterie.",
    ],
  },
  misc: {
    name: 'Divers',
    icon: '…',
    intro:
      "Tout le reste : structure de la bataille, déploiement, objectifs, stratagèmes, personnages attachés, transports, fin de partie.",
    steps: [
      "Construction d'armée (Patrouille 500 pts · Incursion 1000 · Frappe d'Avant-Garde 2000)",
      'Choix du champ de bataille et placement du terrain',
      'Sélection de la mission (objectifs primaires/secondaires)',
      "Déploiement (alternance, finir d'un côté puis l'autre)",
      'Détermination du premier tour',
      '5 tours de bataille (chacun = 1 round complet pour les 2 joueurs)',
      'Décompte final des points',
    ],
    key_points: [
      "Contrôle d'objectif : la somme de l'Effectif (OC) à 3 ps de l'objectif détermine qui contrôle.",
      'Stratagèmes : 1-2 PC, et une unité ne peut être affectée que par UN stratagème par phase (sauf indication contraire).',
      "Personnages attachés : un Personnage peut rejoindre une unité éligible avant la bataille. Tant qu'il y a 1+ garde du corps, le Perso ne peut pas être directement ciblé (sauf armes Précision).",
      "Transports : embarquement remplace le mouvement. Débarquement AVANT le mouvement du transport. Si le transport a bougé, les passagers ne peuvent pas charger (sauf règle spéciale).",
      "Réserves Stratégiques : max 50% de l'armée en réserve. Arrivent à partir du tour 2, à 6 ps d'un bord de table et à 9 ps d'un ennemi.",
      "Figurines Volantes : ignorent figurines et terrain pour le mouvement (mais cohésion finale obligatoire).",
    ],
    pitfalls: [
      "Oublier le cap d'1 stratagème par phase sur une même unité.",
      "Faire débarquer après avoir bougé le transport (ordre = débarquer d'abord).",
      "Calculer le contrôle d'objectif avec le nombre de figurines au lieu de l'Effectif (OC).",
    ],
  },
};

export const RULES_ORDER = [
  'command_phase',
  'movement_phase',
  'shooting_phase',
  'charge_phase',
  'fight_phase',
  'keywords',
  'terrain',
  'misc',
];
