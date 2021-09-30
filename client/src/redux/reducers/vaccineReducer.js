import {
  ADD_VACCINE,
  DELETE_VACCINE,
  EDIT_VACCINE,
  GET_VACCINE,
} from "../containt";

export default (state = [], action) => {
  const { type, payload } = action;
  switch (action.type) {
    case GET_VACCINE:
      return action.payload;
    case ADD_VACCINE:
      if (state.length < 5) return [...state, action.payload];
      else return [...state];
    case EDIT_VACCINE:
      const newVaccine = state.map((vaccine) =>
        vaccine._id === action.payload._id ? action.payload : vaccine
      );
      return newVaccine;
    case DELETE_VACCINE:
      const newDelete = state.filter((item) => item._id !== action.payload._id);

      return newDelete;
    default:
      return state;
  }
};
