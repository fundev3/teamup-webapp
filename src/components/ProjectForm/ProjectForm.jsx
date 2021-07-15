import { useFormik } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./ProjectForm.scss";

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Introduce the name off the project";
  } else if (values.name.length > 15) {
    errors.name = "Must be 15 characters or less";
  }

  if (!values.description) {
    errors.description = "Tell a little about your project";
  } else if (values.description.length > 150) {
    errors.description = "Must be 150 characters or less";
  }

  if (!values.contact) {
    errors.contact = "Introduce the email contact";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.contact)
  ) {
    errors.contact = "Invalid email address";
  }

  return errors;
};

function ProjectForm() {
  const formik = useFormik({
    initialValues: {
      name: "",
      contact: "",
      description: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form
      className="container-form"
      onSubmit={formik.handleSubmit}
      noValidate
      autoComplete="off"
    >
      <h1 className="container-form__title">Create Project</h1>
      <p>Make your project know and hire the best resumes for it.</p>

      <div className="u-mb-1">
        <TextField
          id="name"
          label="Name"
          name="name"
          type="text"
          variant="outlined"
          error={formik.touched.name && formik.errors.name}
          helperText={
            formik.touched.name && formik.errors.name ? formik.errors.name : ""
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
      </div>

      <div className="u-mb-1">
        <TextField
          id="contact"
          label="Contact"
          name="contact"
          type="email"
          variant="outlined"
          error={formik.touched.contact && formik.errors.contact}
          helperText={
            formik.touched.contact && formik.errors.contact
              ? formik.errors.contact
              : ""
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.contact}
        />
      </div>

      <div className="u-mb-1">
        <TextField
          multiline
          rows={4}
          id="description"
          label="Description"
          name="description"
          variant="outlined"
          error={formik.touched.description && formik.errors.description}
          helperText={
            formik.touched.description && formik.errors.description
              ? formik.errors.description
              : ""
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
      </div>

      <Button type="submit" variant="contained" color="primary">
        Create
      </Button>
    </form>
  );
}
export default ProjectForm;
