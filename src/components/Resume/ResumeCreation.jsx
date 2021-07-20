import * as Yup from "yup";
import companylogo from "../../assets/company-logo.png";
import { postResume } from "./ResumeCreationApi.js";
import { useFormik } from "formik";
import { Button, TextField } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import "./ResumeCreation.css";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email field is required"),
  firstname: Yup.string()
    .min(3, "Name is too short - should be 3 characters minimum")
    .matches(/^[A-Za-z ]*$/, "Please enter valid name")
    .max(15, "Please enter a name with 15 characters or less")
    .required("Name field is required"),
  lastname: Yup.string()
    .min(5, "Lastname is too short - should be 5 characters minimum")
    .matches(/^[A-Za-z ]*$/, "Please enter valid lastname")
    .max(15, "Please enter a lastname with 15 characters or less")
    .required("Lastname field is required"),
  phone: Yup.string()
    .matches(/^[67]\d{7}$/g, "Invalid phone number")
    .required("Phone number field is required"),
  summary: Yup.string()
    .min(10, "Bio description is too short - should be 10 characters minimum")
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
      email: "",
      firstname: "",
      lastname: "",
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
      <div className="header">
        <img alt="logo" className="logo" src={companylogo} />
        <Link style={{ color: "#000000", textDecoration: "none" }} to="/">
          <h2>App Name</h2>
        </Link>
      </div>
      <div className="body">
        <div className="container-left">
          <h1>Hello, there!</h1>
          <h2 id="subtitle">Let's build your profile</h2>
        </div>
        <form className="container-right" onSubmit={formik.handleSubmit}>
          <div className="label">
            <h3>Name</h3>
            <TextField
              error={formik.touched.firstname && formik.errors.firstname}
              helperText={
                formik.touched.firstname && formik.errors.firstname
                  ? formik.errors.firstname
                  : ""
              }
              id="firstname"
              name="firstname"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Your name"
              type="text"
              value={formik.values.firstname}
            />
          </div>
          <div className="label">
            <h3>Last Name</h3>
            <TextField
              error={formik.touched.lastname && formik.errors.lastname}
              helperText={
                formik.touched.lastname && formik.errors.lastname
                  ? formik.errors.lastname
                  : ""
              }
              id="lastname"
              name="lastname"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Your last name"
              type="text"
              value={formik.values.lastname}
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
              Describe your professionalskills and experience."
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
    </div>
  );
}

export default ResumeCreation;
