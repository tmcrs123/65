import {
  GET_CUSTOMER_LIST,
  SEARCH_CUSTOMER_BY_NAME,
  DELETE_CUSTOMER
} from "../actions/TYPES2";

import _ from "lodash";

export default function(state = [], action) {
  switch (action.type) {
    case GET_CUSTOMER_LIST:
      return action.payload;
    case SEARCH_CUSTOMER_BY_NAME:
      return action.payload;
    case DELETE_CUSTOMER:
      _.remove(state, customer => customer._id == action.payload);
      return [...state];
    default:
      return state;
  }
}
