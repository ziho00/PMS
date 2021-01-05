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
        component: () => import("/@/view/project-management/index.vue"),
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
    hidden: true,
  },
  {
    path: "/404",
    name: "404",
    hidden: true,
    component: () => import("/@/view/exception/404.vue"),
  },
  {
    path: "/403",
    name: "403",
    hidden: true,
    component: () => import("/@/view/exception/403.vue"),
  },
  {
    path: "/500",
    name: "500",
    hidden: true,
    component: () => import("/@/view/exception/500.vue"),
  },
];
