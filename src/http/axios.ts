import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosInstance,
} from "axios";
import { message } from "ant-design-vue";
import { host } from "./config";
import {
  serverResponseFailedManager,
  serverResponseSuccessManager,
} from "./respond-manager";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: host,
});

/**
 * request 拦截器
 */
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    return config;
  },
  (error: AxiosError) => {
    message.error(error.response);
    return Promise.reject(error);
  }
);

/**
 * response 拦截器
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.code === 200) {
      return response;
    }
    // 针对请求成功：返回的 code 码做不同的响应
    serverResponseSuccessManager.codeParser(response);
  },
  (error: AxiosError) => {
    // 针对请求失败：应该提示的错误信息
    serverResponseFailedManager.throwErrorMessage(error);
    return Promise.reject(error.response);
  }
);

export default axiosInstance;
