import {
  GET_CUSTOMER_LIST,
  SEARCH_CUSTOMER_BY_NAME,
  DELETE_CUSTOMER
} from "../../actions/types";
import _ from "lodash";

export default (state = [], action) => {
  const customerList = state;

  switch (action.type) {
    case GET_CUSTOMER_LIST:
      return action.payload;
    case SEARCH_CUSTOMER_BY_NAME:
      return action.payload;
    case DELETE_CUSTOMER:
      console.log("in reducer");
      _.remove(customerList, customer => customer.id == action.payload);
      console.log("returnin", [...customerList]);
      return [...customerList];

    default:
      return state;
  }
};
