import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { projectFormValidations } from "./ProjectFormValidations";
import { useFormik } from "formik";
import "./ProjectForm.scss";

function ProjectForm() {
  const formik = useFormik({
    initialValues: {
      contact: "",
      description: "",
      logo: "",
      name: "",
      textInvitation: "",
    },
    // --> Waiting for API
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: projectFormValidations(),
  });
  const hasErrorContact = !!formik.touched.contact && !!formik.errors.contact;
  const hasErrorDescription =
    !!formik.touched.description && !!formik.errors.description;
  const hasErrorLogo = !!formik.touched.logo && !!formik.errors.logo;
  const hasErrorName = !!formik.touched.name && !!formik.errors.name;
  const hasErrorTextInvitation =
    !!formik.touched.textInvitation && !!formik.errors.textInvitation;

  return (
    <form
      autoComplete="off"
      className="container-form"
      noValidate
      onSubmit={formik.handleSubmit}
    >
      <h1 className="container-form__title">Create Project</h1>
      <p>Make your project know and hire the best resumes for it.</p>

      <div className="u-mb-1">
        <TextField
          error={hasErrorName}
          helperText={hasErrorName ? formik.errors.name : ""}
          id="name"
          label="Name"
          name="name"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="text"
          value={formik.values.name}
          variant="outlined"
        />
      </div>

      <div className="u-mb-1">
        <TextField
          error={hasErrorLogo}
          helperText={hasErrorLogo ? formik.errors.logo : ""}
          id="logo"
          label="Logo"
          name="logo"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="text"
          value={formik.values.logo}
          variant="outlined"
        />
      </div>

      <div className="u-mb-1">
        <TextField
          error={hasErrorContact}
          helperText={hasErrorContact ? formik.errors.contact : ""}
          id="contact"
          label="Contact"
          name="contact"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="email"
          value={formik.values.contact}
          variant="outlined"
        />
      </div>

      <div className="u-mb-1">
        <TextField
          error={hasErrorDescription}
          helperText={hasErrorDescription ? formik.errors.description : ""}
          id="description"
          label="Description"
          multiline
          name="description"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          rows={4}
          value={formik.values.description}
          variant="outlined"
        />
      </div>

      <div className="u-mb-1">
        <TextField
          error={hasErrorTextInvitation}
          helperText={
            hasErrorTextInvitation ? formik.errors.textInvitation : ""
          }
          id="textInvitation"
          label="Text Invitation"
          multiline
          name="textInvitation"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          rows={2}
          value={formik.values.textInvitation}
          variant="outlined"
        />
      </div>

      <Button color="primary" type="submit" variant="contained">
        Create
      </Button>
    </form>
  );
}
export default ProjectForm;
