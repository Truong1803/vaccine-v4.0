import { getAPI } from '../../api/FetchData';
import {
  ALERT,
  GET_SIDE_EFFECT,
} from '../containt';

export const getDataSideEffect = () => async (dispatch) => {
  try {
    const res = await getAPI("/side-effect");
    dispatch({ type: GET_SIDE_EFFECT, payload: res.data.data });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};
