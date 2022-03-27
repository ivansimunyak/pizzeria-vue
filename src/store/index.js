import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate'
import axios from 'axios'

export default createStore({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
})],
  state: {
    uniqueProductKey: 0,
    user:null,
    accessToken:null,
    isAdmin:null,
    cart:[],
    cartCount:0
    
  },
  mutations: {
    increment(state){
      state.uniqueProductKey++;
    },
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, accessToken) {
      console.log("this is being done"+accessToken)
      state.accessToken = accessToken;
    },
    setAdmin(state, isAdmin) {
      state.isAdmin = isAdmin;
    },
    logout(state){
      state.user=null,
      state.isAdmin=null,
      state.accessToken=null
      state.cart=[]
    },
    addProduct: (state, product) => {
      const record = state.cart.find(element => element.id == product.id);
      if(record){
        console.log("Hit hsisisis")
        record.quantity++
      }else{
        
       product.quantity=1;
       state.cart.push(product);
     }
     state.cartCount++;
    },removeCartItem(state, item) {
      const record = state.cart.find(element => element.id == item.id);
      state.cart.splice(state.cart.indexOf(record), 1);
    },
    decreaseQuantity(state, item) {
      const record = state.cart.find(element => element.id == item.id);
      record.quantity--;
      if(record.quantity==0){
        state.cart.splice(state.cart.indexOf(record), 1);
      }
    },
    increaseQuantity(state,item){
      const record=state.cart.find(element=>element.id==item.id);
      record.quantity++;
    }
  },
  actions: {
    REFRESH_TOKEN: (context) => {
      return new Promise((resolve, reject) => {
        axios
          .post(`http://localhost:3000/api/user/token`)
          .then(response => {
            console.log("Response access token: "+response.data.accessToken)
            context.commit('setToken',response.data.accessToken)
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  },
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
      },
      accessToken(state){
        return state.accessToken;
      },
      cart(state){
        return state.cart;
      },
      cartTotal(state) {
        let res = 0;
	    	state.cart.map(item => {
		  	res += item.price * item.quantity;
	      	});
	    	return res;
      },
      cartCount(state){
        return state.cartCount;
      }
 

  }
});
