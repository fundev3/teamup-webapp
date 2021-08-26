import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import { useHistory } from "react-router-dom";
import { userImageSvg } from "../../../constants";
import { Button, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    padding: "5px",
  },
  buttons: {
    padding: "5px",
  },
  summary: {
    left: 10,
  },
}));
const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: 5,
  },
}))(MuiAccordionDetails);

function ApplicationBox({ application }) {
  const history = useHistory();
  const classes = useStyles();
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
              onClick={() => redirectToResume(application.id)}
            >
              {application.name}
            </Typography>
          </div>
          <div className="application-box__user-skills">
            <Typography
              className="application-box__user-skills--container"
              style={{ color: "#999999", fontSize: "0.9rem" }}
            >
              {application.skills}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ApplicationBox;
