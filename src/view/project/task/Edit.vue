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
        <TitleInput v-model:value="taskInfo.title" />
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
import { useRoute, useRouter } from "vue-router";
import { reactive, ref, onBeforeMount, getCurrentInstance } from "vue";
import EditPage from "/@/components/EditPage/index.vue";
import TitleInput from "/@/components/TitleInput/index.vue";
import moment from "moment";
import { api } from "/@/http/api";
const status = [
  {
    label: "未开始",
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
    label: "已结束",
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
  },
  setup() {
    const vm = getCurrentInstance();
    const route = useRoute();
    const router = useRouter();

    const title = ref<string>("");
    const taskInfo = reactive({
      title: "",
      desc: "",
      requirement: null,
      status: "0",
      priority: "0",
      planWorkload: null,
      planStartDate: null,
      planEndDate: null,
      handler: null,
    });

    onBeforeMount(async () => {
      const { taskId } = route.params;
      if (taskId === "create") {
        title.value = "创建任务";
      } else {
        title.value = `编辑任务【ID:${taskId}】`;
        const res = await api.task.getTaskById({ task_id: taskId });
        Object.keys(taskInfo).map((key) => {
          taskInfo[key] = res.data[key];
        });
        console.log(taskInfo);
      }
    });

    // 确认回调
    const handleConfirm = () => {
      console.log(taskInfo);
      (vm.refs.form as any).validate();
    };

    // 取消回调
    const handleCancel = () => {
      router.back();
    };

    // 预计开始日期的不可选区域
    const disabledStartDate = (current) => {
      return (
        current &&
        taskInfo.planEndDate &&
        current > taskInfo.planEndDate.endOf("day")
      );
    };

    // 预计结束日期的不可选区域
    const disabledEndDate = (current) => {
      return (
        current &&
        taskInfo.planStartDate &&
        current < taskInfo.planStartDate.day(0).endOf("day")
      );
    };

    const rules = {
      planWorkload: [
        {
          required: true,
          message: "请填写预计花费工时",
          trigger: "blur",
        },
      ],
      handler: [
        {
          required: true,
          message: "请选择处理人",
          trigger: "change",
          type: "object",
        },
      ],
      planStartDate: [
        {
          required: true,
          message: "请选择计划开始日期",
          trigger: "change",
          type: "object",
        },
      ],
      planEndDate: [
        {
          required: true,
          message: "请选择计划结束日期",
          trigger: "change",
          type: "object",
        },
      ],
    };

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
