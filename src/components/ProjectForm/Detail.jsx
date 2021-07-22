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

function Details() {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      setProject(res.data);
      const logo = project.logo;
      const name = project.name;
      const creationDateame = project.creationDate;
      const description = project.description;
      const textInvitation = project.textInvitation;
      const contact = project.contact;
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
          Contact Info: {contact}
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
}
export default Details;
