// Définitions des mots-clés d'armes (10e édition, version FR).
// Le matching se fait par préfixe insensible à la casse — ça gère les
// variantes numériques (« Tir Rapide 2 », « Anti-Véhicule 4+ », etc.).

export const KEYWORDS = [
  {
    prefix: 'Pistolet',
    name: 'Pistolet',
    description:
      "Cette arme peut tirer même quand l'unité est engagée en mêlée, mais uniquement contre l'unité ennemie avec laquelle elle est engagée. Une unité armée uniquement de Pistolets peut tirer alors qu'elle est engagée.",
  },
  {
    prefix: 'Déflagration',
    name: 'Déflagration (Blast)',
    description:
      "+1 Attaque pour chaque tranche de 5 figurines dans l'unité ciblée (max +5). Cette arme ne peut jamais cibler une unité engagée en mêlée.",
  },
  {
    prefix: 'Assaut',
    name: 'Assaut',
    description:
      "Cette arme peut être tirée même si l'unité a Avancé pendant la phase de Mouvement.",
  },
  {
    prefix: 'Tir Rapide',
    name: 'Tir Rapide N',
    description:
      "Quand l'unité tire à la moitié de la portée de l'arme ou moins, la caractéristique d'Attaque de l'arme est augmentée de N.",
  },
  {
    prefix: 'Jumelé',
    name: 'Jumelé',
    description:
      'Vous pouvez relancer le jet de Blessure de cette arme.',
  },
  {
    prefix: 'Lourde',
    name: 'Lourde',
    description:
      "Si l'unité du porteur est restée immobile à votre tour précédent (n'a pas bougé), ajoutez 1 au jet de Touche de cette arme.",
  },
  {
    prefix: 'Fusion',
    name: 'Fusion N',
    description:
      "Quand cette arme cible une unité à la moitié de sa portée ou moins, sa caractéristique de Dégâts est augmentée de N.",
  },
  {
    prefix: 'Anti-',
    name: 'Anti-X N+',
    description:
      "Quand cette arme cible une unité ayant le mot-clé X, tout jet de Blessure non modifié ≥ N est considéré comme une Blessure Critique. À combiner avec Blessures Dévastatrices pour des dégâts directs.",
  },
  {
    prefix: 'Lance',
    name: 'Lance',
    description:
      "Le tour où l'unité du porteur a fait une Charge, ajoutez 1 au jet de Blessure de cette arme en mêlée.",
  },
  {
    prefix: 'Torrent',
    name: 'Torrent',
    description:
      'Cette arme touche automatiquement la cible — pas de jet de Touche nécessaire.',
  },
  {
    prefix: 'Ignore Couvert',
    name: 'Ignore Couvert',
    description:
      "L'unité ciblée ne bénéficie pas du bonus de Couvert pour sa Sauvegarde face aux attaques de cette arme.",
  },
  {
    prefix: 'Blessures Dévastatrices',
    name: 'Blessures Dévastatrices',
    description:
      "Chaque attaque infligeant une Blessure Critique (jet de Blessure non modifié de 6, ou seuil abaissé par Anti-X) inflige un nombre de blessures mortelles égal à la caractéristique de Dégâts de l'arme, et la séquence d'attaque s'arrête (pas de jet de Sauvegarde).",
  },
  {
    prefix: 'Attaque Bonus',
    name: 'Attaque(s) Bonus',
    description:
      "Les attaques de cette arme s'ajoutent à celles des autres armes de mêlée de la figurine — elles ne remplacent pas les autres armes, elles s'ajoutent en plus.",
  },
  {
    prefix: 'Attaques Bonus',
    name: 'Attaque(s) Bonus',
    description:
      "Les attaques de cette arme s'ajoutent à celles des autres armes de mêlée de la figurine — elles ne remplacent pas les autres armes, elles s'ajoutent en plus.",
  },
  {
    prefix: 'Touches Soutenues',
    name: 'Touches Soutenues N',
    description:
      'Chaque Touche Critique au jet de Touche génère N touches supplémentaires automatiques sur la cible.',
  },
  {
    prefix: 'Touches Létales',
    name: 'Touches Létales',
    description:
      "Chaque Touche Critique (jet de Touche non modifié de 6) blesse automatiquement la cible — pas de jet de Blessure (la Sauvegarde s'applique normalement).",
  },
  {
    prefix: 'Précision',
    name: 'Précision',
    description:
      "Quand cette arme cible une unité Personnage attachée à une autre unité, le porteur peut allouer ses attaques directement au Personnage (au lieu d'une figurine au plus près).",
  },
  {
    prefix: 'Tir Indirect',
    name: 'Tir Indirect',
    description:
      "Cette arme peut cibler des unités hors ligne de vue, mais subit -1 au jet de Touche et la cible bénéficie automatiquement du Couvert.",
  },
  {
    prefix: 'Une Utilisation',
    name: 'Une Utilisation',
    description:
      'Cette arme ne peut être utilisée qu\'une seule fois par bataille.',
  },
  {
    prefix: 'Psychique',
    name: 'Psychique',
    description:
      "Cette arme représente une attaque psychique. Elle peut être affectée par les défenses anti-psychique ennemies. Plusieurs aptitudes interagissent avec ce mot-clé (résistance psychique, contre-sortilèges, etc.).",
  },
  {
    prefix: 'Dangereux',
    name: 'Dangereux',
    description:
      "Après avoir résolu les attaques de cette arme, jette 1 D6 pour chaque figurine de l'unité tireuse qui a utilisé une arme Dangereux. Sur 1 : la figurine est détruite (les Monstres/Véhicules subissent 3 blessures mortelles à la place).",
  },
  {
    prefix: 'Mêlée',
    name: 'Mêlée',
    description:
      "Arme de mêlée — utilisée pendant la phase de Combat. Sa portée est toujours « engagement » (1 ps horizontal).",
  },
];

export function findKeyword(text) {
  if (!text) return null;
  const lower = String(text).toLowerCase();
  return KEYWORDS.find((k) => lower.startsWith(k.prefix.toLowerCase())) ?? null;
}
