import { createApp } from "vue";
import App from "/@/App.vue";
import router from "/@/router";
import store from "/@/store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "./mock";
import "./permission";
import "./index.scss";

createApp(App).use(router).use(store).use(Antd).mount("#app");
