<template>
  <a-button type="dashed" style="width: 100%" @click="handleAdd"
    ><PlusOutlined /> 添加</a-button
  >
  <a-list item-layout="horizontal" :data-source="dataSource">
    <template #renderItem="{ item }">
      <a-list-item>
        <template #actions>
          <a @click="handleEdit(item)">编辑</a>
          <a-popconfirm
            title="确认删除？"
            ok-text="是"
            cancel-text="否"
            @confirm="handleDelete(item)"
          >
            <a>删除</a>
          </a-popconfirm>
        </template>
        <a-list-item-meta :description="item.desc">
          <template #title>
            <a href="https://www.antdv.com/">{{ item.name }}</a>
          </template>
        </a-list-item-meta>
        <div class="list-content-item">{{ item.workload }} (工时)</div>
        <div class="list-content-item">{{ item.updateTime }}</div>
      </a-list-item>
    </template>
  </a-list>
  <!-- 创建/编辑 Form -->
  <a-modal
    :title="isEdit ? `编辑花费【${workloadInfo.workload_id}】` : '填写花费'"
    width="500px"
    v-model:visible="visible"
    @ok="handleSubmit"
  >
    <a-form
      ref="roleForm"
      :rules="rules"
      :model="workloadInfo"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-item label="花费工时" name="workload">
        <a-input
          type="number"
          v-model:value="workloadInfo.workload"
          placeholder="花费"
        />
      </a-form-item>
      <a-form-item label="花费描述" name="desc">
        <a-textarea
          v-model:value="workloadInfo.desc"
          placeholder="描述..."
          :rows="4"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { PlusOutlined } from "@ant-design/icons-vue";
import { useWrokload } from "./hooks";
export default {
  components: {
    PlusOutlined,
  },
  setup() {
    const {
      dataSource,
      handleAdd,
      handleEdit,
      handleDelete,
      isEdit,
      visible,
      workloadInfo,
    } = useWrokload();

    return {
      dataSource,
      handleAdd,
      handleEdit,
      handleDelete,
      isEdit,
      visible,
      workloadInfo,
    };
  },
};
</script>

<style>
.list-content-item {
  margin-left: 35px;
}
</style>
