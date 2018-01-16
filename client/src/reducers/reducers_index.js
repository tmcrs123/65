/**
 * reducer is a function that change state
 */

import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";

import auth from "./authenticationReducer";
import messages from "./messageReducer";
import customerList from "./customerListReducer";
import customerReservations from "./customerReservationsReducer";
import reservation from "./reservationReducer";
import customer from "./customerReducer";

export default combineReducers({
  auth,
  messages,
  customerList,
  customerReservations,
  reservation,
  customer,
  form: reduxForm
});
