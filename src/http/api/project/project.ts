import axios from "../../axios";

export const getProjects = () => axios.get("/project/all");

export const getProjectById = (params) =>
  axios.get(`/project/${params.project_id}`);
