import {
  GET_RESERVATION_LIST,
  SEARCH_RESERVATION_BY_CUSTOMER_NAME,
  DELETE_RESERVATION
} from "../actions/types";
import _ from "lodash";

export default (state = [], action) => {
  switch (action.type) {
    case GET_RESERVATION_LIST:
      return action.payload;
    case SEARCH_RESERVATION_BY_CUSTOMER_NAME:
      return action.payload;
    case DELETE_RESERVATION:
      _.remove(state, reservation => reservation._id == action.payload);
      return [...state];
    default:
      return state;
  }
};
