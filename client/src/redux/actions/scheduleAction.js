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
      const res = await postAPI("/schedule-injection", data, access_token);
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (error) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };

export const getAllSchedule =
  (page = "", search = "", access_token) =>
  async (dispatch) => {
    try {
      const res = await getAPI(
        `/schedule-injection?page=${page}&search=${search}`,
        access_token
      );
      dispatch({ type: GET_SCHEDULE_INJECTION, payload: res.data.data });
    } catch (error) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };
