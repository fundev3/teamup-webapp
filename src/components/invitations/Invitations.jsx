import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded";
import Invitation from "./Invitation";
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
});

function Invitations({ id }) {
  useEffect(() => {
    async function data() {
      const invitations = await getInvitationsByProject(id);
      setInvitations(invitations);
    }
    data();
  }, [id]);

  const classes = useStyles();
  const [invitations, setInvitations] = useState([]);
  return (
    <div>
      <Box display="flex" mb={5} pt={5}>
        <Box width="87.8%">
          <Typography align="justify" color="primary" variant="h6">
            People Invited
          </Typography>
        </Box>
        <Button color="primary" variant="contained">
          Invite People
        </Button>
      </Box>
      <div className="invitations-list">
        {invitations.length === 0 ? (
          <div className="empty-file">
            <DescriptionRoundedIcon className={classes.descriptionIcon} />
            <Typography>There is no invitations yet.</Typography>
          </div>
        ) : (
          invitations.map((invitation) => <Invitation {...invitation} />)
        )}
      </div>
    </div>
  );
}

export default Invitations;
