import {
  FETCH_CUSTOMER,
  LOGOUT_CUSTOMER,
  CUSTOMER_DELETE_RESERVATION,
  CUSTOMER_SELECTED_RESERVATION
} from "../../actions/types.js";

import _ from "lodash";

export default function(state = {}, action) {
  let reservations = state.reservations;
  switch (action.type) {
    case FETCH_CUSTOMER:
      return action.payload;
    case LOGOUT_CUSTOMER:
      return {};
    case CUSTOMER_DELETE_RESERVATION:
      let filteredReservations = _.remove(reservations, reservation => {
        return reservation.id == action.payload;
      });
      return { ...state, reservations };
    case CUSTOMER_SELECTED_RESERVATION:
      let selectedReservation = _.filter(reservations, reservation => {
        return reservation.id == action.payload;
      })[0];
      console.log("changedState", { ...state, selectedReservation });
      return { ...state, selectedReservation };
    default:
      return state;
  }
}
