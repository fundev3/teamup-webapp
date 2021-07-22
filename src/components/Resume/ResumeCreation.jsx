import * as Yup from "yup";
import { postResume } from "./ResumeCreationApi.js";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import "./ResumeCreation.css";

const validationSchema = Yup.object({
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
    .min(20, "Bio description is too short - should be 20 characters minimum")
    .matches(
      /^[A-Za-z  .,']*$/g,
      "Numbers and special characters are not allowed @()-*$#!+=^&"
    )
    .max(150, "Please enter a summary with 150 characters or less")
    .required("Bio description field is required"),
});

function ResumeCreation() {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      birthdate: "",
      direction: "",
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      summary: "",
    },
    onSubmit: async (values) => {
      const result = await postResume(values);
      if (!result.ok) {
        history.push("/resumecreation");
      } else {
        alert("Success! Welcome to TeamUp!");
        history.push("/");
        return result;
      }
    },
    validationSchema,
  });

  return (
    <div className="container-creation-resume">
      <div className="container-left">
        <h1>Hello, there!</h1>
        <h2 id="subtitle">Let's build your profile</h2>
      </div>
      <form className="container-right" onSubmit={formik.handleSubmit}>
        <div className="label">
          <h3>Name</h3>
          <TextField
            error={formik.touched.firstName && formik.errors.firstName}
            helperText={
              formik.touched.firstName && formik.errors.firstName
                ? formik.errors.firstName
                : ""
            }
            id="firstName"
            name="firstName"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder="Your name"
            type="text"
            value={formik.values.firstName}
          />
        </div>
        <div className="label">
          <h3>Last Name</h3>
          <TextField
            error={formik.touched.lastName && formik.errors.lastName}
            helperText={
              formik.touched.lastName && formik.errors.lastName
                ? formik.errors.lastName
                : ""
            }
            id="lastName"
            name="lastName"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder="Your last name"
            type="text"
            value={formik.values.lastName}
          />
        </div>
        <div className="label">
          <h3>Date of birth</h3>
          <TextField
            error={formik.touched.birthdate && formik.errors.birthdate}
            helperText={
              formik.touched.birthdate && formik.errors.birthdate
                ? formik.errors.birthdate
                : ""
            }
            id="birthdate"
            name="birthdate"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder="dd/mm/yyyy"
            type="text"
            value={formik.values.birthdate}
          />
        </div>
        <div className="label">
          <h3>Address</h3>
          <TextField
            error={formik.touched.direction && formik.errors.direction}
            helperText={
              formik.touched.direction && formik.errors.direction
                ? formik.errors.direction
                : ""
            }
            id="direction"
            name="direction"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder="Your Address"
            type="text"
            value={formik.values.direction}
          />
        </div>
        <div className="label">
          <h3>Email Address</h3>
          <TextField
            error={formik.touched.email && formik.errors.email}
            helperText={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""
            }
            id="email"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder="Your email address"
            type="email"
            value={formik.values.email}
          />
        </div>
        <div className="label">
          <h3>Phone Number</h3>
          <TextField
            error={formik.touched.phone && formik.errors.phone}
            helperText={
              formik.touched.phone && formik.errors.phone
                ? formik.errors.phone
                : ""
            }
            id="phone"
            name="phone"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder="Your Phone Number"
            type="number"
            value={formik.values.phone}
          />
        </div>
        <div className="label">
          <h3>Add Bio</h3>
          <TextField
            error={formik.touched.summary && formik.errors.summary}
            helperText={
              formik.touched.summary && formik.errors.summary
                ? formik.errors.summary
                : ""
            }
            id="summary"
            maxRows={4}
            multiline
            name="summary"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder="Enter a brief description of you. 
            Describe your professional skills and experience."
            value={formik.values.summary}
            variant="outlined"
          />
        </div>
        <div className="bottom">
          <Button color="primary" type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ResumeCreation;
