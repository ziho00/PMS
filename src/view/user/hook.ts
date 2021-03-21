import { ref, reactive, getCurrentInstance, UnwrapRef, Ref } from "vue";
import { api } from "/@/http/api";
import { message } from "ant-design-vue";
interface FormState {
  name: string;
  password?: string;
  checkPassword?: string;
  phone?: string;
  email?: string;
  avatarUrl?: string;
}

export interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  url?: string;
  type?: string;
  size: number;
  originFileObj: any;
}

export interface FileInfo {
  file: FileItem;
  fileList: FileItem[];
}

function useForm() {
  const vm = getCurrentInstance();

  const formState: UnwrapRef<FormState> = reactive({
    name: "",
    password: "",
    phone: "",
    checkPassword: "",
    email: "",
    avatarUrl: "",
  });
  const loading: Ref<boolean> = ref(false);
  const submiting: Ref<boolean> = ref(false);
  const fileList: Ref<FileItem[]> = ref([]);

  // 提交
  const handleSubmit = () => {
    (vm.refs.form as any).validate().then(() => {
      console.log(formState);
    });
  };

  const handleChange = (info: FileInfo) => {
    fileList.value = [info.file];
  };

  const beforeUpload = (file: FileItem) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  /**
   * 校验名称
   */
  const checkName = async (rule, value: string) => {
    if (!value) {
      return Promise.reject("请输入姓名");
    }
    const validNameReg = /^[\u4E00-\u9FA5|a-z|A-Z|\s]+$/;
    if (!validNameReg.test(value)) {
      return Promise.reject("该姓名不合法,请输入中文或英文");
    }
    return Promise.resolve();
  };

  /**
   * 校验手机号码
   */
  const checkPhone = async (rule, value: string) => {
    if (!value) {
      return Promise.reject("请输入手机号码");
    }
    const validPhoneReg = /^1[3|5|7|8]\d{9}$/g;
    if (value.length !== 11 || !validPhoneReg.test(value)) {
      return Promise.reject("请输入正确的手机号码");
    }
    return Promise.resolve();
  };

  /**
   * 校验邮箱地址
   */
  const checkEmail = async (rule, value: string) => {
    if (!value) {
      return Promise.reject("请输入邮箱地址");
    }
    const validEmailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/g;
    if (!validEmailReg.test(value)) {
      return Promise.reject("请输入正确的邮箱地址");
    }
    return Promise.resolve();
  };

  const rules = {
    name: [{ validator: checkName, trigger: "change" }],
    phone: [{ validator: checkPhone, trigger: "change" }],
    email: [{ validator: checkEmail, trigger: "change" }],
  };
  return {
    loading,
    fileList,
    labelCol: { span: 5 },
    wrapperCol: { span: 14 },
    handleSubmit,
    formState,
    handleChange,
    beforeUpload,
    submiting,
    rules,
  };
}

export { useForm };
