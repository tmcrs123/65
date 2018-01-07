/**
 * action creator is a function that
 * returns and object with {type,payload}
 */

import axios from "axios";
import {
  FETCH_CUSTOMER,
  FETCH_CUSTOMER_RESERVATIONS,
  FETCH_CUSTOMER_RESERVATIONS_ERROR,
  SUBMIT_CUSTOMER_CREATE_RESERVATION_FORM_SUCCESS,
  SUBMIT_CUSTOMER_CREATE_RESERVATION_FORM_ERROR
} from "./types.js";

export const fetchCustomer = () => dispatch => {
  axios.get("/api/current_customer").then(res => {
    dispatch({ type: FETCH_CUSTOMER, payload: res.data });
    // history.push("/customerDashboard");
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

export const submitCustomerReservationForm = formData => dispatch => {
  console.log("ACTION CREATOR");
  console.log("form data", formData);
  axios
    .post("/api/reservations", formData)
    .then(res => {
      console.log("response", res);
      dispatch({ type: SUBMIT_CUSTOMER_CREATE_RESERVATION_FORM_SUCCESS });
    })
    .catch(err => {
      console.log("error", err);
      dispatch({ type: SUBMIT_CUSTOMER_CREATE_RESERVATION_FORM_ERROR });
    });
};
