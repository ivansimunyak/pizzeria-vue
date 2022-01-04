import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import BtnStyled from "@/components/BtnStyled";
library.add(faArrowLeftLong);
const app=createApp(App).component("font-awesome-icon",FontAwesomeIcon).use(store).use(router).mount("#app");
app.component('btn-styled',BtnStyled);

