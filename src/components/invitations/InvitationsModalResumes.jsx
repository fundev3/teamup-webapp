import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import { getInvitationsByResume } from "./InvitationsAPI.js";
import { projectImageJpeg } from "../../constants/images";
import { Dialog, DialogTitle } from "@material-ui/core";
import React, { useEffect, useState } from "react";
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
    padding: 50,
  },
  project: {
    left: 100,
  },
  summary: {
    left: 10,
  },
}));

function InvitationsModal({ idResume, setModalInvitations }) {
  const classes = useStyles();
  useEffect(() => {
    async function data() {
      const invitations = await getInvitationsByResume(idResume);
      setDataInvitations(invitations);
    }
    data();
  }, [idResume]);

  const [dataInvitations, setDataInvitations] = useState([]);

  return (
    <Dialog
      aria-describedby="alert-dialog-description"
      aria-labelledby="alert-dialog-title"
      onClose={() => setModalInvitations(false)}
      open={true}
    >
      <DialogTitle id="customized-dialog-title">
        <Typography color="primary" variant="h6">
          Projects Invitations
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        {dataInvitations.length !== 0 ? (
          dataInvitations.map((invitation) => (
            <>
              <Accordion>
                <AccordionSummary
                  aria-controls="panel1a-content"
                  className={classes.summary}
                  expandIcon={<ExpandMoreIcon />}
                  id="panel1a-header"
                >
                  <div className={classes.logo}>
                    <img alt="logo" src={projectImageJpeg} />
                  </div>
                  <div className={classes.project}>
                    <Typography color="primary" variant="h6">
                      {invitation.projectName}
                    </Typography>
                    <Typography>{invitation.textInvitation}</Typography>
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
            </>
          ))
        ) : (
          <Accordion>
            <AccordionSummary
              aria-controls="panel1a-content"
              className={classes.summary}
              expandIcon={<ExpandMoreIcon />}
              id="panel1a-header"
            >
              <AccordionDetails>
                <Typography>You have no pending notifications</Typography>
              </AccordionDetails>
            </AccordionSummary>
          </Accordion>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default InvitationsModal;
