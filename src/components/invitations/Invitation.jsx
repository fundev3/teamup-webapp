import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { makeStyles } from "@material-ui/core/styles";
import { userImageSvg } from "../../constants/images";
import { Grid, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  arrow: {
    margin: "49px 10px",
  },
  image: {
    height: "100px",
    margin: "10%",
    width: "100px",
  },
  nameStatus: {
    margin: "30px 0px 0px 15px",
  },
  paper: {
    height: "120px",
    margin: "0px 40px 30px 0px",
    width: "330px",
  },
}));

function Invitation(props) {
  const { resumeName, status } = props;
  const classes = useStyles();
  return (
    <Paper className={classes.paper} elevation={1}>
      <Grid container spacing={1}>
        <Grid item>
          <div className={classes.image}>
            <img alt="logo" src={userImageSvg} />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className={classes.nameStatus}>
            <Typography align="left" color="primary" variant="h6">
              {resumeName}
            </Typography>
            <Typography align="left" color="textSecondary" variant="body1">
              {status}
            </Typography>
          </div>
        </Grid>
        <Grid item>
          <div className={classes.arrow}>
            <ArrowForwardIosIcon className="arrow" />
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Invitation;
