import { GET_MARGIN, UPDATE_MARGIN } from "../actions/TYPES2";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_MARGIN:
      return action.payload;
    case UPDATE_MARGIN:
      return action.payload;
    default:
      return state;
  }
};
