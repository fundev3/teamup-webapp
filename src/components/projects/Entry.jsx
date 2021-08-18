import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import MemberList from "./MemberList";
import { entry as entryValidations } from "./helpers/validations";
import { postProject } from "./ProjectsAPI";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { useState } from "react";
import {
  Box,
  Button,
  Container,
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
  const dispatch = useDispatch();
  const history = useHistory();
  const search = useLocation().search;
  const idProject = new URLSearchParams(search).get("id");

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
      const { contact, description, logo, name, textInvitation } = values;
      const members = memberList.map((member) => {
        return {
          idResume: member.idResume,
          name: member.name,
        };
      });
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

  const useStyles = makeStyles({
    button: {
      margin: "10px",
    },
    customGrayFont: {
      color: "#d2d2d2",
      fontSize: "1.2rem",
      fontWeight: "bold",
    },
    subTitle: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    textInput: {
      width: "90%",
    },
    title: {
      color: "#DF8930",
      fontSize: "2.8rem",
      fontWeight: "bold",
      margin: "30px",
    },
  });
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
        <Box display="flex" justifyContent="space-between" mb={6}>
          <Paper className="paper" elevation={3}>
            <Typography
              align="justify"
              className={classes.subTitle}
              color="primary"
              font-weight="1900"
              gutterBottom
              variant="h5"
            >
              Project information
            </Typography>
            <div className="u-mb-1">
              <Typography
                align="justify"
                color="black"
                gutterBottom
                variant="body1"
              >
                Title
              </Typography>
              <TextField
                className={classes.textInput}
                data-testid="input-field"
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
              <Typography
                align="justify"
                color="black"
                gutterBottom
                variant="body1"
              >
                Owner Contact
              </Typography>
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                className={classes.textInput}
                data-testid="input-field"
                helperText="This is the owner contact"
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
                color="black"
                gutterBottom
                variant="body1"
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

            {/* work in progress
           <div className="u-mb-1">
            <TextField
              data-testid="input-field"
              error={hasErrorTextInvitation}
              helperText={
                hasErrorTextInvitation ? formik.errors.textInvitation : ""
              }
              id="textInvitation"
              label="Text invitation"
              multiline
              name="textInvitation"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              rows={2}
              value={formik.values.textInvitation}
              variant="outlined"
            />
          </div>

            <MemberList memberList={memberList} setMemberList={setMemberList} /> */}
          </Paper>

          <Paper className="paper" elevation={3}>
            <Typography
              align="justify"
              className={classes.subTitle}
              color="primary"
              font-weight="1900"
              gutterBottom
              variant="h5"
            >
              Project view
            </Typography>
            <div className="u-mb-1">
              <TextField
                className={classes.textInput}
                data-testid="input-field"
                error={hasErrorLogo}
                helperText={hasErrorLogo ? formik.errors.logo : ""}
                id="logo"
                name="logo"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="file"
                value={formik.values.logo}
                variant="outlined"
              />
            </div>
          </Paper>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Button
            className={classes.button}
            color="grey"
            data-testid="btn-form"
            type="submit"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            className={classes.button}
            color="primary"
            data-testid="btn-form"
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
