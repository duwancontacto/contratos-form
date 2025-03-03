import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
const backendUrl = import.meta.env.VITE_BACK_URL;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const autoPopulateProfile = (search: string) => {
  const isEmailFormat = emailRegex.test(search);

  const requestBody = isEmailFormat ? { email: search } : { telefono: search };

  return axios.post(baseUrl + "/api/auth/medic", requestBody);
};

export const getProducts = () => {
  return axios.get(backendUrl + "/products");
};

//eslint-disable-next-line
export const sendContract = (contractPayload: any) => {
  const requestBody = { ...contractPayload };

  return axios.post(backendUrl + "/documents", requestBody);
};

//eslint-disable-next-line
export const getSign = (document_id: any) => {
  return axios.post(backendUrl + `/documents/${document_id}/sign`);
};
//eslint-disable-next-line
export const sendEmail = (document_id: any) => {
  return axios.post(backendUrl + `/documents/${document_id}/email`);
};

export const sendLog = (
  document_id: string,
  payload: Record<string, unknown>
) => {
  return axios.post(backendUrl + `/documents/${document_id}/log`, payload);
};
