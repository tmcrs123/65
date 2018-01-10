/**
 * action creator is a function that
 * returns and object with {type,payload}
 */

import axios from "axios";
import {
  FETCH_CUSTOMER,
  CUSTOMER_CREATE_RESERVATION_FORM_SUBMIT_SUCCESS,
  CUSTOMER_CREATE_RESERVATION_FORM_SUBMIT_ERROR,
  CUSTOMER_CREATE_RESERVATION_FORM_CLEAR_MESSAGE,
  CUSTOMER_CREATE_RESERVATION_FORM_UNAVAILABLE_DATES,
  CUSTOMER_DELETE_RESERVATION,
  CUSTOMER_SELECTED_RESERVATION
} from "./types.js";

export const fetchCustomer = () => dispatch => {
  axios.get("/api/current_customer").then(res => {
    dispatch({ type: FETCH_CUSTOMER, payload: res.data });
  });
};

export const deleteCustomerReservation = reservationId => dispatch => {
  axios.delete(`/api/reservations/${reservationId}`).then(() => {
    dispatch({ type: CUSTOMER_DELETE_RESERVATION, payload: reservationId });
  });
};

export const submitCustomerReservationForm = formData => dispatch => {
  axios
    .post("/api/reservations", formData)
    .then(res => {
      if (res.data.availableDates) {
        dispatch({ type: CUSTOMER_CREATE_RESERVATION_FORM_SUBMIT_SUCCESS });
      } else {
        dispatch({ type: CUSTOMER_CREATE_RESERVATION_FORM_UNAVAILABLE_DATES });
      }
    })
    .catch(err => {
      console.log("error", err);
      dispatch({ type: CUSTOMER_CREATE_RESERVATION_FORM_SUBMIT_ERROR });
    });
};

export const clearCustomerReservationFormMessage = () => {
  return { type: CUSTOMER_CREATE_RESERVATION_FORM_CLEAR_MESSAGE };
};

export const selectedReservation = selectedReservationId => {
  return {
    type: CUSTOMER_SELECTED_RESERVATION,
    payload: selectedReservationId
  };
};
