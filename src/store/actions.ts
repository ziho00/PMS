import { api } from "../http/api";

/**
 * 登录 action
 *
 * @param param0
 * @param param1
 */
export const handleLogin = ({ commit }, { account, password }) => {
  return new Promise((resolve, reject) => {
    api.user
      .login({ account, password })
      .then((res) => {
        const userInfo = res.data.data;
        commit("set_user_info", userInfo);
        resolve(userInfo);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * 登出
 *
 * @param param0
 */
export const handleLogout = ({ commit }) => {
  return new Promise((resolve, reject) => {
    api.user
      .logout()
      .then((res) => {
        commit("set_user_info", {});
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
