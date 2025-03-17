import axios from "axios";

const backendUrl = import.meta.env.VITE_BACK_URL;
export const autoPopulateProfile = (email: string, tarjeta?: string) => {
  const requestBody = { email, tarjeta };

  return axios.post(backendUrl + "/CX/clients", requestBody);
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
