import { GET_SIDE_EFFECT } from '../containt';

const sideEffectReduce = (state = [], action) => {
  switch (action.type) {
    case GET_SIDE_EFFECT:
      return action.payload;
    default:
      return state;
  }
};
export default sideEffectReduce;
