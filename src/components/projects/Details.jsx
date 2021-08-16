import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import { getProject } from "./ProjectsAPI";
import image from "../../assets/img_avatar.jpg";
import { isEmpty } from "../../helpers";
import logo2 from "../../assets/project-img.jpeg";
import {
  Avatar,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./Details.scss";

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
      <Container className="container">
        <Link className="back-button" to="/projects">
          <ArrowBackIos></ArrowBackIos>
          Back
        </Link>
        <Paper className="paper" elevation={3}>
          <div className="header">
            <img alt="" src={logo2} width="140" />
            <Container className="info">
              <Typography align="justify" gutterBottom variant="h5">
                {name}
              </Typography>
              <Typography color="textSecondary">
                Created: {creationDate}
              </Typography>
              <div className="owner">
                <Avatar className="avatar" src={image} />
                <Typography align="justify" color="textSecondary">
                  {contact.name}
                </Typography>
              </div>
            </Container>
            <Button color="primary" variant="contained">
              Apply
            </Button>
          </div>
          <Divider light />
          <div className="body">
            <Typography align="justify" color="primary" variant="h6">
              Overview:
            </Typography>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {description}
            </Typography>
            <Typography align="justify" color="textSecondary">
              Ref.:{textInvitation}
            </Typography>
          </div>
        </Paper>
      </Container>
    </div>
  );
}

export default Details;
