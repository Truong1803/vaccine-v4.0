import { SET_SCHEDULE_INJECTION, GET_SCHEDULE_INJECTION } from "../containt";

export default (state = [], action) => {
  switch (action.type) {
    case GET_SCHEDULE_INJECTION:
      return action.payload;
    case ADD_PAGE:
      return state + 1;
    default:
      return state;
  }
};
