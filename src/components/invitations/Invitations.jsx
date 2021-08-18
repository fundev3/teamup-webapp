import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded";
import Invitation from "./Invitation";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Typography } from "@material-ui/core";
import "./Invitations.scss";
const dummyInvitationList = [
  {
    name: "Pedro",
    picture: "photo.png",
    status: "Pending",
  },
  {
    name: "Rodrigo",
    picture: "photo.png",
    status: "Pending",
  },
  {
    name: "Lilian",
    picture: "photo.png",
    status: "Pending",
  },
  {
    name: "Paulo",
    picture: "photo.png",
    status: "Pending",
  },
  {
    name: "Alejandro",
    picture: "photo.png",
    status: "Pending",
  },
  {
    name: "Freddy",
    picture: "photo.png",
    status: "Pending",
  },
];

const useStyles = makeStyles({
  descriptionIcon: {
    color: "#e2e2e2",
    fontSize: "10rem",
    margin: "30px",
  },
});

function Invitations() {
  const classes = useStyles();
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
        {dummyInvitationList.length === 0 ? (
          <div className="empty-file">
            <DescriptionRoundedIcon className={classes.descriptionIcon} />
            <Typography>There is no invitations yet.</Typography>
          </div>
        ) : (
          dummyInvitationList.map((invitation) => (
            <Invitation {...invitation} />
          ))
        )}
      </div>
    </div>
  );
}

export default Invitations;
