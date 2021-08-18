import InvitationsList from "../invitations/InvitationsList";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, DialogTitle } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modalInvitations: {
    maxWidth: 800,
    width: 400,
  },
}));

export default function InvitationsModal({ idResume, setModalInvitations }) {
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
        <InvitationsList idResumes={idResume} />
      </Dialog>
    </div>
  );
}
