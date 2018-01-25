import { GET_ADMIN_DASHBOARD_DATA } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_ADMIN_DASHBOARD_DATA:
      return action.payload;
    default:
      return state;
  }
};
