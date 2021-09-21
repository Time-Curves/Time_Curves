const instruments = {
  state: {
    instruments: [
      { id: 0, title: 'draw dots', icon: 'dot-icon.png'},
      { id: 1, title: 'draw lines', icon: 'line-icon.png'},
      { id: 2, title: 'draw circles', icon: 'circle-icon.png'},
      { id: 3, title: 'draw smth', icon: 'house-icon.png'}],
  },
  getters: {
    allInstruments: (state) => state.instruments,
  },
};

export default instruments;
