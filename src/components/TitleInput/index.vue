<template>
  <a-tooltip placement="topLeft" :visible="visible">
    <template #title>
      {{ tips }}
    </template>
    <input
      :class="{ 'z-title-input': true, warn: isWarning }"
      type="text"
      :style="style"
      :value="value"
      @focus="handleFocus"
      @blur="handleBlur"
      :placeholder="placeholder"
      @input="handleInput"
    />
  </a-tooltip>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  name: "TitleInput",
  props: {
    value: {
      type: String,
    },
    placeholder: {
      type: String,
      default: function () {
        return "请输入标题";
      },
    },
    style: {
      type: Object,
    },
  },
  setup(props, ctx) {
    const visible = ref<boolean>(false);
    const isWarning = ref<boolean>(false);
    const tips = ref<string>("");

    const handleFocus = () => {
      visible.value = false;
      isWarning.value = false;
      tips.value = "";
    };

    const handleBlur = (e) => {
      const { value } = e.target;
      if (!value.trim()) {
        tips.value = "标题不能为空";
        isWarning.value = true;
        visible.value = true;
      }
    };

    const handleInput = (e) => {
      ctx.emit("update:value", e.target.value);
    };

    return {
      visible,
      isWarning,
      tips,
      handleBlur,
      handleInput,
      handleFocus,
    };
  },
};
</script>

<style lang="scss" scoped>
.z-title-input {
  outline: none;
  border: none;
  width: 100%;
  padding: 0 8px;
  line-height: 35px;
  font-size: 16px;
  border-bottom: 1px solid var(--border-color);
  transition: all 0.3s;
  &:focus {
    border-bottom: 1px solid var(--primary-color);
  }
  &::-webkit-input-placeholder {
    font-size: 12px;
    color: var(--remark-color);
  }
}
.warn {
  border-bottom: 1px solid var(--danger-color) !important;
}
</style>
