import { CalendarToday, Person } from "@material-ui/icons";
import "./Card.scss";

function Card(props) {
  const { id, contact, creationDate, description, name } = props;
  const newCreationDate = creationDate.split("T")[0];

  return (
    <div className="Card-Container" key={id}>
      <div className="name">{name}</div>
      <div className="description">
        <label>{description}</label>
      </div>
      <div className="detail-field">
        <Person color="primary" style={{ fontSize: "1.3rem" }} />
        <label className="details">{contact.name}</label>
      </div>
      <div className="detail-field">
        <CalendarToday
          color="primary"
          style={{ fontSize: "1.2rem", marginLeft: "1px" }}
        />
        <label className="details">{newCreationDate}</label>
      </div>
    </div>
  );
}

export default Card;
