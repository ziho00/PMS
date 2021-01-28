<template>
  <a-card :style="{ margin: '24px 24px 0 24px' }" :bodyStyle="{ padding: '0' }">
    <div class="header" v-if="header">
      <slot name="header"></slot>
    </div>
    <div class="main">
      <div class="left">
        <slot name="content"></slot>
      </div>
      <div class="line"></div>
      <div class="right">
        <slot name="extra"></slot>
      </div>
    </div>
    <div class="footer" v-if="header">
      <div :style="{ float: 'right' }">
        <a-button @click="cancel">{{ cancelText }}</a-button>
        <a-button
          type="primary"
          :style="{ marginLeft: '15px' }"
          @click="confirm"
        >
          {{ okText }}
        </a-button>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts">
import { getCurrentInstance } from "vue";

export default {
  name: "EditPage",
  props: {
    header: {
      type: Boolean,
      default: true,
    },
    footer: {
      type: Boolean,
      default: true,
    },
    okText: {
      type: String,
      default: "确认",
    },
    cancelText: {
      type: String,
      default: "取消",
    },
  },
  setup() {
    const vm = getCurrentInstance();

    // 取消
    const cancel = () => {
      vm.emit("cancel");
    };

    // 确认
    const confirm = () => {
      vm.emit("confirm");
    };

    return {
      cancel,
      confirm,
    };
  },
};
</script>

<style lang="scss" scoped>
.ant-card-body {
  padding: 0;
  zoom: 1;
}
.header {
  box-sizing: border-box;
  border-bottom: 1px solid var(--border-color);
  height: 50px;
}
.footer {
  box-sizing: border-box;
  border-top: 1px solid var(--border-color);
  height: 50px;
  padding: 9px 24px;
}
.main {
  overflow: hidden;
  .left {
    box-sizing: border-box;
    float: left;
    padding: 0 24px;
    width: calc(100% - 350px);
  }
  .line {
    box-sizing: border-box;
    position: absolute;
    top: 50px;
    right: 350px;
    bottom: 50px;
    width: 1px;
    background: var(--border-color);
    width: 1;
  }
  .right {
    box-sizing: border-box;
    width: 350px;
    height: 100%;
    float: right;
    padding: 0 24px;
  }
}
</style>
