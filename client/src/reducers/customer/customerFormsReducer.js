/**
 * A reducer to handle error messages on for submission 
 */

import {
  SUBMIT_CUSTOMER_CREATE_RESERVATION_FORM_SUCCESS,
  SUBMIT_CUSTOMER_CREATE_RESERVATION_FORM_ERROR
} from "../../actions/types.js";

export default function(state = {}, action) {
  console.log("REDUCER");
  switch (action.payload) {
    case SUBMIT_CUSTOMER_CREATE_RESERVATION_FORM_SUCCESS:
      return { message: "Your reservation was successfully created." };
    case SUBMIT_CUSTOMER_CREATE_RESERVATION_FORM_ERROR:
      return { message: "Oops! Error happened" };
    default:
      return state;
  }
}
