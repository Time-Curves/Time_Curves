import Vuex from 'vuex';
import instruments from './modules/instruments';
import home from './modules/home';
import map from './modules/map';

export default Vuex.createStore({
  modules: {
    instruments,
    home,
    map,
  }
});
