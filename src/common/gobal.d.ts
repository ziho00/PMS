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
  username?: string;
}

export interface RouterMeta {
  title?: string;
  icon?: string | HTMLDocument;
  keepAlive?: boolean;
  target?: string;
  hidden?: boolean;
  hiddenHeaderContent?: boolean;
  permission?: string[];
}
