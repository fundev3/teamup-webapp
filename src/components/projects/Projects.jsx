import Card from "./Card";
import ProgressComponent from "../../common/ProgressComponent/ProgressComponent";
import SearchIcon from "@material-ui/icons/Search";
import { emptyImageSvg } from "../../constants";
import { getProjects } from "./ProjectsAPI.js";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import {
  Button,
  CardContent,
  InputBase,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Projects.scss";

const useStyles = makeStyles({
  cardStyle: {
    alignItems: "center",
    display: "flex",
    height: "270px",
    width: "500px",
  },
  customGrayFont: {
    color: "#d2d2d2",
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  paperBackground: {
    margin: "20px 0px",
    width: "500px",
  },
  searchIcon: {
    color: "#ffffff",
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
        <div className="search-box">
          <div className="search-box-input">
            <InputBase placeholder="Search project…" />
          </div>
          <div className="search-box-icon">
            <SearchIcon className={classes.searchIcon} />
          </div>
        </div>
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
