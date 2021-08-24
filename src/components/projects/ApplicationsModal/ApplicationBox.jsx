import { useHistory } from "react-router-dom";
import { userImageSvg } from "../../../constants";
import { Button, Typography } from "@material-ui/core";

function ApplicationBox({ application }) {
  const history = useHistory();

  function redirectToResume(id) {
    history.push(`/resumes/${id}`);
  }

  return (
    <div className="application-box">
      <div className="application-box__info">
        <div className="application-box__info--left">
          <img alt="user" src={userImageSvg} />
        </div>
        <div className="application-box__info--right">
          <div className="application-box__user-name">
            <Typography
              className="application-box__user-name--container"
              color="primary"
            >
              {application.name}
            </Typography>
          </div>
        </div>
      </div>
      <Button
        color="primary"
        onClick={() => redirectToResume(application.id)}
        variant="outlined"
      >
        <span className="application-btn">See profile</span>
      </Button>
    </div>
  );
}
export default ApplicationBox;
