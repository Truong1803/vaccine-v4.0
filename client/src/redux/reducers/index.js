import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import vaccine from "./vaccineReducer";
import organization from "./organizationReducer";
import role from "./roleReducer";
import user from "./userReducer";
export default combineReducers({
  auth,
  alert,
  vaccine,
  organization,
  role,
  user,
});
