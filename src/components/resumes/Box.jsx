import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "./Box.css";

function Box(props) {
  const { address, email, id, name } = props;
  return (
    <>
      <div className="resume-picture">
        <img
          alt=""
          src="https://www.zamora.gob.mx/oficialia/wp-content/uploads/2018/12/User-icon.png"
        ></img>
      </div>
      <div className="resume-information">
        <div className="Name">{name}</div>
        <div className="Contact">
          <label>{email}</label>
        </div>
        <div className="Date">
          <label>{address.zipcode}</label>
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
