import axios from 'axios';

console.log(process.env.NODE_ENV);
export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "https://calm-garden-43735.herokuapp.com/api";

export const postAPI = async (url, post, token = "") => {
  const res = await axios.post(url, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const getAPI = async (url, token = "") => {
  const res = await axios.get(url, {
    headers: { Authorization: token },
  });
  return res;
};

export const putAPI = async (url, post, token = "") => {
  const res = await axios.put(url, post, {
    headers: { Authorization: token },
  });
  return res;
};
export const patchAPI = async (url, post, token = "") => {
  const res = await axios.patch(url, post, {
    headers: { Authorization: token },
  });
  return res;
};
export const deleteAPI = async (url, token = "") => {
  const res = await axios.delete(url, {
    headers: { Authorization: token },
  });
  return res;
};
