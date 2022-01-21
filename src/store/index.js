import { createStore } from "vuex";

export default createStore({
  state: {
    uniqueProductKey: 0
  },
  mutations: {
    increment(state){
      state.uniqueProductKey++;
    }
  },
  actions: {},
  modules: {},
});
