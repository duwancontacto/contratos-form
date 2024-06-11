import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
console.log("first", baseUrl);
export const autoPopulateProfile = (search: string) => {
  const requestBody = { email: search };

  return axios.post(baseUrl + "/api/auth/medic", requestBody);
};
