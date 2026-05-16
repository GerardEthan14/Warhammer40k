// Buffs disponibles globalement (Waaagh!, auras, etc.).
// Les buffs propres au détachement viennent du détachement lui-même.

export const BUFFS = {
  waaagh: {
    id: 'waaagh',
    name: 'WAAAGH!',
    description:
      'Tour de la Waaagh : +1 attaque sur les armes de mêlée et +1 OC pour toutes les unités Orks.',
    scope: 'army',
    effects: [
      { target: 'melee_weapons', field: 'A', op: 'add', value: 1 },
      { target: 'stats', field: 'OC', op: 'add', value: 1 },
    ],
  },
  warboss_aura: {
    id: 'warboss_aura',
    name: "Aura de Warboss",
    description: 'À portée du Warboss : touches mêlée critiques sur 5+.',
    scope: 'aura',
    effects: [],
  },
  painboy_heal: {
    id: 'painboy_heal',
    name: 'Painboy à proximité',
    description: 'Soin de 1 PV par tour de la part du Painboy attaché.',
    scope: 'aura',
    effects: [],
  },
};
