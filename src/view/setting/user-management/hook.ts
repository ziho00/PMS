import { reactive, ref } from "vue";
import { api } from "/@/http/api";

/**
 * QueryForm 相关的状态及事件
 *
 */
function useQueryForm() {
  const queryLoading = reactive({ search: false, reset: false });
  const queryFormData = reactive({ roles: [], username: "", phone: "" });

  // 查询项目
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
    queryFormData.username = "";
    queryFormData.phone = "";
    queryFormData.roles = [];
    console.log(queryFormData);
    setTimeout(() => {
      queryLoading.reset = false;
    }, 1000);
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
    handleSearch,
    handleReset,
    toggleShowMore,
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
  const handleTableChange = () => {
    console.log(queryFormData, pagination);
  };

  return {
    columns,
    dataSource,
    pagination,
    loading,
    handleTableChange,
  };
}

/**
 * 编辑 Modal 相关状态及事件
 *
 */
function useModal() {
  const roles = ref<Array<any>>([]);
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

  // 获取角色信息
  const getRoles = async () => {
    selectorLoading.value = true;
    const res = await api.roleManagement.getRoles();
    roles.value = res.data.data;
    selectorLoading.value = false;
  };

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
    roles,
    getRoles,
    userInfo,
    visible,
    confirmLoading,
    handleSubmit,
    selectorLoading,
    handleChangeSelector,
  };
}

export { useModal, useQueryForm, useTable };
