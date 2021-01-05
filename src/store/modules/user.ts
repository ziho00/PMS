import { tokenManager } from "/@/http/token-manager";
import { api } from "/@/http/api";
import { UserInfo } from "/@/common/gobal";
import { ActionTree, MutationTree } from "vuex/types";
export interface State {
  userInfo: UserInfo;
  role: any;
}

const state: State = {
  userInfo: {},
  role: {},
};

const mutations: MutationTree<State> = {
  SET_USER_INFO: (state: State, userInfo: UserInfo) => {
    state.userInfo = userInfo;
  },
  SET_TOKEN: (state: State, token: string) => {
    tokenManager.setToken(token);
  },
  SET_ROLE: (state: State, role: any) => {
    state.role = role;
  },
};

const actions: ActionTree<State, any> = {
  /**
   * 登录
   *
   * @param account   手机号码/邮箱
   * @param password  密码
   */
  Login({ commit }, { account, password }) {
    return new Promise((resolve, reject) => {
      api.user
        .login({ account, password })
        .then((res) => {
          const userInfo = res.data.data;
          tokenManager.setToken(userInfo.token);
          resolve(userInfo);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  /**
   * 登出
   *
   */
  Logout({ commit }) {
    return new Promise((resolve, reject) => {
      api.user
        .logout()
        .then((res) => {
          commit("SET_USER_INFO", {});
          commit("SET_ROLE", {});
          tokenManager.clearToken();
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  /**
   * 获取用户信息
   *
   */
  GetUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      api.user
        .getUserInfo()
        .then((res) => {
          const userInfo = res.data.data;
          commit("SET_USER_INFO", userInfo);
          commit("SET_ROLE", userInfo.role);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
