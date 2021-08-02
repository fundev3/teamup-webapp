import Box from "@material-ui/core/Box";
import loadingImg from "../../assets/loading.gif";

function Loading() {
  return (
    <Box bgcolor="background.paper" mx="auto" p={10}>
      <img alt="" src={loadingImg}></img>
    </Box>
  );
}

export default Loading;
