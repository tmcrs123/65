import { GET_RESERVATION_LIST } from "../actions/TYPES2";

export default (state = [], action) => {
  switch (action.type) {
    case GET_RESERVATION_LIST:
      return action.payload;

    default:
      return state;
  }
};
