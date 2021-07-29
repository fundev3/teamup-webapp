import Card from "./Card";
import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded";
import getProjects from "./ProjectsAPI.js";
import { useHistory } from "react-router-dom";
import {
  Button,
  Paper,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Projects.scss";

function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function data() {
      const response = await getProjects();
      if (response === true) {
        return;
      } else {
        setProjects(response);
      }
    }
    data();
  }, []);

  const history = useHistory();

  function handleEntryClick() {
    history.push("/projects/entry");
  }
  function handleViewClick(id) {
    history.push(`/projects/${id}`);
  }
  return (
    <div className="Projects-Container">
      <Button color="primary" onClick={handleEntryClick} variant="contained">
        New Project
      </Button>

      <div className="Projects-List">
        <TableContainer component={Paper}>
          {projects.length === 0 ? (
            <div className="empty-file">
              <DescriptionRoundedIcon
                style={{ color: "#e2e2e2", fontSize: "10rem" }}
              />
              <Typography
                style={{
                  color: "#d2d2d2",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                Looks like, there are no projects
              </Typography>
            </div>
          ) : (
            projects.map((project) => (
              <TableRow>
                <TableCell component="th" scope="row">
                  <div className="box-card">
                    <div className="left">
                      <Card {...project} />
                    </div>
                    <div className="right">
                      <Button
                        color="primary"
                        onClick={() => handleViewClick(project.id)}
                        variant="contained"
                      >
                        View
                      </Button>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableContainer>
      </div>
    </div>
  );
}

export default ProjectList;
