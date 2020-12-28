const path = require("path");
export default {
  cssPreprocessOptions: {
    less: {
      modifyVars: {},
    },
  },
  // 请求代理
  proxy: {},
  alias: {
    "/@/": path.resolve(__dirname, "./src/"),
    "/@public/": path.resolve(__dirname, "./public/"),
  },
  optimizeDeps: {
    include: ["ant-design-vue/es/locale/zh_CN"],
  },
};
