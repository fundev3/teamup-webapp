import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Typography } from "@material-ui/core";
import image from "../../assets/project-img.jpeg";
import { useHistory } from "react-router-dom";
import "./Card.scss";

function Card(props) {
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
          <img alt="logo" src={image} />
        </div>
        <div className="right">
          <div className="name">{name}</div>
          <label className="creation-date">
            Created: {creationDateFormatted}
          </label>
          <div className="description">
            <Typography style={{ fontSize: "0.9rem", textAlign: "justify" }}>
              {description}
            </Typography>
          </div>
        </div>
      </div>
      <div className="card-bottom">
        <div className="detail-field">
          <AccountCircleRoundedIcon
            style={{ color: "#e2e2e2", fontSize: "1.8rem" }}
          />
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
