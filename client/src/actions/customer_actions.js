/**
 * action creator is a function that
 * returns and object with {type,payload}
 */

import axios from "axios";
import {
  FETCH_CUSTOMER,
  CREATE_RESERVATION_FORM_SUBMIT_SUCCESS,
  CREATE_RESERVATION_FORM_SUBMIT_ERROR,
  FORM_CLEAR_MESSAGE,
  CREATE_RESERVATION_FORM_UNAVAILABLE_DATES,
  CUSTOMER_DELETE_RESERVATION,
  CUSTOMER_SELECTED_RESERVATION,
  EDIT_RESERVATION_SUCCESS_MESSAGE,
  INVALID_DATES_MESSAGE,
  INVALID_PERSONS_MESSAGE,
  INVALID_PRICE_MESSAGE
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

export const submitCustomerReservationForm = (
  formData,
  resetForm
) => dispatch => {
  axios
    .post("/api/reservations", formData)
    .then(res => {
      if (res.data.availableDates) {
        dispatch({
          type: CREATE_RESERVATION_FORM_SUBMIT_SUCCESS
        });
        resetForm();
      } else {
        dispatch({
          type: CREATE_RESERVATION_FORM_UNAVAILABLE_DATES
        });
      }
    })
    .catch(err => {
      console.log("error", err);
      dispatch({ type: CREATE_RESERVATION_FORM_SUBMIT_ERROR });
    });
};

export const clearCustomerReservationFormMessage = () => {
  return { type: FORM_CLEAR_MESSAGE };
};

export const selectedReservation = selectedReservationId => dispatch => {
  axios.get(`/api/reservations/${selectedReservationId}`).then(res => {
    dispatch({
      type: CUSTOMER_SELECTED_RESERVATION,
      payload: res.data
    });
  });
};

export const updateReservation = (
  reservationId,
  reservationData,
  history
) => dispatch => {
  axios.put(`/api/reservations/${reservationId}`, reservationData).then(res => {
    if (res.data.availableDates) {
      dispatch({
        type: EDIT_RESERVATION_SUCCESS_MESSAGE
      });
      history.push("/customerDashboard");
    } else {
      dispatch({ type: CREATE_RESERVATION_FORM_UNAVAILABLE_DATES });
    }
  });
};

export const sendInvalidDatesMessage = () => {
  return { type: INVALID_DATES_MESSAGE };
};

export const sendInvalidPersonsMessage = () => {
  return { type: INVALID_PERSONS_MESSAGE };
};

export const sendInvalidPriceMessage = () => {
  return { type: INVALID_PRICE_MESSAGE };
};
