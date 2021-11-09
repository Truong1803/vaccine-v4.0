import axios from 'axios';

import {
  apiUrl,
  deleteAPI,
  getAPI,
  patchAPI,
} from '../../api/FetchData';
import {
  ADD_USER_INJECTION_REGISTER_ORGAN,
  ALERT,
  DELETE_INJECTION_REGISTER_ORGAN,
  DELETE_USER_INJECTION_REGISTER_ORGAN,
  GET_INJECTION_REGISTER_ORGAN,
} from '../containt';

export const InjectionRegisterOrgan =
  (data, access_token, organId) => async (dispatch) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await axios.post(`${apiUrl}/organ-injection-register`, data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: access_token,
        },
      });

      dispatch({
        type: GET_INJECTION_REGISTER_ORGAN,
        payload: { success: res.data.data },
      });
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
      dispatch(GetInjectionRegisterOrgan(organId, access_token));
      // dispatch({ type: ALERT, payload: { loading: false } });
    } catch (error) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };
export const GetInjectionRegisterOrgan =
  (organId, access_token) => async (dispatch) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getAPI(
        `/organ-injection-register/organ/${organId}`,
        access_token
      );
      dispatch({ type: GET_INJECTION_REGISTER_ORGAN, payload: res.data.data });
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (error) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };

export const DeleteUserRegister =
  (phonenumber, access_token) => async (dispatch) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await patchAPI(
        `/organ-injection-register/deleteUser`,
        { phonenumber: phonenumber },
        access_token
      );
      dispatch({
        type: DELETE_USER_INJECTION_REGISTER_ORGAN,
        payload: res.data.data,
      });
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (error) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };

export const AddUserRegister = (user, access_token) => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    const res = await patchAPI(
      `/organ-injection-register/addUser`,
      user,
      access_token
    );
    dispatch({
      type: ADD_USER_INJECTION_REGISTER_ORGAN,
      payload: res.data.data,
    });
    dispatch({ type: ALERT, payload: { success: res.data.msg } });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};

export const DeleteInjectionRegisterOrgan =
  (itemId, access_token) => async (dispatch) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await deleteAPI(
        `/organ-injection-register/${itemId}`,
        access_token
      );
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
      dispatch({ type: DELETE_INJECTION_REGISTER_ORGAN, payload: "notFound" });
      // dispatch({ type: ALERT, payload: { loading: false } });
    } catch (error) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };
