/**
 * reducer is a function that change state
 */

import { combineReducers } from "redux";
import adminAuthReducer from "./admin/adminAuthReducer.js";
import customerInfoReducer from "./customer/customerInfoReducer.js";

import customerMessagesReducer from "./customer/customerMessagesReducer.js";
import { reducer as reduxForm } from "redux-form";

export default combineReducers({
  adminAuth: adminAuthReducer,
  customerInfo: customerInfoReducer,
  customerMessages: customerMessagesReducer,
  form: reduxForm
});
