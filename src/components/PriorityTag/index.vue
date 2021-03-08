<template>
  <a-tag :color="color" :style="style">{{ text }}</a-tag>
</template>

<script lang="ts">
import { onBeforeMount, ref } from "vue";

const COLOR = {
  task: ["#d9d9d9", "#87d068", "#f50", "#f5222d"],
  bug: ["#d9d9d9", "#87d068", "#f50", "#f5222d"],
};

const TEXT = {
  task: ["低", "中", "高", "紧急"],
  bug: ["低", "中", "高", "紧急"],
};

export default {
  name: "ProprotyTag",
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
    const text = ref<string>("低");

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
