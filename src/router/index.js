import { createRouter, createWebHashHistory } from "vue-router";
import OrderPage from "../views/OrderPage.vue";
import CheckDetails from "../views/CheckDetails.vue";
import EditOneOrder from "../views/EditOneOrder.vue";
import MessagesPage from "../views/MessagesPage.vue";
import CategoriesPage from "../views/CategoriesPage.vue";
import UserTypePage from "../views/UserTypePage.vue";
import LocationsPage from "../views/LocationsPage.vue";
const routes = [
  {
    path: "/orders",
    name: "Order Page",
    component: OrderPage,
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
  },  {
    path: "/locations",
    name: "Locations Page",
    component: LocationsPage,
  },
  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
