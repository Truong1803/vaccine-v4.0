import { deleteAPI, getAPI, postAPI, putAPI } from "../../api/FetchData";
import { ADD_ROLE, ALERT, DELETE_ROLE, EDIT_ROLE, GET_ROLE } from "../containt";

export const getDataRole = (page, search, access_token) => async (dispatch) => {
  try {
    const res = await getAPI(
      `/role?page=${page}&limit=${5}&name[regex]=${search}`,
      access_token
    );
    dispatch({ type: GET_ROLE, payload: res.data });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};

export const createRole = (newRole, token) => async (dispatch) => {
  try {
    // dispatch({ type: ALERT, payload: { loading: true } });
    const res = await postAPI("/role", newRole, token);
    dispatch({ type: ADD_ROLE, payload: res.data.data });
    dispatch({ type: ALERT, payload: { success: res.data.msg } });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};

export const updateRole = (newRole, token) => async (dispatch) => {
  try {
    // dispatch({ type: ALERT, payload: { loading: true } });
    const res = await putAPI(`/role/${newRole._id}`, newRole, token);
    dispatch({ type: EDIT_ROLE, payload: res.data.data });
    dispatch({ type: ALERT, payload: { success: res.data.msg } });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};
export const deleteRole = (roleId, token) => async (dispatch) => {
  try {
    // dispatch({ type: ALERT, payload: { loading: true } });
    const res = await deleteAPI(`/role/${roleId}`, token);
    dispatch({ type: DELETE_ROLE, payload: res.data.data });
    dispatch({ type: ALERT, payload: { success: res.data.msg } });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};
