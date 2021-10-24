import {
  deleteAPI,
  getAPI,
  patchAPI,
  postAPI,
  putAPI,
} from '../../api/FetchData';
import {
  ADD_PAGE,
  ADD_QH,
  ALERT,
  DELETE_QH,
  EDIT_QH,
  GET_PAGE,
  GET_QH,
} from '../containt';

export const getDataQH =
  (page = 1, search = "", access_token) =>
  async (dispatch) => {
    try {
      const res = await getAPI(
        `/health-organization?page=${page}&limit=${5}&organization[regex]=${search}`,
        access_token
      );

      dispatch({ type: GET_PAGE, payload: res.data.total });
      dispatch({ type: GET_QH, payload: res.data.data });
    } catch (error) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };

export const getHealthOrganById =
  (userId, access_token) => async (dispatch) => {
    try {
      const res = await getAPI(`/health-organization/${userId}`, access_token);
      dispatch({ type: GET_QH, payload: res.data.data });
    } catch (error) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };

export const createOrgan = (newOrgan, access_token) => async (dispatch) => {
  try {
    const res = await postAPI("/health-organization", newOrgan, access_token);
    dispatch({ type: ADD_QH, payload: res.data.data });
    dispatch({ type: ALERT, payload: { success: res.data.msg } });
    dispatch({ type: ADD_PAGE, payload: 1 });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};

export const updateOrgan = (newOrgan, access_token) => async (dispatch) => {
  try {
    const res = await putAPI(
      `/health-organization/${newOrgan._id}`,
      newOrgan,
      access_token
    );
    dispatch({ type: EDIT_QH, payload: res.data.data });
    dispatch({ type: ALERT, payload: { success: res.data.msg } });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};

export const createOrganWard = (newOrgan, access_token) => async (dispatch) => {
  try {
    const res = await postAPI(
      "/health-organization/ward",
      newOrgan,
      access_token
    );
    dispatch({ type: ADD_QH, payload: res.data.data });
    dispatch({ type: ALERT, payload: { success: res.data.msg } });
    dispatch({ type: ADD_PAGE, payload: 1 });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};

export const updateOrganWard = (newOrgan, access_token) => async (dispatch) => {
  try {
    const res = await putAPI(
      `/health-organization/ward/${newOrgan._id}`,
      newOrgan,
      access_token
    );
    dispatch({ type: EDIT_QH, payload: res.data.data });
    dispatch({ type: ALERT, payload: { success: res.data.msg } });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};

export const deleteOrgan = (organId, token) => async (dispatch) => {
  try {
    const res = await deleteAPI(`/health-organization/${organId}`, token);
    dispatch({ type: DELETE_QH, payload: res.data.data });
    dispatch({ type: ALERT, payload: { success: res.data.msg } });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};

export const updateOrganAdmin =
  (newOrgan, access_token) => async (dispatch) => {
    try {
      const res = await patchAPI(
        `/health-organization/admin/${newOrgan._id}`,
        newOrgan,
        access_token
      );
      dispatch({ type: EDIT_QH, payload: res.data.data });
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (error) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };
export const createOrganAdmin =
  (newOrgan, access_token) => async (dispatch) => {
    try {
      const res = await postAPI(
        "/health-organization/admin",
        newOrgan,
        access_token
      );
      dispatch({ type: ADD_QH, payload: res.data.data });
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
      dispatch({ type: ADD_PAGE, payload: 1 });
    } catch (error) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };
