//import { Email, CalendarToday, Description } from "@material-ui/icons";
import "./Card.scss";

function Card(props) {
  const { id, name } = props;
  //const { id, name, description, contact, creationDate } = props;
  return (
    <>
      <div key={id} className="card">
        {name}
      </div>
    </>
  );
}

export default Card;
