import ApplicationsModal from "./ApplicationsModal/ApplicationsModal";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import Invitations from ".././invitations/Invitations";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import ProgressComponent from "../../common/ProgressComponent/ProgressComponent";
import { getPostulationsByProjectId } from "../postulations/PostulationsAPI";
import { getProject } from "./ProjectsAPI";
import { isEmpty } from "../../helpers";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import { BASE_URL, userImageSvg } from "../../constants";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import "./Details.scss";
const useStyles = makeStyles({
  customGrayFont: {
    color: "#d2d2d2",
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  dateText: {
    color: "#999999",
    fontSize: "0.9rem",
  },
  ownerText: {
    color: "#999999",
    margin: "0px 5px",
  },
  projectTitle: {
    fontWeight: "600",
  },
  skillBox: {
    height: "200px",
  },
});

function Details() {
  const classes = useStyles();
  const { id } = useParams();
  const [open, setOpen] = React.useState(false);
  const [postulations, setPostulations] = useState([]);
  const [project, setProject] = useState({});

  const handleActionModal = () => {
    setOpen(!open);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await getProject(id);
      const resPostulations = await getPostulationsByProjectId(id);
      setPostulations(resPostulations);
      setProject(response);
    }
    fetchData();
  }, [id]);

  if (isEmpty(project)) return <ProgressComponent />;

  const { contact, creationDate, description, logo, name, memberList, skills } =
    project;

  const creationDateFormatted = creationDate
    .split("T")[0]
    .split("-")
    .reverse()
    .join("/");
  return (
    <div>
      <Container className="container-details">
        <div className="header-container">
          <Link className="back-button-project" to="/projects">
            <ArrowBackIos></ArrowBackIos>
            Back
          </Link>
          <Button
            className={classes.buttonEdit}
            color="primary"
            onClick={handleActionModal}
            startIcon={<MailOutlineIcon />}
            variant="contained"
          >
            {`${postulations.length} Project postulations`}
          </Button>
        </div>
        <ApplicationsModal
          onClickModal={handleActionModal}
          open={open}
          postulations={postulations}
        />

        <div className="box-details">
          <Paper className="paper-details" elevation={1} mt={4}>
            <Box alignItems="center" display="flex" mb={8}>
              <img
                alt=""
                className="project-image"
                src={`${BASE_URL}/${logo}`}
                width="140"
              />
              <Container>
                <Typography
                  align="justify"
                  className={classes.projectTitle}
                  color="primary"
                  variant="h5"
                >
                  {name}
                </Typography>
                <Typography className={classes.dateText} gutterBottom>
                  Created: {creationDateFormatted}
                </Typography>
                <Box alignItems="center" display="flex">
                  <Avatar className="avatar" src={userImageSvg} />
                  <Typography align="justify" className={classes.ownerText}>
                    {contact.name}
                  </Typography>
                </Box>
              </Container>
              <Button className="button" color="primary" variant="contained">
                Apply
              </Button>
            </Box>
            <Divider light />
            <Box display="flex">
              <Box pb={10} pt={4} width="65%">
                <Typography
                  align="justify"
                  className="overview"
                  color="primary"
                  variant="h6"
                >
                  Overview
                </Typography>
                <Typography
                  className="description"
                  color="textSecondary"
                  p={2}
                  variant="body2"
                >
                  {description}
                </Typography>
              </Box>
              <Divider flexItem light orientation="vertical" />
              <Box pl={4} pt={4}>
                <Typography align="justify" color="primary" variant="h6">
                  Teammates working here
                </Typography>
                <List>
                  {memberList.map((member, key) => (
                    <ListItem button key={key}>
                      <ListItemAvatar>
                        <Avatar src={userImageSvg} />
                      </ListItemAvatar>
                      <ListItemText id={key} primary={member.name} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
            <Divider light />
            <Box className={classes.skillBox} pb={4} pt={4}>
              <Typography
                align="justify"
                className="overview"
                color="primary"
                variant="h6"
              >
                Project skills
              </Typography>
              {skills ? (
                skills.map((skill, key) => (
                  <Chip className="skill" key={key} label={skill.name} />
                ))
              ) : (
                <Typography color="textSecondary">
                  This project has no skills defined.
                </Typography>
              )}
            </Box>
            <Divider light />
            <Invitations id={id} project={project} />
          </Paper>
        </div>
      </Container>
    </div>
  );
}

export default Details;
