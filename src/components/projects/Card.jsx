import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { projectImageJpeg } from "../../constants/images";
import { useHistory } from "react-router-dom";
import "./Card.scss";

const useStyles = makeStyles({
  accountIcon: {
    color: "#e2e2e2",
    fontSize: "1.8rem",
  },
  descriptionText: {
    fontSize: "0.9rem",
    textAlign: "justify",
  },
});
function Card(props) {
  const classes = useStyles();
  const { id, contact, creationDate, description, name } = props;
  const creationDateFormatted = creationDate
    .split("T")[0]
    .split("-")
    .reverse()
    .join("/");

  const history = useHistory();

  function handleViewClick(id) {
    history.push(`/projects/${id}`);
  }

  return (
    <div className="card-container" key={id}>
      <div className="card-info">
        <div className="left">
          <img alt="logo" src={projectImageJpeg} />
        </div>
        <div className="right">
          <div className="name">{name}</div>
          <label className="creation-date">
            Created: {creationDateFormatted}
          </label>
          <div className="description">
            <Typography className={classes.descriptionText}>
              {description}
            </Typography>
          </div>
        </div>
      </div>
      <div className="card-bottom">
        <div className="detail-field">
          <AccountCircleRoundedIcon className={classes.accountIcon} />
          <label className="details">{contact.name}</label>
        </div>
        <ArrowForwardIosIcon
          className="arrow"
          onClick={() => handleViewClick(id)}
        />
      </div>
    </div>
  );
}

export default Card;
