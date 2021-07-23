import { getProject } from "./ProjectsAPI";
import { useParams } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

function Details() {
  const { id } = useParams();
  const [project, setProject] = useState();
  useEffect(() => {
    async function data() {
      const response = await getProject(id);
      console.log(response.Project);
      setProject(response.Project);
    }
    data();
  }, []);

  // Comment Should by remove when the API is complete
  // if (error) return <div>ERROR!!! Project not found</div>;

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
