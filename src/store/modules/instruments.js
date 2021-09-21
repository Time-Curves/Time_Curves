const instruments = {
  state: {
    instruments: [
      { id: 1, func: 'setDots' },
      { id: 2, func: 'Write' },
      { id: 3, func: 'Delete' },
      { id: 4, func: 'Haha' }],
  },
  getters: {
    allInstruments: (state) => state.instruments,
  },
};

export default instruments;
