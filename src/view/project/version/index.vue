<template>
  <a-card class="page-card">
    <!-- query form -->
    <z-query-form
      :model="queryFormData"
      @onSearch="handleSearch"
      @onReset="handleReset"
      :searching="queryLoading.search"
      :reseting="queryLoading.reset"
    >
      <z-query-form-item label="版本号">
        <a-input
          v-model:value="queryFormData.Version"
          placeholder="版本号关键字"
        />
      </z-query-form-item>
    </z-query-form>

    <!-- create & delete operator -->
    <div class="table-operator">
      <a-button @click="handleCreateItem" type="primary"
        ><PlusOutlined /> 创建</a-button
      >
      <a-button
        @click="handleDeleteItems"
        :style="{ marginLeft: '24px' }"
        type="danger"
      >
        删除</a-button
      >
    </div>

    <!-- table -->
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="pagination"
      :loading="loading"
      rowKey="version_id"
      @change="handleTableChange"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
    >
      <template #operation="{ record }">
        <a-button type="link" size="small" @click="handleEdit(record)"
          >编辑</a-button
        >
        <span style="color: var(--remark-color)">|</span>
        <a-popconfirm
          title="确认删除？"
          ok-text="是"
          cancel-text="否"
          @confirm="handleDeleteItem(record)"
        >
          <a-button type="link" size="small"> 删除 </a-button>
        </a-popconfirm>
      </template>
    </a-table>
  </a-card>

  <!-- 创建/编辑 Form -->
  <a-modal
    :title="isEdit ? `编辑迭代【${version.version_id}】` : '创建迭代'"
    width="500px"
    v-model:visible="visible"
    :confirm-loading="confirmLoading"
    @ok="handleSubmit"
  >
    <a-form
      ref="roleForm"
      :rules="rules"
      :model="version"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-item v-if="isEdit" label="ID" name="role_id">
        <a-input v-model:value="version.version_id" disabled />
      </a-form-item>
      <a-form-item label="版本号" name="version_num">
        <a-input v-model:value="version.version_num" placeholder="版本号" />
      </a-form-item>
      <a-form-item label="计划日期" name="planDate">
        <a-range-picker v-model:value="version.planDate" />
      </a-form-item>
      <a-form-item label="目标" name="order">
        <a-textarea
          v-model:value="version.desc"
          placeholder="迭代目标..."
          :rows="4"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { onBeforeMount, createVNode, ref } from "vue";
import { Modal } from "ant-design-vue";
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
import ZQueryForm from "/@/components/QueryForm/index.vue";
import ZQueryFormItem from "/@/components/QueryForm/QueryFormItem.vue";
import { useForm, useTable, useQueryForm, useModal } from "./hooks";
import moment from "moment";
export default {
  name: "Version",
  components: {
    ZQueryForm,
    ZQueryFormItem,
    PlusOutlined,
  },
  setup() {
    const { queryLoading, queryFormData } = useQueryForm();

    const {
      columns,
      dataSource,
      loading,
      pagination,
      selectedRowKeys,
      onSelectChange,
      handleTableChange,
      refresh,
    } = useTable(queryFormData);

    const {
      visible,
      confirmLoading,
      selectorLoading,
      version,
      isEdit,
      handleSubmit,
    } = useModal();

    const { rules } = useForm();

    onBeforeMount(async () => {
      await refresh();
    });

    // 查询迭代
    const handleSearch = (formData) => {
      queryLoading.search = true;
      console.log(formData);
      setTimeout(() => {
        queryLoading.search = false;
      }, 1000);
    };

    // 重置搜索表单数据
    const handleReset = () => {
      queryLoading.reset = true;
      queryFormData.name = "";
      console.log(queryFormData);
      setTimeout(() => {
        queryLoading.reset = false;
      }, 1000);
    };

    // 创建
    const handleCreateItem = () => {
      Object.keys(version).map((key) => {
        version[key] = "";
      });
      isEdit.value = false;
      visible.value = true;
    };

    // 批量删除
    const handleDeleteItems = () => {
      Modal.confirm({
        title: "确定删除选中的权限项?",
        icon: createVNode(ExclamationCircleOutlined),
        onOk: async () => {
          console.log(selectedRowKeys.value);
        },
      });
    };

    // 单独删除
    const handleDeleteItem = (record) => {
      console.log(record);
      // todo
    };

    // 点击编辑
    const handleEdit = (record) => {
      isEdit.value = true;
      Object.keys(version).map((key) => {
        if (key === "planDate") {
          version[key] = [
            moment(record["planStartDate"]),
            moment(record["planEndDate"]),
          ];
        } else {
          version[key] = record[key];
        }
      });
      visible.value = true;
    };

    return {
      queryLoading,
      queryFormData,
      columns,
      dataSource,
      loading,
      pagination,
      selectedRowKeys,
      onSelectChange,
      handleTableChange,
      refresh,
      visible,
      confirmLoading,
      selectorLoading,
      version,
      isEdit,
      handleSubmit,
      rules,
      handleSearch,
      handleReset,
      handleCreateItem,
      handleDeleteItems,
      handleDeleteItem,
      handleEdit,
    };
  },
};
</script>

<style lang="scss" scoped></style>
