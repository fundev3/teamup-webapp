import { CalendarToday, Email } from "@material-ui/icons";
import "./Card.scss";

function Card(props) {
  const { email, id, name } = props;
  return (
    <div className="Card-Container" key={id}>
      <div className="Name">{name}</div>
      <div className="Field Contact">
        <Email color="primary" />
        <label>{email}</label>
      </div>
      <div className="Field Creation-date">
        <CalendarToday color="primary" />
        <label></label>
      </div>
    </div>
  );
}

export default Card;
