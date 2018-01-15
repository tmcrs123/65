import axios from "axios";

import {
  FETCH_USER,
  LOGIN_USER,
  WRONG_LOGIN_MESSAGE,
  CLEAR_MESSAGE
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
      console.log("in ctach");
      dispatch({ type: WRONG_LOGIN_MESSAGE });
    });
};

export const clearMessage = () => {
  return { type: CLEAR_MESSAGE };
};
