<template>
  <a-tag :color="color" :style="style">{{ text }}</a-tag>
</template>

<script lang="ts">
import { onBeforeMount, ref } from "vue";

const COLOR = {
  task: ["default", "blue", "green", "default"],
  bug: ["green", "green", "default", "default"],
  requirement: ["blue", "green", "green", "default", "default"],
};

const TEXT = {
  task: ["未开始", "进行中", "已完成", "已关闭"],
  bug: ["开发确认", "进行中", "已关闭", "已修复"],
  requirement: ["待评审", "开发确认", "开发中", "已实现", "已关闭"],
};

export default {
  name: "StateTag",
  props: {
    mode: {
      type: String,
      default: "task",
    },
    value: {
      type: String || Number,
      default: 0,
    },
    style: {
      type: Object,
    },
  },
  setup(props) {
    const color = ref<string>("#d9d9d9");
    const text = ref<string>("未开始");

    onBeforeMount(() => {
      color.value = COLOR[props.mode][props.value];
      text.value = TEXT[props.mode][props.value];
    });

    return {
      color,
      text,
    };
  },
};
</script>

<style></style>
