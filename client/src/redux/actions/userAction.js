import {
  deleteAPI,
  getAPI,
  patchAPI,
  postAPI,
  putAPI,
} from '../../api/FetchData';
import {
  ADD_USER,
  ALERT,
  DELETE_USER,
  EDIT_USER,
  GET_USER,
} from '../containt';

export const getDataUser = (page, search, access_token) => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    const res = await getAPI(
      `/user?page=${page}&limit=${5}&name[regex]=${search}`,
      access_token
    );
    dispatch({ type: GET_USER, payload: res.data.data });
    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};

export const getUserInjected =
  (access_token, injectionDate) => async (dispatch) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getAPI(
        `/user/injected?injectionDate=${injectionDate}`,
        access_token
      );
      dispatch({ type: GET_USER, payload: res.data.data });
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (error) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };

export const getUserById = (userId, access_token) => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    const res = await getAPI(`/user/${userId}`, access_token);
    dispatch({ type: GET_USER, payload: res.data.data });
    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};

export const createUser = (newUser, access_token) => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    const res = await postAPI("/user", newUser, access_token);
    dispatch({ type: ADD_USER, payload: res.data.data });
    dispatch({ type: ALERT, payload: { success: res.data.msg } });
    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};

export const updateUser = (newUser, access_token) => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    const res = await putAPI(`/user/${newUser._id}`, newUser, access_token);
    dispatch({ type: EDIT_USER, payload: res.data.data });
    dispatch({ type: ALERT, payload: { success: res.data.msg } });
    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};

export const deleteUser = (userId, token) => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    const res = await deleteAPI(`/user/${userId}`, token);
    dispatch({ type: DELETE_USER, payload: res.data.data });
    dispatch({ type: ALERT, payload: { success: res.data.msg } });
    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};
export const updateRecord = (data, userId, token) => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    const res = await patchAPI(`/user/${userId}`, data, token);
    dispatch({ type: ALERT, payload: { success: res.data.msg } });
    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};
