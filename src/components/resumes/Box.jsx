import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "./Box.css";

function Box(props) {
  const { id, contact, personalInformation, summary } = props;
  return (
    <>
      <div className="resume-picture">
        <img
          alt=""
          src="https://www.zamora.gob.mx/oficialia/wp-content/uploads/2018/12/User-icon.png"
        ></img>
      </div>
      <div className="resume-information">
        <div className="name">
          {`${personalInformation.firstName} ${personalInformation.lastName}`}
        </div>
        <div className="date">
          <label>{`${summary}`}</label>
        </div>
        <div className="contact">
          <label>{contact.email}</label>
        </div>
      </div>
      <div className="resume-button">
        <Link to={`/resumes/${id}`}>
          <Button color="primary" variant="contained">
            Detail
          </Button>
        </Link>
      </div>
    </>
  );
}

export default Box;
