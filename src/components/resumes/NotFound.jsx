import Typography from "@material-ui/core/Typography";
import { emptyImageSvg } from "../../constants";
import { makeStyles } from "@material-ui/core/styles";
import "./NotFound.scss";

const useStyles = makeStyles((theme) => ({
  notFoundLabel: {
    color: "#d2d2d2",
    fontWeight: "bold",
  },
}));

function NotFound(props) {
  const { message, size } = props;
  const classes = useStyles();
  if (size > 199)
    return (
      <div className="not-found-large">
        <img alt="emptyImage" src={emptyImageSvg} style={{ width: size }} />
        <Typography className={classes.notFoundLabel} style={{ fontSize: 20 }}>
          {message}
        </Typography>
      </div>
    );
  else
    return (
      <div className="not-found-little">
        <img alt="emptyImage" src={emptyImageSvg} style={{ width: size }} />
        <Typography className={classes.notFoundLabel} style={{ fontSize: 12 }}>
          {message}
        </Typography>
      </div>
    );
}
export default NotFound;
