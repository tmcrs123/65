import { CUSTOMER_SELECTED_RESERVATION } from "../../actions/types.js";
import { parseDate } from "../../helpers/formHelpers/customerForms/customerEditReservationFormHelper.js";

export default (state = {}, action) => {
  switch (action.type) {
    case CUSTOMER_SELECTED_RESERVATION:
    case CUSTOMER_SELECTED_RESERVATION:
      let selectedReservation = action.payload;
      selectedReservation.startDate = parseDate(selectedReservation.startDate);
      selectedReservation.endDate = parseDate(selectedReservation.endDate);
      return selectedReservation;
    default:
      return state;
  }
};
