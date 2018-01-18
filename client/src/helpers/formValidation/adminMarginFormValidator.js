import { SubmissionError } from "redux-form";
const formFields = [
  {
    name: "margin",
    label: "margin",
    required: true
  }
];

export default function validate(formData, sendInvalidMarginMessage) {
  const validationErrors = false;

  formFields.forEach(field => {
    if (field.required && formData[field.name] === undefined) {
      const fieldName = field.name;
      throw new SubmissionError({
        [fieldName]: `Plase select a ${field.label}`
      });
    }
  });

  if (
    formData["margin"] > 100 ||
    formData["margin"] < 0 ||
    isNaN(formData["margin"])
  ) {
    sendInvalidMarginMessage();
    throw new SubmissionError({
      _error: "You must insert a valid margin."
    });
  }

  return validationErrors;
}
