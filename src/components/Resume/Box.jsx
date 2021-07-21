import { Description, Email,Name } from "@material-ui/icons";
import "./Box.css";

function Box(props) {
  const { name, username, email, description } = props;
  return (
    <div className="Name">
      {name}
      <div className="Description">
        <Description color="primary" />
        <label>{username}</label>
      </div>
      <div className="Contact">
        <Email color="primary" />
        <label>{email}</label>
      </div>
    </div>
  );
}

export default Box;