import { CREATE_RESERVATION_FORM_SUBMIT_SUCCESS } from "../types";
import { CREATE_RESERVATION_FORM_SUBMIT_ERROR } from "../types";
import { CREATE_RESERVATION_FORM_UNAVAILABLE_DATES } from "../types";
import { FORM_CLEAR_MESSAGE } from "../types";
import { EDIT_RESERVATION_SUCCESS_MESSAGE } from "../types";
import { INVALID_DATES_MESSAGE } from "../types";
import { INVALID_PERSONS_MESSAGE } from "../types";
import { INVALID_PRICE_MESSAGE } from "../types";
import { DELETE_RESERVATION_SUCCESS } from "../types";

import axios from "axios";

export const submitReservationForm = (formData, resetForm) => dispatch => {
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

export const editReservationForm = (
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

export const clearMessage = () => {
  return { type: FORM_CLEAR_MESSAGE };
};
