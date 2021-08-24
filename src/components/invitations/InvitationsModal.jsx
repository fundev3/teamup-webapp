import CloseIcon from "@material-ui/icons/Close";
import InvitationPersonCard from "./InvitationPersonCard";
import SearchIcon from "@material-ui/icons/Search";
import { entry as entryValidations } from "../projects/helpers/validations";
import { makeStyles } from "@material-ui/core/styles";
import { postInviteResumes } from "./InvitationsAPI";
import { useFormik } from "formik";
import {
  Button,
  Dialog,
  DialogContent,
  FormControlLabel,
  List,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { getResumesByName, getResumesBySkill } from "../resumes/ResumesAPI";

import "./InvitationsModal.scss";

const useStyles = makeStyles((theme) => ({
  dialog: {
    height: "550px",
    width: "450px",
  },
  dialogContent: {
    padding: "0px",
  },
  modalCloseIcon: {
    color: "#4350af",
    cursor: "pointer",
    fontSize: "30px",
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: "0px",
  },
  searchField: {
    "&.MuiFormControl-root": {
      width: "100%",
    },
  },
  searchIcon: {
    color: "#ffffff",
  },
  subtitle: {
    fontSize: "1.1em",
    fontWeight: "500",
    margin: "20px 0px",
  },
  textField: {
    marginBottom: "20px",
  },
}));

export default function InvitationsModal(props) {
  const classes = useStyles();
  const { id, project, onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const [resumesSearchInput, setResumesSearchInput] = useState("");
  const [resumesNameList, setResumesNameList] = useState([]);
  const [resumesSelected, setResumesSelected] = useState([]);
  const [isAdded, setIsAdded] = useState(true);

  const getResumesName = async (event) => {
    event.preventDefault();
    let response;
    if (radioButtonOption === "name") {
      response = await getResumesByName(resumesSearchInput);
    } else if (radioButtonOption === "skill") {
      response = await getResumesBySkill(resumesSearchInput);
    }

    setResumesNameList(response.data);
  };
  const handleInvitationSelected = (id, status) => {
    let resume = resumesNameList.find((item) => item.id === id);
    let found = [];
    if (!status) {
      found = resumesSelected.filter((value) => value.id !== id);
    } else {
      resumesSelected.push(resume);
      found = resumesSelected;
    }
    setResumesSelected(found);
    setIsAdded(found.length === 0);
  };

  const onSubmitInvitations = async (props) => {
    var date = new Date();
    var addDays = 4;
    date.setTime(date.getTime() + addDays * 24 * 60 * 60 * 1000);

    for (const resume of resumesSelected) {
      const invitation = {
        expireDate: date,
        id: "5a7939fd-59de-44bd-a092-f5d8434584de",
        pictureResume:
          "https://sttubindevbra.blob.core.windows.net/images/webapp/project-img.jpeg",
        projectId: id,
        projectName: project.name,
        resumeId: resume.id,
        resumeName: resume.title,
        startDate: new Date().toDateString(),
        status: "Invited",
        textInvitation: project.textInvitation,
      };
      const response = await postInviteResumes(id, invitation);
      console.log(invitation, response);
    }

    onClose();
  };

  const formik = useFormik({
    initialValues: {
      textInvitation: "",
    },

    validationSchema: entryValidations(),
  });
  const hasErrorTextInvitation =
    !!formik.touched.textInvitation && !!formik.errors.textInvitation;

  const handleRadioGroupChange = (event) => {
    setRadioButtonOption(event.target.value);
  };
  const [radioButtonOption, setRadioButtonOption] = React.useState("skill");

  return (
    <div className={classes.dialog}>
      <Dialog onClose={handleClose} open={open}>
        <div className="dialog-content">
          <div className="dialog-header">
            <Typography color="primary" variant="h6">
              Invite People to your project
            </Typography>
            <CloseIcon
              className={classes.modalCloseIcon}
              onClick={handleClose}
            />
          </div>
          <div className="search-people-box">
            <div className="search-people-input">
              <TextField
                InputProps={{ disableUnderline: "disabled" }}
                className={classes.searchField}
                onChange={(event) => setResumesSearchInput(event.target.value)}
                placeholder="Find people to invite…"
                type="search"
              />
            </div>
            <div className="search-people-icon">
              <SearchIcon
                className={classes.searchIcon}
                onClick={getResumesName}
              />
            </div>
          </div>
          <div>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              onChange={handleRadioGroupChange}
              row
              value={radioButtonOption}
            >
              <FormControlLabel
                control={<Radio color="primary" />}
                label="Name"
                value="name"
              />
              <FormControlLabel
                control={<Radio color="primary" />}
                label="Skill"
                value="skill"
              />
            </RadioGroup>
          </div>
          <DialogContent className={classes.dialogContent}>
            <div className="list-content">
              <List className={classes.root}>
                {resumesNameList.map((invitation) => (
                  <InvitationPersonCard
                    {...invitation}
                    handleInvitationSelected={handleInvitationSelected}
                    key={invitation.id}
                  />
                ))}
              </List>
            </div>
            <div className="dialog-bottom">
              <Typography className={classes.subtitle} color="primary">
                Your message
              </Typography>
              <TextField
                className={classes.textField}
                error={hasErrorTextInvitation}
                helperText={
                  hasErrorTextInvitation ? formik.errors.textInvitation : ""
                }
                id="textInvitation"
                maxRows={4}
                multiline
                name="textInvitation"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="Hi, I would like to invite you to my recent project!
                And be part of my developers team. Hope you can join us!"
                type="text"
                value={formik.values.textInvitation}
                variant="outlined"
              />
              {resumesNameList.length === 0 || isAdded ? (
                <Button disabled variant="contained">
                  Send Invitation
                </Button>
              ) : (
                <Button
                  color="primary"
                  onClick={() => onSubmitInvitations()}
                  variant="contained"
                >
                  Send Invitation
                </Button>
              )}
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
