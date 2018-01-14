import { ADMIN_SELECTED_CUSTOMER } from "../../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case ADMIN_SELECTED_CUSTOMER:
      return action.payload;
    default:
      return state;
  }
}
