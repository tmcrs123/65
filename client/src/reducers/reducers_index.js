/**
 * reducer is a function that change state
 */

import { combineReducers } from "redux";
import adminAuthReducer from "./admin/adminAuthReducer.js";
import customerAuthReducer from "./customer/customerAuthReducer.js";
import customerReservationsReducer from "./customer/customerReservationsReducer.js";
import { reducer as reduxForm } from "redux-form";

export default combineReducers({
  adminAuth: adminAuthReducer,
  customerAuth: customerAuthReducer,
  customerReservations: customerReservationsReducer,
  form: reduxForm
});
