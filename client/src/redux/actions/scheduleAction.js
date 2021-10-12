import { postAPI } from "../../api/FetchData";
import { ALERT } from "../containt";
export const setScheduleInjection =
  (data, access_token) => async (dispatch) => {
    try {
      const res = await postAPI("/schedule-injection", data, access_token);
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (error) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };
