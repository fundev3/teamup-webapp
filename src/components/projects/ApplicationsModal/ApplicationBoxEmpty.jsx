import { emptyImageSvg } from "../../../constants";
function ApplicationBoxEmpty() {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ height: "130px" }}>
        <img alt="logo" src={emptyImageSvg} style={{ width: "130px" }} />
      </div>
      <p style={{ color: "#c0c0c0", minWidth: "300px" }}>
        There are no postulations yet
      </p>
    </div>
  );
}
export default ApplicationBoxEmpty;
