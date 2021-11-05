import {
  getAPI,
  postAPI,
} from '../../api/FetchData';
import {
  ALERT,
  GET_SCHEDULE_INJECTION,
} from '../containt';

export const setScheduleInjection =
  (data, access_token) => async (dispatch) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postAPI("/schedule-injection", data, access_token);
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
      // dispatch({ type: ALERT, payload: { loading: false } });
    } catch (error) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };

export const getAllSchedule =
  (access_token, injectionDate) => async (dispatch) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getAPI(
        `/schedule-injection?injectionDate=${injectionDate}`,
        access_token
      );
      dispatch({ type: GET_SCHEDULE_INJECTION, payload: res.data.data });
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (error) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };
