import { GET_RESERVATION } from "../actions/types";
import moment from "moment";

function parseDate(string) {
  if (string === "") {
    return new Date();
  }

  let test = moment(string);
  return test._d;
}

export default (state = {}, action) => {
  switch (action.type) {
    case GET_RESERVATION:
      let reservation = action.payload;
      reservation.startDate = parseDate(reservation.startDate);
      reservation.endDate = parseDate(reservation.endDate);
      return reservation;
    default:
      return state;
  }
};
