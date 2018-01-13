import { GET_CUSTOMER_LIST } from "../../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case GET_CUSTOMER_LIST:
      return action.payload;
    default:
      return state;
  }
};
