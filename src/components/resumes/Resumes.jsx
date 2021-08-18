import Box from "./Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import SearchComponent from "./../../common/SearchComponent/SearchComponent";
import { getResumes } from "./ResumesAPI.js";
import React, { useEffect, useState } from "react";
import "./Resumes.scss";

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
      <div className="head-container">
        <SearchComponent></SearchComponent>
        <div className="button-container">
          <Link style={{ textDecoration: "none" }} to="/resumes/entry">
            <Button color="primary" variant="contained">
              New Resume
            </Button>
          </Link>
        </div>
      </div>
      <Grid container justifyContent="center" spacing={4}>
        {resumes.length > 0
          ? resumes.map((resume) => (
              <Grid className="resume-box" item key={resume.id} lg={4} xs={6}>
                <Box {...resume} />
              </Grid>
            ))
          : null}
      </Grid>
    </Container>
  );
}

export default ResumeList;
