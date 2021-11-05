import axios from 'axios';

axios.defaults.withCredentials = true;

export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "https://vaccine-api-v1.herokuapp.com/api";
export const postAPI = async (url, post, token = "") => {
  const res = await axios.post(apiUrl + url, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const getAPI = async (url, token = "") => {
  const res = await axios.get(apiUrl + url, {
    headers: { Authorization: token },
  });
  return res;
};

export const putAPI = async (url, post, token = "") => {
  const res = await axios.put(apiUrl + url, post, {
    headers: { Authorization: token },
  });
  return res;
};
export const patchAPI = async (url, post, token = "") => {
  const res = await axios.patch(apiUrl + url, post, {
    headers: { Authorization: token },
  });
  return res;
};
export const deleteAPI = async (url, token = "") => {
  const res = await axios.delete(apiUrl + url, {
    headers: { Authorization: token },
  });
  return res;
};
