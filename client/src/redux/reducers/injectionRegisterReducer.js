import { DELETE_INJECTION_REGISTER, GET_INJECTION_REGISTER } from "../containt";

export default (state = [], action) => {
  switch (action.type) {
    case GET_INJECTION_REGISTER:
      return action.payload;
    case DELETE_INJECTION_REGISTER:
      console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
};
