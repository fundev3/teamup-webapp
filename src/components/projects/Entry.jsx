import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import MemberList from "./MemberList";
import { UploadButton } from "../../common";
import { entry as entryValidations } from "./helpers/validations";
import { postProject } from "./ProjectsAPI";
import uploadFileToBlob from "../../storage/blobStorage";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import { alertError, alertSuccess } from "../../store/actions/alertActions";
import "./Entry.scss";

function Entry() {
  const [memberList, setMemberList] = useState([]);
  const [fileSelected, setFileSelected] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const search = useLocation().search;
  const idProject = new URLSearchParams(search).get("id");

  const onFileChange = (event) => {
    setFileSelected(event.target.files[0]);
  };

  const onFileUpload = async () => {
    try {
      const fileName = await uploadFileToBlob(fileSelected);
      setFileSelected(null);
      return fileName;
    } catch (error) {
      dispatch(alertError(`The project was not saved ${error.message}`));
      return null;
    }
  };

  const formik = useFormik({
    initialValues: {
      /**
       * The initial value is Jose Ecos because we don't have API to handle contacts yet.
       * Once the API exists it will be removed
       */
      contact: "Jose Ecos",
      description: "",
      logo: "",
      name: "",
      textInvitation: "",
    },
    onSubmit: async (values) => {
      const { contact, description, name, textInvitation } = values;
      let logo;
      const members = memberList.map((member) => {
        return {
          idResume: member.idResume,
          name: member.name,
        };
      });
      logo = await onFileUpload();
      if (!logo) return;
      const project = {
        /**
         * TODO: (contact: will consume api) It will be the contact of the owner of the project
         */
        contact: {
          idResume: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          name: contact,
        },
        creationDate: new Date().toDateString(),
        description,
        logo,
        memberList: [...members],
        name,
        textInvitation,
      };
      const response = await postProject(project);
      if (response.ok) {
        dispatch(alertSuccess("Project has been created successfully"));
        return history.push("/projects");
      }
      dispatch(alertError(`The project was not saved ${response.error}`));
    },
    validationSchema: entryValidations(),
  });
  const hasErrorDescription =
    !!formik.touched.description && !!formik.errors.description;
  const hasErrorName = !!formik.touched.name && !!formik.errors.name;
  const hasErrorLogo = !!formik.touched.logo && !!formik.errors.logo;
  const hasErrorTextInvitation =
    !!formik.touched.textInvitation && !!formik.errors.textInvitation;

  const useStyles = makeStyles((theme) => ({
    button: {
      margin: "10px",
    },
    input: {
      display: "none",
    },
    inputTitle: {
      color: "#605E5E",
      fontSize: "1.1rem",
    },
    root: {
      "& > *": {
        margin: "10px 0px 20px",
      },
    },
    subTitle: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    textInput: {
      "& .MuiFormHelperText-contained": {
        margin: "0px",
      },
      width: "100%",
    },
    title: {
      color: "#ED8749",
      fontSize: "2.2rem",
      fontWeight: "bold",
      margin: "45px 35px 0px",
    },
  }));
  const classes = useStyles();

  return (
    <Container className="container">
      <Link className="back-button" to="/projects">
        <ArrowBackIos></ArrowBackIos>
        Back
      </Link>
      <Typography
        className={classes.title}
        color="primary"
        gutterBottom
        variant="h3"
      >
        Let's showcase your project!
      </Typography>
      <form
        autoComplete="off"
        className="container-form"
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Paper className="paper-entry" elevation={1}>
            <div className="entry-content">
              <Typography
                align="justify"
                className={classes.subTitle}
                color="primary"
                gutterBottom
                variant="h5"
              >
                Project information
              </Typography>
              <div className="u-mb-1">
                <Typography
                  align="justify"
                  className={classes.inputTitle}
                  gutterBottom
                >
                  Title
                </Typography>
                <TextField
                  className={classes.textInput}
                  data-testid="input-field"
                  error={hasErrorName}
                  helperText={hasErrorName ? formik.errors.name : ""}
                  id="name"
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  placeholder="Your project title"
                  type="text"
                  value={formik.values.name}
                  variant="outlined"
                />
              </div>
              <div className="u-mb-1">
                <Typography
                  align="justify"
                  className={classes.inputTitle}
                  gutterBottom
                >
                  Owner Contact
                </Typography>
                <TextField
                  InputProps={{
                    readOnly: true,
                  }}
                  className={classes.textInput}
                  data-testid="input-field"
                  id="contact"
                  name="contact"
                  type="email"
                  value={formik.values.contact}
                  variant="outlined"
                />
              </div>
              <div className="u-mb-1">
                <Typography
                  align="justify"
                  className={classes.inputTitle}
                  gutterBottom
                >
                  Add Description
                </Typography>
                <TextField
                  className={classes.textInput}
                  data-testid="input-field"
                  error={hasErrorDescription}
                  helperText={
                    hasErrorDescription ? formik.errors.description : ""
                  }
                  id="description"
                  multiline
                  name="description"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  placeholder="Write a brief description of your project.
                  Outline the overarching purpose, as well the key information of it,
                  add the problem statement and your goals."
                  rows={4}
                  value={formik.values.description}
                  variant="outlined"
                />
              </div>
              <div className="u-mb-1">
                <Typography
                  align="justify"
                  className={classes.inputTitle}
                  gutterBottom
                >
                  Invitation Text
                </Typography>
                <TextField
                  className={classes.textInput}
                  data-testid="input-field"
                  error={hasErrorTextInvitation}
                  helperText={
                    hasErrorTextInvitation ? formik.errors.textInvitation : ""
                  }
                  id="textInvitation"
                  multiline
                  name="textInvitation"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  placeholder="Text invitation"
                  rows={2}
                  value={formik.values.textInvitation}
                  variant="outlined"
                />
              </div>
              {/* WORK IN PROGRESS
            <MemberList memberList={memberList} setMemberList={setMemberList} /> */}
            </div>
          </Paper>

          <Paper className="paper-entry" elevation={1}>
            <Typography
              align="justify"
              className={classes.subTitle}
              color="primary"
              gutterBottom
              variant="h5"
            >
              Project view
            </Typography>
            <div className="u-mb-1">
              <div className={classes.root}>
                <input
                  accept="image/*"
                  className={classes.input}
                  data-testid="input-field"
                  error={hasErrorLogo}
                  helperText={hasErrorLogo ? formik.errors.logo : ""}
                  id="logo"
                  name="logo"
                  onBlur={formik.handleBlur}
                  onChange={(e) => {
                    formik.handleChange(e);
                    onFileChange(e);
                  }}
                  type="file"
                  value={formik.values.logo}
                />
                <label htmlFor="logo">
                  <Button color="primary" component="span" variant="contained">
                    Attach photo
                  </Button>
                </label>
                <div className="image-label">
                  <label className="errorLogo" htmlFor="logo">
                    {hasErrorLogo ? formik.errors.logo : ""}
                  </label>
                  <Box display="Flex">
                    {formik.values.logo && !hasErrorLogo ? (
                      <>
                        <CheckCircleRoundedIcon style={{ color: "#80B416" }} />
                        <Typography style={{ color: "#80B416" }}>
                          File was uploaded successfully
                        </Typography>
                      </>
                    ) : (
                      ""
                    )}
                  </Box>
                </div>
              </div>
            </div>
          </Paper>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Button
            className={classes.button}
            data-testid="btn-cancel"
            size="large"
            type="submit"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            className={classes.button}
            color="primary"
            data-testid="btn-form"
            size="large"
            type="submit"
            variant="contained"
          >
            {idProject ? "Update" : "Create"}
          </Button>
        </Box>
      </form>
    </Container>
  );
}
export default Entry;
