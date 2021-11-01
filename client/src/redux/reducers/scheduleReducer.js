import { GET_SCHEDULE_INJECTION } from '../containt';

const scheduleReducer = (state = [], action) => {
  switch (action.type) {
    case GET_SCHEDULE_INJECTION:
      return action.payload;
    default:
      return state;
  }
};
export default scheduleReducer;
