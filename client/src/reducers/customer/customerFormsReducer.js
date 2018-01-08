/**
 * A reducer to handle error messages on for submission 
 */

import {
  CUSTOMER_CREATE_RESERVATION_FORM_SUBMIT_SUCCESS,
  CUSTOMER_CREATE_RESERVATION_FORM_SUBMIT_ERROR,
  CUSTOMER_CREATE_RESERVATION_FORM_CLEAR_MESSAGE,
  CUSTOMER_CREATE_RESERVATION_FORM_UNAVAILABLE_DATES,
  DELETE_RESERVATION_CUSTOMER
} from "../../actions/types.js";

export default function(state = { message: "" }, action) {
  switch (action.type) {
    case CUSTOMER_CREATE_RESERVATION_FORM_SUBMIT_SUCCESS:
      return { message: "Your reservation was successfully created." };
    case CUSTOMER_CREATE_RESERVATION_FORM_UNAVAILABLE_DATES:
      return { message: "The dates you selected are not available." };
    case CUSTOMER_CREATE_RESERVATION_FORM_SUBMIT_ERROR:
      return { message: "Oops! Error happened" };
    case CUSTOMER_CREATE_RESERVATION_FORM_CLEAR_MESSAGE:
      return { message: "" };
    case DELETE_RESERVATION_CUSTOMER:
      console.log("delete reservation reducer");
      return { message: "Your reservation was successfully deleted." };
    default:
      return state;
  }
}
