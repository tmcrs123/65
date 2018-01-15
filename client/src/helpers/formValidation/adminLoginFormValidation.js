const formFields = [
  { name: "email", label: "email", required: true },
  { name: "password", label: "password", required: true }
];

export default function validateAdminLoginFrom(formData) {
  const validationErrors = {};

  formFields.forEach(({ name }) => {
    if (!formData[name]) {
      validationErrors[name] = `Please insert a ${name}`;
    }
  });
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(formData.email) === false) {
    validationErrors.email = "Please insert a valid email";
  }

  return validationErrors;
}
