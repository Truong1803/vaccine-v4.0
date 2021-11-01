import {
  DELETE_INJECTION_REGISTER,
  GET_INJECTION_REGISTER,
} from '../containt';

const injectionRegisterReducer = (state = [], action) => {
  switch (action.type) {
    case GET_INJECTION_REGISTER:
      return action.payload;
    case DELETE_INJECTION_REGISTER:
      return action.payload;
    default:
      return state;
  }
};
export default injectionRegisterReducer;
