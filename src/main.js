import { createApp } from "vue";
import { createPinia } from "pinia";
import ECharts from "vue-echarts";

import App from "./App.vue";
import router from "./router";
// import store from "./store";

const pinia = createPinia();

createApp(App)
  .component("Echarts", ECharts)
  .use(pinia)
  .use(router)
  .mount("#app");
