/**
 * Components Material UI
 */
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
/**
 * Hook for handle form
 */
import { useFormik } from "formik";

import { projectFormValidations } from "./ProjectFormValidations";
import "./ProjectForm.scss";

function ProjectForm() {
  const formik = useFormik({
    initialValues: {
      name: "",
      contact: "",
      description: "",
    },
    validate: projectFormValidations,
    // --> Waiting for API
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const hasErrorName = !!formik.touched.name && !!formik.errors.name;
  const hasErrorContact = !!formik.touched.contact && !!formik.errors.contact;
  const hasErrorDescription =
    !!formik.touched.description && !!formik.errors.description;

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
          error={hasErrorName}
          helperText={hasErrorName ? formik.errors.name : ""}
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
          error={hasErrorContact}
          helperText={hasErrorContact ? formik.errors.contact : ""}
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
          error={hasErrorDescription}
          helperText={hasErrorDescription ? formik.errors.description : ""}
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
