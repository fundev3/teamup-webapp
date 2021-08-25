import Avatar from "@material-ui/core/Avatar";
import CloseIcon from "@material-ui/icons/Close";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import NotFound from "../resumes/NotFound";
import SearchIcon from "@material-ui/icons/Search";
// use it
import { getProjectBySkills } from "./ProjectsAPI.js";
// delete it
import { getResumesBySkill } from "../resumes/ResumesAPI";
import { makeStyles } from "@material-ui/core/styles";
import { BASE_URL, projectImageSvg } from "../../constants";
import {
  Dialog,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import "./ModalProjects.scss";

const useStyles = makeStyles((theme) => ({
  modalContent: {
    display: "flex",
    flexDirection: "column",
    padding: 0,
  },
  searchField: {
    "&.MuiFormControl-root": {
      width: "100%",
    },
  },
  searchIcon: {
    color: "#ffffff",
  },
}));

export default function ModalProjects({ idResume, setModalProjects }) {
  const classes = useStyles();
  const [dataProjects, setDataProjects] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const getProjectsBySkill = async (event) => {
    event.preventDefault();
    // let projects = await getProjectsBySkill(inputValue);
    let projects = await getResumesBySkill(inputValue);
    setDataProjects(projects.data);
  };

  return (
    <div className="modal-project">
      <Dialog onClose={() => setModalProjects(false)} open={true}>
        <div className="dialog-content">
          <div className="dialog-header">
            <Typography color="primary" variant="h6">
              Choose your Project
            </Typography>
            <CloseIcon
              className={classes.modalCloseIcon}
              onClick={() => setModalProjects(false)}
            />
          </div>
          <div className="search-project-box">
            <div className="search-project-input">
              <TextField
                InputProps={{ disableUnderline: "disabled" }}
                className={classes.searchField}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder="Find your Project"
                type="search"
              />
            </div>
            <div className="search-project-icon">
              <SearchIcon
                className={classes.searchIcon}
                onClick={getProjectsBySkill}
              />
            </div>
          </div>
          <DialogContent className={classes.modalContent}>
            <List>
              {dataProjects.length !== 0 ? (
                dataProjects.map((project) => (
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar alt="" src={projectImageSvg} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={project.title}
                      secondary={project.summary}
                    />
                  </ListItem>
                ))
              ) : (
                <NotFound message={""} size={150} />
              )}
            </List>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
