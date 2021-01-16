import axios from "../axios";
export const getProjects = () => axios.get("/project/all");

export const getWorklaodInfo = () => axios.get("/workload/summary/7");

export const getNews = () => axios.get("/news/8");

export const getTasks = () => axios.get("/task/0");
