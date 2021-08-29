import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import NotFound from "../resumes/NotFound";
import { getProjectBySkill } from "./ProjectsAPI.js";
import { getProjectsBySkillName } from "./helpers";
import { makeStyles } from "@material-ui/core/styles";
import { postPostulation } from "../resumes/ResumesAPI.js";
import { BASE_URL, emptyImageSvg } from "../../constants";
import {
  Dialog,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./ModalProjects.scss";

const useStyles = makeStyles((theme) => ({
  loadingModalProject: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "4vh",
  },
  modalCloseIcon: {
    color: "#4350af",
    cursor: "pointer",
    display: "flex",
    fontSize: "30px",
  },
  modalContent: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    padding: 0,
  },
  modalProject: {
    width: 500,
  },
  notFoundLabel: {
    color: "#C0C0C0",
    fontSize: "0.9rem",
    fontWeight: "bold",
  },
}));

export default function ModalProjects({
  idResume,
  skills,
  setModalProjects,
  setRefreshProjectsAndInvitations,
  title,
}) {
  const classes = useStyles();
  const [dataProjects, setDataProjects] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [send, setSend] = useState(false);
  const [loadingProject, setLoadingProject] = useState(false);

  const getProjects = async (event) => {
    event.preventDefault();
    let projects = await getProjectBySkill(inputValue);
    setDataProjects(projects);
  };

  useEffect(() => {
    if (send) {
      setRefreshProjectsAndInvitations(true);
      setLoadingProject(false);
    }
    async function getProjects() {
      const result = await getProjectsBySkillName(skills);
      setDataProjects(result);
      setLoadingProject(true);
    }
    getProjects();
  }, [send]);

  const sendProject = async (idResume, project) => {
    var postulation = {
      creationDate: new Date().toDateString(),
      lastUpdate: new Date().toDateString(),
      picture: project.logo,
      projectId: project.id,
      projectName: project.name,
      resumeId: idResume,
      resumeName: title,
      state: "Applied",
    };
    let response = await postPostulation(postulation);
    if (response) {
      setSend(true);
    } else {
      setSend(false);
    }
  };

  return (
    <div>
      <Dialog
        aria-labelledby="form-dialog-title"
        onClose={() => setModalProjects(false)}
        open={true}
      >
        <div className="dialog-content size-dialog">
          <div className="dialog-header" style={{ marginBottom: "5px" }}>
            <Typography color="primary" variant="h6">
              Projects featured for you
            </Typography>
            <CloseIcon
              className={classes.modalCloseIcon}
              onClick={() => setModalProjects(false)}
            />
          </div>
          <div className="dialog-content__text">
            Based on your skills, this projects may interest you!
          </div>
          <DialogContent className={classes.modalContent}>
            <List>
              {dataProjects == null ? (
                <NotFound
                  message={"Sorry!, We couldn't find your item"}
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
                      disabled={send}
                      onClick={() => sendProject(idResume, project, title)}
                      variant="outlined"
                    >
                      Apply
                    </Button>
                  </ListItem>
                ))
              ) : !loadingProject ? (
                <div className={classes.loadingModalProject}>
                  <CircularProgress
                    style={{
                      height: "50px",
                      margin: "0px",
                      width: "50px",
                    }}
                  />
                </div>
              ) : (
                <div className="not-found-projects">
                  <img
                    alt="emptyImage"
                    src={emptyImageSvg}
                    style={{ width: "130px" }}
                  />
                  <Typography className={classes.notFoundLabel}>
                    Sorry, we couldn't find projects
                  </Typography>
                  <Typography className={classes.notFoundLabel}>
                    that match your skills yet
                  </Typography>
                </div>
              )}
            </List>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
