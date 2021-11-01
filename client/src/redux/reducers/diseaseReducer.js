import { GET_DISEASE } from '../containt';

const diseaseReducer = (state = [], action) => {
  switch (action.type) {
    case GET_DISEASE:
      return action.payload;
    default:
      return state;
  }
};

export default diseaseReducer;
