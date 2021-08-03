import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Loading from "./Loading";
import NotFound from "./NotFound";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import avatar from "../../assets/img_avatar.jpg";
import { entry as entryValidations } from "./helpers/validations";
import { getResume } from "./ResumesAPI.js";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import { Link, useHistory, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./Details.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    color: theme.palette.text.secondary,
    padding: theme.spacing(4),
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
    },
  },
}));

function Details() {
  let { id } = useParams();
  const classes = useStyles();
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [readOnly, setReadOnly] = useState(true);
  const [showEdit, setShowEdit] = useState("Edit");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await getResume(id);
      const data = response.data;
      const error = response.handlerError;
      setError(error);
      setData(data);
    }
    fetchData();
  }, [id]);

  const edit = (event) => {
    event.preventDefault();
    setReadOnly(!readOnly);
    if (readOnly) {
      setShowEdit("Save");
      setDisabled(false);
    } else {
      setShowEdit("Edit");
      setDisabled(true);
    }
  };

  const formik = useFormik({
    initialValues: {},
    validationSchema: entryValidations(),
  });

  if (error) return <NotFound />;
  return data ? (
    <Grid
      className={classes.content}
      container
      direction="row"
      justifyContent="center"
      style={{
        position: "absolute",
        top: "150px",
      }}
    >
      <Paper className={classes.paper}>
        <form autoComplete="off" className={classes.root} noValidate>
          <div>
            <img alt="" className="avatar-resume" src={avatar} />
          </div>
          <div>
            <TextField
              defaultValue={data.personalInformation.firstName}
              disabled={disabled}
              error={formik.touched.firstName && formik.errors.firstName}
              helperText={
                formik.touched.firstName && formik.errors.firstName
                  ? formik.errors.firstName
                  : ""
              }
              id="firstName"
              label="First Name"
              name="firstName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              variant="standard"
            />
            <TextField
              defaultValue={data.personalInformation.lastName}
              disabled={disabled}
              error={formik.touched.lastName && formik.errors.lastName}
              helperText={
                formik.touched.lastName && formik.errors.lastName
                  ? formik.errors.lastName
                  : ""
              }
              id="lastName"
              label="Last Name"
              name="lastName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
            />
          </div>
          <div>
            <TextField
              defaultValue={data.contact.phone}
              disabled={disabled}
              error={formik.touched.phone && formik.errors.phone}
              helperText={
                formik.touched.phone && formik.errors.phone
                  ? formik.errors.phone
                  : ""
              }
              id="phone"
              label="Phone"
              name="phone"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="number"
            />
            <TextField
              defaultValue={data.personalInformation.birthdate}
              disabled={disabled}
              label="Birthdate"
              variant="standard"
            />
          </div>
          <div>
            <TextField
              defaultValue={data.contact.direction}
              disabled={disabled}
              error={formik.touched.direction && formik.errors.direction}
              fullWidth
              helperText={
                formik.touched.direction && formik.errors.direction
                  ? formik.errors.direction
                  : ""
              }
              id="direction"
              label="Address"
              name="direction"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
            />
          </div>
          <div>
            <TextField
              defaultValue={data.contact.email}
              disabled={disabled}
              error={formik.touched.email && formik.errors.email}
              fullWidth
              helperText={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : ""
              }
              id="email"
              label="Email"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
            />
          </div>
          <div>
            <TextField
              defaultValue={data.summary}
              disabled={disabled}
              error={formik.touched.summary && formik.errors.summary}
              fullWidth
              helperText={
                formik.touched.summary && formik.errors.summary
                  ? formik.errors.summary
                  : ""
              }
              id="summary"
              label="Summary"
              margin="normal"
              maxRows={4}
              multiline
              name="summary"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              rows={2}
              variant="standard"
            />
          </div>
        </form>
        <Grid
          className="footer"
          container
          direction="row"
          justifyContent="center"
        >
          <Button color="primary" onClick={edit} variant="contained">
            {showEdit}
          </Button>
          <Link to="/resumes">
            <Button variant="contained">Cancel</Button>
          </Link>
        </Grid>
      </Paper>
    </Grid>
  ) : (
    <Loading />
  );
}
export default Details;
