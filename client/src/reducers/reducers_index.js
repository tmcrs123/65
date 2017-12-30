/**
 * reducer is a function that change state
 */

import { combineReducers } from "redux";
import authReducer from "./authReducer.js";
import { reducer as reduxForm } from "redux-form";

export default combineReducers({
  auth: authReducer,
  form: reduxForm
});
