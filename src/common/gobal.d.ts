export interface ServiceRespondData {
  code: number;
  msg: string;
  data?: any | null;
}

export interface UserInfo {
  user_id?: string | number;
  phone?: number | string;
  password?: number | string;
  account?: number | string;
  email?: number | string;
  token?: string;
  username?: string;
}
