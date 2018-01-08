import {
  FETCH_CUSTOMER,
  LOGOUT_CUSTOMER,
  DELETE_RESERVATION_CUSTOMER
} from "../../actions/types.js";

import _ from "lodash";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_CUSTOMER:
      return action.payload;
    case LOGOUT_CUSTOMER:
      return {};
    case DELETE_RESERVATION_CUSTOMER:
      let reservations = state.reservations;
      let filteredReservations = _.remove(reservations, reservation => {
        return reservation.id == action.payload;
      });
      return { ...state, reservations };
    default:
      return state;
  }
}
