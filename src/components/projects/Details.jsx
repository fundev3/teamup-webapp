import ApplicationsModal from "./ApplicationsModal/ApplicationsModal";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import Invitations from ".././invitations/Invitations";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { getProject } from "./ProjectsAPI";
import { isEmpty } from "../../helpers";
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

function Details() {
  const { id } = useParams();
  const [open, setOpen] = React.useState(false);
  const [project, setProject] = useState({});

  const handleActionModal = () => {
    setOpen(!open);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await getProject(id);
      setProject(response);
    }
    fetchData();
  }, [id]);

  if (isEmpty(project)) return <div>ERROR!!! Project not found</div>;

  const { contact, creationDate, description, logo, name, memberList, skills } =
    project;

  const creationDateFormatted = creationDate
    .split("T")[0]
    .split("-")
    .reverse()
    .join("/");
  return (
    <div>
      <Container className="container">
        <div className="header-container">
          <Link className="back-button" to="/projects">
            <ArrowBackIos></ArrowBackIos>
            Back
          </Link>
          <Button
            className="buttonEdit"
            color="primary"
            onClick={handleActionModal}
            startIcon={<MailOutlineIcon />}
            variant="contained"
          >
            {"1 Project postulations"}
          </Button>
        </div>
        <ApplicationsModal onClickModal={handleActionModal} open={open} />

        <Paper className="paper" elevation={3} mt={4}>
          <Box alignItems="center" display="flex" mb={6}>
            <img alt="" src={`${BASE_URL}/${logo}`} width="140" />
            <Container>
              <Typography align="justify" color="primary" variant="h5">
                {name}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Created: {creationDateFormatted}
              </Typography>
              <Box alignItems="center" display="flex">
                <Avatar className="avatar" src={userImageSvg} />
                <Typography align="justify" color="textSecondary">
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
            <Box pb={10} pt={4} width="75%">
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
          <Box pb={4} pt={4}>
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
      </Container>
    </div>
  );
}

export default Details;
