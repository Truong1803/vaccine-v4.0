import {
  getAPI,
  patchAPI,
} from '../../api/FetchData';
import {
  ALERT,
  GET_INJECTION_INFOR,
} from '../containt';

export const getPreInjection =
  (access_token, injectionDate) => async (dispatch) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getAPI(
        `/injection-infor/pre-injection?injectionDate=${injectionDate}`,
        access_token
      );
      dispatch({ type: GET_INJECTION_INFOR, payload: res.data.data });
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (error) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };

export const getPostInjection =
  (access_token, injectionDate) => async (dispatch) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getAPI(
        `/injection-infor/post-injection?injectionDate=${injectionDate}`,
        access_token
      );
      dispatch({ type: GET_INJECTION_INFOR, payload: res.data.data });
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (error) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };

export const updatePreInjection =
  (preInjectionReaction, id, access_token) => async (dispatch) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await patchAPI(
        `/injection-infor/pre-injection/${id}`,
        preInjectionReaction,
        access_token
      );
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (error) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };

export const updatePostInjection =
  (postInjectionReaction, id, access_token) => async (dispatch) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await patchAPI(
        `/injection-infor/post-injection/${id}`,
        postInjectionReaction,
        access_token
      );
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (error) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };
