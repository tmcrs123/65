/**
 * reducer is a function that change state
 */

import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";

import auth from "./authenticationReducer";
import messages from "./messageReducer";
import customerList from "./customerListReducer";
import reservationList from "./reservationListReducer";
import customerReservations from "./customerReservationsReducer";
import reservation from "./reservationReducer";
import customer from "./customerReducer";

export default combineReducers({
  auth,
  messages,
  customerList,
  reservationList,
  customerReservations,
  reservation,
  customer,
  form: reduxForm
});
