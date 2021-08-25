import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded";
import Invitation from "./Invitation";
import InvitationsModal from "./InvitationsModal";
import { getInvitationsByProject } from "./InvitationsAPI";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Invitations.scss";

const useStyles = makeStyles({
  descriptionIcon: {
    color: "#e2e2e2",
    fontSize: "10rem",
    margin: "30px",
  },
  emptyList: {
    color: "#d2d2d2",
    fontWeight: "600",
  },
  invitationButton: {
    height: "40px",
    width: "200px",
  },
});

function Invitations({ id, project }) {
  useEffect(() => {
    async function data() {
      const invitations = await getInvitationsByProject(id);
      setInvitations(invitations);
    }
    data();
  }, [id]);

  const classes = useStyles();
  const [invitations, setInvitations] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };
  return (
    <div>
      <Box
        display="flex"
        height="100px"
        justifyContent="space-between"
        mb={5}
        pt={5}
      >
        <Typography align="justify" color="primary" variant="h6">
          People Invited
        </Typography>
        <Button
          className={classes.invitationButton}
          color="primary"
          onClick={handleClickOpen}
          variant="contained"
        >
          Invite People
        </Button>
      </Box>
      <Box height="5px">
        <InvitationsModal
          allInvitations={invitations}
          id={id}
          onClose={handleClose}
          open={open}
          project={project}
          setInvitations={setInvitations}
        />
      </Box>
      <div className="invitations-list">
        {invitations.length === 0 ? (
          <div className="empty-file">
            <DescriptionRoundedIcon className={classes.descriptionIcon} />
            <Typography className={classes.emptyList}>
              There is no invitations yet.
            </Typography>
          </div>
        ) : (
          invitations.map((invitation, idx) => (
            <Invitation {...invitation} key={idx} />
          ))
        )}
      </div>
    </div>
  );
}

export default Invitations;
