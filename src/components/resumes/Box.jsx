import "./Box.css";

function Box(props) {
  const { email, id, name } = props;
  return (
    <div className="Name">
      {name}
      <div className="Date">
        <label>{email}</label>
      </div>
      <div className="Contact">
        <label>{id}</label>
      </div>
    </div>
  );
}

export default Box;
