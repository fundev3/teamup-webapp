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

export default function ModalProjects(props) {
  const {
    idResume,
    skills,
    setModalProjects,
    setRefreshProjectsAndInvitations,
    title,
    postulationList,
  } = props;
  const classes = useStyles();
  const [dataProjects, setDataProjects] = useState([]);
  const [send, setSend] = useState(false);
  const [loadingProject, setLoadingProject] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [projectSelected, setProjectSelected] = useState([]);
  const [isAdded, setIsAdded] = useState(true);
  const [filteredDataProjects, setFilteredDataProjects] = useState([]);

  useEffect(() => {
    if (send) {
      setRefreshProjectsAndInvitations(true);
      setLoadingProject(false);
    }
    async function getProjects() {
      const result = await getProjectsBySkillName(skills);
      result.forEach((item) => {
        item.isSelected = false;
      });
      postulationList.forEach((postulation) => {
        result.forEach((item, idx) => {
          if (postulation.projectId === item.id) {
            result.splice(idx, 1);
          }
        });
      });
      setDataProjects(result);
      setLoadingProject(true);
    }
    getProjects();
  }, [send]);

  const handleProjectApplied = (id, status) => {
    let project = dataProjects.find((item) => item.id === id);
    let found = [];
    if (!status) {
      found = projectSelected.filter((value) => value.id !== id);
    } else {
      projectSelected.push(project);
      found = projectSelected;
    }
    let projectIsSelected = [...dataProjects];
    projectIsSelected = projectIsSelected.map((project) => {
      if (project.id === id) {
        return { ...project, isSelected: status };
      }
      return project;
    });
    setDataProjects(projectIsSelected);
    setProjectSelected(found);
    setIsSelected(status);
    setIsAdded(found.length === 0);
  };

  const sendProject = async (idResume, project) => {
    for (const project of projectSelected) {
      var postulation = {
        creationDate: new Date().toDateString(),
        id: "1",
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
      setProjectSelected([]);
    }
    setModalProjects(false);
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
                    {!project.isSelected ? (
                      <Button
                        color="primary"
                        onClick={() => handleProjectApplied(project.id, true)}
                        variant="outlined"
                      >
                        Apply
                      </Button>
                    ) : (
                      <Button
                        color="secondary"
                        onClick={() => handleProjectApplied(project.id, false)}
                        variant="outlined"
                      >
                        Cancel
                      </Button>
                    )}
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
            {dataProjects.length !== 0 ? (
              isAdded ? (
                <Button
                  disabled
                  style={{ margin: "30px 0px 40px", width: "100%" }}
                  variant="contained"
                >
                  Send Invitation
                </Button>
              ) : (
                <Button
                  color="primary"
                  onClick={() =>
                    sendProject(idResume, dataProjects.project, title)
                  }
                  style={{ margin: "30px 0px 40px", width: "100%" }}
                  variant="contained"
                >
                  Send application
                </Button>
              )
            ) : (
              <></>
            )}
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
