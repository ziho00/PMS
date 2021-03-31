<template>
  <h3>状态流转</h3>
  <div class="state-flow-container">
    <a-form
      layout="horizontal"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 14 }"
      :model="form"
    >
      <a-form-item label="状态">
        <a-select v-model:value="form.state" placeholder="选择下一个状态">
          <a-select-option
            v-for="option in stateOptions"
            :value="option.key"
            :key="option.key"
            >{{ option.label }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item label="负责人">
        <a-input v-model:value="form.handler" />
      </a-form-item>
      <a-form-item label="评论">
        <a-textarea
          v-model:value="form.comment"
          :auto-size="{ minRows: 3, maxRows: 6 }"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click.prevent="handleSubmit">流转</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { reactive } from "vue";
import RichTextEditor from "/@/components/RichTextEditor/index.vue";
export default {
  props: {
    activeState: {
      type: String,
      default: "",
    },
    stateOptions: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  components: {
    RichTextEditor,
  },
  setup(props, ctx) {
    const form = reactive({
      state: props.activeState,
      handler: null,
      comment: "",
    });

    const handleSubmit = () => {
      ctx.emit("onSubmit", form);
    };

    return {
      form,
      handleSubmit,
    };
  },
};
</script>

<style lang="scss">
.state-flow-container {
  max-width: 550px;
}
</style>
