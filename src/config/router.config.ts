import { RouteRecordRaw } from "vue-router";
import {
  LaptopOutlined,
  ReadOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";

/**
 * 动态路由
 */
export const asyncRouterMap: RouteRecordRaw[] = [
  {
    path: "/",
    name: "index",
    component: () => import("/@/layouts/index.vue"),
    meta: { title: "主页" },
    redirect: "/workplace",
    children: [
      {
        path: "/workplace",
        name: "workplace",
        meta: {
          title: "工作台",
          icon: LaptopOutlined,
          permission: ["WORKPLACE"],
        },
        component: () => import("/@/view/workplace/index.vue"),
      },
      {
        path: "/project",
        name: "project",
        meta: {
          title: "项目",
          icon: ReadOutlined,
          permission: ["PROJECT"],
        },
        component: () => import("/@/view/project-management/index.vue"),
      },
      {
        path: "/:projectId",
        name: "projectInfo",
        meta: {
          title: "项目信息",
          hidden: true,
          permission: ["PROJECT"],
        },
        component: () => import("/@/view/project/index.vue"),
        children: [
          {
            path: "",
            meta: {
              title: "任务",
              hidden: true,
              permission: ["TASK"],
            },
            component: () => import("/@/view/project/task/index.vue"),
            children: [
              {
                path: "",
                meta: {
                  title: "任务列表",
                  hidden: true,
                  permission: ["TASK"],
                },
                component: () => import("/@/view/project/task/Table.vue"),
              },
            ],
          },
          {
            path: "task",
            meta: {
              title: "任务",
              hidden: true,
              permission: ["TASK"],
            },
            component: () => import("/@/view/project/task/index.vue"),
            children: [
              {
                path: "",
                meta: {
                  title: "任务列表",
                  hidden: true,
                  permission: ["TASK"],
                },
                component: () => import("/@/view/project/task/Table.vue"),
              },
              {
                path: "edit/:taskId",
                meta: {
                  title: "编辑任务",
                  hidden: true,
                  permission: ["TASK"],
                },
                component: () => import("/@/view/project/task/Edit.vue"),
              },
              {
                path: "detail/:taskId",
                meta: {
                  title: "任务详情",
                  hidden: true,
                  permission: ["TASK"],
                },
                component: () => import("/@/view/project/task/Detail.vue"),
              },
            ],
          },
          {
            path: "requirement",
            meta: {
              title: "需求",
              hidden: true,
              permission: ["REQUIREMENT"],
            },
            component: () => import("/@/view/project/requirement/index.vue"),
            children: [
              {
                path: "",
                meta: {
                  title: "需求列表",
                  hidden: true,
                  permission: ["REQUIREMENT"],
                },
                component: () =>
                  import("/@/view/project/requirement/Table.vue"),
              },
              {
                path: "detail/:requirement_id",
                meta: {
                  title: "需求详情",
                  hidden: true,
                  permission: ["REQUIREMENT"],
                },
                component: () =>
                  import("/@/view/project/requirement/Detail.vue"),
              },
              {
                path: "edit/:requirement_id",
                meta: {
                  title: "编辑需求",
                  hidden: true,
                  permission: ["REQUIREMENT"],
                },
                component: () => import("/@/view/project/requirement/Edit.vue"),
              },
            ],
          },
          {
            path: "version",
            meta: {
              title: "迭代",
              hidden: true,
              permission: ["VERSION"],
            },
            component: () => import("/@/view/project/version/index.vue"),
          },
          {
            path: "bug",
            meta: {
              title: "缺陷",
              hidden: true,
              permission: ["BUG"],
            },
            component: () => import("/@/view/project/bug/index.vue"),
            children: [
              {
                path: "",
                meta: {
                  title: "缺陷列表",
                  hidden: true,
                  permission: ["BUG"],
                },
                component: () => import("/@/view/project/bug/Table.vue"),
              },
              {
                path: "edit/:bugId",
                meta: {
                  title: "编辑缺陷",
                  hidden: true,
                  permission: ["BUG"],
                },
                component: () => import("/@/view/project/bug/Edit.vue"),
              },
              {
                path: "detail/:bugId",
                meta: {
                  title: "缺陷详情",
                  hidden: true,
                  permission: ["BUG"],
                },
                component: () => import("/@/view/project/bug/Detail.vue"),
              },
            ],
          },
          {
            path: "storyWall",
            meta: {
              title: "故事墙",
              hidden: true,
              permission: ["STORY_WALL"],
            },
            component: () => import("/@/view/project/story-wall/index.vue"),
          },
          {
            path: "charts",
            meta: {
              title: "报表",
              hidden: true,
              permission: ["CHARTS"],
            },
            component: () => import("/@/view/project/charts/index.vue"),
          },
          {
            path: "setting",
            meta: {
              title: "项目设置",
              hidden: true,
              permission: ["PROJECT_SETTING"],
            },
            component: () => import("/@/view/project/setting/index.vue"),
          },
        ],
      },
      {
        path: "/setting",
        name: "setting",
        meta: {
          title: "系统设置",
          icon: SettingOutlined,
          permission: ["SETTING"],
        },
        component: () => import("/@/components/RouteView/index.vue"),
        children: [
          {
            path: "users",
            name: "usersSetting",
            component: () =>
              import("/@/view/setting/user-management/index.vue"),
            meta: { title: "用户管理", permission: ["SETTING"] },
          },
          {
            path: "roles",
            name: "rolesSetting",
            component: () =>
              import("/@/view/setting/role-management/index.vue"),
            meta: { title: "角色管理", permission: ["SETTING"] },
          },
          {
            path: "authority",
            name: "authoritySetting",
            component: () =>
              import("/@/view/setting/authority-management/index.vue"),
            meta: { title: "权限项管理", permission: ["SETTING"] },
          },
          {
            path: "system-info",
            name: "systemInfoSetting",
            component: () => import("/@/view/setting/system-info/index.vue"),
            meta: {
              title: "系统设置",
              permission: ["SETTING"],
            },
          },
        ],
      },
      {
        path: "/user",
        name: "user",
        meta: {
          title: "用户设置",
          permission: ["BASIC"],
          hidden: true,
        },
        component: () => import("/@/components/RouteView/index.vue"),
        children: [
          {
            path: "setting",
            name: "userSetting",
            component: () => import("/@/view/user/setting.vue"),
            meta: { title: "用户信息", permission: ["BASIC"] },
          },
        ],
      },
      {
        path: "/404",
        name: "404",
        meta: {
          permission: ["BASIC"],
          name: "404页",
          hidden: true,
        },
        component: () => import("/@/view/exception/404.vue"),
      },
      {
        path: "/403",
        name: "403",
        meta: {
          permission: ["BASIC"],
          name: "403页",

          hidden: true,
        },
        component: () => import("/@/view/exception/403.vue"),
      },
      {
        path: "/500",
        name: "500",
        meta: {
          permission: ["BASIC"],
          name: "500页",
          hidden: true,
        },
        component: () => import("/@/view/exception/500.vue"),
      },
    ],
  },
];

/**
 * 基础路由
 */
export const constantRouterMap = [
  {
    path: "/login",
    name: "login",
    component: () => import("/@/view/login/index.vue"),
  },
];
