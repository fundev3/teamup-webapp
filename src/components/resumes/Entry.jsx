import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import DateFnsUtils from "@date-io/date-fns";
import { entry as entryValidations } from "./helpers/validations";
import { format } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import { postResume } from "./ResumesAPI.js";
import { useFormik } from "formik";
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { Link, useHistory } from "react-router-dom";
import "./Entry.css";

const useStyles = makeStyles({
  cancel: {
    margin: "10px",
    padding: "8px 22px",
  },
  cardTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  create: {
    margin: "10px",
    padding: "8px 22px",
  },
  field: {
    width: "100%",
  },
  head: {
    color: "#ED8749",
    fontSize: "2.2rem",
    fontWeight: "bold",
    margin: "40px 0px 40px 25px",
  },
  linkCancel: {
    color: "black",
    textDecoration: "none",
  },
});

function Entry() {
  const classes = useStyles();
  const history = useHistory();
  const [selectedDate, setSelectedDate] = useState(
    new Date("1995-05-10T00:00")
  );

  const handleDateChange = (date) => {
    debugger;
    setSelectedDate(date);
    formik.setFieldValue("birthdate", format(date, "dd/MM/yyyy"));
  };
  const formik = useFormik({
    initialValues: {
      address: "",
      birthdate: "",
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      summary: "",
    },
    onSubmit: async (values) => {
      const resume = {
        contact: {
          address: values.address,
          email: values.email,
          phone: values.phone,
        },
        creationDate: new Date().toDateString(),
        lastUpdate: new Date().toDateString(),
        person: {
          birthdate: new Date(values.birthdate).toISOString(),
          firstName: values.firstName,
          lastName: values.lastName,
          picture: null,
        },
        skills: [],
        summary: values.summary,
        title: values.firstName + " " + values.lastName,
      };
      await postResume(resume);
      history.push("/");
    },
    validationSchema: entryValidations(),
  });

  return (
    <>
      <Container className="create-resume-container">
        <Link className="back-resumes" to="/resumes">
          <ArrowBackIos></ArrowBackIos>
          Back
        </Link>
        <Typography className={classes.head} gutterBottom variant="h3">
          Let's get to know you!
        </Typography>
        <div>{formik.values.birthdate}</div>
        <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Paper className="paper-entry" elevation={1}>
              <div className="entry-content">
                <Typography
                  align="justify"
                  className={classes.cardTitle}
                  color="primary"
                  gutterBottom
                  variant="h6"
                >
                  Personal Information
                </Typography>
              </div>
              <div className="u-mb-1">
                <Typography align="justify" gutterBottom>
                  Name
                </Typography>
                <TextField
                  className={classes.field}
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
                  variant="outlined"
                />
              </div>
              <div className="u-mb-1">
                <Typography align="justify" gutterBottom>
                  Last Name
                </Typography>
                <TextField
                  className={classes.field}
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
                  variant="outlined"
                />
              </div>
              <div className="u-mb-1">
                <Typography align="justify" gutterBottom>
                  Date of birth
                </Typography>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    KeyboardButtonProps={{ "aria-label": "change date" }}
                    className={classes.field}
                    error={formik.touched.birthdate && formik.errors.birthdate}
                    format="dd/MM/yyyy"
                    helperText={
                      formik.touched.birthdate && formik.errors.birthdate
                        ? formik.errors.birthdate
                        : ""
                    }
                    id="birthdate"
                    label="Birthday"
                    margin="normal"
                    name="birthdate"
                    onBlur={formik.handleBlur}
                    onChange={handleDateChange}
                    value={selectedDate}
                    variant="outlined"
                  />
                </MuiPickersUtilsProvider>
              </div>
              <div className="u-mb-1">
                <Typography align="justify" gutterBottom>
                  Add Bio
                </Typography>
                <TextField
                  className={classes.field}
                  error={formik.touched.summary && formik.errors.summary}
                  helperText={
                    formik.touched.summary && formik.errors.summary
                      ? formik.errors.summary
                      : ""
                  }
                  id="summary"
                  maxRows={5}
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
            </Paper>
            <Paper className="paper-entry" elevation={1}>
              <div className="entry-content">
                <Typography
                  align="justify"
                  className={classes.cardTitle}
                  color="primary"
                  gutterBottom
                  variant="h5"
                >
                  Contact Information
                </Typography>
              </div>
              <div className="u-mb-1">
                <Typography align="justify" gutterBottom>
                  Address
                </Typography>
                <TextField
                  className={classes.field}
                  error={formik.touched.address && formik.errors.address}
                  helperText={
                    formik.touched.address && formik.errors.address
                      ? formik.errors.address
                      : ""
                  }
                  id="address"
                  name="address"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  placeholder="Your Address"
                  type="text"
                  value={formik.values.address}
                  variant="outlined"
                />
              </div>
              <div className="u-mb-1">
                <Typography align="justify" gutterBottom>
                  Email Address
                </Typography>
                <TextField
                  className={classes.field}
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
                  variant="outlined"
                />
              </div>
              <div className="u-mb-1">
                <Typography align="justify" gutterBottom>
                  Phone
                </Typography>
                <TextField
                  className={classes.field}
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
                  variant="outlined"
                />
              </div>
            </Paper>
          </Box>
          <Box display="flex" justifyContent="flex-end" marginBottom="40px">
            <Button className={classes.cancel} variant="contained">
              <Link className={classes.linkCancel} to="/resumes">
                Cancel
              </Link>
            </Button>
            <Button
              className={classes.create}
              color="primary"
              type="submit"
              variant="contained"
            >
              Create
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
}

export default Entry;
