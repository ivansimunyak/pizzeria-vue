import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BaseDialog from "./components/UI/BaseDialog.vue"
import BtnStyled from "./components/BtnStyled.vue"

const app=createApp(App)

app.use(store);
app.use(router);

app.component('btn-styled',BtnStyled);
app.component('base-dialog',BaseDialog);

app.mount('#app');


// createApp(App).component("font-awesome-icon",FontAwesomeIcon).use(store).use(router).mount("#app");


