import { AxiosError, AxiosResponse } from "axios";
import { message } from "ant-design-vue";

/**
 * 请求成功处理
 */
class ServerResponseSuccessManager {
  codeParser(respond: AxiosResponse) {
    const code = respond?.data?.code;
    const resData = respond?.data?.data;
    const parser = {
      "0": () => resData,
      "10001": () => {
        this.handleCodeIs10001(resData);
      },
      default: () => {
        this.defaultHandle(resData, code);
      },
    };
    return parser[code] ? parser[code]() : parser["default"];
  }

  /**
   * 状态码为 10001 的响应处理
   *
   * @param resData
   */
  handleCodeIs10001(resData) {
    if (resData === "TOKEN_INVALID") {
      message.config({
        maxCount: 1,
      });
      message.info("登录已过期，请重新登录");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    }
  }

  /**
   * 默认响应处理
   *
   * @param resData
   */
  defaultHandle(resData, code) {
    console.log(`状态码: ${code} 未设置响应处理`);
  }
}

/**
 * 请求失败处理
 */
class ServerResponseFailedManager {
  throwErrorMessage(error: AxiosError) {
    message.warn(error.response);
  }
}

export const serverResponseSuccessManager = new ServerResponseSuccessManager();
export const serverResponseFailedManager = new ServerResponseFailedManager();
