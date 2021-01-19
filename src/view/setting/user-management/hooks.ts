import { reactive, ref } from "vue";
import { api } from "/@/http/api";

/**
 * QueryForm 相关的状态及事件
 *
 */
function useQueryForm() {
  const queryLoading = reactive({ search: false, reset: false });
  const queryFormData = reactive({ roles: [], username: "", phone: "" });

  const handleChangeSelectRoles = (value, option) => {
    queryFormData.roles = value;
  };

  // 切换 queryForm 的展开/收拾状态
  const toggleShowMore = (show: boolean) => {
    if (!show) {
      queryFormData.roles = [];
    }
  };

  return {
    queryLoading,
    queryFormData,
    toggleShowMore,
    handleChangeSelectRoles,
  };
}

/**
 * 用户 Table 相关状态和事件
 *
 * @param queryFormData
 */
function useTable(queryFormData) {
  const columns = [
    {
      title: "#",
      dataIndex: "user_id",
      key: "user_id",
      fixed: "left",
      width: 120,
    },
    {
      title: "用户名",
      dataIndex: "username",
      key: "username",
      fixed: "left",
      width: 200,
    },
    {
      title: "头像",
      dataIndex: "avatarUrl",
      key: "avatarUrl",
      slots: { customRender: "avatar" },
      fixed: "left",
      width: 150,
    },
    {
      title: "岗位/角色",
      dataIndex: "role",
      key: "role",
      slots: { customRender: "role" },
    },
    {
      title: "手机号码",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "邮箱地址",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
    },
    {
      title: "注册时间",
      dataIndex: "createTime",
      key: "createTime",
    },
    {
      title: "操作",
      dataIndex: "operation",
      slots: { customRender: "operation" },
    },
  ];

  const loading = ref<boolean>(false);
  const dataSource = ref<Array<any>>([]);
  const pagination = reactive({
    current: 1,
    pageSize: 10,
    defaultPageSize: 10,
    total: 0,
    showSizeChanger: true,
  });

  // 页码器变更
  const handleTableChange = (pager) => {
    pagination.current = pager.current;
    pagination.pageSize = pager.pageSize;
    refresh();
  };

  // 刷新 Table
  const refresh = async (isToFirstPage?: boolean) => {
    console.log(queryFormData, pagination);
    if (isToFirstPage) {
      pagination.current = 1;
    }
    const res = await api.userManagement.getUsers();
    pagination.total = res.data.total;
    dataSource.value = res.data.data;
  };

  return {
    columns,
    dataSource,
    pagination,
    loading,
    handleTableChange,
    refresh,
  };
}

/**
 * 编辑 Modal 相关状态及事件
 *
 */
function useModal(roles) {
  const visible = ref<boolean>(false);
  const confirmLoading = ref<boolean>(false);
  const selectorLoading = ref<boolean>(false);
  const userInfo = reactive({
    user_id: "",
    username: "",
    phone: "",
    email: "",
    avatarUrl: "",
    role: null,
  });

  // 提交编辑
  const handleSubmit = () => {
    console.log(userInfo);
  };

  // Selector 变更选择项时触发
  const handleChangeSelector = (value) => {
    roles.value.every((role) => {
      if (role?.role_id === value) {
        userInfo.role.role_id = value;
        userInfo.role.role_name = role.role_name;
      }
      return true;
    });
  };

  return {
    userInfo,
    visible,
    confirmLoading,
    selectorLoading,
    handleSubmit,
    handleChangeSelector,
  };
}

export { useModal, useQueryForm, useTable };
