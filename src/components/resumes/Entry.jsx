import { entry as entryValidations } from "./helpers/validations";
import { postResume } from "./ResumesAPI.js";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import "./Entry.css";

function Entry() {
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
        history.push("/resumes/entry");
      } else {
        alert("Success! Welcome to TeamUp!");
        history.push("/");
        return result;
      }
    },
    validationSchema: entryValidations(),
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

export default Entry;
