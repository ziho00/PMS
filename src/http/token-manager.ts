class TokenManager {
  readonly key = "token";

  /**
   * 获取 token
   */
  getToken(): string {
    return localStorage.getItem(this.key);
  }

  /**
   * 设置 token
   * @param token
   */
  setToken(token: string) {
    localStorage.setItem(this.key, token);
  }

  /**
   * 清空 token
   */
  clearToken() {
    localStorage.removeItem(this.key);
  }
}

export const tokenManager = new TokenManager();
