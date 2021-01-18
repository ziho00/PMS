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
          permission: ["workplace"],
        },
        component: () => import("/@/view/workplace/index.vue"),
      },
      {
        path: "/project",
        name: "project",
        meta: {
          title: "项目",
          icon: ReadOutlined,
          permission: ["project"],
        },
        component: () => import("/@/view/project-management/list.vue"),
      },
      {
        path: "/setting",
        name: "setting",
        meta: {
          title: "系统设置",
          icon: SettingOutlined,
          permission: ["setting"],
        },
        component: () => import("/@/components/RouteView/index.vue"),
        children: [
          {
            path: "users",
            name: "usersSetting",
            component: () =>
              import("/@/view/setting/user-management/index.vue"),
            meta: { title: "用户管理", permission: ["setting"] },
          },
          {
            path: "roles",
            name: "rolesSetting",
            component: () =>
              import("/@/view/setting/role-management/index.vue"),
            meta: { title: "角色管理", permission: ["setting"] },
          },
          {
            path: "authority",
            name: "authoritySetting",
            component: () =>
              import("/@/view/setting/authority-management/index.vue"),
            meta: { title: "权限项管理", permission: ["setting"] },
          },
          {
            path: "system-info",
            name: "systemInfoSetting",
            component: () => import("/@/view/setting/system-info/index.vue"),
            meta: {
              title: "系统设置",
              permission: ["setting"],
            },
          },
        ],
      },
      {
        path: "/user",
        name: "user",
        meta: {
          title: "用户设置",
          permission: ["basic"],
          hidden: true,
        },
        component: () => import("/@/components/RouteView/index.vue"),
        children: [
          {
            path: "setting",
            name: "userSetting",
            component: () => import("/@/view/user/setting.vue"),
            meta: { title: "用户信息", permission: ["basic"] },
          },
        ],
      },
      {
        path: "/404",
        name: "404",
        meta: {
          permission: ["basic"],
          name: "404页",
          hidden: true,
        },
        component: () => import("/@/view/exception/404.vue"),
      },
      {
        path: "/403",
        name: "403",
        meta: {
          permission: ["basic"],
          name: "403页",

          hidden: true,
        },
        component: () => import("/@/view/exception/403.vue"),
      },
      {
        path: "/500",
        name: "500",
        meta: {
          permission: ["basic"],
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
