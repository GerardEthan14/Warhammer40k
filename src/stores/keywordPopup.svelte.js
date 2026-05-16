let state = $state({ current: null });

export const keywordPopup = {
  get current() {
    return state.current;
  },
  show(def, originalText) {
    state.current = { ...def, originalText };
  },
  close() {
    state.current = null;
  },
};
