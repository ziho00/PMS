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
import { tokenManager } from "./token-manager";
const axiosInstance: AxiosInstance = axios.create({
  baseURL: host,
});

/**
 * 请求拦截器
 */
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    let token = tokenManager.getToken();
    if (token) {
      config.headers.accessToken = token;
    }
    return config;
  },
  (error: AxiosError) => {
    message.error(error.response);
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.code === 0) {
      return response;
    }
    // 针对请求成功：返回的 code 码做不同的响应
    return serverResponseSuccessManager.codeParser(response);
  },
  (error: AxiosError) => {
    // 针对请求失败：应该提示的错误信息
    serverResponseFailedManager.throwErrorMessage(error);
    return Promise.reject(error.response);
  }
);

export default axiosInstance;
