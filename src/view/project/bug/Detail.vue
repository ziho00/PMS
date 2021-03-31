<template>
  <EditPage :footer="false">
    <template #header>
      <div class="header-container">
        <div class="header-title ellipsis">
          {{ title }}
        </div>
        <div class="buttons">
          <a-button type="primary" @click="toEdit">编辑</a-button>
          <a-button @click="goBack">关闭</a-button>
        </div>
      </div>
    </template>
    <template #content>
      <div
        :style="{
          padding: '15px 0',
        }"
      >
        <a-tabs defaultActiveKey="desc">
          <a-tab-pane key="desc" tab="缺陷描述"
            ><div v-html="bug.desc"></div
          ></a-tab-pane>
          <!-- <a-tab-pane key="tasks" tab="关联任务" force-render></a-tab-pane> -->
        </a-tabs>
        <Comment
          v-for="item in CommentList"
          :key="item.id"
          :username="item.username"
          :comment="item.comment"
          :time="item.updateTime"
          @onDelete="handleDeleteComment(item)"
          @onEdit="handleEditComment(item)"
        />
        <div style="margin: 10px 0">
          <a-button type="link" @click="handleCreateComment"
            ><PlusOutlined />添加评论</a-button
          >
        </div>
        <a-divider />
        <StateFlow
          :stateOptions="stateOptions"
          @onSubmit="handleStateChange"
          :activeState="'0'"
        />
      </div>
    </template>
    <template #extra>
      <a-form
        labelAlign="left"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        :style="{ marginTop: '24px' }"
      >
        <a-form-item label="关联迭代" name="version">
          {{ bug.version ? bug.version.version_num : "--" }}
        </a-form-item>
        <a-form-item label="状态" name="status">
          <StateTag mode="bug" :value="bug.status" />
        </a-form-item>
        <a-form-item label="优先级" name="priority">
          <PriorityTag mode="bug" :value="bug.priority" />
        </a-form-item>
        <a-form-item label="负责人" name="handler">
          <a-tag>{{ bug.handler ? bug.handler.username : "--" }}</a-tag>
        </a-form-item>
        <a-form-item label="创建人" name="creater">
          <a-tag>{{ bug.creater ? bug.creater.username : "--" }}</a-tag>
        </a-form-item>
        <a-form-item label="创建时间" name="createTime">
          {{ bug.createTime || "--" }}
        </a-form-item>
        <a-form-item label="更新时间" name="updateTime">
          {{ bug.updateTime || "--" }}
        </a-form-item>
      </a-form>
    </template>
  </EditPage>
  <a-modal
    v-model:visible="visible"
    :title="isEdit ? '编辑评论' : '添加评论'"
    width="500px"
    @ok="handleSubmitComment"
    @cancel="handleCancelComment"
  >
    <RichTextEditor ref="richEditor" v-model:value="comment" :height="300" />
  </a-modal>
</template>

<script>
import { getCurrentInstance, ref } from "vue";
import EditPage from "/@/components/EditPage/index.vue";
import StateTag from "/@/components/StateTag/index.vue";
import PriorityTag from "/@/components/PriorityTag/index.vue";
import { useBug } from "./hooks";
import Comment from "/@/components/Comment/index.vue";
import RichTextEditor from "/@/components/RichTextEditor/index.vue";
import StateFlow from "/@/components/StateFlow/index.vue";
import { PlusOutlined } from "@ant-design/icons-vue";
export default {
  components: {
    EditPage,
    StateTag,
    PriorityTag,
    Comment,
    RichTextEditor,
    StateFlow,
    PlusOutlined,
  },
  setup(props, ctx) {
    const vm = getCurrentInstance();
    const { title, bug, toEdit, goBack, stateOptions } = useBug();

    const visible = ref(false);
    const isEdit = ref(false);
    const commemtList = ref([]);
    const comment = ref("");

    /** 删除评论 */
    const handleDeleteComment = () => {
      console.log("delete comment");
    };

    /** 编辑评论 */
    const handleEditComment = () => {
      comment.value = "<p>还行吧</p>";
      visible.value = true;
      isEdit.value = true;
    };

    /** 创建评论 */
    const handleCreateComment = () => {
      visible.value = true;
      isEdit.value = false;
    };

    /** 提交 编辑/创建  评论*/
    const handleSubmitComment = () => {
      const content = vm.refs.richEditor.content;
      console.log(content);
    };

    /** 取消操作  */
    const handleCancelComment = () => {
      visible.value = false;
      comment.value = "";
      vm.refs.richEditor.editor?.txt.html("");
    };

    /** 状态流转提交 */
    const handleStateChange = (formData) => {
      console.log(formData);
    };

    return {
      title,
      bug,
      toEdit,
      goBack,
      visible,
      isEdit,
      stateOptions,
      commemtList,
      comment,
      handleDeleteComment,
      handleEditComment,
      handleCreateComment,
      handleSubmitComment,
      handleCancelComment,
      handleStateChange,
    };
  },
};
</script>

<style></style>
