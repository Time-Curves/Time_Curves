const home = {
  state: {
    counter: 0,
  },
  getters: {
    getCounter: (state) => state.counter,
  },
  actions: {
    increment: ({ commit }) => {
      commit('increment');
    }
  },
  mutations: {
    increment(state) {
      state.counter++;
    },
  },
};

export default home;
