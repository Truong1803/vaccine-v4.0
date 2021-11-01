import {
  ADD_ROLE,
  DELETE_ROLE,
  EDIT_ROLE,
  GET_ROLE,
} from '../containt';

const roleReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ROLE:
      return action.payload;
    case ADD_ROLE:
      return [...state, action.payload];
    case EDIT_ROLE:
      const newRole = state.map((role) =>
        role._id === action.payload._id ? action.payload : role
      );
      return newRole;
    case DELETE_ROLE:
      const newDelete = state.filter((item) => item._id !== action.payload._id);

      return newDelete;
    default:
      return state;
  }
};

export default roleReducer;
