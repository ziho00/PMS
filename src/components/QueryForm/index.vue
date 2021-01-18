<template>
  <a-row class="z-queryForm" :gutter="24">
    <slot></slot>
    <slot name="more" :show="showMore"></slot>
    <a-col :md="6" :sm="24">
      <div :style="{ padding: '15px 0' }">
        <a-button :loading="searching" type="primary" @click="onSearch"
          >查询</a-button
        >
        <a-button
          :loading="reseting"
          :style="{ marginLeft: '15px' }"
          @click="onReset"
          >重置</a-button
        >
        <a-button v-if="more" type="link" @click="toggleShowMore">
          {{ showMore ? "收起" : "展开" }}
          <DownOutlined v-show="!showMore" />
          <UpOutlined v-show="showMore"
        /></a-button>
      </div>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { getCurrentInstance, ref } from "vue";
import { DownOutlined, UpOutlined } from "@ant-design/icons-vue";
export default {
  name: "ZQueryFrom",
  components: {
    DownOutlined,
    UpOutlined,
  },
  props: {
    model: {
      type: Object,
      isRequire: true,
    },
    searching: {
      type: Boolean,
      default: false,
    },
    reseting: {
      type: Boolean,
      default: false,
    },
    more: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const vm = getCurrentInstance();
    const showMore = ref<boolean>(false);

    const onSearch = () => {
      vm.emit("onSearch", props.model);
    };

    const onReset = () => {
      vm.emit("onReset");
    };

    const toggleShowMore = () => {
      showMore.value = !showMore.value;
      vm.emit("toggleShowMore", showMore.value);
    };

    return {
      onSearch,
      onReset,
      showMore,
      toggleShowMore,
    };
  },
};
</script>

<style lang="scss" scoped>
.z-queryForm {
}
</style>
