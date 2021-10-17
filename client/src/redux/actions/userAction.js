import { GET_USER, ALERT, ADD_USER, EDIT_USER, DELETE_USER } from "../containt";
import { deleteAPI, getAPI, postAPI, putAPI } from "../../api/FetchData";
export const getDataUser = (page, search, access_token) => async (dispatch) => {
  try {
    const res = await getAPI(
      `/user?page=${page}&limit=${5}&name[regex]=${search}`,
      access_token
    );
    dispatch({ type: GET_USER, payload: res.data.data });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};

export const getUserById = (userId, access_token) => async (dispatch) => {
  try {
    const res = await getAPI(`/user/${userId}`, access_token);
    dispatch({ type: GET_USER, payload: res.data.data });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};

export const createUser = (newUser, access_token) => async (dispatch) => {
  try {
    const res = await postAPI("/user", newUser, access_token);
    dispatch({ type: ADD_USER, payload: res.data.data });
    dispatch({ type: ALERT, payload: { success: res.data.msg } });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};

export const updateUser = (newUser, access_token) => async (dispatch) => {
  try {
    const res = await putAPI(`/user/${newUser._id}`, newUser, access_token);
    dispatch({ type: EDIT_USER, payload: res.data.data });
    dispatch({ type: ALERT, payload: { success: res.data.msg } });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};

export const deleteUser = (userId, token) => async (dispatch) => {
  try {
    const res = await deleteAPI(`/user/${userId}`, token);
    dispatch({ type: DELETE_USER, payload: res.data.data });
    dispatch({ type: ALERT, payload: { success: res.data.msg } });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};
