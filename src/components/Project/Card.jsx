import { Description, Email, CalendarToday } from "@material-ui/icons";
import "./Card.scss";

function Card(props) {
  const { address, email, id, name, username } = props;
  return (
    <div key={id} className="Card-Container">
      <div className="Name">{name}</div>
      <div className="Field Description">
        <Description color="primary" />
        <label>{username}</label>
      </div>
      <div className="Field Contact">
        <Email color="primary" />
        <label>{email}</label>
      </div>
      <div className="Field Creation-date">
        <CalendarToday color="primary" />
        <label>{address.zipcode}</label>
      </div>
    </div>
  );
}

export default Card;
