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
  },
};
