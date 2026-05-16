const VERSION_KEY = 'w40k.version';
const VERSION = 1;

function ensureVersion() {
  const current = localStorage.getItem(VERSION_KEY);
  if (current === null) {
    localStorage.setItem(VERSION_KEY, String(VERSION));
  }
}

export function load(key, fallback) {
  ensureVersion();
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function save(key, value) {
  ensureVersion();
  localStorage.setItem(key, JSON.stringify(value));
}

export function remove(key) {
  localStorage.removeItem(key);
}
