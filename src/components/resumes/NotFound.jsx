import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { notFoundImage } from "../../constants";

function NotFound() {
  return (
    <Grid
      style={{
        left: "40%",
        position: "absolute",
        top: "20%",
      }}
    >
      <Paper elevation={2}>
        <img alt="" src={notFoundImage} />
      </Paper>
    </Grid>
  );
}
export default NotFound;
