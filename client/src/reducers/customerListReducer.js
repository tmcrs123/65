import { GET_CUSTOMER_LIST } from "../actions/TYPES2";

export default function(state = [], action) {
  switch (action.type) {
    case GET_CUSTOMER_LIST:
      return action.payload;
    default:
      return state;
  }
}
