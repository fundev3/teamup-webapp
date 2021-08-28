import Button from "@material-ui/core/Button";
import ModalProjects from "./ModalProjects";
import NotFound from "../resumes/NotFound";
import { Box, Typography } from "@material-ui/core";
import React, { useState } from "react";
import "./ProjectsSide.scss";

function ProjectsSide(props) {
  const { idResume, setRefreshProjectsAndInvitations, title } = props;
  const [modalProjects, setModalProjects] = useState(false);

  return (
    <div className="projects-side">
      <div className="projects-modal">
        {modalProjects ? (
          <ModalProjects
            idResume={idResume}
            setModalProjects={setModalProjects}
            setRefreshProjectsAndInvitations={setRefreshProjectsAndInvitations}
            title={title}
          />
        ) : null}
      </div>
      <div className="project-header">
        <div className="project-title">
          <Typography color="primary" gutterBottom variant="h6">
            Projects working on
          </Typography>
        </div>
        <div className="project-search">
          <Button
            color="primary"
            onClick={() => setModalProjects(true)}
            variant="contained"
          >
            Suggest me projects
          </Button>
        </div>
      </div>
      <Box display="flex" justifyContent="space-between" mb={5} pt={5}>
        <div className="projects-list">
          <NotFound message={"There is no projects yet."} size={150} />
        </div>
      </Box>
    </div>
  );
}

export default ProjectsSide;
