import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { BASE_URL } from "../../constants";
import Empty from "../../common/EmptyComponent/Empty";
import { Typography } from "@material-ui/core";
import { getApplicationsByResumeId } from "./ResumesAPI.js";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import "./ApplicationsSide.scss";

const useStyles = makeStyles((theme) => ({
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

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    async function data() {
      const applicationsData = await getApplicationsByResumeId(idResume);
      setApplications(applicationsData);
    }
    data();
  }, []);

  return (
    <div className="applications-side">
      <div className="applications-header">
        <div className="applications-title">
          <Typography color="primary" gutterBottom variant="h6">
            Your Applications
          </Typography>
        </div>
        <div className="applications-list">
          {applications.length !== 0 ? (
            applications.map((application) => (
              <div className="card">
                <div className="card-image">
                  <img alt="logo" src={`${BASE_URL}/${application.logo}`} />
                </div>
                <div className="card-description">
                  <div className="card-description-title">
                    <Typography align="left" color="primary" variant="h6">
                      {application.name}
                    </Typography>
                  </div>
                  <div className="card-description-detail">
                    <Typography
                      align="left"
                      color="textSecondary"
                      variant="body1"
                    >
                      <AccountCircleIcon className="card-icon" />
                      {application.contact.name}
                    </Typography>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <Empty message={"No projects yet"} size={70} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ApplicationsSide;
