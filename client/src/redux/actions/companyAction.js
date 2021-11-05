import {
  deleteAPI,
  getAPI,
  patchAPI,
  postAPI,
} from '../../api/FetchData';
import {
  ADD_COMPANY,
  ADD_PAGE,
  ALERT,
  DELETE_COMPANY,
  EDIT_COMPANY,
  GET_COMPANY,
  GET_PAGE,
} from '../containt';

export const getDataCompany =
  (page, search, access_token) => async (dispatch) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getAPI(
        `/organization?page=${page}&limit=${5}&organization[regex]=${search}`,
        access_token
      );
      dispatch({ type: GET_PAGE, payload: res.data.total });
      dispatch({ type: GET_COMPANY, payload: res.data.data });
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (error) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };
export const getCompanyById = (userId, access_token) => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    const res = await getAPI(`/organization/${userId}`, access_token);
    dispatch({ type: GET_COMPANY, payload: res.data.data });
    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};
export const deleteCompany = (organId, token) => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    const res = await deleteAPI(`/organization/${organId}`, token);
    dispatch({ type: DELETE_COMPANY, payload: res.data.data });
    dispatch({ type: ALERT, payload: { success: res.data.msg } });
    // dispatch({ type: ALERT, payload: { loading: false } });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};

export const updateCompanyAdmin =
  (newOrgan, access_token) => async (dispatch) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await patchAPI(
        `/organization/admin/${newOrgan._id}`,
        newOrgan,
        access_token
      );
      dispatch({ type: EDIT_COMPANY, payload: res.data.data });
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
      // dispatch({ type: ALERT, payload: { loading: false } });
    } catch (error) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };
export const createCompanyAdmin =
  (newOrgan, access_token) => async (dispatch) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postAPI("/organization/admin", newOrgan, access_token);
      dispatch({ type: ADD_COMPANY, payload: res.data.data });
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
      dispatch({ type: ADD_PAGE, payload: 1 });
      // dispatch({ type: ALERT, payload: { loading: false } });
    } catch (error) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };
