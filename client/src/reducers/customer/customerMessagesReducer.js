// /**
//  * A reducer to handle error messages on for submission
//  */

// import {
//   CREATE_RESERVATION_FORM_SUBMIT_SUCCESS,
//   CREATE_RESERVATION_FORM_SUBMIT_ERROR,
//   FORM_CLEAR_MESSAGE,
//   CREATE_RESERVATION_FORM_UNAVAILABLE_DATES,
//   DELETE_RESERVATION,
//   EDIT_RESERVATION_SUCCESS_MESSAGE,
//   INVALID_DATES_MESSAGE,
//   INVALID_PERSONS_MESSAGE,
//   INVALID_PRICE_MESSAGE
// } from "../../actions/types.js";

// import { SUCCESS, ERROR, INFO } from "../../helpers/constants";

// export default function(state = { type: "", text: "" }, action) {
//   switch (action.type) {
//     case CREATE_RESERVATION_FORM_SUBMIT_SUCCESS:
//       return {
//         type: SUCCESS,
//         text: "Your reservation was successfully created."
//       };
//     case CREATE_RESERVATION_FORM_UNAVAILABLE_DATES:
//       return {
//         type: SUCCESS,
//         text: "The dates you selected are not available."
//       };
//     case INVALID_DATES_MESSAGE:
//       return { type: ERROR, text: "Dates are invalid." };
//     case CREATE_RESERVATION_FORM_SUBMIT_ERROR:
//       return { type: ERROR, text: "Oops! Error happened" };
//     case FORM_CLEAR_MESSAGE:
//       return { type: SUCCESS, text: "" };
//     case DELETE_RESERVATION:
//       return {
//         type: SUCCESS,
//         text: "Your reservation was successfully deleted."
//       };
//     case EDIT_RESERVATION_SUCCESS_MESSAGE:
//       return {
//         type: SUCCESS,
//         text: "Your reservation was successfully edited."
//       };
//     case INVALID_PERSONS_MESSAGE:
//       return { type: ERROR, text: "Maximum number of persons allowed is 4." };
//     case INVALID_PRICE_MESSAGE:
//       return { type: ERROR, text: "Please input a valid price." };
//     default:
//       return state;
//   }
// }
