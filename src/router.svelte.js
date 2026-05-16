// Mini routeur hash-based : /, /builder/:id, /play/:id, /play/:id/unit/:instanceId, /strats/:id

function parse(hash) {
  const path = (hash || '#/').replace(/^#/, '') || '/';
  return path;
}

let state = $state({ path: parse(location.hash) });

window.addEventListener('hashchange', () => {
  state.path = parse(location.hash);
  window.scrollTo(0, 0);
});

export const router = {
  get path() {
    return state.path;
  },
  go(path) {
    location.hash = path;
  },
};

// Helpers pour matcher des routes
export function match(path, pattern) {
  const pParts = pattern.split('/').filter(Boolean);
  const cParts = path.split('/').filter(Boolean);
  if (pParts.length !== cParts.length) return null;
  const params = {};
  for (let i = 0; i < pParts.length; i++) {
    if (pParts[i].startsWith(':')) {
      params[pParts[i].slice(1)] = decodeURIComponent(cParts[i]);
    } else if (pParts[i] !== cParts[i]) {
      return null;
    }
  }
  return params;
}
