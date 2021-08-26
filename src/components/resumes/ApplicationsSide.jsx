import NotFound from "./NotFound";
import { getApplicationsByResumeId } from "./ResumesAPI.js";
import { makeStyles } from "@material-ui/core/styles";
import { BASE_URL, projectImageSvg } from "../../constants";
import { Box, Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./ApplicationsSide.scss";

const useStyles = makeStyles((theme) => ({
  image: {
    height: "70px",
    margin: "10px 20px",
    width: "70px",
  },
  name: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  paper: {
    color: theme.palette.text.secondary,
    margin: "15px",
    padding: "20px",
    textAlign: "center",
    width: "150px",
  },
  status: {
    alignContent: "center",
    fontSize: "14px",
    textAlign: "center",
  },
}));

function ApplicationsSide(props) {
  const classes = useStyles();
  const { idResume } = props;

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    async function data() {
      const applicationsData = await getApplicationsByResumeId(idResume);
      setApplications(applicationsData.data);
    }
    data();
  }, [idResume]);

  return (
    <>
      <div className="applications-side">
        <div className="applications-title">
          <Typography align="justify" color="primary" variant="h6">
            Your Applications
          </Typography>
        </div>
        <Box display="flex" justifyContent="space-between" mb={5} pt={5}>
          <div className="applications-list">
            {applications.length === 0 ? (
              <NotFound message={"There is no applications yet."} size={150} />
            ) : (
              applications.map((application) => (
                <Paper className={classes.paper} elevation={1}>
                  <Grid container>
                    {application.picture == null ? (
                      <img
                        alt={""}
                        className={classes.image}
                        src={projectImageSvg}
                      />
                    ) : (
                      <img
                        alt={""}
                        className={classes.image}
                        src={`${BASE_URL}/${application.picture}`}
                      />
                    )}
                    <div className="card-description-detail">
                      <Typography className={classes.name} color="primary">
                        {application.projectName}
                      </Typography>
                      <Typography className={classes.status}>
                        {application.state}
                      </Typography>
                    </div>
                  </Grid>
                </Paper>
              ))
            )}
          </div>
        </Box>
      </div>
    </>
  );
}

export default ApplicationsSide;
