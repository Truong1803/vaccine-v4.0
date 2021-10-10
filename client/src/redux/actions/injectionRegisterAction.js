import { INJECT_REGISTER, ALERT, GET_INJECTION_REGISTER } from "../containt";
import { getAPI, postAPI, deleteAPI } from "../../api/FetchData";

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
