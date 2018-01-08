/**
 * action creator is a function that
 * returns and object with {type,payload}
 */

import axios from "axios";
import {
  FETCH_CUSTOMER,
  FETCH_CUSTOMER_RESERVATIONS,
  FETCH_CUSTOMER_RESERVATIONS_ERROR,
  CUSTOMER_CREATE_RESERVATION_FORM_SUBMIT_SUCCESS,
  CUSTOMER_CREATE_RESERVATION_FORM_SUBMIT_ERROR,
  CUSTOMER_CREATE_RESERVATION_FORM_CLEAR_MESSAGE,
  CUSTOMER_CREATE_RESERVATION_FORM_UNAVAILABLE_DATES,
  DELETE_RESERVATION_CUSTOMER
} from "./types.js";

export const fetchCustomer = () => dispatch => {
  console.log("FETCHING CUSTOMER...");
  axios.get("/api/current_customer").then(res => {
    dispatch({ type: FETCH_CUSTOMER, payload: res.data });
  });
};

export const fetchCustomerReservations = () => dispatch => {
  axios
    .get("/api/customerReservations")
    .then(res => {
      dispatch({ type: FETCH_CUSTOMER_RESERVATIONS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: FETCH_CUSTOMER_RESERVATIONS_ERROR });
    });
};

export const deleteCustomerReservation = reservationId => dispatch => {
  axios.delete(`/api/reservations/${reservationId}`).then(() => {
    dispatch({ type: DELETE_RESERVATION_CUSTOMER, payload: reservationId });
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
