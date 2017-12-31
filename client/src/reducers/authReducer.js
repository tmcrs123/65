import { FETCH_CUSTOMER } from "../actions/types.js";
import { LOGOUT_CUSTOMER } from "../actions/types.js";
import { AUTH_USER } from "../actions/types.js";
import { AUTH_ERROR_USER } from "../actions/types.js";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_CUSTOMER:
      console.log("fetch customer reducer");
      console.log("state in reducer is", action.payload);
      return action.payload;
    case LOGOUT_CUSTOMER:
      console.log("logout customer reducer");
      console.log("state in reducer is", {});
      return {};
    case AUTH_USER:
      console.log("auth user reducer");
      console.log("state in reducer is", action.payload);
      return action.payload;
    case AUTH_ERROR_USER:
      return action.payload;
  }
  console.log("default return of state");
  return state;
}
