import { GET_CUSTOMER } from "../actions/TYPES2";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_CUSTOMER:
      return action.payload;
    default:
      return state;
  }
};
