import { useFormik } from "formik";
import "./ProjectForm.scss";

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Introduce the name of the project";
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
    <form className="container-form" onSubmit={formik.handleSubmit}>
      <h1 className="container-form__title">Create Project</h1>
      <p>Make your project know and hire the best resumes for it.</p>

      <div className="container-input">
        <input
          className="container-input__input"
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        <label
          htmlFor="name"
          className={`container-input__label ${
            formik.values.name && "container-input__label--active"
          }`}
        >
          Name:
        </label>
        {formik.touched.name && formik.errors.name ? (
          <small className="container-input__error">{formik.errors.name}</small>
        ) : null}
      </div>

      <div className="container-input">
        <input
          className="container-input__input"
          id="contact"
          name="contact"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.contact}
        />
        <label
          htmlFor="contact"
          className={`container-input__label ${
            formik.values.contact && "container-input__label--active"
          }`}
        >
          Contact:
        </label>
        {formik.touched.contact && formik.errors.contact ? (
          <small className="container-input__error">
            {formik.errors.contact}
          </small>
        ) : null}
      </div>

      <div className="container-input">
        <textarea
          className="container-input__input"
          id="description"
          name="description"
          rows="4"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        <label
          htmlFor="description"
          className={`container-input__label ${
            formik.values.description && "container-input__label--active"
          }`}
        >
          Description:
        </label>
        {formik.touched.description && formik.errors.description ? (
          <small className="container-input__error">
            {formik.errors.description}
          </small>
        ) : null}
      </div>

      <button className="btn">Create</button>
    </form>
  );
}
export default ProjectForm;
