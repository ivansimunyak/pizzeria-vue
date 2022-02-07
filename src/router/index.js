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
    path: "/home",
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
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
