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
import dateIntervals from "./dateIntervalsReducer";
import defaultPrice from "./defaultPriceReducer";
import margin from "./marginReducer";
import AdminDashboardData from "./adminDashboardReducer";

export default combineReducers({
  auth,
  messages,
  customerList,
  reservationList,
  customerReservations,
  reservation,
  customer,
  dateIntervals,
  defaultPrice,
  margin,
  AdminDashboardData,
  form: reduxForm
});
