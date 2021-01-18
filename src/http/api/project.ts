import axios from "../axios";

export const getProjects = () => axios.get("/project/all");
