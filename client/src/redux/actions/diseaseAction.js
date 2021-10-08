import { getAPI } from "../../api/FetchData";
import { GET_DISEASE, ALERT } from "../containt";

export const getDataDisease = () => async (dispatch) => {
  try {
    const res = await getAPI("/disease");
    dispatch({ type: GET_DISEASE, payload: res.data.data });
  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
  }
};
