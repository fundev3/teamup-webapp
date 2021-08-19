import Badge from "@material-ui/core/Badge";
import InvitationsModal from "../invitations/InvitationsModal";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import { getInvitationsByResume } from "./InvitationsAPI.js";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  notifications: {
    backgroundColor: theme.palette.background.paper,
    left: "5%",
    maxWidth: 360,
    padding: 10,
    top: 90,
  },
}));

export default function InvitationsNotifications({
  idResume,
  setModalInvitations,
}) {
  const classes = useStyles();
  const [dataInvitations, setDataInvitations] = useState();

  const getInvitations = async (event) => {
    event.preventDefault();
    const response = await getInvitationsByResume(idResume);
    setDataInvitations(response.data);
    setModalInvitations(true);
    console.log(dataInvitations);
  };

  return (
    <>
      {setModalInvitations ? (
        <InvitationsModal
          idResume={idResume}
          setModalInvitations={setModalInvitations}
        />
      ) : null}
      <List className={classes.notifications} onClick={getInvitations()}>
        <ListItem>
          <ListItemAvatar>
            <Badge badgeContent={dataInvitations} color="error">
              <MailIcon />
            </Badge>
          </ListItemAvatar>
          <ListItemText primary="Invitations" />
        </ListItem>
      </List>
    </>
  );
}
