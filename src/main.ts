import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";

import "bootstrap/dist/css/bootstrap.min.css";
import * as AntIcons from "@ant-design/icons-vue";
import "bootstrap";

const app = createApp(App);
Object.entries(AntIcons).forEach(([name, component]) => {
  app.component(name, component);
});

app.use(store).use(router).use(Antd).mount("#app");
