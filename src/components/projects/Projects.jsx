import Card from "./Card";
import ProgressComponent from "../../common/ProgressComponent/ProgressComponent";
import { getProjects } from "./ProjectsAPI.js";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { Button, CardContent, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Projects.scss";

const useStyles = makeStyles({
  cardStyle: {
    alignItems: "center",
    display: "flex",
    height: "270px",
    width: "500px",
  },
  paperBackground: {
    margin: "20px 0px",
    width: "500px",
  },
});

function ProjectList() {
  const classes = useStyles();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function data() {
      const projects = await getProjects();
      setProjects(projects);
    }

    data();
  }, []);

  const history = useHistory();

  function handleEntryClick() {
    history.push("/projects/entry");
  }

  return (
    <div className="projects-container">
      <div className="top-content">
        <Button color="primary" onClick={handleEntryClick} variant="contained">
          New Project
        </Button>
      </div>
      <div className="projects-list">
        {projects.length === 0 ? (
          <ProgressComponent />
        ) : (
          projects.map((project) => (
            <div className="box-paper">
              <Paper className={classes.paperBackground}>
                <CardContent className={classes.cardStyle}>
                  <Card {...project} />
                </CardContent>
              </Paper>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProjectList;
