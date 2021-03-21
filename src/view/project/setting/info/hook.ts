import { ref, reactive, getCurrentInstance, UnwrapRef, Ref } from "vue";
import { api } from "/@/http/api";
import { message } from "ant-design-vue";
import moment, { Moment } from "moment";
interface FormState {
  name: string;
  desc?: String;
  planDate: [Moment, Moment] | [];
  logoUrl?: string;
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
    desc: "",
    planDate: [],
    logoUrl: "",
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

  const checkDate = async (rule, value) => {
    if (value.length >> 0 === 0) {
      return Promise.reject("请选择项目计划日期");
    } else {
      return Promise.resolve();
    }
  };

  // 不可选日期
  const disabledDate = (current) => {
    return current && current <= moment().endOf("day");
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
    loading,
    fileList,
    labelCol: { span: 5 },
    wrapperCol: { span: 14 },
    handleSubmit,
    formState,
    handleChange,
    disabledDate,
    beforeUpload,
    submiting,
    rules,
    moment,
  };
}

export { useForm };
