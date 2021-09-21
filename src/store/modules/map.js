const map = {
  state: {
    cc: null,
  },
  getters: {
    cc: (state) => state.cc,
  },
  actions: {
    setCC({ commit }, instance) {
      commit('setCC', instance);
    }
  },
  mutations: {
    setCC(state, instance) {
      state.cc = instance;
    },
  },
};

export default map;
