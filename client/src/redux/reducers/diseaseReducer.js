import { GET_DISEASE } from "../containt";

export default (state = [], action) => {
  switch (action.type) {
    case GET_DISEASE:
      return action.payload;
    default:
      return state;
  }
};
