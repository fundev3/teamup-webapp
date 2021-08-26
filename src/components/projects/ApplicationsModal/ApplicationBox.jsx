import { Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { userImageSvg } from "../../../constants";

function ApplicationBox({ postulation }) {
  const history = useHistory();
  const { resumeId, resumeName, skills } = postulation;

  function redirectToResume(id) {
    history.push(`/resumes/${id}`);
  }

  return (
    <div className="application-box">
      <div className="application-box__info">
        <div className="application-box__info--left">
          <img alt="user" src={userImageSvg} width="50px" />
        </div>
        <div className="application-box__info--right">
          <div className="application-box__user-name">
            <Typography
              className="application-box__user-name--container"
              color="primary"
              onClick={() => redirectToResume(resumeId)}
            >
              {resumeName}
            </Typography>
          </div>
          <div className="application-box__user-skills">
            <Typography
              className="application-box__user-skills--container"
              style={{ color: "#999999", fontSize: "0.9rem" }}
            >
              {skills}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ApplicationBox;
