import * as Yup from "yup";

export const projectFormValidations = () =>
  Yup.object({
    contact: Yup.string()
      .email("Invalid email address")
      .required("Introduce the email contact"),
    description: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Tell a little about your project"),
    name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Introduce the name off the project"),
  });
