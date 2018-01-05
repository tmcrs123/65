import { FETCH_CUSTOMER, LOGOUT_CUSTOMER } from "../../actions/types.js";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_CUSTOMER:
      return action.payload;
    case LOGOUT_CUSTOMER:
      return {};
    default:
      return state;
  }
}
