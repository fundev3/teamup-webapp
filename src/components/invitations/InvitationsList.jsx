import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import { getProjects } from "../projects/ProjectsAPI.js";
import project from "../../assets/project-img.svg";
import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const Accordion = withStyles({
  expanded: {},
  root: {
    "&$expanded": {
      margin: "auto",
    },
    "&:before": {
      display: "none",
    },
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    boxShadow: "none",
  },
})(MuiAccordion);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: 5,
  },
}))(MuiAccordionDetails);

const AccordionSummary = withStyles({
  content: {
    "&$expanded": {
      margin: "12px 12px",
    },
  },
  expanded: {},
  root: {
    "&$expanded": {
      minHeight: 56,
    },
    marginBottom: -1,
    minHeight: 56,
  },
})(MuiAccordionSummary);

const useStyles = makeStyles((theme) => ({
  button: {
    marginBottom: 20,
    marginLeft: 40,
  },
  buttons: {
    marginLeft: "25%",
  },
  logo: {
    paddingRight: 40,
  },
  project: {
    left: 30,
  },
  summary: {
    left: 10,
  },
}));

function InvitationsList(idResume) {
  const classes = useStyles();
  const [dataInvitations, setDataInvitations] = useState([]);

  const getInvitations = async (event) => {
    event.preventDefault();
    const response = await getProjects();
    setDataInvitations(response.data);
  };

  getInvitations();

  return (
    <>
      <Accordion>
        <AccordionSummary
          aria-controls="panel1a-content"
          className={classes.summary}
          expandIcon={<ExpandMoreIcon />}
          id="panel1a-header"
        >
          <div className={classes.logo}>
            <img alt="logo" className="project-logo" src={project}></img>
          </div>
          <div className={classes.project}>
            <Typography color="primary">Accordion 1</Typography>
            <Typography>
              Congratulations! You were selected to develop this wonderful
              project and be part of our fantastic team.
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          {dataInvitations}
          <Divider />
          <div className={classes.buttons}>
            <Button
              className={classes.button}
              color="primary"
              variant="outlined"
            >
              Accept
            </Button>
            <Button
              className={classes.button}
              color="secondary"
              variant="outlined"
            >
              Reject
            </Button>
          </div>
        </AccordionDetails>
      </Accordion>
      <Divider />
    </>
  );
}

export default InvitationsList;
