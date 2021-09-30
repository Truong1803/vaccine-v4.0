import { ADD_PAGE, GET_PAGE } from "../containt";

export default (state = [], action) => {
  switch (action.type) {
    case GET_PAGE:
      return action.payload;
    case ADD_PAGE:
      return state + 1;
    default:
      return state;
  }
};
