const instruments = {
  state: {
    instruments: [
      { id: 0, title: 'draw dots', cursor: 'crosshair', icon: 'dot-icon.png'},
      { id: 1, title: 'draw lines', cursor: 'auto', icon: 'line-icon.png'},
      { id: 2, title: 'drug', cursor: 'drugging', icon: 'circle-icon.png'},
      { id: 3, title: 'zoom in', cursor: 'zoom-in', icon: 'house-icon.png'},
    ],
  },
  getters: {
    allInstruments: (state) => state.instruments,
  },
};

export default instruments;
