import "./Box.css";

function Box(props) {
  const { title, contact, lastUpdateDate } = props;
  return (
    <div className="Name">
      {title}
      <div className="Date">
        <label>{lastUpdateDate}</label>
      </div>
      <div className="Contact">
        <label>{contact.email}</label>
      </div>
    </div>
  );
}

export default Box;
