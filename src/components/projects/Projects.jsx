import Card from "./Card";
import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded";
import SearchIcon from "@material-ui/icons/Search";
import { getProjects } from "./ProjectsAPI.js";
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

function ProjectList() {
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
            <SearchIcon style={{ color: "#ffffff" }} />
          </div>
        </div>
      </div>
      <div className="projects-list">
        {projects.length === 0 ? (
          <div className="empty-file">
            <DescriptionRoundedIcon
              style={{ color: "#e2e2e2", fontSize: "10rem", margin: "30px" }}
            />
            <Typography
              style={{
                color: "#d2d2d2",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              Sorry, we couldn't complete your request.
            </Typography>
          </div>
        ) : (
          projects.map((project) => (
            <div className="box-paper">
              <Paper style={{ margin: "20px 0px", width: "500px" }}>
                <CardContent
                  className="box-inside"
                  style={{
                    alignItems: "center",
                    display: "flex",
                    height: "270px",
                    width: "500px",
                  }}
                >
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
