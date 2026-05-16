// Buffs actuellement actifs au global (ex. "Waaagh! ce tour") ou par unité.

let state = $state({
  globalBuffIds: [],
  perUnit: {}, // { instanceId: [buffId, ...] }
});

export const activeBuffs = {
  get globalBuffIds() {
    return state.globalBuffIds;
  },

  isGlobalActive(buffId) {
    return state.globalBuffIds.includes(buffId);
  },

  toggleGlobal(buffId) {
    if (state.globalBuffIds.includes(buffId)) {
      state.globalBuffIds = state.globalBuffIds.filter((id) => id !== buffId);
    } else {
      state.globalBuffIds = [...state.globalBuffIds, buffId];
    }
  },

  isUnitActive(instanceId, buffId) {
    return (state.perUnit[instanceId] ?? []).includes(buffId);
  },

  toggleUnit(instanceId, buffId) {
    const current = state.perUnit[instanceId] ?? [];
    if (current.includes(buffId)) {
      state.perUnit = { ...state.perUnit, [instanceId]: current.filter((id) => id !== buffId) };
    } else {
      state.perUnit = { ...state.perUnit, [instanceId]: [...current, buffId] };
    }
  },

  unitBuffs(instanceId) {
    return state.perUnit[instanceId] ?? [];
  },

  reset() {
    state.globalBuffIds = [];
    state.perUnit = {};
  },
};
