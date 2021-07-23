import React from "react";
import useFetch from "./useFetch";
import { useParams } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";

function Details(projectId) {
  const { project, error } = useFetch(projectId);
  const { id } = useParams();
  const contact = project.contact;
  if (error) return <div>ERROR!!! Project not found</div>;
  return project ? (
    <div>
      <Container maxWidth="sm">
        <Grid
          alignContent="center"
          alignItems="center"
          container
          direction="row"
          justify="center"
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
          Contact Info: {contact.name}
        </Typography>
        <Typography align="justify" color="textSecondary" variant="subtitle2">
          {id}
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
