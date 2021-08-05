import logoHome from "../../assets/logo-teamup2.png";
import "./Home.scss";

export function Home() {
  return (
    <div className="home">
      <img alt="logo" src={logoHome} style={{ width: "700px" }} />
    </div>
  );
}
