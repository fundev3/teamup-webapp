import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { getResumes } from "../resumes/ResumesAPI";
import { makeStyles } from "@material-ui/core/styles";
import { notFoundImage } from "../../constants";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./ModalProjects.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 400,
    width: 400,
  },
}));

export default function ProjectsModal({ searchProject, setModalProjects }) {
  const classes = useStyles();
  useEffect(() => {
    async function data() {
      // const projects = await getProjectsBySkill(searchProject);
      const projects = await getResumes();
      setDataProjects(projects);
    }
    data();
  }, []);

  const [dataProjects, setDataProjects] = useState([]);

  return (
    <Dialog
      aria-describedby="alert-dialog-description"
      aria-labelledby="alert-dialog-title"
      onClose={() => setModalProjects(false)}
      open={true}
    >
      <DialogTitle className="alert-dialog-title">
        <div className="dialog-header">
          <Typography color="primary" gutterBottom variant="h6">
            Projects
          </Typography>
          <CloseIcon
            className={classes.modalCloseIcon}
            onClick={() => setModalProjects(false)}
          />
        </div>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <List className={classes.root}>
          {dataProjects.length !== 0
            ? dataProjects.map((project) => (
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar
                      alt=""
                      src="https://pbs.twimg.com/profile_images/1347172434357706758/qQIPsjk1.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={project.title}
                    secondary={project.contact.email}
                  />
                  <Button color="primary" variant="outlined">
                    Apply
                  </Button>
                </ListItem>
              ))
            : notFoundImage}
        </List>
      </DialogContent>
    </Dialog>
  );
}
