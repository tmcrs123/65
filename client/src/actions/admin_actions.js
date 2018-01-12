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
  GET_RESERVATIONS
} from "./types.js";

export const fetchAdmin = () => dispatch => {
  axios.get("/api/current_admin").then(res => {
    console.log("got from db", res.data);
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
