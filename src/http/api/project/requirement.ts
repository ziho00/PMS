import axios from "../../axios";

export const getRequirements = () => axios.get(`/requirement/all`);

export const getRequirementById = (params) =>
  axios.get(`/requirement/${params.requirement_id}`);
