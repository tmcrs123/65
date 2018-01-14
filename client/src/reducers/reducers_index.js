/**
 * reducer is a function that change state
 */

import { combineReducers } from "redux";
import adminAuthReducer from "./admin/adminAuthReducer.js";
import customerInfoReducer from "./customer/customerInfoReducer.js";
import customerMessagesReducer from "./customer/customerMessagesReducer.js";
import customerSelectedReservationReducer from "./customer/customerSelectedReservationReducer.js";
import { reducer as reduxForm } from "redux-form";
import adminReservationsReducer from "./admin/adminReservationsReducer";
import adminCustomerListReducer from "./admin/adminCustomerListReducer";
import adminSelectedCustomerReducer from "./admin/adminSelectedCustomerReducer";
import adminMessagesReducer from "./admin/adminMessagesReducer";

export default combineReducers({
  adminAuth: adminAuthReducer,
  customerInfo: customerInfoReducer,
  customerMessages: customerMessagesReducer,
  customerSelectedReservation: customerSelectedReservationReducer,
  adminReservations: adminReservationsReducer,
  adminCustomerList: adminCustomerListReducer,
  adminSelectedCustomer: adminSelectedCustomerReducer,
  adminMessages: adminMessagesReducer,
  form: reduxForm
});
