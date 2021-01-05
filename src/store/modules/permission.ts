import { asyncRouterMap, constantRouterMap } from "/@/config/router.config";
import { RouteRecordRaw } from "vue-router";
import { ActionTree, MutationTree } from "vuex/types";

/**
 * 根据用户角色权限过滤可用的路由
 *
 * @param asyncRouterMap
 * @param role
 */
const filterAsyncRouter = (asyncRouterMap, role) => {
  const accessRouters = asyncRouterMap.filter((route) => {
    if (hasPermission(role.permissions, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, role);
      }
      return true;
    }
    return false;
  });
  return accessRouters;
};

/**
 * 判断是否有该路由权限
 *
 * @param permission
 * @param route
 */
const hasPermission = (permission, route) => {
  if (route.meta && route.meta.permission) {
    let flag = false;
    for (let i = 0, len = permission.length >> 0; i < len; i++) {
      flag = route.meta.permission.includes(permission[i]);
      if (flag) {
        return true;
      }
    }
    return false;
  }
  return true;
};

interface State {
  routes: RouteRecordRaw[];
  asyncRoutes: RouteRecordRaw[];
}

const state: State = {
  routes: [],
  asyncRoutes: [],
};

const mutations: MutationTree<State> = {
  SET_ROUTES: (
    state: State,
    {
      asyncRoutes,
      staticRoutes,
    }: {
      asyncRoutes: RouteRecordRaw[];
      staticRoutes: RouteRecordRaw[];
    }
  ) => {
    state.asyncRoutes = asyncRoutes;
    state.routes = staticRoutes.concat(asyncRoutes);
  },
};

const actions: ActionTree<State, any> = {
  GenerateRoutes({ commit }, data) {
    return new Promise((resolve, reject) => {
      const { role } = data;
      const accessRoutes = filterAsyncRouter(asyncRouterMap, role);
      commit("SET_ROUTES", {
        asyncRoutes: accessRoutes,
        staticRoutes: constantRouterMap,
      });
      resolve(accessRoutes);
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
