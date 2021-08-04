import Box from "./Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { getResumes } from "./ResumesAPI.js";
import React, { useEffect, useState } from "react";
import "./Resumes.css";

function ResumeList() {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    async function data() {
      const response = await getResumes();
      setResumes(response);
    }
    data();
  }, []);

  return (
    <Container className="resumes-container">
      <div className="button-container">
        <Link to="/resumes/entry">
          <Button color="primary" variant="contained">
            New Resume
          </Button>
        </Link>
      </div>
      <div className="resumes-list" key={resumes.id}>
        {resumes.length > 0
          ? resumes.map((resume) => (
              <div className="resume-box" key={resume.id}>
                <Box {...resume} />
              </div>
            ))
          : null}
      </div>
    </Container>
  );
}

export default ResumeList;
