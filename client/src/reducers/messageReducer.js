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
  UPDATE_DEFAULT_PRICE,
  UNVAILABLE_DATE_INTERVAL_MESSAGE,
  UPDATE_MARGIN_MESSAGE,
  INVALID_MARGIN_MESSAGE,
  INVALID_PRICE_PAID_MESSAGE,
  SUBMIT_CUSTOMER_FORM_ERROR,
  INVALID_SAME_DATES_MESSAGE
} from "../actions/types";

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
      return {
        type: ERROR,
        message: "Start date cannot be a date after end date."
      };
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
    case UNVAILABLE_DATE_INTERVAL_MESSAGE:
      return {
        type: ERROR,
        message: "The selected interval already has a price definition."
      };
    case UPDATE_MARGIN_MESSAGE:
      return { type: SUCCESS, message: "Updated margin successfully." };
    case INVALID_MARGIN_MESSAGE:
      return {
        type: ERROR,
        message: "A margin must be a number between 0 and 100."
      };
    case INVALID_PRICE_PAID_MESSAGE:
      return {
        type: ERROR,
        message: "Price paid exceeds price of the reservation."
      };
    case SUBMIT_CUSTOMER_FORM_ERROR:
      return {
        type: ERROR,
        message: action.payload
      };
    case INVALID_SAME_DATES_MESSAGE:
      return {
        type: INVALID_SAME_DATES_MESSAGE,
        message: "Start date cannot be the same as end date."
      };

    default:
      return state;
  }
}
