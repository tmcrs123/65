/**
 * action creator is a function that
 * returns and object with {type,payload}
 */

import axios from "axios";
import { FETCH_CUSTOMER, AUTH_USER, AUTH_ERROR_USER } from "./types.js";

export const fetchCustomer = () => dispatch => {
  axios.get("/api/current_user").then(res => {
    dispatch({ type: FETCH_CUSTOMER, payload: res.data });
  });
};

export const authUser = (loginInfo, history) => dispatch => {
  axios
    .post("/api/admin/login", loginInfo)
    .then(res => {
      history.push("/");
      dispatch({ type: AUTH_USER, payload: res.data });
    })
    .catch(err => {
      dispatch({
        type: AUTH_ERROR_USER,
        payload: { authError: "Wrong Email or Password" }
      });
    });
};
