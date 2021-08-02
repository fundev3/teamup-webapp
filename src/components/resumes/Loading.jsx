import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import loadingImg from "../../assets/loading.gif";

function Loading() {
  return (
    <Grid
      style={{
        left: "20%",
        position: "absolute",
        top: "20%",
      }}
    >
      <Box bgcolor="background.paper" p={10}>
        <img alt="" src={loadingImg}></img>
      </Box>
    </Grid>
  );
}

export default Loading;
