import { GET_DEFAULT_PRICE, UPDATE_DEFAULT_PRICE } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_DEFAULT_PRICE:
      return action.payload;
    case UPDATE_DEFAULT_PRICE:
      return action.payload;
    default:
      return state;
  }
};
