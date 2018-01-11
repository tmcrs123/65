import { SubmissionError } from "redux-form";
import { formFields } from "../../formFields/customerForms/customerCreateReservationFormFields.js";

export function disableWeekends(date) {
  if (date.getTime() < Date.now()) return true;
  return false;
}

export const style = {
  margin: 12
};

export function validateCustomerCreateReservationForm(
  values,
  sendInvalidDatesMessage,
  sendInvalidPersonsMessage
) {
  const validationErrors = false;

  const { startDate, endDate, numberAdults, numberChildrens } = values;

  const totalPersons = numberAdults + numberChildrens;

  formFields.forEach(field => {
    if (field.required && values[field.name] === undefined) {
      const fieldName = field.name;
      throw new SubmissionError({
        [fieldName]: `Plase insert a ${field.label}`
      });
    }
  });

  if (startDate > endDate) {
    sendInvalidDatesMessage();
    throw new SubmissionError({
      _error: "Start date cannot be a date after the end date!"
    });
  }

  if (totalPersons > 4) {
    sendInvalidPersonsMessage();
    throw new SubmissionError({
      _error: "The maximum number of persons allowed is 4"
    });
  }

  return validationErrors;
}
