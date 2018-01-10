/**
 * A reducer to handle error messages on for submission 
 */

import {
  CUSTOMER_CREATE_RESERVATION_FORM_SUBMIT_SUCCESS,
  CUSTOMER_CREATE_RESERVATION_FORM_SUBMIT_ERROR,
  CUSTOMER_CREATE_RESERVATION_FORM_CLEAR_MESSAGE,
  CUSTOMER_CREATE_RESERVATION_FORM_UNAVAILABLE_DATES,
  CUSTOMER_DELETE_RESERVATION,
  CUSTOMER_EDIT_RESERVATION_SUCCESS__MESSAGE,
  CUSTOMER_CREATE_RESERVATION_INVALID_DATES_MESSAGE
} from "../../actions/types.js";

export default function(state = { message: "" }, action) {
  switch (action.type) {
    case CUSTOMER_CREATE_RESERVATION_FORM_SUBMIT_SUCCESS:
      return { message: "Your reservation was successfully created." };
    case CUSTOMER_CREATE_RESERVATION_FORM_UNAVAILABLE_DATES:
      return { message: "The dates you selected are not available." };
    case CUSTOMER_CREATE_RESERVATION_INVALID_DATES_MESSAGE:
      return { message: "Dates are invalid." };
    case CUSTOMER_CREATE_RESERVATION_FORM_SUBMIT_ERROR:
      return { message: "Oops! Error happened" };
    case CUSTOMER_CREATE_RESERVATION_FORM_CLEAR_MESSAGE:
      return { message: "" };
    case CUSTOMER_DELETE_RESERVATION:
      return { message: "Your reservation was successfully deleted." };
    case CUSTOMER_EDIT_RESERVATION_SUCCESS__MESSAGE:
      return { message: "Your reservation was successfully edited." };
    default:
      return state;
  }
}
