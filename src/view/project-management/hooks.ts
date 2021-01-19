import { ref, reactive, getCurrentInstance } from "vue";
import moment from "moment";

/**
 * QueryForm 相关状态及事件
 *
 */
function useQueryForm() {
  const queryFormData = reactive({ projectName: "", createUserName: "" });
  const queryLoading = reactive({ search: false, reset: false });

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
    queryFormData.projectName = "";
    queryFormData.createUserName = "";
    console.log(queryFormData);
    setTimeout(() => {
      queryLoading.reset = false;
    }, 1000);
  };

  return {
    queryFormData,
    handleSearch,
    handleReset,
    queryLoading,
  };
}

/**
 * 创建项目 Modal 相关状态及事件
 *
 */
function useModal() {
  const vm = getCurrentInstance();
  const visible = ref<boolean>(false);
  const confirmLoading = ref<boolean>(false);

  return {
    visible,
    confirmLoading,
  };
}

/**
 * 创建项目表单相关状态及事件
 *
 */
function useForm() {
  const projectInfo = reactive({
    logoFile: null,
    logoUrl: "",
    name: "",
    desc: "",
    planDate: [],
  });

  const uploading = ref<boolean>(false);

  // 不可选日期
  const disabledDate = (current) => {
    return current && current <= moment().endOf("day");
  };

  //
  const handleChange = (info) => {
    console.log(info);
  };

  // 项目 LOGO 上传事件
  const beforeUpload = (file) => {
    console.log(file);
  };

  const checkDate = async (rule, value) => {
    if (value.length >> 0 === 0) {
      return Promise.reject("请选择项目计划日期");
    } else {
      return Promise.resolve();
    }
  };

  const rules = {
    name: [
      {
        required: true,
        message: "请输入项目名称",
        trigger: "blur",
      },
      {
        min: 3,
        max: 32,
        message: "长度应在3到32之间",
        trigger: "blur",
      },
    ],
    planDate: [{ validator: checkDate, trigger: "blur" }],
  };

  return {
    rules,
    projectInfo,
    beforeUpload,
    handleChange,
    disabledDate,
    uploading,
    moment,
  };
}

export { useModal, useQueryForm, useForm };
