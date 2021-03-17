import axios from "../../axios";

export const getRequirements = () => axios.get(`/requirement/all`);

export const getRequirementById = () => axios.get(`/requirement/10010`);
