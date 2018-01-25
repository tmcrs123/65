import {
  GET_DATE_INTERVALS,
  DELETE_DATE_INTERVAL,
  SAVE_DATE_INTERVAL
} from "../actions/types";
import _ from "lodash";

export default function(state = [], action) {
  switch (action.type) {
    case GET_DATE_INTERVALS:
      return action.payload;
    case DELETE_DATE_INTERVAL:
      _.remove(state, dateInterval => dateInterval._id == action.payload);
      return [...state];
    case SAVE_DATE_INTERVAL:
      return action.payload;
    default:
      return state;
  }
}
