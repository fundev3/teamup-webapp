import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import "./Empty.scss";

const useStyles = makeStyles({
  customGrayFont: {
    color: "#d2d2d2",
    fontWeight: "bold",
  },
  descriptionIcon: {
    color: "#e2e2e2",
    fontSize: "10rem",
    margin: "30px",
  },
});

function Empty(props) {
  const { message, size } = props;
  const classes = useStyles();
  if (size > 199)
    return (
      <div className="empty-file-large">
        <DescriptionRoundedIcon
          className={classes.descriptionIcon}
          style={{ fontSize: "10rem" }}
        />
        <Typography className={classes.customGrayFont}>{message}</Typography>
      </div>
    );
  else
    return (
      <div className="empty-file-little">
        <DescriptionRoundedIcon
          className={classes.descriptionIcon}
          style={{ fontSize: "7rem" }}
        />
        <Typography className={classes.customGrayFont}>{message}</Typography>
      </div>
    );
}
export default Empty;
