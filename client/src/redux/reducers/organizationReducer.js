import { ADD_QH, DELETE_QH, EDIT_QH, GET_QH } from "../containt";

export default (state = [], action) => {
  switch (action.type) {
    case GET_QH:
      console.log("Organization");
      return action.payload;
    case ADD_QH:
      if (state.length < 5) return [...state, action.payload];
      else return [...state];
    case EDIT_QH:
      const newQH = state.map((qh) =>
        qh._id === action.payload._id ? action.payload : qh
      );
      return newQH;
    case DELETE_QH:
      const newDelete = state.filter((item) => item._id !== action.payload._id);

      return newDelete;
    default:
      return state;
  }
};
