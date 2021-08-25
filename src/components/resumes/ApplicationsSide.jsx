import Empty from "../../common/EmptyComponent/Empty";
import { getProjects } from "../projects/ProjectsAPI.js";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./ApplicationsSide.scss";

const useStyles = makeStyles((theme) => ({
  card: {
    flexGrow: 1,
  },
  description: {
    margin: "5px",
  },
  image: {
    height: "100px",
    margin: "10%",
    width: "100px",
  },
  paper: {
    color: theme.palette.text.secondary,
    height: "120px",
    margin: "20px",
    padding: theme.spacing(2),
    textAlign: "center",
    width: "300px",
  },
}));

function ApplicationsSide(props) {
  const classes = useStyles();
  const { idResume } = props;
  useEffect(() => {
    async function data() {
      // const applicationsData = await getApplicationsByResumeId(idResume);
      const applicationsData = await getProjects();
      setApplications(applicationsData);
    }
    data();
  }, []);

  const [applications, setApplications] = useState([]);

  return (
    <div className="Applications-Side">
      <div className="Applications-header">
        <div className="Applications-title">
          <Typography color="primary" gutterBottom variant="h6">
            Your Applications
          </Typography>
        </div>
      </div>
      <div className="Applications-list">
        {applications.length !== 0 ? (
          applications.map((application) => (
            <div className={classes.cards}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    <div className={classes.image}>
                      <img alt="logo" />
                    </div>
                    <div className={classes.description}>
                      <Typography align="left" color="primary" variant="h6">
                        {application.name}
                      </Typography>
                      <Typography
                        align="left"
                        color="textSecondary"
                        variant="body1"
                      >
                        {"Owner: " + application.contact.name}
                      </Typography>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          ))
        ) : (
          <Empty message={"No projects yet"} size={80} />
        )}
      </div>
    </div>
  );
}

export default ApplicationsSide;
