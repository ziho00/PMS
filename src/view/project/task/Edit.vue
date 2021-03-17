<template>
  <EditPage @confirm="handleConfirm" @cancel="handleCancel">
    <template #header>
      <div class="header-title">{{ title }}</div>
    </template>
    <template #content>
      <div
        :style="{
          padding: '15px 0',
        }"
      >
        <TitleInput
          :style="{ marginBottom: '24px' }"
          v-model:value="taskInfo.title"
        />
        <RichTextEditor
          ref="richEditor"
          v-model:value="taskInfo.desc"
          :options="{ placeholder: '任务描述...' }"
        />
      </div>
    </template>
    <template #extra>
      <a-form
        labelAlign="left"
        ref="form"
        :rules="rules"
        :model="taskInfo"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        :style="{ marginTop: '24px' }"
      >
        <a-form-item label="关联需求" name="requirement">
          <a-input
            :value="taskInfo.requirement"
            placeholder="选择任务关联的需求"
          />
        </a-form-item>
        <a-form-item label="状态" name="status">
          <a-select v-model:value="taskInfo.status">
            <a-select-option
              v-for="item in status"
              :key="item.key"
              :value="item.key"
              >{{ item.label }}</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item label="优先级" name="priority">
          <a-select v-model:value="taskInfo.priority">
            <a-select-option
              v-for="item in priority"
              :key="item.key"
              :value="item.key"
              >{{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="预估工时" name="planWorkload">
          <a-input
            v-model:value="taskInfo.planWorkload"
            placeholder="填写任务预计花费"
            type="number"
            min="0"
          />
        </a-form-item>
        <a-form-item label="负责人" name="handler">
          <a-input
            :value="taskInfo.handler?.username"
            placeholder="选择任务负责人"
          />
        </a-form-item>
        <a-form-item label="计划开始" name="planStartDate">
          <a-date-picker
            v-model:value="taskInfo.planStartDate"
            :disabled-date="disabledStartDate"
            placeholder="选择计划开始日期"
          />
        </a-form-item>
        <a-form-item label="计划结束" name="planEndDate">
          <a-date-picker
            :disabled-date="disabledEndDate"
            v-model:value="taskInfo.planEndDate"
            placeholder="选择计划结束日期"
          />
        </a-form-item>
      </a-form>
    </template>
  </EditPage>
</template>

<script lang="ts">
import { useForm } from "./hooks";
import EditPage from "/@/components/EditPage/index.vue";
import TitleInput from "/@/components/TitleInput/index.vue";
import RichTextEditor from "/@/components/RichTextEditor/index.vue";

export default {
  components: {
    EditPage,
    TitleInput,
    RichTextEditor,
  },
  setup() {
    const {
      status,
      priority,
      title,
      taskInfo,
      rules,
      handleCancel,
      handleConfirm,
      disabledStartDate,
      disabledEndDate,
    } = useForm();

    return {
      status,
      priority,
      title,
      taskInfo,
      handleConfirm,
      handleCancel,
      disabledStartDate,
      disabledEndDate,
      rules,
    };
  },
};
</script>

<style lang="scss" scoped>
.header-title {
  line-height: 50px;
  padding: 0 24px;
  font-size: 16px;
  font-weight: 550;
}
</style>
