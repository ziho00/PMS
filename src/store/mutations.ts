import * as type from "./mutation-types";
import { State } from "./state";
import { UserInfo } from "../common/gobal";

const mutations = {
  [type.SET_USER_INFO](state: State, userInfo: UserInfo) {
    state.userInfo = userInfo;
  },
};

export default mutations;
