import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import React from "react";
import Typography from "@material-ui/core/Typography";
import project from "../../assets/project-img.svg";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
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
  modalInvitations: {
    maxWidth: 800,
    width: 400,
  },
  project: {
    left: 30,
  },
  summary: {
    left: 10,
  },
}));

export default function InvitationsModal({ setModalInvitations }) {
  const classes = useStyles();
  return (
    <div className={classes.modalInvitations}>
      <Dialog
        aria-labelledby="customized-dialog-title"
        onClose={() => setModalInvitations(false)}
        open={true}
      >
        <DialogTitle id="customized-dialog-title">
          Projects Invitations
        </DialogTitle>
        <DialogContent dividers>
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
        </DialogContent>
      </Dialog>
    </div>
  );
}
