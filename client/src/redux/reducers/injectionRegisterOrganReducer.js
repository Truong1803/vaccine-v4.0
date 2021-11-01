import {
  ADD_USER_INJECTION_REGISTER_ORGAN,
  GET_INJECTION_REGISTER_ORGAN,
} from '../containt';

const injectionRegisterOrganReducer = (state = [], action) => {
  switch (action.type) {
    case GET_INJECTION_REGISTER_ORGAN:
      return action.payload;
    case ADD_USER_INJECTION_REGISTER_ORGAN:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default injectionRegisterOrganReducer;
