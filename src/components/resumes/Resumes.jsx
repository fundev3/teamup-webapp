import Box from "./Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import SearchComponent from "./../../common/SearchComponent/SearchComponent";
import Typography from "@material-ui/core/Typography";
import { getResumes } from "./ResumesAPI.js";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import "./Resumes.scss";

const useStyles = makeStyles({
  customGrayFont: {
    color: "#d2d2d2",
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  descriptionIcon: {
    color: "#e2e2e2",
    fontSize: "10rem",
    margin: "30px",
  },
});

function ResumeList() {
  const classes = useStyles();
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
        {resumes.length !== 0 ? (
          resumes.map((resume) => (
            <Grid className="resume-box" item key={resume.id} lg={4} xs={6}>
              <Box {...resume} />
            </Grid>
          ))
        ) : (
          <div className="empty-file">
            <DescriptionRoundedIcon className={classes.descriptionIcon} />
            <Typography className={classes.customGrayFont}>
              Sorry, we couldn't load resumes list.
            </Typography>
          </div>
        )}
      </Grid>
    </Container>
  );
}

export default ResumeList;
