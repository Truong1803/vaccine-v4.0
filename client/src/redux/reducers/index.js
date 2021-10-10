import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import vaccine from "./vaccineReducer";
import organization from "./organizationReducer";
import role from "./roleReducer";
import user from "./userReducer";
import totalItem from "./totalPageReducer";
import company from "./companyReducer";
import disease from "./diseaseReducer";
import injectionRegister from "./injectionRegisterReducer";
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
  injectionRegister,
});
