import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import loadingGift from "../../assets/loading.gif";

function Loading() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      style={{
        position: "absolute",
        top: "200px",
      }}
    >
      <Box bgcolor="background.paper">
        <img alt="" src={loadingGift}></img>
      </Box>
    </Grid>
  );
}

export default Loading;