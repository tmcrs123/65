/**
 * A reducer to handle error messages on for submission
 */

import {
  SUBMIT_RESERVATION_FORM_SUCCESS,
  SUBMIT_RESERVATION_FORM_UNAVAILABLE_DATES,
  //   DELETE_RESERVATION_SUCCESS,
  //   EDIT_RESERVATION_SUCCESS_MESSAGE,
  INVALID_DATES_MESSAGE,
  INVALID_PERSONS_MESSAGE,
  INVALID_PRICE_MESSAGE,
  WRONG_LOGIN_MESSAGE,
  CLEAR_MESSAGE,
  NO_CUSTOMER_SELECTED_MESSAGE
} from "../actions/TYPES2";

import { SUCCESS, ERROR, INFO } from "../helpers/constants";

export default function(state = { type: "", message: "" }, action) {
  switch (action.type) {
    case SUBMIT_RESERVATION_FORM_SUCCESS:
      return {
        type: SUCCESS,
        message: "Your reservation was successfully created."
      };
    case SUBMIT_RESERVATION_FORM_UNAVAILABLE_DATES:
      return {
        type: SUCCESS,
        message: "The dates you selected are not available."
      };
    case INVALID_DATES_MESSAGE:
      return { type: ERROR, message: "Dates are invalid." };
    case "DELETE_RESERVATION_SUCCESS":
      return {
        type: SUCCESS,
        message: "Your reservation was successfully deleted."
      };
    case "EDIT_RESERVATION_SUCCESS_MESSAGE":
      return {
        type: SUCCESS,
        message: "Your reservation was successfully edited."
      };
    case INVALID_PERSONS_MESSAGE:
      return {
        type: ERROR,
        message: "Maximum number of persons allowed is 4."
      };
    case INVALID_PRICE_MESSAGE:
      return { type: ERROR, message: "Please input a valid price." };
    case WRONG_LOGIN_MESSAGE:
      return { type: ERROR, message: "Wrong email and password combination." };
    case CLEAR_MESSAGE:
      return { type: "", message: "" };
    case NO_CUSTOMER_SELECTED_MESSAGE:
      return { type: "ERROR", message: "Please select a customer." };
    default:
      return state;
  }
}
