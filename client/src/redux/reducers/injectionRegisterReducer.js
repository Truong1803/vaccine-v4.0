import { GET_INJECTION_REGISTER } from "../containt";

export default (state = [], action) => {
  switch (action.type) {
    case GET_INJECTION_REGISTER:
      return action.payload;
    default:
      return state;
  }
};
