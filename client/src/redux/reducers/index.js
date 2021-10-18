import { combineReducers } from 'redux';

import alert from './alertReducer';
import auth from './authReducer';
import company from './companyReducer';
import disease from './diseaseReducer';
import injectionInfor from './injection_inforReducer';
import injectionRegister from './injectionRegisterReducer';
import organization from './organizationReducer';
import role from './roleReducer';
import schedule from './scheduleReducer';
import sideEffect from './sideEffectReduce';
import totalItem from './totalPageReducer';
import user from './userReducer';
import vaccine from './vaccineReducer';

export default combineReducers({
  auth,
  alert,
  vaccine,
  organization,
  role,
  user,
  totalItem,
  company,
  disease,
  sideEffect,
  injectionRegister,
  schedule,
  injectionInfor,
});
