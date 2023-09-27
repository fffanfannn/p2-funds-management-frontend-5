import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import vue3GoogleLogin from "vue3-google-login";
// import store from "./store";

import ECharts from "vue-echarts";
import "echarts";

const pinia = createPinia();

createApp(App)
  .component("Echarts", ECharts)
  .use(pinia)
  .use(router)
  .use(vue3GoogleLogin, {
    clientId:
      "514435305037-sc1afh74pt242olrce8pfnl5a06o1pp2.apps.googleusercontent.com",
  })
  .mount("#app");
