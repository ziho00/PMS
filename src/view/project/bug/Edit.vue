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
          v-model:value="bugInfo.title"
        />
        <RichTextEditor
          ref="richEditor"
          v-model:value="bugInfo.desc"
          :options="{ placeholder: '任务描述...' }"
        />
      </div>
    </template>
    <template #extra>
      <a-form
        labelAlign="left"
        ref="form"
        :rules="rules"
        :model="bugInfo"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        :style="{ marginTop: '24px' }"
      >
        <a-form-item label="发现版本" name="version">
          <a-select v-model:value="bugInfo.version_id">
            <a-select-option
              v-for="item in versionOptions"
              :key="item.key"
              :value="item.key"
              >{{ item.label }}</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item label="功能模块" name="module">
          <a-input
            v-model:value="bugInfo.module"
            placeholder="发现缺陷的功能模块"
          />
        </a-form-item>
        <a-form-item label="状态" name="status">
          <a-select v-model:value="bugInfo.status">
            <a-select-option
              v-for="item in status"
              :key="item.key"
              :value="item.key"
              >{{ item.label }}</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item label="优先级" name="priority">
          <a-select v-model:value="bugInfo.priority">
            <a-select-option
              v-for="item in priority"
              :key="item.key"
              :value="item.key"
              >{{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="负责人" name="handler">
          <a-input
            :value="bugInfo.handler?.username"
            placeholder="选择任务负责人"
          />
        </a-form-item>
      </a-form>
    </template>
  </EditPage>
</template>

<script lang="ts">
import EditPage from "/@/components/EditPage/index.vue";
import TitleInput from "/@/components/TitleInput/index.vue";
import RichTextEditor from "/@/components/RichTextEditor/index.vue";
import { useForm } from "./hooks";

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
      rules,
      bugInfo,
      versionOptions,
      handleConfirm,
      handleCancel,
    } = useForm();

    return {
      status,
      priority,
      title,
      rules,
      bugInfo,
      versionOptions,
      handleConfirm,
      handleCancel,
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
