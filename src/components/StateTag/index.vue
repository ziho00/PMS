<template>
  <a-tag :color="color" :style="style">{{ text }}</a-tag>
</template>

<script lang="ts">
import { onBeforeMount, ref } from "vue";

const COLOR = {
  task: ["default", "blue", "green", "default"],
};

const TEXT = {
  task: ["未开始", "进行中", "已完成", "已关闭"],
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
