import { Button } from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { getInvitationsByResume } from "./InvitationsAPI.js";
import React, { useEffect, useState } from "react";

function InvitationsNotifications(props) {
  const { idResume, setModalInvitations } = props;
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    async function data() {
      const invitations = await getInvitationsByResume(idResume);
      const size = invitations.filter((data) => data.status === "Invited");
      setNotifications(size.length);
    }
    data();
  }, [idResume]);

  return (
    <Button
      className="buttonEdit"
      color="primary"
      onClick={() => setModalInvitations(true)}
      startIcon={<MailOutlineIcon />}
      variant="contained"
    >
      {`${notifications} Project Invitations`}
    </Button>
  );
}

export default InvitationsNotifications;
