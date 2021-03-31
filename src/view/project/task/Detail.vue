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
          <a-tab-pane key="desc" tab="任务描述"
            ><div v-html="taskInfo.desc"></div
          ></a-tab-pane>
          <a-tab-pane key="workload" tab="花费详情" force-render>
            <Workload />
          </a-tab-pane>
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
        <a-form-item label="关联需求" name="requirement">
          {{ taskInfo.requierment || "--" }}
        </a-form-item>
        <a-form-item label="状态" name="status">
          <StateTag mode="task" :value="taskInfo.status" />
        </a-form-item>
        <a-form-item label="优先级" name="priority">
          <PriorityTag mode="task" :value="taskInfo.priority" />
        </a-form-item>
        <a-form-item label="预估工时" name="planWorkload"
          >{{ taskInfo.planWorkload || "--" }} (小时)</a-form-item
        >
        <a-form-item label="花费" name="planWorkload"
          >{{ taskInfo.workload || "--" }} (小时)</a-form-item
        >
        <a-form-item label="负责人" name="handler">
          <a-tag>{{
            taskInfo.handler ? taskInfo.handler.username : "--"
          }}</a-tag>
        </a-form-item>
        <a-form-item label="计划开始" name="planStartDate">
          {{ taskInfo.planStartDate || "--" }}
        </a-form-item>
        <a-form-item label="计划结束" name="planEndDate">
          {{ taskInfo.planEndDate || "--" }}
        </a-form-item>
      </a-form>
    </template>
  </EditPage>
</template>

<script lang="ts">
import EditPage from "/@/components/EditPage/index.vue";
import { useTask } from "./hooks";
import StateTag from "/@/components/StateTag/index.vue";
import PriorityTag from "/@/components/PriorityTag/index.vue";
import Workload from "./detail_workload.vue";
export default {
  components: {
    EditPage,
    StateTag,
    PriorityTag,
    Workload,
  },
  setup() {
    const { title, taskInfo, toEdit, goBack } = useTask();
    return {
      title,
      taskInfo,
      toEdit,
      goBack,
    };
  },
};
</script>

<style lang="scss"></style>
