import { load, save } from '../lib/storage.js';

const KEY = 'w40k.armyLists';

// Format d'une liste :
// { id, name, faction: 'orks', detachmentId, units: [{ instanceId, unitId, count? }], cpStart: 6 }

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function loadAll() {
  return load(KEY, []);
}

let state = $state({ lists: loadAll(), activeListId: null });

function persist() {
  save(KEY, state.lists);
}

export const armyLists = {
  get lists() {
    return state.lists;
  },
  get activeListId() {
    return state.activeListId;
  },
  get activeList() {
    return state.lists.find((l) => l.id === state.activeListId) ?? null;
  },

  setActive(id) {
    state.activeListId = id;
  },

  create(name, detachmentId = null) {
    const list = {
      id: uid(),
      name: name || 'Nouvelle Waaagh!',
      faction: 'orks',
      detachmentId,
      units: [],
      cpStart: 6,
    };
    state.lists = [...state.lists, list];
    persist();
    return list;
  },

  rename(id, name) {
    const l = state.lists.find((x) => x.id === id);
    if (l) {
      l.name = name;
      persist();
    }
  },

  setDetachment(id, detachmentId) {
    const l = state.lists.find((x) => x.id === id);
    if (l) {
      l.detachmentId = detachmentId;
      persist();
    }
  },

  setCpStart(id, cp) {
    const l = state.lists.find((x) => x.id === id);
    if (l) {
      l.cpStart = cp;
      persist();
    }
  },

  addUnit(listId, unitId) {
    const l = state.lists.find((x) => x.id === listId);
    if (!l) return;
    l.units = [...l.units, { instanceId: uid(), unitId }];
    persist();
  },

  removeUnit(listId, instanceId) {
    const l = state.lists.find((x) => x.id === listId);
    if (!l) return;
    l.units = l.units.filter((u) => u.instanceId !== instanceId);
    persist();
  },

  destroy(id) {
    state.lists = state.lists.filter((l) => l.id !== id);
    if (state.activeListId === id) state.activeListId = null;
    persist();
  },
};
