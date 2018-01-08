/**
 * reducer is a function that change state
 */

import { combineReducers } from "redux";
import adminAuthReducer from "./admin/adminAuthReducer.js";
import customerInfoReducer from "./customer/customerInfoReducer.js";
import customerReservationsReducer from "./customer/customerReservationsReducer.js";
import customerFormsReducer from "./customer/customerFormsReducer.js";
import { reducer as reduxForm } from "redux-form";

export default combineReducers({
  adminAuth: adminAuthReducer,
  customerInfo: customerInfoReducer,
  customerReservations: customerReservationsReducer,
  customerSubmitReservationForm: customerFormsReducer,
  form: reduxForm
});
