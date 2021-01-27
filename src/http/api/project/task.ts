import axios from "../../axios";

export const getTasks = () => axios.get("/task/0");
export const getTaskById = (params) => axios.get(`/task/${params.task_id}`);
