import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { getProject } from "./ProjectsAPI";
import { isEmpty } from "../../helpers";
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
  const [project, setProject] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await getProject(id);
      setProject(response);
    }
    fetchData();
  }, [id]);

  if (isEmpty(project)) return <div>ERROR!!! Project not found</div>;

  const { contact, creationDate, description, logo, name, textInvitation } =
    project;

  return (
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
            <img alt="" height="75" src={logo} width="75" />
          </Grid>
          <Grid item xs={10}>
            <Typography align="justify" gutterBottom variant="h4">
              Project: {name}
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
          Publish: {creationDate}
        </Typography>
        <Divider variant="middle" />
        <Typography align="justify" color="textSecondary">
          Description: {description}
        </Typography>
        <Divider variant="middle" />
        <Typography align="justify" color="textSecondary">
          Ref.:{textInvitation}
        </Typography>
        <Divider variant="middle" />
        <Typography align="justify" color="primary">
          Contact Info: {contact.name}
        </Typography>
        <Button color="primary" variant="contained">
          Send CV
        </Button>
      </Container>
    </div>
  );
}

export default Details;
