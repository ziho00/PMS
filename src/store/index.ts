import { createStore } from "vuex";
import state from "./state";
import * as actions from "./actions";
import mutations from "./mutations";

export default createStore({
  state,
  mutations: mutations,
  actions: actions,
  modules: {},
});
