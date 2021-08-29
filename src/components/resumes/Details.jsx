import ApplicationsSide from "./ApplicationsSide";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import InvitationsModal from "../invitations/InvitationsModalResumes";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import ModalSkills from "./ModalSkills";
import NotFound from "./NotFound";
import PhoneIcon from "@material-ui/icons/Phone";
import ProgressComponent from "../../common/ProgressComponent/ProgressComponent";
import ProjectsSide from "../projects/ProjectsSide";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import { entry as entryValidations } from "./helpers/validations";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import { userSingleImageSvg } from "../../constants/images";
import {
  Button,
  Chip,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
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
  headName: {
    "& .MuiInputBase-input": {
      borderColor: "yellow !important",
      color: "#4350af",
      fontSize: 23,
      fontWeight: "800",
      padding: 5,
    },
    "& .MuiInputBase-input.Mui-disabled": {
      color: "#4350af",
      fontSize: 23,
      fontWeight: "800",
      padding: 5,
    },
  },
  iconButton: {
    padding: 10,
  },
  information: {
    "& .MuiOutlinedInput-input": {
      padding: 5,
    },
  },
  informationEmail: {
    "& .MuiInputBase-input": {
      fontSize: 14,
      width: 250,
    },
    "& .MuiInputBase-input.Mui-disabled": {
      fontSize: 14,
      width: 250,
    },
  },
  input: {
    flex: 1,
    marginLeft: theme.spacing(1),
  },
  nameInput: {
    color: "#4350af",
    fontSize: "30px",
  },
  paper: {
    color: theme.palette.text.secondary,
    margin: "20px 0px",
    padding: theme.spacing(4),
    width: "1000px",
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
  const [modalInvitations, setModalInvitations] = React.useState(false);
  const [dataSkills, setDataSkills] = React.useState([]);
  const [refreshProjectsAndInvitations, setRefreshProjectsAndInvitations] =
    useState(false);
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
    if (skillInput !== "") {
      const response = await getSkillsByName(skillInput);
      setDataSkills(response.data);
      handleClickOpen();
    }
  };

  const initialValues = {
    birthdate:
      data?.person?.birthdate.split("T")[0].split("-").reverse().join("/") ||
      "",
    direction: data?.contact?.direction || "",
    email: data?.contact?.email || "",
    firstName: data?.person?.firstName || "",
    lastName: data?.person?.lastName || "",
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
  if (error)
    return (
      <NotFound message={"Sorry, we couldn't find this resume"} size={200} />
    );
  return data ? (
    <>
      {modalInvitations ? (
        <InvitationsModal
          idResume={id}
          setModalInvitations={setModalInvitations}
        />
      ) : null}
      <div className="back-button">
        <Link to="/resumes">
          <ArrowBackIos></ArrowBackIos>
          Back
        </Link>
      </div>
      <Grid
        className={classes.content}
        container
        direction="row"
        justifyContent="center"
        style={{
          position: "absolute",
          top: "15%",
        }}
      >
        <Paper className={classes.paper}>
          <div className="head-detail-resume">
            <div className="head-image">
              <img alt="" className="avatar-resume" src={userSingleImageSvg} />
            </div>
            <div className="head-detail">
              <div className="head-detail-name">
                <TextField
                  InputProps={{ disableUnderline: disabled }}
                  className={classes.headName}
                  defaultValue={`${data.person.firstName} ${data.person.lastName}`}
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
                  name="firstName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  placeholder="Your Name"
                  type="text"
                />
              </div>
              <div>
                <LocationOnIcon style={{ color: "ED8749" }} />
                <TextField
                  InputProps={{ disableUnderline: disabled }}
                  className={classes.information}
                  defaultValue={data.contact.address}
                  disabled={disabled}
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
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
                />
              </div>
            </div>
            <div className="head-detail-button">
              <Grid className="footer">
                <Button
                  className="buttonEdit"
                  color="primary"
                  onClick={() => setModalInvitations(true)}
                  startIcon={<MailOutlineIcon />}
                  variant="contained"
                >
                  {"Project Invitations"}
                </Button>
                <Button
                  className="buttonEdit"
                  color="primary"
                  onClick={edit}
                  variant="contained"
                >
                  {stateButton}
                </Button>
              </Grid>
            </div>
          </div>
          <div className="body-detail-resume">
            <div className="body-detail-information">
              <Typography color="primary" gutterBottom variant="h6">
                Information
              </Typography>
              <div className="detail-resume-information">
                <CalendarTodayIcon
                  className="icons"
                  style={{ color: "ED8749" }}
                />
                <TextField
                  InputProps={{ disableUnderline: disabled }}
                  className={classes.information}
                  defaultValue={data.person.birthdate
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("/")}
                  disabled={disabled}
                  error={
                    formik.touched.birthdate && Boolean(formik.errors.birthdate)
                  }
                  id="birthdate"
                  name="birthdate"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="detail-resume-information">
                <PhoneIcon className="icons" style={{ color: "ED8749" }} />
                <TextField
                  InputProps={{ disableUnderline: disabled }}
                  className={classes.information}
                  defaultValue={data.contact.phone}
                  disabled={disabled}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={
                    formik.touched.phone && formik.errors.phone
                      ? formik.errors.phone
                      : ""
                  }
                  id="phone"
                  name="phone"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="number"
                />
              </div>
              <div className="detail-resume-information">
                <MailOutlineIcon
                  className="icons"
                  style={{ color: "ED8749" }}
                />
                <TextField
                  InputProps={{ disableUnderline: disabled }}
                  className={classes.informationEmail}
                  defaultValue={data.contact.email}
                  disabled={disabled}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={
                    formik.touched.email && formik.errors.email
                      ? formik.errors.email
                      : ""
                  }
                  id="email"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  placeholder="Your Email"
                  type="email"
                />
              </div>
            </div>
            <div className="body-resume-biography">
              <Typography color="primary" gutterBottom variant="h6">
                Summary
              </Typography>
              <TextField
                InputProps={{ disableUnderline: disabled }}
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
                maxrows={10}
                multiline
                name="summary"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="Your Resume"
                rows={10}
              />
            </div>
          </div>
          <div className="skills-side">
            <Typography color="primary" gutterBottom variant="h6">
              Skills
            </Typography>
            <div className="resume-detail-searchbar">
              {!disabled ? (
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
              ) : null}
            </div>
            {data.skills.map((skill) => (
              <Chip
                className="chip"
                key={skill.id}
                label={skill.name}
                onDelete={stateButton === "Save" ? handleDelete : null}
              />
            ))}
          </div>
          <ApplicationsSide
            idResume={data.id}
            refreshProjectsAndInvitations={refreshProjectsAndInvitations}
            setRefreshProjectsAndInvitations={setRefreshProjectsAndInvitations}
          />
          <ProjectsSide
            idResume={data.id}
            setRefreshProjectsAndInvitations={setRefreshProjectsAndInvitations}
            skills={data.skills}
            title={data.title}
          />
        </Paper>
      </Grid>
    </>
  ) : (
    <ProgressComponent />
  );
}

export default Details;
