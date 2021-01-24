import axios from "../../axios";

export const getUsers = () => axios.get("/users/all");
export const getUserById = () => axios.get("/users/1");
