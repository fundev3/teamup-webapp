import Loading from "./Loading";
import ModalSkills from "./ModalSkills";
import NotFound from "./NotFound";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import avatar from "../../assets/img_avatar.jpg";
import { entry as entryValidations } from "./helpers/validations";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import {
  Button,
  Chip,
  Grid,
  IconButton,
  InputBase,
  Paper,
} from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getResume, getSkillsByName } from "./ResumesAPI.js";
import "./Details.css";

const useStyles = makeStyles((theme) => ({
  divider: {
    height: 28,
    margin: 4,
  },
  iconButton: {
    padding: 10,
  },
  input: {
    flex: 1,
    marginLeft: theme.spacing(1),
  },
  paper: {
    color: theme.palette.text.secondary,
    padding: theme.spacing(4),
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
    },
  },
  searchBoxContainer: {
    alignItems: "center",
    display: "flex",
    marginBottom: "15px",
    padding: "2px 4px",
    width: "100%",
  },
}));

function Details() {
  let { id } = useParams();
  const classes = useStyles();
  const handleDelete = () => {};
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [stateButton, setStateButton] = useState("Edit");
  const [disabled, setDisabled] = useState(true);
  const [skillInput, setSkillInput] = useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const [dataSkills, setDataSkills] = React.useState([]);
  const handleClickOpen = () => {
    setOpenModal(true);
  };

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
    if (disabled) {
      setStateButton("Save");
      setDisabled(false);
    } else {
      setStateButton("Edit");
      setDisabled(true);
    }
  };
  const getSkills = async (event) => {
    event.preventDefault();
    const response = await getSkillsByName(skillInput);
    setDataSkills(response.data);
    handleClickOpen();
  };

  const initialValues = {
    birthdate: data?.personalInformation?.birthdate || "",
    direction: data?.contact?.direction || "",
    email: data?.contact?.email || "",
    firstName: data?.personalInformation?.firstName || "",
    lastName: data?.personalInformation?.lastName || "",
    phone: data?.contact?.phone || "",
    skills: data?.skills || [],
    summary: data?.summary || "",
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onSubmit: edit,
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
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
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
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
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
              variant="standard"
            />
          </div>
          <div>
            <TextField
              defaultValue={data.contact.phone}
              disabled={disabled}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
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
              variant="standard"
            />
            <TextField
              defaultValue="2017-05-24"
              disabled={disabled}
              error={
                formik.touched.birthdate && Boolean(formik.errors.birthdate)
              }
              id="birthdate"
              label="Birthdate"
              name="birthdate"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="date"
              variant="standard"
            />
          </div>
          <div>
            <TextField
              defaultValue={data.contact.direction}
              disabled={disabled}
              error={
                formik.touched.direction && Boolean(formik.errors.direction)
              }
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
              variant="standard"
            />
          </div>
          <div>
            <TextField
              defaultValue={data.contact.email}
              disabled={disabled}
              error={formik.touched.email && Boolean(formik.errors.email)}
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
              variant="standard"
            />
          </div>
          <div>
            <TextField
              defaultValue={data.summary}
              disabled={disabled}
              error={formik.touched.summary && Boolean(formik.errors.summary)}
              fullWidth
              helperText={
                formik.touched.summary && formik.errors.summary
                  ? formik.errors.summary
                  : ""
              }
              id="summary"
              label="Summary"
              maxRows={4}
              multiline
              name="summary"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              rows={2}
              variant="standard"
            />
          </div>
          <div className="skills-side">
            <p>Skills</p>
            <Paper className={classes.searchBoxContainer} component="form">
              <InputBase
                className={classes.input}
                disabled={disabled}
                inputProps={{ "aria-label": "search google maps" }}
                onChange={(event) => setSkillInput(event.target.value)}
                placeholder="Search Skills"
              />
              <IconButton
                aria-label="search"
                className={classes.iconButton}
                disabled={disabled}
                onClick={getSkills}
                type="submit"
              >
                <SearchIcon />
              </IconButton>
              {openModal ? (
                <ModalSkills
                  allInfoData={data}
                  data={data.skills}
                  dataSkills={dataSkills}
                  idUser={id}
                  setData={setData}
                  setOpenModal={setOpenModal}
                ></ModalSkills>
              ) : null}
            </Paper>
            {data.skills.map((skill) => (
              <Chip
                className="chip"
                key={skill.id}
                label={skill.name}
                onDelete={stateButton === "Save" ? handleDelete : null}
              />
            ))}
          </div>
        </form>
        <Grid
          className="footer"
          container
          direction="row"
          justifyContent="center"
        >
          <Button color="primary" onClick={edit} variant="contained">
            {stateButton}
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
