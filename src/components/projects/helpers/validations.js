import * as Yup from "yup";

export const entry = () =>
  Yup.object({
    description: Yup.string()
      .max(160, "Must be 20 characters or less")
      .required("Tell a little about your project"),
    logo: Yup.string()
      .min(1, "Must be 1 characters or more")
      .max(200, "Must be 200 characters or less")
      .required("Upload your logo"),
    name: Yup.string()
      .min(3, "Must be 3 characters or more")
      .max(15, "Must be 15 characters or less")
      .required("Introduce the name off the project"),
    textInvitation: Yup.string()
      .max(160, "Must be 160 characters or less")
      .required("Write a text invitation"),
  });
