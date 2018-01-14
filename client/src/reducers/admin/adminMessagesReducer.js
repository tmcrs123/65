import {
  ADMIN_EDIT_CUSTOMER_SUBMIT_SUCCESS,
  CLEAR_ADMIN_MESSAGE
} from "../../actions/types";
import { SUCCESS, ERROR } from "../../helpers/constants";

export default function(state = { type: "", text: "" }, action) {
  switch (action.type) {
    case ADMIN_EDIT_CUSTOMER_SUBMIT_SUCCESS:
      return { type: SUCCESS, text: "Customer successfully edited." };
    case CLEAR_ADMIN_MESSAGE:
      return { type: "", text: "" };
    default:
      return state;
  }
}
