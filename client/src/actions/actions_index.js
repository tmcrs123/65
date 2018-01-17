import axios from "axios";

import {
  FETCH_USER,
  LOGIN_USER,
  WRONG_LOGIN_MESSAGE,
  CLEAR_MESSAGE,
  SUBMIT_RESERVATION_FORM_SUCCESS,
  RESERVATION_FORM_UNAVAILABLE_DATES,
  GET_CUSTOMER_LIST,
  INVALID_DATES_MESSAGE,
  INVALID_PERSONS_MESSAGE,
  INVALID_PRICE_MESSAGE,
  NO_CUSTOMER_SELECTED_MESSAGE,
  DELETE_RESERVATION_MESSAGE,
  GET_CUSTOMER_RESERVATIONS,
  DELETE_RESERVATION,
  SEARCH_CUSTOMER_BY_NAME,
  DELETE_CUSTOMER,
  SUBMIT_CUSTOMER_FORM_SUCCESS,
  GET_RESERVATION,
  EDIT_RESERVATION_FORM_SUCCESS,
  GET_CUSTOMER,
  EDIT_CUSTOMER_FORM_SUCCESS,
  GET_RESERVATION_LIST,
  SEARCH_RESERVATION_BY_CUSTOMER_NAME,
  DELETE_CUSTOMER_MESSAGE,
  GET_DATE_INTERVALS,
  DELETE_DATE_INTERVAL,
  SUBMIT_DATE_INTERVAL_FORM_SUCCESS,
  DELETE_DATE_INTERVAL_MESSAGE_SUCCESS,
  SAVE_DATE_INTERVAL,
  GET_DEFAULT_PRICE,
  UPDATE_DEFAULT_PRICE,
  UPDATE_DEFAULT_PRICE_MESSAGE
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
          type: RESERVATION_FORM_UNAVAILABLE_DATES
        });
      }
    })
    .catch(err => {
      console.log("error", err);
    });
};

export const deleteReservation = reservationId => dispatch => {
  axios.delete(`/api/reservations/${reservationId}`).then(() => {
    dispatch({ type: DELETE_RESERVATION_MESSAGE });
    dispatch({ type: DELETE_RESERVATION, payload: reservationId });
  });
};

export const getCustomerList = () => dispatch => {
  axios.get("/api/customers").then(res => {
    dispatch({ type: GET_CUSTOMER_LIST, payload: res.data });
  });
};

export const getCustomerReservations = () => dispatch => {
  axios.get("/api/customerReservations").then(res => {
    dispatch({ type: GET_CUSTOMER_RESERVATIONS, payload: res.data });
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

export const searchCustomerByName = query => dispatch => {
  axios.get(`/api/search?name=${query}`).then(res => {
    dispatch({ type: SEARCH_CUSTOMER_BY_NAME, payload: res.data });
  });
};

export const deleteCustomer = customerId => dispatch => {
  axios.delete(`/api/customers/${customerId}`).then(() => {
    dispatch({ type: DELETE_CUSTOMER, payload: customerId });
    dispatch({ type: DELETE_CUSTOMER_MESSAGE });
  });
};

export const submitCustomerForm = (customerData, resetForm) => dispatch => {
  axios.post("/api/customers/", customerData).then(() => {
    resetForm();
    dispatch({ type: SUBMIT_CUSTOMER_FORM_SUCCESS });
  });
};

export const getReservation = selectedReservationId => dispatch => {
  axios.get(`/api/reservations/${selectedReservationId}`).then(res => {
    dispatch({
      type: GET_RESERVATION,
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
        type: EDIT_RESERVATION_FORM_SUCCESS
      });
      history.push("/customer/dashboard/landing");
    } else {
      dispatch({ type: RESERVATION_FORM_UNAVAILABLE_DATES });
    }
  });
};

export const getCustomer = customerId => dispatch => {
  axios.get(`/api/customers/${customerId}`).then(res => {
    dispatch({ type: GET_CUSTOMER, payload: res.data });
  });
};

export const editCustomer = customerData => dispatch => {
  axios.put(`/api/customers/${customerData._id}`, customerData).then(() => {
    dispatch({ type: EDIT_CUSTOMER_FORM_SUCCESS });
  });
};

export const getReservationList = () => dispatch => {
  axios.get("/api/reservations").then(res => {
    dispatch({ type: GET_RESERVATION_LIST, payload: res.data });
  });
};

export const searchReservationByCustomerName = query => dispatch => {
  axios.get(`/api/reservationSearch?name=${query}`).then(res => {
    dispatch({ type: SEARCH_RESERVATION_BY_CUSTOMER_NAME, payload: res.data });
  });
};

export const getDateIntervals = () => dispatch => {
  axios.get("/api/dateIntervals").then(res => {
    dispatch({ type: GET_DATE_INTERVALS, payload: res.data });
  });
};

export const deleteDateInterval = dateIntervalId => dispatch => {
  axios.delete(`/api/dateIntervals/${dateIntervalId}`).then(() => {
    dispatch({ type: DELETE_DATE_INTERVAL_MESSAGE_SUCCESS });
    dispatch({ type: DELETE_DATE_INTERVAL, payload: dateIntervalId });
  });
};

export const saveDateInterval = dateInterval => dispatch => {
  axios.post("/api/dateIntervals", dateInterval).then(res => {
    dispatch({ type: SUBMIT_DATE_INTERVAL_FORM_SUCCESS });
    dispatch({ type: SAVE_DATE_INTERVAL, payload: res.data });
  });
};

export const getDefaultPrice = () => dispatch => {
  axios.get("/api/defaultPrice").then(res => {
    dispatch({ type: GET_DEFAULT_PRICE, payload: res.data });
  });
};

export const updateDefaultPrice = newPrice => dispatch => {
  axios.post("/api/defaultPrice", newPrice).then(res => {
    dispatch({ type: UPDATE_DEFAULT_PRICE, payload: res.data });
    dispatch({ type: UPDATE_DEFAULT_PRICE_MESSAGE });
  });
};
