import { GET_PAGE } from "../containt";
export default (state = [], action) => {
  switch (action.type) {
    case GET_PAGE:
      return action.payload;
    default:
      return state;
  }
};
