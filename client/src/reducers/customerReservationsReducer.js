import {
  GET_CUSTOMER_RESERVATIONS,
  DELETE_RESERVATION
} from "../actions/types";

import _ from "lodash";

export default function(state = [], action) {
  switch (action.type) {
    case GET_CUSTOMER_RESERVATIONS:
      return action.payload;
    case DELETE_RESERVATION:
      _.remove(state, reservation => {
        return reservation.id == action.payload;
      });
      return [...state];
    default:
      return state;
  }
}
