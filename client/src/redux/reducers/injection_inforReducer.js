import { GET_INJECTION_INFOR } from '../containt';

export default (state = [], action) => {
  switch (action.type) {
    case GET_INJECTION_INFOR:
      return action.payload;
    default:
      return state;
  }
};
