import { Button, TextField } from "@material-ui/core";
import "./ResumeCreation.css";
import companylogo from "../../assets/company-logo.png";
import { useFormik } from "formik";
import { PostResume } from "./ResumeCreationApi.js";
import { Link, useHistory } from "react-router-dom";

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Name field is required";
  } else if (values.name.length > 10) {
    errors.name = "Please enter a name with 10 characters or less";
  }
  if (!values.lastname) {
    errors.lastname = "Lastname field is required";
  } else if (values.lastname.length > 15) {
    errors.lastname = "Please enter a lastname with 10 characters or less";
  }
  if (!values.title) {
    errors.title = "Job title field is required";
  } else if (values.title.length > 30) {
    errors.title = "Please enter a job title with 15 characters or less";
  }
  if (!values.description) {
    errors.description = "Bio description field is required";
  } else if (values.description.length > 150) {
    errors.description =
      "Please enter a description with 150 characters or less";
  }
  return errors;
};

function ResumeCreation() {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      title: "",
      description: "",
    },
    validate,
    onSubmit: (values) => {
      PostResume(values).then((result) => {
        return result;
      });
      alert("Success! Welcome to TeamUp!");
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
              value={formik.values.name}
              id="name"
              name="name"
              type="text"
              error={formik.touched.name && formik.errors.name}
              placeholder="Your name"
              helperText={
                formik.touched.name && formik.errors.name
                  ? formik.errors.name
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
            <h3>Your Title</h3>
            <TextField
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              id="title"
              name="title"
              type="text"
              error={formik.touched.title && formik.errors.title}
              placeholder="Eg: Full Stack Developer"
              helperText={
                formik.touched.title && formik.errors.title
                  ? formik.errors.title
                  : ""
              }
            ></TextField>
          </div>
          <div className="label">
            <h3>Add Bio</h3>
            <TextField
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              maxRows={4}
              multiline
              variant="outlined"
              id="description"
              name="description"
              error={formik.touched.description && formik.errors.description}
              placeholder="Enter a brief description of you. 
              Describe your professionalskills and experience."
              helperText={
                formik.touched.description && formik.errors.description
                  ? formik.errors.description
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
