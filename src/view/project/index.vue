<template>
  <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    :breadcrumb="{ routes }"
  >
    <div class="header-project-info">
      <a-avatar shape="square" :size="64" :src="projectInfo?.picUrl">{{
        projectInfo?.name
      }}</a-avatar>
      <div class="project-name">{{ projectInfo?.name }}</div>
    </div>
    <template #footer>
      <a-tabs @change="handleChangeTab" :activeKey="activeKey">
        <a-tab-pane v-for="tab in tabs" :key="tab.key" :tab="tab.label" />
      </a-tabs>
    </template>
  </a-page-header>
  <router-view />
</template>

<script lang="ts">
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { api } from "/@/http/api";
import { getPromissionTabs } from "/@/utils";
const routes = [
  {
    path: "/",
    breadcrumbName: "主页",
  },
  {
    path: "/project",
    breadcrumbName: "项目列表",
  },
  {
    path: "/p",
    breadcrumbName: "项目",
  },
];

const _Tabs = [
  {
    label: "任务",
    key: "task",
    promission: ["TASK"],
  },
  {
    label: "需求",
    key: "requirement",
    promission: ["REQUIREMENT"],
  },
  {
    label: "迭代",
    key: "version",
    promission: ["VERSION"],
  },
  {
    label: "缺陷",
    key: "bug",
    promission: ["BUG"],
  },
  {
    label: "故事墙",
    key: "storyWall",
    promission: ["STORY_WALL"],
  },
  {
    label: "报表",
    key: "charts",
    promission: ["CHARTS"],
  },
  {
    label: "项目设置",
    key: "setting",
    promission: ["PROJECT_SETTING"],
  },
];

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const tabs = ref<Array<any>>([]);
    const activeKey = ref<string>("task");
    const projectInfo = ref<object>(null);

    onBeforeMount(async () => {
      const { projectId } = route.params;
      const projectRes = await api.project.getProjectById({
        project_id: projectId,
      });
      projectInfo.value = projectRes.data.data;
      const roleRes = await store.dispatch("GetUserInfo");
      tabs.value = getPromissionTabs(roleRes.data.role.permissions, _Tabs);
    });

    const handleChangeTab = (key) => {
      const { projectId } = route.params;
      activeKey.value = key;
      router.push(`/${projectId}/${key}`);
    };

    return {
      routes,
      projectInfo,
      tabs,
      activeKey,
      handleChangeTab,
    };
  },
};
</script>

<style lang="scss" scoped>
.header-project-info {
  display: flex;
  .project-name {
    margin: 0 0 0 10px;
    font-size: 24px;
    color: var(--title-color);
    line-height: 64px;
  }
}
</style>
