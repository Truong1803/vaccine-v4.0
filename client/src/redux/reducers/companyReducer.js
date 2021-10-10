import {
  ADD_COMPANY,
  DELETE_COMPANY,
  EDIT_COMPANY,
  GET_COMPANY,
} from "../containt";

export default (state = [], action) => {
  switch (action.type) {
    case GET_COMPANY:
      return action.payload;
    case ADD_COMPANY:
      if (state.length < 5) return [...state, action.payload];
      else return [...state];
    case EDIT_COMPANY:
      const newCP = state.map((cp) =>
        cp._id === action.payload._id ? action.payload : cp
      );
      return newCP;
    case DELETE_COMPANY:
      const newDelete = state.filter((item) => item._id !== action.payload._id);

      return newDelete;
    default:
      return state;
  }
};
