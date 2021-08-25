import Button from "@material-ui/core/Button";
import Empty from "../../common/EmptyComponent/Empty";
import ModalProjects from "./ModalProjects";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import "./ProjectsSide.scss";

function ProjectsSide(props) {
  const { idResume } = props;
  const [modalProjects, setModalProjects] = useState(false);

  return (
    <div className="projects-side">
      <div className="projects-modal">
        {modalProjects ? (
          <ModalProjects
            idResume={idResume}
            setModalProjects={setModalProjects}
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
            Choose your project
          </Button>
        </div>
      </div>
      <div className="projects-list">
        <Empty message={"No projects yet"} size={100} />
      </div>
    </div>
  );
}

export default ProjectsSide;
