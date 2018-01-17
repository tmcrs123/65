/**
 * A reducer to handle error messages on for submission
 */

import {
  SUBMIT_RESERVATION_FORM_SUCCESS,
  RESERVATION_FORM_UNAVAILABLE_DATES,
  SUBMIT_CUSTOMER_FORM_SUCCESS,
  DELETE_RESERVATION_MESSAGE,
  EDIT_RESERVATION_FORM_SUCCESS,
  INVALID_DATES_MESSAGE,
  INVALID_PERSONS_MESSAGE,
  INVALID_PRICE_MESSAGE,
  WRONG_LOGIN_MESSAGE,
  CLEAR_MESSAGE,
  NO_CUSTOMER_SELECTED_MESSAGE,
  EDIT_CUSTOMER_FORM_SUCCESS,
  DELETE_CUSTOMER_MESSAGE,
  SUBMIT_DATE_INTERVAL_FORM_SUCCESS,
  DELETE_DATE_INTERVAL_MESSAGE_SUCCESS,
  UPDATE_DEFAULT_PRICE
} from "../actions/TYPES2";

import { SUCCESS, ERROR, INFO } from "../helpers/constants";

export default function(state = { type: "", message: "" }, action) {
  switch (action.type) {
    case SUBMIT_RESERVATION_FORM_SUCCESS:
      return {
        type: SUCCESS,
        message: "Your reservation was successfully created."
      };
    case RESERVATION_FORM_UNAVAILABLE_DATES:
      return {
        type: ERROR,
        message: "The dates you selected are not available."
      };
    case INVALID_DATES_MESSAGE:
      return { type: ERROR, message: "Dates are invalid." };
    case DELETE_RESERVATION_MESSAGE:
      return {
        type: SUCCESS,
        message: "Your reservation was successfully deleted."
      };
    case EDIT_RESERVATION_FORM_SUCCESS:
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
      return { type: ERROR, message: "Please select a customer." };
    case SUBMIT_CUSTOMER_FORM_SUCCESS:
      return { type: SUCCESS, message: "Customer created successfully." };
    case EDIT_CUSTOMER_FORM_SUCCESS:
      return { type: SUCCESS, message: "Edited customer successfully." };
    case DELETE_CUSTOMER_MESSAGE:
      return { type: ERROR, message: "Deleted customer successfully." };
    case SUBMIT_DATE_INTERVAL_FORM_SUCCESS:
      return {
        type: SUCCESS,
        message: "New price interval added successfully."
      };
    case DELETE_DATE_INTERVAL_MESSAGE_SUCCESS:
      return { type: SUCCESS, message: "Deleted price interval successfully." };
    case UPDATE_DEFAULT_PRICE:
      return { type: SUCCESS, message: "Default price successfully updated." };

    default:
      return state;
  }
}
