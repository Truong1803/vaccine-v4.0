import { getAPI } from '../../api/FetchData';
import {
  ALERT,
  GET_DISEASE,
} from '../containt';

export const getDataDisease = () => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    const res = await getAPI("/disease");
    dispatch({ type: GET_DISEASE, payload: res.data.data });
    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};
