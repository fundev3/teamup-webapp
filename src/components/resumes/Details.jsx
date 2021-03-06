import ApplicationsSide from "./ApplicationsSide";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import InvitationsModal from "../invitations/InvitationsModalResumes";
import InvitationsNotifications from "../invitations/InvitationsNotifications";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import ModalSkills from "./ModalSkills";
import NotFound from "./NotFound";
import PhoneIcon from "@material-ui/icons/Phone";
import ProgressComponent from "../../common/ProgressComponent/ProgressComponent";
import ProjectsSide from "../projects/ProjectsSide";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import { alertWarning } from "../../store/actions/alertActions";
import { entry as entryValidations } from "./helpers/validations";
import { makeStyles } from "@material-ui/core/styles";
import store from "../../store";
import { useFormik } from "formik";
import { userSingleImageSvg } from "../../constants/images";
import {
  Button,
  Chip,
  Container,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getResume, getSkillsByName, postSkillsById } from "./ResumesAPI.js";
import "./Details.scss";

const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: 10,
  },
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
    width: "100%",
  },
  searchBoxContainer: {
    alignItems: "center",
    display: "flex",
    margin: "15px",
    padding: "2px 4px",
    width: "300px",
  },
}));

function Details() {
  let { id } = useParams();
  const classes = useStyles();
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [stateSearchSkills, setStateSearchSkills] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [skillInput, setSkillInput] = useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const [modalInvitations, setModalInvitations] = React.useState(false);
  const [dataSkills, setDataSkills] = React.useState([]);
  const [postulationList, setPostulationList] = React.useState([]);
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

  const handleDelete = (chipToDelete) => () => {
    let { skills, ...information } = data;
    skills = data.skills.filter((chip) => chip.name !== chipToDelete);
    setData({ ...information, skills });
  };

  const cancelSkills = async () => {
    const response = await getResume(id);
    const data = response.data;
    const error = response.handlerError;
    setError(error);
    setData(data);
  };

  const saveSkills = async (event) => {
    event.preventDefault();
    await postSkillsById(data.id, data.skills);
    setStateSearchSkills(false);
  };

  const changeStateSearchSkills = () => {
    if (stateSearchSkills) {
      setStateSearchSkills(false);
    } else {
      setStateSearchSkills(true);
    }
  };

  const getSkills = async (event) => {
    event.preventDefault();
    if (skillInput !== "") {
      const response = await getSkillsByName(skillInput);
      if (response.handlerError !== true) {
        setDataSkills(response.data);
        handleClickOpen();
      }
    }
    setSkillInput("");
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
    // onSubmit: edit,
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
      <Container className="detail-resume-container">
        <div className="detail-header-resume">
          <Link className="back-resumes-button" to="/resumes">
            <ArrowBackIos></ArrowBackIos>
            Back
          </Link>
        </div>
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
                <InvitationsNotifications
                  idResume={data.id}
                  setModalInvitations={setModalInvitations}
                />
                <Button
                  className="buttonEdit"
                  color="primary"
                  disabled={stateSearchSkills}
                  onClick={changeStateSearchSkills}
                  variant="contained"
                >
                  {"Add Skills"}
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
            <div className="skill-title-button">
              <div>
                <Typography color="primary" gutterBottom variant="h6">
                  Skills
                </Typography>
              </div>
              {stateSearchSkills ? (
                <div className="skills-edit">
                  <Button
                    className={classes.button}
                    onClick={() => {
                      changeStateSearchSkills();
                      cancelSkills();
                    }}
                    variant="contained"
                  >
                    CANCEL
                  </Button>
                  <Button
                    className={classes.button}
                    color="primary"
                    onClick={saveSkills}
                    variant="contained"
                  >
                    SAVE
                  </Button>
                </div>
              ) : null}
            </div>
            {stateSearchSkills ? (
              <div className="skills-buttons">
                <div className="skills-search">
                  <Paper
                    className={classes.searchBoxContainer}
                    component="form"
                  >
                    <InputBase
                      className={classes.input}
                      disabled={false}
                      inputProps={{ "aria-label": "search google maps" }}
                      onChange={(event) => setSkillInput(event.target.value)}
                      placeholder="Search Skills"
                      value={skillInput}
                    />
                    <IconButton
                      aria-label="search"
                      className={classes.iconButton}
                      disabled={false}
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
                </div>
              </div>
            ) : null}
            {data.skills.map((skill) =>
              skill !== null ? (
                <Chip
                  className="chip"
                  key={skill.id}
                  label={skill.name}
                  onDelete={stateSearchSkills ? handleDelete(skill.name) : null}
                />
              ) : null
            )}
          </div>
          <ApplicationsSide
            idResume={data.id}
            refreshProjectsAndInvitations={refreshProjectsAndInvitations}
            setPostulationList={setPostulationList}
            setRefreshProjectsAndInvitations={setRefreshProjectsAndInvitations}
          />
          <ProjectsSide
            idResume={data.id}
            postulationList={postulationList}
            setRefreshProjectsAndInvitations={setRefreshProjectsAndInvitations}
            skills={data.skills}
            title={data.title}
          />
        </Paper>
      </Container>
    </>
  ) : (
    <ProgressComponent />
  );
}

export default Details;
