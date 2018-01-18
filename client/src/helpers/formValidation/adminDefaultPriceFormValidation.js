import { SubmissionError } from "redux-form";
const formFields = [
  {
    name: "price",
    label: "price",
    required: true
  }
];

export default function validate(formData, sendInvalidPriceMessage) {
  const validationErrors = false;

  console.log("form data", formData["price"] === 0);

  formFields.forEach(field => {
    if (field.required && formData[field.name] === undefined) {
      const fieldName = field.name;
      throw new SubmissionError({
        [fieldName]: `Plase select a ${field.label}`
      });
    }
  });

  if (formData["price"] === 0 || isNaN(formData["price"])) {
    sendInvalidPriceMessage();
    throw new SubmissionError({
      _error: "You must insert a valid price."
    });
  }

  return validationErrors;
}
