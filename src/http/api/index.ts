import * as user from "./user";
import * as workplace from "./workplace";

/** setting  */
import * as userManagement from "./setting/user-management";
import * as roleManagement from "./setting/role-management";
import * as authorityManagement from "./setting/authority-management";

/** project */
import * as project from "./project/project";
import * as task from "./project/task";
import * as requirement from "./project/requirement";
import * as bug from "./project/bug";
import * as version from "./project/version";
import * as charts from "./project/charts";
import * as projectSetting from "./project/project_setting";

export const api = {
  user,
  workplace,
  userManagement,
  roleManagement,
  authorityManagement,
  project,
  task,
  requirement,
  bug,
  version,
  charts,
  projectSetting,
};
