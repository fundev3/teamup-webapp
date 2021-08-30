import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import Divider from "@material-ui/core/Divider";
import Empty from "../../common/EmptyComponent/Empty";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import { Dialog, DialogTitle } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  acceptRejectInvitations,
  getInvitationsByResume,
} from "./InvitationsAPI.js";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import "./InvitationsModalResumes.scss";

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
  modalInvitations: {
    padding: 50,
  },
  project: {
    padding: "10px",
  },
  summary: {
    left: 10,
  },
}));

function InvitationsModal({ idResume, setModalInvitations, title }) {
  const [dataInvitations, setDataInvitations] = useState([]);
  const [send, setSend] = useState(false);

  const model = [
    {
      op: "replace",
      path: "/status",
      value: "Invited",
    },
  ];

  const classes = useStyles();
  useEffect(() => {
    async function data() {
      const invitations = await getInvitationsByResume(idResume);
      setDataInvitations(invitations);
      invitations.map((data) => (data["disabled"] = false));
      console.log(invitations);
      setSend(false);
    }
    data();
  }, [idResume]);

  const operationsInvitation = async (operation, idx) => {
    const information = [...dataInvitations];
    for (let index = 0; index < information.length; index++) {
      const element = information[index];
      if (idx == element.id) {
        element.disabled = true;
        model[0].value = operation;
        if (operation === "Accepted") {
          await acceptRejectInvitations(idx, model);
        } else {
          await acceptRejectInvitations(idx, model);
        }
      }
    }
    setDataInvitations(information);
  };

  return (
    <Dialog
      aria-describedby="alert-dialog-description"
      aria-labelledby="alert-dialog-title"
      onClose={() => setModalInvitations(false)}
      open={true}
    >
      <DialogTitle className="alert-dialog-title">
        <div className="modal-invitations-header">
          <Typography color="primary" gutterBottom variant="h6">
            Projects Invitations
          </Typography>
          <CloseIcon
            className={classes.modalCloseIcon}
            onClick={() => setModalInvitations(false)}
          />
        </div>
      </DialogTitle>
      <DialogContent>
        {dataInvitations.length !== 0 ? (
          dataInvitations.map((invitation, idx) =>
            invitation.status == "Invited" ? (
              <>
                <Accordion key={idx}>
                  <AccordionSummary
                    aria-controls="panel1a-content"
                    button
                    className={classes.summary}
                    expandIcon={<ExpandMoreIcon />}
                    id="panel1a-header"
                  >
                    <div className="logo">
                      <img alt="logo" src={`${invitation.pictureResume}`} />
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
                        disabled={invitation.disabled}
                        onClick={() =>
                          operationsInvitation("Accepted", invitation.id)
                        }
                        variant="outlined"
                      >
                        Accept
                      </Button>
                      <Button
                        className={classes.button}
                        color="secondary"
                        disabled={invitation.disabled}
                        onClick={() =>
                          operationsInvitation("Rejected", invitation.id)
                        }
                        variant="outlined"
                      >
                        Reject
                      </Button>
                    </div>
                  </AccordionDetails>
                </Accordion>
                <Divider />
              </>
            ) : null
          )
        ) : (
          <Accordion>
            <AccordionSummary
              aria-controls="panel1a-content"
              className={classes.summary}
              id="panel1a-header"
            >
              <AccordionDetails>
                <Empty
                  message={"You have no pending notifications"}
                  size={50}
                />
              </AccordionDetails>
            </AccordionSummary>
          </Accordion>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default InvitationsModal;
