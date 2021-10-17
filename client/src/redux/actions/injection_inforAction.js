import {
  getAPI,
  patchAPI,
} from '../../api/FetchData';
import {
  ALERT,
  GET_INJECTION_INFOR,
} from '../containt';

export const getPreInjection = (access_token) => async (dispatch) => {
  try {
    const res = await getAPI("/injection-infor/pre-injection", access_token);
    dispatch({ type: GET_INJECTION_INFOR, payload: res.data.data });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};

export const getPostInjection = (access_token) => async (dispatch) => {
  try {
    const res = await getAPI("/injection-infor/post-injection", access_token);
    dispatch({ type: GET_INJECTION_INFOR, payload: res.data.data });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};

export const updatePreInjection =
  (preInjectionReaction, id, access_token) => async (dispatch) => {
    try {
      const res = await patchAPI(
        `/injection-infor/pre-injection/${id}`,
        preInjectionReaction,
        access_token
      );
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (error) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };
