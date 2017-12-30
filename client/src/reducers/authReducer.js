import { FETCH_CUSTOMER } from "../actions/types.js";
import { LOGOUT_CUSTOMER } from "../actions/types.js";
import { AUTH_USER } from "../actions/types.js";
import { AUTH_ERROR_USER } from "../actions/types.js";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_CUSTOMER:
      return action.payload || {};
    case LOGOUT_CUSTOMER:
      return {};
    case AUTH_USER:
      return action.payload || {};
    case AUTH_ERROR_USER:
      console.log(action.payload);
      return action.payload;
  }

  return state;
}
