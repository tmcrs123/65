import { SubmissionError } from "redux-form";
import { formFields } from "../formFields/shared/createReservationFormFields";

export default function validateCreateReservationForm(
  formData,
  sendInvalidDatesMessage,
  sendInvalidPersonsMessage,
  sendInvalidPriceMessage
) {
  const validationErrors = false;

  const { startDate, endDate, numberAdults, numberChildrens } = formData;

  const totalPersons = numberAdults + numberChildrens;

  formFields.forEach(field => {
    if (field.required && formData[field.name] === undefined) {
      const fieldName = field.name;
      throw new SubmissionError({
        [fieldName]: `Plase select a ${field.label}`
      });
    }
  });

  if (!formData.customerId) {
    throw new SubmissionError({
      _error: "A reservation must have a customer."
    });
  }

  if (isNaN(formData["price"]) || isNaN(formData["payNow"])) {
    sendInvalidPriceMessage();
    throw new SubmissionError({
      _error: "You must insert a valid price."
    });
  }

  if (startDate > endDate) {
    sendInvalidDatesMessage();
    throw new SubmissionError({
      _error: "Start date cannot be a date after the end date."
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
