import Badge from "@material-ui/core/Badge";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  notifications: {
    backgroundColor: theme.palette.background.paper,
    left: "5%",
    maxWidth: 360,
    padding: 10,
    width: "100%",
  },
}));

export default function InvitationsNotifications({ handleOpenModal }) {
  const classes = useStyles();

  return (
    <List className={classes.notifications}>
      <ListItem onClick={handleOpenModal}>
        <ListItemAvatar>
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </ListItemAvatar>
        <ListItemText primary="Photos" secondary="Jan 9, 2014" />
      </ListItem>
    </List>
  );
}
