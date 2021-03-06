import { SubmissionError } from "redux-form";
export const formFields = [
  {
    name: "name",
    label: "name",
    required: true
  },
  {
    name: "email",
    label: "email",
    required: true
  },
  {
    name: "phone",
    label: "phone",
    required: false
  },
  {
    name: "notes",
    label: "notes",
    required: false
  },
  {
    name: "blacklisted",
    required: false
  }
];

export function validate(formData) {
  formFields.forEach(field => {
    if (
      field.required &&
      (formData[field.name] === undefined || formData[field.name] === "")
    ) {
      const fieldName = field.name;

      throw new SubmissionError({
        [fieldName]: `Plase insert a ${field.label}`
      });
    }

    const email_re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email_re.test(formData["email"]) === false) {
      throw new SubmissionError({
        ["email"]: `Plase insert a valid email.`
      });
    }

    const phone_re = /^\d+$/;
    if (formData["phone"] && phone_re.test(formData["phone"]) === false) {
      throw new SubmissionError({
        ["phone"]: `A phone number can only contain digits`
      });
    }
  });
}
