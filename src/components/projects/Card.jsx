import { CalendarToday, Person } from "@material-ui/icons";
import "./Card.scss";

function Card(props) {
  // TODO change properties when the backend is ready
  const {
    address: { zipcode },
    id,
    name,
    username,
  } = props;

  return (
    <div className="Card-Container" key={id}>
      <div className="Name">{name}</div>
      <div className="Field">
        <CalendarToday color="primary" />
        <label>{zipcode}</label>
      </div>
      <div className="Field Creation-date">
        <Person color="primary" />
        <label>{username}</label>
      </div>
    </div>
  );
}

export default Card;
