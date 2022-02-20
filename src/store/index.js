import { createStore } from "vuex";

export default createStore({
  state: {
    uniqueProductKey: 0,
    user:null,
    accessToken:null,
    isAdmin:null
  },
  mutations: {
    increment(state){
      state.uniqueProductKey++;
    },
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, accessToken) {
      state.accessToken = accessToken;
    },
    setAdmin(state, isAdmin) {
      state.isAdmin = isAdmin;
    },
  },
  actions: {},
  modules: {},
    getters: {
      isLoggedIn(state) {
        return !!state.accessToken;
      },
      user(state){
        return state.user;
      },
      isAdmin(state){
        return state.isAdmin;
      }
 

  }
});
