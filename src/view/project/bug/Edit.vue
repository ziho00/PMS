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
import { useRoute, useRouter } from "vue-router";
import { reactive, ref, onBeforeMount, getCurrentInstance, VNode } from "vue";
import EditPage from "/@/components/EditPage/index.vue";
import TitleInput from "/@/components/TitleInput/index.vue";
import RichTextEditor from "/@/components/RichTextEditor/index.vue";
import { useVersion } from "./hooks";
import { api } from "/@/http/api";
const status = [
  {
    label: "开发确认",
    key: "0",
  },
  {
    label: "进行中",
    key: "1",
  },
  {
    label: "已关闭",
    key: "2",
  },
  {
    label: "已修复",
    key: "3",
  },
];

const priority = [
  {
    label: "低",
    key: "0",
  },
  {
    label: "中",
    key: "1",
  },
  {
    label: "高",
    key: "2",
  },
  {
    label: "紧急",
    key: "3",
  },
];

export default {
  components: {
    EditPage,
    TitleInput,
    RichTextEditor,
  },
  setup() {
    const vm = getCurrentInstance();
    const route = useRoute();
    const router = useRouter();

    const title = ref<string>("");
    const bugInfo = reactive({
      title: "",
      desc: "",
      requirement: null,
      status: "0",
      priority: "0",
      handler: null,
      version_id: "",
      module: "",
    });
    const { projectId } = route.params;
    const { versionOptions } = useVersion(projectId);

    onBeforeMount(async () => {
      const { bugId } = route.params;
      if (bugId === "create") {
        title.value = "创建缺陷";
      } else {
        title.value = `编辑缺陷【ID:${bugId}】`;
        const res = await api.bug.getBugById({ bug_id: bugId });
        Object.keys(bugInfo).map((key) => {
          bugInfo[key] = res.data[key];
        });
      }
    });

    // 确认回调
    const handleConfirm = () => {
      const desc: any = (vm.refs.richEditor as any).content;
      (vm.refs.form as any).validate();
      bugInfo.desc = desc;
      console.log(bugInfo);
    };

    // 取消回调
    const handleCancel = () => {
      router.back();
    };

    const rules = {
      handler: [
        {
          required: true,
          message: "请选择处理人",
          trigger: "change",
          type: "object",
        },
      ],
    };

    return {
      status,
      priority,
      title,
      versionOptions,
      bugInfo,
      handleConfirm,
      handleCancel,
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
