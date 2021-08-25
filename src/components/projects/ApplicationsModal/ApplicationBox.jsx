import { useHistory } from "react-router-dom";
import { userImageSvg } from "../../../constants";
import { Button, Typography } from "@material-ui/core";

function ApplicationBox({ postulation }) {
  const history = useHistory();
  const { resumeId, resumeName } = postulation;

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
              {resumeName}
            </Typography>
          </div>
        </div>
      </div>
      <Button
        color="primary"
        onClick={() => redirectToResume(resumeId)}
        variant="outlined"
      >
        <span className="application-btn">See profile</span>
      </Button>
    </div>
  );
}
export default ApplicationBox;
