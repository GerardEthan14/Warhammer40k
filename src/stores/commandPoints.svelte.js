let state = $state({
  current: 6,
  turn: 1,
  playedThisTurn: [], // stratagem ids
  history: [], // [{ stratagemId, turn, cost }]
});

export const commandPoints = {
  get current() {
    return state.current;
  },
  get turn() {
    return state.turn;
  },
  get playedThisTurn() {
    return state.playedThisTurn;
  },
  get history() {
    return state.history;
  },

  set(cp) {
    state.current = Math.max(0, cp);
  },

  add(n = 1) {
    state.current = Math.max(0, state.current + n);
  },

  spend(cost, stratagemId) {
    if (state.current < cost) return false;
    state.current -= cost;
    state.playedThisTurn = [...state.playedThisTurn, stratagemId];
    state.history = [...state.history, { stratagemId, turn: state.turn, cost }];
    return true;
  },

  isPlayed(stratagemId) {
    return state.playedThisTurn.includes(stratagemId);
  },

  nextTurn() {
    state.turn += 1;
    state.playedThisTurn = [];
    // Gain de 1 PC en début de tour (règle 10e ed.)
    state.current = Math.min(state.current + 1, 99);
  },

  reset(cpStart = 6) {
    state.current = cpStart;
    state.turn = 1;
    state.playedThisTurn = [];
    state.history = [];
  },
};
