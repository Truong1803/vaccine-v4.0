import axios from 'axios';

import { getAPI } from '../../api/FetchData';
import {
  ALERT,
  GET_INJECTION_REGISTER_ORGAN,
} from '../containt';

export const InjectionRegisterOrgan =
  (data, access_token) => async (dispatch) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await axios.post("/organ-injection-register", data, {
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
    } catch (error) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };
export const GetInjectionRegisterOrgan =
  (organId, access_token) => async (dispatch) => {
    try {
      const res = await getAPI(
        `/organ-injection-register/organ/${organId}`,
        access_token
      );
      dispatch({ type: GET_INJECTION_REGISTER_ORGAN, payload: res.data.data });
    } catch (error) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };
