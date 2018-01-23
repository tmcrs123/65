import { SubmissionError } from "redux-form";

export const formFields = [
  {
    name: "customer",
    label: "Customer",
    required: true
  },
  {
    name: "startDate",
    label: "start-date",
    required: true
  },
  {
    name: "endDate",
    label: "end-date",
    required: true
  },
  {
    name: "price",
    label: "price",
    required: true
  },
  {
    name: "numberAdults",
    label: "number of adults",
    required: true
  },
  {
    name: "numberChildrens",
    label: "number of childrens",
    required: true
  },
  {
    name: "observations",
    label: "Observations",
    required: false
  }
];

export default function validate(
  formData,
  isAdmin,
  sendInvalidDatesMessage,
  sendInvalidPersonsMessage,
  sendInvalidPriceMessage,
  sendNoCustomerSelectedMessage,
  sendInvalidSameDateMessage
) {
  const validationErrors = false;

  const { startDate, endDate, numberAdults, numberChildrens } = formData;

  const totalPersons = numberAdults + numberChildrens;

  formFields.forEach(field => {
    if (field.required && formData[field.name] === undefined) {
      const fieldName = field.name;
      if (fieldName === "customer" && !isAdmin) return;
      throw new SubmissionError({
        [fieldName]: `Please select a ${field.label}`
      });
    }
  });

  if (isAdmin && !formData.customer) {
    sendNoCustomerSelectedMessage();
    throw new SubmissionError({
      _error: "A reservation must have a customer."
    });
  }

  if (isNaN(formData["price"])) {
    sendInvalidPriceMessage();
    throw new SubmissionError({
      _error: "You must insert a valid price."
    });
  }

  if (startDate.valueOf() == endDate.valueOf()) {
    sendInvalidSameDateMessage();
    throw new SubmissionError({
      _error: "Start date cannot be the same as end date."
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
