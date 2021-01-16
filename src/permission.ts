import router from "./router";
import store from "./store";
import { tokenManager } from "./http/token-manager";
import NProgress from "nprogress";
import "/@/components/NProgress/index.scss";
import { asyncRouterMap } from "./config/router.config";
const loginRoutePath = "/login";
const defaultRoutePath = "/workplace";

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (tokenManager.getToken()) {
    if (to.path === loginRoutePath) {
      next({ path: defaultRoutePath });
      NProgress.done();
    } else {
      // 判断是否获取了用户角色/权限
      if (!store.state.user.role.permissions) {
        store.dispatch("GetUserInfo").then((res) => {
          const role = res.data.role;
          store.dispatch("GenerateRoutes", { role }).then(() => {
            // 添加动态路由
            store.state.permission.asyncRoutes.map((route) => {
              router.addRoute(route);
            });
            const redirect = decodeURIComponent(to.path);
            if (to.path === redirect) {
              next({ ...to, replace: true });
            } else {
              next({ path: redirect });
            }
          });
        });
      } else {
        next();
      }
    }
  } else {
    if (to.path === loginRoutePath) {
      next();
    } else {
      next({ path: loginRoutePath });
    }
    NProgress.done();
  }
});

router.afterEach(() => {
  NProgress.done();
});
