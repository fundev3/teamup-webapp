import "./Box.css";

function Box(props) {
  const { contact, lastUpdate, title } = props;
  return (
    <div className="Name">
      {title}
      <div className="Date">
        <label>{lastUpdate}</label>
      </div>
      <div className="Contact">
        <label>{contact.email}</label>
      </div>
    </div>
  );
}

export default Box;
