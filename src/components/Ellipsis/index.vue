<template>
  <Tooltip v-if="tooltip && fullLength > length">
    <template #title>{{ str }}</template>
    <span>{{
      cutStrByFullLength(str, length) + (fullLength > length ? "..." : "")
    }}</span>
  </Tooltip>
  <span v-else>
    {{ cutStrByFullLength(str, length) + (fullLength > length ? "..." : "") }}
  </span>
</template>
<script>
import Tooltip from "ant-design-vue/es/tooltip";
import { getCurrentInstance } from "vue";
/**
 * 获取字符串长度，英文字符 长度1，中文字符长度2
 * @param {*} str
 */
const getStrFullLength = (str = "") =>
  str.split("").reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0);
    if (charCode >= 0 && charCode <= 128) {
      return pre + 1;
    }
    return pre + 2;
  }, 0);

/**
 * 截取字符串，根据 maxLength 截取后返回
 * @param {*} str
 * @param {*} maxLength
 */
const cutStrByFullLength = (str = "", maxLength) => {
  let showLength = 0;
  return str.split("").reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0);
    if (charCode >= 0 && charCode <= 128) {
      showLength += 1;
    } else {
      showLength += 2;
    }
    if (showLength <= maxLength) {
      return pre + cur;
    }
    return pre;
  }, "");
};

export default {
  name: "Ellipsis",
  components: {
    Tooltip,
  },
  props: {
    prefixCls: {
      type: String,
      default: "ant-pro-ellipsis",
    },
    tooltip: {
      type: Boolean,
    },
    length: {
      type: Number,
      required: true,
    },
    lines: {
      type: Number,
      default: 1,
    },
    fullWidthRecognition: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const vm = getCurrentInstance();
    const str = vm.slots
      .default()
      .map((vNode) => vNode.children)
      .join("");
    const fullLength = getStrFullLength(str);
    return {
      str,
      getStrFullLength,
      cutStrByFullLength,
      fullLength,
    };
  },
};
</script>
