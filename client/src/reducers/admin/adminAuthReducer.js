import {
  FETCH_ADMIN,
  AUTH_ADMIN,
  AUTH_ERROR_ADMIN,
  RESET_ADMIN_AUTH_ERROR
} from "../../actions/types.js";
import _ from "lodash";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_ADMIN:
      return action.payload;
    case AUTH_ADMIN:
      return action.payload;
    case AUTH_ERROR_ADMIN:
      return { ...state, ...action.payload };
    case RESET_ADMIN_AUTH_ERROR:
      return _.omit({ ...state }, "authError");
    default:
      return state;
  }
}
