// Pure: prend une unité + contexte (buffs actifs, détachement) et retourne
// les stats, armes et capacités modifiées.

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function applyEffect(unit, effect) {
  const { target, field, op, value } = effect;
  const apply = (current) => {
    if (op === 'add') return (current ?? 0) + value;
    if (op === 'sub') return (current ?? 0) - value;
    if (op === 'set') return value;
    if (op === 'mul') return (current ?? 0) * value;
    return current;
  };

  if (target === 'stats') {
    unit.stats[field] = apply(unit.stats[field]);
    return;
  }
  if (target === 'melee_weapons') {
    for (const w of unit.weapons.melee ?? []) {
      w[field] = apply(w[field]);
    }
    return;
  }
  if (target === 'ranged_weapons') {
    for (const w of unit.weapons.ranged ?? []) {
      w[field] = apply(w[field]);
    }
    return;
  }
  if (target === 'all_weapons') {
    for (const w of [...(unit.weapons.melee ?? []), ...(unit.weapons.ranged ?? [])]) {
      w[field] = apply(w[field]);
    }
    return;
  }
}

function effectIsActive(effect, ctx) {
  if (!effect.trigger) return true;
  if (effect.trigger === 'waaagh_active') return ctx.waaagh === true;
  return true;
}

// unit: datasheet de base
// ctx: { activeBuffIds: string[], detachment: object|null, allBuffs: object (id->buff), waaagh: bool }
// Retourne un clone avec les modifs appliquées + la liste des sources de modifs
export function computeUnit(unit, ctx) {
  const modified = clone(unit);
  const sources = [];

  // Détachement : effets passifs
  if (ctx.detachment) {
    for (const effect of ctx.detachment.passive_effects ?? []) {
      if (effectIsActive(effect, ctx)) {
        applyEffect(modified, effect);
        sources.push({ type: 'detachment', name: ctx.detachment.name, effect });
      }
    }
  }

  // Buffs actifs
  for (const buffId of ctx.activeBuffIds ?? []) {
    const buff = ctx.allBuffs?.[buffId];
    if (!buff) continue;
    // Si le buff est lié à une unité spécifique, vérifier
    if (buff.appliesTo && !buff.appliesTo.includes(unit.id)) continue;
    for (const effect of buff.effects ?? []) {
      if (effectIsActive(effect, ctx)) {
        applyEffect(modified, effect);
        sources.push({ type: 'buff', name: buff.name, effect });
      }
    }
  }

  return { unit: modified, sources };
}
