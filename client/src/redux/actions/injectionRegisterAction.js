import {
  deleteAPI,
  getAPI,
  postAPI,
} from '../../api/FetchData';
import {
  ALERT,
  DELETE_INJECTION_REGISTER,
  GET_INJECTION_REGISTER,
} from '../containt';

export const InjectionRegister = (data, access_token) => async (dispatch) => {
  try {
    const res = await postAPI("/user-injection-register", data, access_token);
    dispatch({ type: ALERT, payload: { success: res.data.msg } });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};

export const GetInjectionRegister = (access_token) => async (dispatch) => {
  try {
    const res = await getAPI("/user/search-injection-register", access_token);
    dispatch({ type: GET_INJECTION_REGISTER, payload: res.data.data });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};

export const DeleteInjectionRegister =
  (itemId, access_token) => async (dispatch) => {
    try {
      const res = await deleteAPI(
        `/user-injection-register/${itemId}`,
        access_token
      );
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
      dispatch({ type: DELETE_INJECTION_REGISTER, payload: "notFound" });
    } catch (error) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };
