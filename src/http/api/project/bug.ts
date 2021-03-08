import axios from "../../axios";

export const getBugs = () => axios.get("/bug/0");
export const getBugById = (params) => axios.get(`/bug/${params.bug_id}`);
