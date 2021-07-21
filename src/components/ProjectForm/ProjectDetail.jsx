import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      setProject(res.data);
    }
    fetchData();
  }, []);

  return (
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
            <img alt="" height="80" src={project.logo} width="80" />
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
          Contact Info: {project.contact}
        </Typography>
        <Typography align="justify" color="textSecondary" variant="subtitle2">
          {id}
        </Typography>
        <Button color="primary" variant="contained">
          Send CV
        </Button>
      </Container>
    </div>
  );
};
export default Project;
