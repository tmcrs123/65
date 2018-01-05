import {
  FETCH_CUSTOMER_RESERVATIONS,
  FETCH_CUSTOMER_RESERVATIONS_ERROR
} from "../../actions/types.js";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_CUSTOMER_RESERVATIONS:
      return action.payload;
    case FETCH_CUSTOMER_RESERVATIONS_ERROR:
      return [];
    default:
      return state;
  }
}
