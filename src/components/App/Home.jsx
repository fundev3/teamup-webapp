import { logoHomeSvg } from "../../constants";
import "./Home.scss";

export function Home() {
  return (
    <div className="home">
      <img
        alt="logo"
        src={logoHomeSvg}
        style={{ marginTop: "10px", width: "60%" }}
      />
    </div>
  );
}
