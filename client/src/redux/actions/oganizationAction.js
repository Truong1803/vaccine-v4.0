import { GET_QH, ALERT, ADD_QH, EDIT_QH, DELETE_QH } from "../containt";
import {
  deleteAPI,
  getAPI,
  patchAPI,
  postAPI,
  putAPI,
} from "../../api/FetchData";
export const getDataQH = (page, search, access_token) => async (dispatch) => {
  try {
    const res = await getAPI(
      `/organization?page=${page}&limit=${5}&organization[regex]=${search}`,
      access_token
    );
    dispatch({ type: GET_QH, payload: res.data.data });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};

export const createOrgan = (newOrgan, access_token) => async (dispatch) => {
  try {
    const res = await postAPI("/organization", newOrgan, access_token);
    dispatch({ type: ADD_QH, payload: res.data.data });
    dispatch({ type: ALERT, payload: { success: res.data.msg } });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};

export const updateOrgan = (newOrgan, access_token) => async (dispatch) => {
  try {
    const res = await putAPI(
      `/organization/${newOrgan._id}`,
      newOrgan,
      access_token
    );
    dispatch({ type: EDIT_QH, payload: res.data.data });
    dispatch({ type: ALERT, payload: { success: res.data.msg } });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};

export const createOrganWard = (newOrgan, access_token) => async (dispatch) => {
  try {
    const res = await postAPI("/organization/ward", newOrgan, access_token);
    dispatch({ type: ADD_QH, payload: res.data.data });
    dispatch({ type: ALERT, payload: { success: res.data.msg } });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};

export const updateOrganWard = (newOrgan, access_token) => async (dispatch) => {
  try {
    const res = await putAPI(
      `/organization/ward/${newOrgan._id}`,
      newOrgan,
      access_token
    );
    dispatch({ type: EDIT_QH, payload: res.data.data });
    dispatch({ type: ALERT, payload: { success: res.data.msg } });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};

export const deleteOrgan = (organId, token) => async (dispatch) => {
  try {
    const res = await deleteAPI(`/organization/${organId}`, token);
    dispatch({ type: DELETE_QH, payload: res.data.data });
    dispatch({ type: ALERT, payload: { success: res.data.msg } });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};

export const updateOrganAdmin =
  (newOrgan, access_token) => async (dispatch) => {
    try {
      const res = await patchAPI(
        `/organization/admin/${newOrgan._id}`,
        newOrgan,
        access_token
      );
      dispatch({ type: EDIT_QH, payload: res.data.data });
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (error) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };
export const createOrganAdmin =
  (newOrgan, access_token) => async (dispatch) => {
    try {
      const res = await postAPI("/organization/admin", newOrgan, access_token);
      dispatch({ type: ADD_QH, payload: res.data.data });
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (error) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };
