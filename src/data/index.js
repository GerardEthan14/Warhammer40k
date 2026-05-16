import factions from './factions.json';
import detachments from './orks/detachments.json';
import stratagems from './orks/stratagems.json';

// Vite : import.meta.glob charge toutes les datasheets d'unités
const unitModules = import.meta.glob('./orks/units/*.json', { eager: true });
const units = Object.values(unitModules).map((m) => m.default ?? m);

export { factions, detachments, stratagems, units };

export function getUnit(id) {
  return units.find((u) => u.id === id) ?? null;
}

export function getDetachment(id) {
  return detachments.find((d) => d.id === id) ?? null;
}

export function getStratagem(id) {
  return stratagems.find((s) => s.id === id) ?? null;
}

export function stratagemsForDetachment(detachmentId) {
  // Core (detachment === null) + ceux du détachement actif
  return stratagems.filter(
    (s) => s.detachment === null || s.detachment === detachmentId
  );
}
