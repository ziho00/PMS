import axios from "../../axios";
export const login = ({
  account,
  password,
}: {
  account: string;
  password: string;
}) => axios.post("login", { account, password });

export const logout = () => axios.get("logout");
