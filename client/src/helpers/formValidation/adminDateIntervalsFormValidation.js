import { SubmissionError } from "redux-form";
const formFields = [
  {
    name: "startDate",
    label: "start date",
    required: true
  },
  {
    name: "endDate",
    label: "end date",
    required: true
  },
  {
    name: "price",
    label: "price",
    required: true
  }
];

export default function validate(
  formData,
  sendInvalidDatesMessage,
  sendInvalidPriceMessage
) {
  const validationErrors = false;

  const { startDate, endDate } = formData;

  formFields.forEach(field => {
    if (field.required && formData[field.name] === undefined) {
      const fieldName = field.name;
      throw new SubmissionError({
        [fieldName]: `Plase select a ${field.label}`
      });
    }
  });

  if (isNaN(formData["price"])) {
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

  return validationErrors;
}
