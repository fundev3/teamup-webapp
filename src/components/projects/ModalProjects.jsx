import Avatar from "@material-ui/core/Avatar";
import { BASE_URL } from "../../constants";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Empty from "../../common/EmptyComponent/Empty";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import NotFound from "../resumes/NotFound";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
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
import { getProjectBySkill, postPostulation } from "./ProjectsAPI.js";
import "./ModalProjects.scss";

const useStyles = makeStyles((theme) => ({
  modalCloseIcon: {
    color: "#4350af",
    display: "flex",
  },
  modalContent: {
    display: "flex",
    flexDirection: "column",
    padding: 0,
  },
  modalProject: {
    width: 500,
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
  const [postulations, setPostulations] = useState([]);
  const [postulationsSelected, setPostulationsSelected] = React.useState([]);

  const getProjects = async (event) => {
    event.preventDefault();
    let projects = await getProjectBySkill(inputValue);
    setDataProjects(projects);
  };

  const onSubmitPostulations = async (project, postulations, idResume) => {
    var date = new Date();
    var addDays = 4;
    date.setTime(date.getTime() + addDays * 24 * 60 * 60 * 1000);

    for (const resume of postulations) {
      const postulation = {
        creationDate: new Date().toDateString(),
        lastDate: date,
        picture: project.logo,
        projectId: project.id,
        projectName: project.name,
        resumeId: idResume,
        resumeName: project.resumeName,
        state: "Applied",
      };
      const response = await postPostulation(postulation);
    }
  };

  const addPostulation = (postulation) => {
    let found = [];
    const exist = postulationsSelected.includes(postulation);
    if (exist) {
      found = postulationsSelected.filter(
        (value) => value.id !== postulation.id
      );
    } else {
      postulationsSelected.push(postulation);
      found = postulationsSelected;
    }
    setPostulationsSelected(found);
  };

  const handleSend = async () => {
    var date = new Date();
    var addDays = 4;
    date.setTime(date.getTime() + addDays * 24 * 60 * 60 * 1000);

    for (const project of postulationsSelected) {
      const postulation = {
        creationDate: new Date().toDateString(),
        lastDate: date,
        picture: project.logo,
        projectId: project.id,
        projectName: project.name,
        resumeId: idResume,
        resumeName: project.resumeName,
        state: "Applied",
      };
      const response = await postPostulation(postulation);
      console.log(postulation, response);
    }
  };

  return (
    <div>
      <Dialog
        aria-labelledby="form-dialog-title"
        onClose={() => setModalProjects(false)}
        open={true}
      >
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
                onClick={getProjects}
              />
            </div>
          </div>
          <DialogContent className={classes.modalContent}>
            <List>
              {dataProjects == null ? (
                <NotFound
                  message={"Sorrry!, We couldn't find your item"}
                  size={170}
                />
              ) : dataProjects.length !== 0 ? (
                dataProjects.map((project, idx) => (
                  <ListItem button key={idx}>
                    <ListItemAvatar>
                      <Avatar alt="" src={`${BASE_URL}/${project.logo}`} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={project.name}
                      secondary={project.description}
                    />
                    <Button
                      color="primary"
                      onClick={() => addPostulation(project)}
                      variant="outlined"
                    >
                      Apply
                    </Button>
                  </ListItem>
                ))
              ) : (
                <Empty message={""} size={50} />
              )}
            </List>
            <Button color="primary" onClick={handleSend} variant="outlined">
              Save
            </Button>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
