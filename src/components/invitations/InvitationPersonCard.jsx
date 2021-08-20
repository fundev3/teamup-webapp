import React from "react";
import { userImageSvg } from "../../constants/images";
import { Button, Typography } from "@material-ui/core";
import "./InvitationPersonCard.scss";

export default function InvitationPersonCard(props) {
  const { resumeId, resumeName, handleInvitationSelected } = props;
  const [isInvited, setIsInvited] = React.useState(false);

  const handleClick = (id, status) => {
    setIsInvited(status);
    handleInvitationSelected(id, status);
    console.log(status);
  };

  return (
    <div className="person-card-box">
      <div className="person-card-info">
        <div className="left-info">
          <img alt="user" src={userImageSvg} />
        </div>
        <div className="right-info">
          <div className="user-name">
            <Typography color="primary" variant="h7">
              {resumeName}
            </Typography>
          </div>
        </div>
      </div>
      {!isInvited ? (
        <Button
          className="invite-button"
          color="primary"
          onClick={() => handleClick(resumeId, true)}
          variant="outlined"
        >
          Add
        </Button>
      ) : (
        <Button
          className="invite-button"
          color="secondary"
          onClick={() => handleClick(resumeId, false)}
          variant="outlined"
        >
          Remove
        </Button>
      )}
    </div>
  );
}
