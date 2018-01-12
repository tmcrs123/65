import { GET_RESERVATIONS } from "../../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case GET_RESERVATIONS:
      return [...action.payload];
    default:
      return state;
  }
};
