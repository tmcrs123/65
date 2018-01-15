/**
 * action creator is a function that
 * returns and object with {type,payload}
 */

import axios from "axios";

import {
  FETCH_ADMIN,
  AUTH_ADMIN,
  AUTH_ERROR_ADMIN,
  RESET_ADMIN_AUTH_ERROR,
  GET_RESERVATIONS,
  GET_CUSTOMER_LIST,
  SEARCH_CUSTOMER_BY_NAME,
  DELETE_CUSTOMER,
  ADMIN_SELECTED_CUSTOMER,
  ADMIN_EDIT_CUSTOMER_SUBMIT_SUCCESS,
  CLEAR_ADMIN_MESSAGE,
  ADMIN_SAVE_CUSTOMER_SUBMIT_SUCCESS
} from "./types.js";

export const fetchAdmin = () => dispatch => {
  axios.get("/api/current_admin").then(res => {
    dispatch({ type: FETCH_ADMIN, payload: res.data });
  });
};

export const authAdmin = (loginInfo, history) => dispatch => {
  axios
    .post("/api/admin/login", loginInfo)
    .then(res => {
      history.push("/");
      dispatch({ type: AUTH_ADMIN, payload: res.data });
    })
    .catch(err => {
      dispatch({
        type: AUTH_ERROR_ADMIN,
        payload: { authError: true }
      });
    });
};

export const resetAuthError = () => {
  return { type: RESET_ADMIN_AUTH_ERROR };
};

export const getReservations = () => dispatch => {
  axios.get("/api/reservations").then(res => {
    dispatch({ type: GET_RESERVATIONS, payload: res.data });
  });
};

export const getCustomerList = () => dispatch => {
  axios.get("/api/customers").then(res => {
    dispatch({ type: GET_CUSTOMER_LIST, payload: res.data });
  });
};

export const searchCustomerByName = query => dispatch => {
  axios.get(`/api/search?name=${query}`).then(res => {
    dispatch({ type: SEARCH_CUSTOMER_BY_NAME, payload: res.data });
  });
};

export const deleteCustomer = customerId => dispatch => {
  axios
    .delete(`/api/customers/${customerId}`)
    .then(() => dispatch({ type: DELETE_CUSTOMER, payload: customerId }));
};

export const getCustomer = customerId => dispatch => {
  axios.get(`/api/customers/${customerId}`).then(res => {
    dispatch({ type: ADMIN_SELECTED_CUSTOMER, payload: res.data });
  });
};

export const editCustomer = customerData => dispatch => {
  axios.put(`/api/customers/${customerData._id}`, customerData).then(() => {
    dispatch({ type: ADMIN_EDIT_CUSTOMER_SUBMIT_SUCCESS });
  });
};

export const clearAdminMessage = () => {
  return { type: CLEAR_ADMIN_MESSAGE };
};

export const saveCustomer = (customerData, resetForm) => dispatch => {
  axios.post("/api/customers/", customerData).then(() => {
    resetForm();
    dispatch({ type: ADMIN_SAVE_CUSTOMER_SUBMIT_SUCCESS });
  });
};
