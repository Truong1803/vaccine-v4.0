import { deleteAPI, getAPI, postAPI, putAPI } from "../../api/FetchData";
import {
  ADD_PAGE,
  ADD_VACCINE,
  ALERT,
  DELETE_VACCINE,
  EDIT_VACCINE,
  GET_PAGE,
  GET_VACCINE,
} from "../containt";

export const getDataVaccine = (page, search) => async (dispatch) => {
  try {
    // dispatch({ type: ALERT, payload: { loading: true } });
    const res = await getAPI(
      `/vaccine?page=${page}&limit=${5}&name_vaccine[regex]=${search}`
    );
    dispatch({ type: GET_PAGE, payload: res.data.total });
    dispatch({ type: GET_VACCINE, payload: res.data.data });
    // dispatch({ type: ALERT, payload: { loading: false } });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};

export const createVaccine = (newVaccine, token) => async (dispatch) => {
  try {
    // dispatch({ type: ALERT, payload: { loading: true } });
    const res = await postAPI("/vaccine", newVaccine, token);
    dispatch({ type: ADD_VACCINE, payload: res.data.data });
    dispatch({ type: ALERT, payload: { success: res.data.msg } });
    dispatch({ type: ADD_PAGE, payload: 1 });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};

export const updateVaccine = (newVaccine, token) => async (dispatch) => {
  try {
    //dispatch({ type: ALERT, payload: { loading: true } });
    const res = await putAPI(`/vaccine/${newVaccine._id}`, newVaccine, token);
    dispatch({ type: EDIT_VACCINE, payload: res.data.data });
    dispatch({ type: ALERT, payload: { success: res.data.msg } });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};
export const deleteVaccine = (vaccineId, token) => async (dispatch) => {
  try {
    // dispatch({ type: ALERT, payload: { loading: true } });
    const res = await deleteAPI(`/vaccine/${vaccineId}`, token);

    dispatch({ type: DELETE_VACCINE, payload: res.data.data });

    // dispatch({ type: ALERT, payload: { success: res.data.msg } });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};
