/**
 * action creator is a function that
 * returns and object with {type,payload}
 */

import axios from "axios";
import {
  FETCH_CUSTOMER,
  FETCH_CUSTOMER_RESERVATIONS,
  FETCH_CUSTOMER_RESERVATIONS_ERROR
} from "./types.js";

export const fetchCustomer = () => dispatch => {
  axios.get("/api/current_customer").then(res => {
    dispatch({ type: FETCH_CUSTOMER, payload: res.data });
    // history.push("/customerDashboard");
  });
};

export const fetchCustomerReservations = () => dispatch => {
  axios
    .get(`/api/customerReservations`)
    .then(res => {
      dispatch({ type: FETCH_CUSTOMER_RESERVATIONS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: FETCH_CUSTOMER_RESERVATIONS_ERROR });
    });
};
