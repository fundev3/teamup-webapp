import { IsEmpty, ValidateLength } from "../functions";

export const projectFormValidations = (values) => {
  const { name, description, contact } = values;
  const errors = {};

  if (IsEmpty(name)) {
    errors.name = "Introduce the name off the project";
  } else if (ValidateLength(name, 15, ">")) {
    errors.name = "Must be 15 characters or less";
  }

  if (IsEmpty(description)) {
    errors.description = "Tell a little about your project";
  } else if (ValidateLength(description, 150, ">")) {
    errors.description = "Must be 150 characters or less";
  }

  if (IsEmpty(contact)) {
    errors.contact = "Introduce the email contact";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(contact)) {
    errors.contact = "Invalid email address";
  }

  return errors;
};
