class TokenManager {
  readonly key = "token";

  getToken(): string {
    return localStorage.getItem(this.key);
  }

  setToken(token: string) {
    localStorage.setItem(this.key, token);
  }

  clearToken() {
    localStorage.removeItem(this.key);
  }
}

export const tokenManager = new TokenManager();
