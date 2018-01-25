import { FETCH_USER, LOGIN_USER } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload;
    case LOGIN_USER:
      return action.payload;
    default:
      return state;
  }
};
