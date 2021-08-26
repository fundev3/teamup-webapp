import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { BASE_URL } from "../../constants";
import NotFound from "./NotFound";
import { getApplicationsByResumeId } from "./ResumesAPI.js";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./ApplicationsSide.scss";

const useStyles = makeStyles((theme) => ({
  description: {
    alignContent: "center",
    alignItems: "center",
    display: "flex",
    fontSize: "14px",
    margin: "10px",
  },
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
    fontSize: "14px",
  },
}));

function ApplicationsSide(props) {
  const classes = useStyles();
  const { idResume } = props;

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    async function data() {
      const applicationsData = await getApplicationsByResumeId(idResume);
      setApplications(applicationsData);
    }
    data();
  }, []);

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
            {applications.length !== 0 ? (
              applications.map((application) => (
                <Paper className={classes.paper} elevation={1}>
                  <Grid container spacing={1}>
                    <Grid item>
                      <img
                        alt="logo"
                        className={classes.image}
                        src={`${BASE_URL}/${application.logo}`}
                      />
                    </Grid>
                    <div className="card-description-detail">
                      <Typography className={classes.name} color="primary">
                        {application.name}
                      </Typography>
                      <Typography
                        className={classes.description}
                        color="textSecondary"
                      >
                        <AccountCircleIcon
                          style={{ color: "rgb(239 136 74)" }}
                        />
                        {application.contact.name}
                      </Typography>
                      <Typography
                        className={classes.status}
                        color="textSecondary"
                      >
                        {application.state}
                      </Typography>
                    </div>
                    <Grid item>
                      <div className={classes.arrow}></div>
                    </Grid>
                  </Grid>
                </Paper>
              ))
            ) : (
              <NotFound message={"There is no applications yet."} size={150} />
            )}
          </div>
        </Box>
      </div>
    </>
  );
}

export default ApplicationsSide;
