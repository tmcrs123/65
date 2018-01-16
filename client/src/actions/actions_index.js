import axios from "axios";

import {
  FETCH_USER,
  LOGIN_USER,
  WRONG_LOGIN_MESSAGE,
  CLEAR_MESSAGE,
  SUBMIT_RESERVATION_FORM_SUCCESS,
  SUBMIT_RESERVATION_FORM_UNAVAILABLE_DATES,
  GET_CUSTOMER_LIST,
  INVALID_DATES_MESSAGE,
  INVALID_PERSONS_MESSAGE,
  INVALID_PRICE_MESSAGE,
  NO_CUSTOMER_SELECTED_MESSAGE
} from "./TYPES2";

export const fetchUser = () => dispatch => {
  axios.get("/api/user").then(res => {
    dispatch({ type: FETCH_USER, payload: res.data });
  });
};

export const loginUser = (loginInfo, history) => dispatch => {
  axios
    .post("/api/admin/login", loginInfo)
    .then(res => {
      dispatch({ type: LOGIN_USER, payload: res.data });
      history.push("/");
    })
    .catch(err => {
      dispatch({ type: WRONG_LOGIN_MESSAGE });
    });
};

export const clearMessage = () => {
  return { type: CLEAR_MESSAGE };
};

export const submitReservationForm = (formData, resetForm) => dispatch => {
  axios
    .post("/api/reservations", formData)
    .then(res => {
      if (res.data.availableDates) {
        dispatch({
          type: SUBMIT_RESERVATION_FORM_SUCCESS
        });
        resetForm();
      } else {
        dispatch({
          type: SUBMIT_RESERVATION_FORM_UNAVAILABLE_DATES
        });
      }
    })
    .catch(err => {
      console.log("error", err);
    });
};

export const getCustomerList = () => dispatch => {
  axios.get("/api/customers").then(res => {
    dispatch({ type: GET_CUSTOMER_LIST, payload: res.data });
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

export const sendNoCustomerSelectedMessage = () => {
  return { type: NO_CUSTOMER_SELECTED_MESSAGE };
};
