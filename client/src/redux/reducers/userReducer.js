import {
  ADD_USER,
  DELETE_USER,
  EDIT_USER,
  GET_USER,
} from '../containt';

const userReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case ADD_USER:
      return [...state, action.payload];
    case EDIT_USER:
      const newUser = state.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
      return newUser;
    case DELETE_USER:
      const newDelete = state.filter((item) => item._id !== action.payload._id);

      return newDelete;
    default:
      return state;
  }
};
export default userReducer;
