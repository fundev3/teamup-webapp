import { Email, CalendarToday, Description } from "@material-ui/icons";
import "./Card.scss";

function Card(props) {
  const { id, name, description, contact, creationDate } = props;
  return (
    <>
      <div key={id} className="card">
        <div className="title">{name} </div>
        <div className="information">
          <Description color="primary" />
          <label> {description} </label>
        </div>
        <div className="contact">
          <Email color="primary" />
          <label>{contact}</label>
        </div>
        <div className="date">
          <CalendarToday color="primary" />
          <label>{creationDate} </label>
        </div>
      </div>
    </>
  );
}

export default Card;
