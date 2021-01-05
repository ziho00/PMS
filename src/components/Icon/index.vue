<template>
  <Icon
    v-if="icon"
    :component="icon"
    :style="style"
    :spin="spin"
    :rotate="rotate"
    :twoToneColor="twoToneColor"
  />
</template>

<script>
import Icon from "@ant-design/icons-vue";
export default {
  props: {
    icon: {
      type: Function,
      requied: true,
    },
    style: {
      type: Object,
    },
    spin: {
      type: Boolean,
      default: false,
    },
    rotate: {
      type: Number,
    },
    twoToneColor: {
      type: String,
    },
  },
  components: {
    Icon,
  },
};
</script>
