import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { getProject } from "./ProjectsAPI";
import {
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Details() {
  const { id } = useParams();
  const [project, setProject] = useState();
  useEffect(() => {
    async function fetchData() {
      const response = await getProject(id);
      setProject(response);
    }
    fetchData();
  }, [id]);

  if (project === true) {
    return <div>ERROR!!! Project not found</div>;
  }

  return project ? (
    <div>
      <Container maxWidth="sm">
        <Link to="/projects">
          <Button color="primary" variant="contained">
            <ArrowBackIcon></ArrowBackIcon>
          </Button>
        </Link>
        <Grid
          alignContent="center"
          alignItems="center"
          container
          direction="row"
          justifyContent="center"
          spacing={1}
          wrap="nowrap"
        >
          <Grid item xs={2}>
            <img alt="" height="75" src={project.logo} width="75" />
          </Grid>
          <Grid item xs={10}>
            <Typography align="justify" gutterBottom variant="h4">
              Project: {project.name}
            </Typography>
          </Grid>
        </Grid>
        <Typography
          align="left"
          color="primary"
          display="block"
          gutterBottom
          variant="caption"
        >
          Publish: {project.creationDate}
        </Typography>
        <Divider variant="middle" />
        <Typography align="justify" color="textSecondary">
          Description: {project.description}
        </Typography>
        <Divider variant="middle" />
        <Typography align="justify" color="textSecondary">
          Ref.:{project.textInvitation}
        </Typography>
        <Divider variant="middle" />
        <Typography align="justify" color="primary">
          Contact Info: {project.contact.name}
        </Typography>
        <Button color="primary" variant="contained">
          Send CV
        </Button>
      </Container>
    </div>
  ) : (
    <div>Loading</div>
  );
}
export default Details;
