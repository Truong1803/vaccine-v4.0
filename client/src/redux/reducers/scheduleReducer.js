import { GET_SCHEDULE_INJECTION } from '../containt';

export default (state = [], action) => {
  switch (action.type) {
    case GET_SCHEDULE_INJECTION:
      return action.payload;
    default:
      return state;
  }
};
