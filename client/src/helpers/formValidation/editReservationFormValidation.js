import { SubmissionError } from "redux-form";

export const formFields = [
  {
    name: "startDate",
    label: "Start Date",
    required: true
  },
  {
    name: "endDate",
    label: "End Date",
    required: true
  },
  {
    name: "price",
    label: "Price",
    required: true
  },
  {
    name: "price_paid",
    required: false
  },
  {
    name: "numberAdults",
    label: "Number of Adults",
    required: true
  },
  {
    name: "numberChildrens",
    label: "Number of Children",
    required: true
  },
  {
    name: "observations",
    label: "Observations",
    required: false
  },
  { name: "status", label: "Reservation Status", required: true }
];

export default function validate(
  formData,
  isAdmin,
  sendInvalidDatesMessage,
  sendInvalidPersonsMessage,
  sendInvalidPriceMessage,
  sendNoCustomerSelectedMessage,
  sendInvalidPricePaidMessage
) {
  const validationErrors = false;

  const {
    startDate,
    endDate,
    numberAdults,
    numberChildrens,
    price,
    price_paid
  } = formData;

  const totalPersons = numberAdults + numberChildrens;

  formFields.forEach(field => {
    if (
      field.required &&
      (formData[field.name] === undefined || formData[field.name] === "")
    ) {
      const fieldName = field.name;
      throw new SubmissionError({
        [fieldName]: `Plase select a ${field.label}`
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

  if (price_paid > price) {
    sendInvalidPricePaidMessage();
    throw new SubmissionError({
      _error: "Price paid exceeds price of the reservation."
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
