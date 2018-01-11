/**
 * A reducer to handle error messages on for submission
 */

import {
  CUSTOMER_CREATE_RESERVATION_FORM_SUBMIT_SUCCESS,
  CUSTOMER_CREATE_RESERVATION_FORM_SUBMIT_ERROR,
  CUSTOMER_FORM_CLEAR_MESSAGE,
  CUSTOMER_CREATE_RESERVATION_FORM_UNAVAILABLE_DATES,
  CUSTOMER_DELETE_RESERVATION,
  CUSTOMER_EDIT_RESERVATION_SUCCESS_MESSAGE,
  CUSTOMER_INVALID_DATES_MESSAGE,
  CUSTOMER_INVALID_PERSONS_MESSAGE
} from "../../actions/types.js";

export default function(state = { message: "" }, action) {
  switch (action.type) {
    case CUSTOMER_CREATE_RESERVATION_FORM_SUBMIT_SUCCESS:
      return { message: "Your reservation was successfully created." };
    case CUSTOMER_CREATE_RESERVATION_FORM_UNAVAILABLE_DATES:
      return { message: "The dates you selected are not available." };
    case CUSTOMER_INVALID_DATES_MESSAGE:
      console.log("invalid dates reducer");
      console.log("payload ", action.payload);
      return { message: "Dates are invalid." };
    case CUSTOMER_CREATE_RESERVATION_FORM_SUBMIT_ERROR:
      return { message: "Oops! Error happened" };
    case CUSTOMER_FORM_CLEAR_MESSAGE:
      return { message: "" };
    case CUSTOMER_DELETE_RESERVATION:
      return { message: "Your reservation was successfully deleted." };
    case CUSTOMER_EDIT_RESERVATION_SUCCESS_MESSAGE:
      return { message: "Your reservation was successfully edited." };
    case CUSTOMER_INVALID_PERSONS_MESSAGE:
      return { message: "Maximum number of persons allowed is 4." };
    default:
      return state;
  }
}
