import {
  getAPI,
  postAPI,
} from '../../api/FetchData';
import { validateEmail } from '../../middleware/valid';
import {
  ALERT,
  AUTH,
} from '../containt';

export const loginSMS = (phonenumber) => async (dispatch) => {
  try {
    await postAPI("/auth/login_sms", { phonenumber });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};

export const verifySMS =
  (phonenumber, code, identification = "") =>
  async (dispatch) => {
    try {
      // dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postAPI("/auth/verify_otp", { phonenumber, code });
      if (res.data.msg === "Login Success") {
        dispatch({
          type: AUTH,
          payload: res.data,
        });
        localStorage.setItem("logged", "true");
      }

      dispatch({ type: ALERT, payload: { success: res.data.msg } });

      if (res.data.msg === "Verify Success") {
        dispatch({
          type: AUTH,
          payload: res.data.data,
        });
        const data = JSON.stringify({ phonenumber, identification });
        localStorage.setItem("infor", data);
      }
    } catch (error) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
      setTimeout(() => {
        verifySMS(phonenumber, code);
      }, 100);
    }
  };
export const activeEmail = (active_token) => async (dispatch) => {
  try {
    const res = await postAPI("/active_email", active_token);
    dispatch({
      type: AUTH,
      payload: res.data,
    });
    dispatch({ type: ALERT, payload: { success: res.data.msg } });
    localStorage.setItem("logged", "true");
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};
export const loginOrgan = (userLogin) => async (dispatch) => {
  try {
    // dispatch({ type: ALERT, payload: { loading: true } });
    const res = await postAPI("/auth/login_organ", userLogin);
    dispatch({
      type: AUTH,
      payload: res.data,
    });
    dispatch({ type: ALERT, payload: { success: res.data.msg } });
    localStorage.setItem("logged", "true");
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};
export const updateInfor = (userInfo) => async (dispatch) => {
  try {
    // dispatch({ type: ALERT, payload: { loading: true } });
    const res = await postAPI("/auth/update_infor", userInfo);
    dispatch({
      type: AUTH,
      payload: res.data,
    });
    dispatch({ type: ALERT, payload: { success: res.data.msg } });
    localStorage.setItem("logged", "true");
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};
export const registerUser = (userRegister) => async (dispatch) => {
  try {
    await postAPI("/auth/register_sms", userRegister);
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};

export const registerOrgan = (userRegister) => async (dispatch) => {
  const check = validateEmail(userRegister.email);
  if (!check)
    return dispatch({
      type: ALERT,
      payload: { errors: "Email incorrect fomat" },
    });
  try {
    // dispatch({ type: ALERT, payload: { loading: true } });
    const res = await postAPI("/auth/register_organ", userRegister);

    dispatch({ type: ALERT, payload: { success: res.data.msg } });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("logged");
    await getAPI("/auth/logout");
    window.location.href = "/";
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};

export const refreshToken = () => async (dispatch) => {
  const logged = localStorage.getItem("logged");
  if (logged !== "true") return;
  try {
    // dispatch({ type: ALERT, payload: { loading: true } });
    const res = await getAPI(`/auth/refresh_token`);
    dispatch({ type: AUTH, payload: res.data });

    dispatch({ type: ALERT, payload: {} });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};
