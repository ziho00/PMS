<template>
  <a-col class="form-item" :md="9" :sm="24">
    <a-row v-if="label">
      <a-col :span="4" class="form-item-label">
        <span>{{ label }}:</span>
      </a-col>
      <a-col :span="20">
        <slot></slot>
      </a-col>
    </a-row>
    <a-row v-else>
      <a-col :span="24">
        <slot></slot>
      </a-col>
    </a-row>
  </a-col>
</template>

<script>
export default {
  name: "ZQueryFormItem",
  props: {
    label: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.form-item {
  margin: 15px 0;
}
.form-item-label {
  line-height: 32px;
  padding-right: 15px;
  width: auto;
  text-align: right;
}
</style>
