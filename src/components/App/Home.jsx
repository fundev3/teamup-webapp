import Typography from "@material-ui/core/Typography";
import "./Home.scss";

export function Home() {
  return (
    <div className="content">
      <Typography
        style={{
          color: "#9E9EAA",
          fontSize: "7.5rem",
          fontWeight: "700",
          letterSpacing: "-0.12em",
        }}
        variant="h1"
      >
        TeamUp
      </Typography>
      <Typography
        style={{ color: "#9e9e9e", letterSpacing: "0.02em" }}
        variant="h7"
      >
        Close the gap between you and your project
      </Typography>
    </div>
  );
}
