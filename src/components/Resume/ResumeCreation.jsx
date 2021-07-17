import { Button, TextField } from "@material-ui/core";
import "./ResumeCreation.css";
import companylogo from "../../assets/company-logo.png";
import { useFormik } from "formik";
import { PostResume } from "./ResumeCreationApi.js";
import { Link, useHistory } from "react-router-dom";

const validate = (values) => {
  const errors = {};

  if (!values.firstname) {
    errors.firstname = "Name field is required";
  } else if (values.firstname.length > 15) {
    errors.firstname = "Please enter a name with 10 characters or less";
  }
  if (!values.lastname) {
    errors.lastname = "Lastname field is required";
  } else if (values.lastname.length > 15) {
    errors.lastname = "Please enter a lastname with 10 characters or less";
  }
  if (!values.email) {
    errors.email = "Email field is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.phone) {
    errors.phone = "Phone number field is required";
  } else if (values.phone < 60000000 || values.phone >= 80000000) {
    errors.phone = "Please enter a valid phone number with 8 characters";
  }
  if (!values.summary) {
    errors.summary = "Bio description field is required";
  } else if (values.summary.length > 150) {
    errors.summary = "Please enter a description with 150 characters or less";
  }
  return errors;
};

function ResumeCreation() {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      summary: "",
    },
    validate,
    onSubmit: (values) => {
      PostResume(values).then((result) => {
        if (!result) {
          history.push("/resumecreation");
        } else {
          alert("Success! Welcome to TeamUp!");
          return result;
        }
      });
      history.push("/");
    },
  });

  return (
    <div className="container-creation-resume">
      <div className="header">
        <img src={companylogo} alt="logo" className="logo"></img>
        <Link to="/" style={{ textDecoration: "none", color: "#000000" }}>
          <h2>App Name</h2>
        </Link>
      </div>
      <div className="body">
        <div className="container-left">
          <h1>Hello, there!</h1>
          <h2 id="subtitle">Let's build your profile</h2>
        </div>
        <form onSubmit={formik.handleSubmit} className="container-right">
          <div className="label">
            <h3>Name</h3>
            <TextField
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstname}
              id="firstname"
              name="firstname"
              type="text"
              error={formik.touched.firstname && formik.errors.firstname}
              placeholder="Your name"
              helperText={
                formik.touched.firstname && formik.errors.firstname
                  ? formik.errors.firstname
                  : ""
              }
            ></TextField>
          </div>
          <div className="label">
            <h3>Last Name</h3>
            <TextField
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastname}
              id="lastname"
              name="lastname"
              type="text"
              error={formik.touched.lastname && formik.errors.lastname}
              placeholder="Your last name"
              helperText={
                formik.touched.lastname && formik.errors.lastname
                  ? formik.errors.lastname
                  : ""
              }
            ></TextField>
          </div>
          <div className="label">
            <h3>Email Address</h3>
            <TextField
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              id="email"
              name="email"
              type="email"
              error={formik.touched.email && formik.errors.email}
              placeholder="Your email address"
              helperText={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : ""
              }
            ></TextField>
          </div>
          <div className="label">
            <h3>Phone Number</h3>
            <TextField
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              id="phone"
              name="phone"
              type="number"
              error={formik.touched.phone && formik.errors.phone}
              placeholder="Your Phone Number"
              helperText={
                formik.touched.phone && formik.errors.phone
                  ? formik.errors.phone
                  : ""
              }
            ></TextField>
          </div>
          <div className="label">
            <h3>Add Bio</h3>
            <TextField
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.summary}
              maxRows={4}
              multiline
              variant="outlined"
              id="summary"
              name="summary"
              error={formik.touched.summary && formik.errors.summary}
              placeholder="Enter a brief description of you. 
              Describe your professionalskills and experience."
              helperText={
                formik.touched.summary && formik.errors.summary
                  ? formik.errors.summary
                  : ""
              }
            ></TextField>
          </div>
          <div className="bottom">
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResumeCreation;
