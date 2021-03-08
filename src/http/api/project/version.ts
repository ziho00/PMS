import axios from "../../axios";

export const getVersions = () => axios.get("/version/all");
