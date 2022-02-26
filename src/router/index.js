import { createRouter, createWebHashHistory } from "vue-router";
import OrderPage from "../views/OrderPage.vue";
import CheckDetails from "../views/CheckDetails.vue";
import EditOneOrder from "../views/EditOneOrder.vue";
import MessagesPage from "../views/MessagesPage.vue";
import CategoriesPage from "../views/CategoriesPage.vue";
import UserTypePage from "../views/UserTypePage.vue";
import LocationsPage from "../views/LocationsPage.vue";
import CitiesPage from "../views/CitiesPage.vue";
import PaymentMethodPage from "../views/PaymentMethodPage.vue";
import ProductsPage from "../views/ProductsPage.vue";
import Home from "../views/HomePage.vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import MessageUsPage from "../views/MessageUsPage.vue";


import axios from "axios";
import store from '../store/index.js';

const routes = [
  {
    path: "/orders",
    name: "Order Page",
    component: OrderPage,
  },
  {
    path: "/products",
    name: "Products Page",
    component: ProductsPage,
  },
  {
    path:"/checkdetails/:id",
    name:"Check Details",
    component:CheckDetails,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path:"/editorder/:id/:adress/:name/:phone/:orderStatus",
    name:"Edit Order",
    component:EditOneOrder,
  },
  {
    path: "/messages",
    name: "Messages Page",
    component: MessagesPage,
  },
  {
    path: "/categories",
    name: "Categories Page",
    component: CategoriesPage,
  },
  {
    path: "/usertypes",
    name: "User Types",
    component: UserTypePage,
  }, 
  {
    path: "/locations",
    name: "Locations Page",
    component: LocationsPage,
  },
  {
    path: "/cities",
    name: "Cities Page",
    component: CitiesPage,
  },
  {
    path: "/paymentmethods",
    name: "Payment Methods Page",
    component: PaymentMethodPage,
  }, 
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path:"/login",
    name:"Login",
    component:LoginPage
  },
  {
  path:"/register",
  name:"Register",
  component:RegisterPage
  },
  {
    path:"/messageus",
    name:"Message Us",
    component:MessageUsPage
    }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to) => {
  var isAdmin=store.getters.isAdmin;
  if(to.name=="Order Page" || to.name=="Payment Methods Page" || to.name=="Cities Page" 
  || to.name=="Locations Page"|| to.name=="User Types" || to.name=="Categories Page"
  || to.name=="Messages Page" || to.name=="Payment Methods Page" || to.name=="Edit Order"
  || to.name=="Check Details" || to.name=="Products Page"){   
   const user_type_id=store.getters.user.user_type_id;
   const user_id=store.getters.user.user_id;
  //  axios.defaults.withCredentials = true
   const url='http://localhost:3000/api/userType/getAdmin/'+user_type_id+'/'+user_id;
   axios.get(url)
  .then((res) => {
      //Perform Success Action  
      console.log(res.data)
      store.state.isAdmin=res.data
  })
  .catch((error) => {
      // error.response.status Check status code
      console.log( error.response.status)
  });
  if(isAdmin){
    return true
  }else return false
  }
  console.log("im reached also")
  
})
export default router;
