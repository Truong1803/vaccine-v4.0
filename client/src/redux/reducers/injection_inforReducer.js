import { GET_INJECTION_INFOR } from '../containt';

const injection_inforReducer = (state = [], action) => {
  switch (action.type) {
    case GET_INJECTION_INFOR:
      return action.payload;
    default:
      return state;
  }
};
export default injection_inforReducer;
