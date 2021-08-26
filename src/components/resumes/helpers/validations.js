import * as Yup from "yup";

export const entry = () =>
  Yup.object({
    birthdate: Yup.string()
      .matches(
        /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
        "Please enter valid date of birth"
      )
      .required("Date of birth field is required"),
    direction: Yup.string()
      .min(3, "Address is too short - should be 3 characters minimum")
      .max(20, "Please enter an address with 20 characters or less")
      .required("Address field is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email field is required"),
    firstName: Yup.string()
      .min(3, "Name is too short - should be 3 characters minimum")
      .matches(/^[A-Za-z ]*$/, "Please enter valid name")
      .max(20, "Please enter a name with 20 characters or less")
      .required("Name field is required"),
    lastName: Yup.string()
      .min(3, "Lastname is too short - should be 3 characters minimum")
      .matches(/^[A-Za-z ]*$/, "Please enter valid lastname")
      .max(20, "Please enter a lastname with 20 characters or less")
      .required("Lastname field is required"),
    phone: Yup.string()
      .matches(/^[67]\d{7}$/g, "Invalid phone number")
      .required("Phone number field is required"),
    summary: Yup.string()
      .min(20, "Bio description is too short - should be 15 characters minimum")
      .matches(
        /^[A-Za-z  .,']*$/g,
        "Numbers and special characters are not allowed @()-*$#!+=^&"
      )
      .max(150, "Please enter a summary with 150 characters or less")
      .required("Bio description field is required"),
  });
