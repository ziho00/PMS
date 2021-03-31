<template>
  <EditPage :footer="false">
    <template #header>
      <div class="header-container">
        <div class="header-title ellipsis">
          {{ title }}
        </div>
        <div class="buttons">
          <a-button type="primary" @click="toEdit">编辑</a-button>
          <a-button @click="goBack">关闭</a-button>
        </div>
      </div>
    </template>
    <template #content>
      <div
        :style="{
          padding: '15px 0',
        }"
      >
        <a-tabs defaultActiveKey="desc">
          <a-tab-pane key="desc" tab="缺陷描述"
            ><div v-html="bug.desc"></div
          ></a-tab-pane>
          <!-- <a-tab-pane key="tasks" tab="关联任务" force-render></a-tab-pane> -->
        </a-tabs>
      </div>
    </template>
    <template #extra>
      <a-form
        labelAlign="left"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        :style="{ marginTop: '24px' }"
      >
        <a-form-item label="关联迭代" name="version">
          {{ bug.version ? bug.version.version_num : "--" }}
        </a-form-item>
        <a-form-item label="状态" name="status">
          <StateTag mode="bug" :value="bug.status" />
        </a-form-item>
        <a-form-item label="优先级" name="priority">
          <PriorityTag mode="bug" :value="bug.priority" />
        </a-form-item>
        <a-form-item label="负责人" name="handler">
          <a-tag>{{ bug.handler ? bug.handler.username : "--" }}</a-tag>
        </a-form-item>
        <a-form-item label="创建人" name="creater">
          <a-tag>{{ bug.creater ? bug.creater.username : "--" }}</a-tag>
        </a-form-item>
        <a-form-item label="创建时间" name="createTime">
          {{ bug.createTime || "--" }}
        </a-form-item>
        <a-form-item label="更新时间" name="updateTime">
          {{ bug.updateTime || "--" }}
        </a-form-item>
      </a-form>
    </template>
  </EditPage>
</template>

<script>
import EditPage from "/@/components/EditPage/index.vue";
import StateTag from "/@/components/StateTag/index.vue";
import PriorityTag from "/@/components/PriorityTag/index.vue";
import { useBug } from "./hooks";

export default {
  components: {
    EditPage,
    StateTag,
    PriorityTag,
  },
  setup() {
    const { title, bug, toEdit, goBack } = useBug();
    return {
      title,
      bug,
      toEdit,
      goBack,
    };
  },
};
</script>

<style></style>
