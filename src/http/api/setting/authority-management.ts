import axios from "../../axios";

export const getAuthoritys = () => axios.get("/authority/all");
