import { SubmissionError } from "redux-form";
import customerCreateReservationFormFields from "../../formFields/customerForms/customerCreateReservationFormFields.js";

export function disableWeekends(date) {
  if (date.getTime() < Date.now()) return true;
  return false;
}

export function validateCustomerCreateReservationForm(values) {
  const validationErrors = false;

  const { startDate, endDate, numberAdults, numberChildrens } = values;

  const totalPersons = numberAdults + numberChildrens;

  customerCreateReservationFormFields.forEach(field => {
    if (field.required && !values[field.name]) {
      const fieldName = field.name;
      throw new SubmissionError({
        [fieldName]: `Plase insert a ${field.label}`,
        _error: "Reservation NOT created!"
      });
    }
  });

  if (startDate > endDate) {
    throw new SubmissionError({
      _error: "Start date cannot be a date after the end date!"
    });
  }

  if (totalPersons > 4) {
    throw new SubmissionError({
      _error: "The maximum number of persons allowed is 4"
    });
  }

  return validationErrors;
}
