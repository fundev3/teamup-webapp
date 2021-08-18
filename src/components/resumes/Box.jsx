import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { User } from "../../constants/images";
import { makeStyles } from "@material-ui/core/styles";
import { Chip, Paper, Typography } from "@material-ui/core";
import "./Box.css";

const useStyles = makeStyles((theme) => ({
  divider: {
    height: 28,
    margin: 4,
  },
  iconButton: {
    padding: 10,
  },
  input: {
    flex: 1,
    marginLeft: theme.spacing(2),
  },
  paper: {
    color: theme.palette.text.secondary,
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
    },
  },
  searchBoxContainer: {
    alignItems: "center",
    display: "flex",
    marginBottom: "15px",
    padding: "2px 4px",
    width: "100%",
  },
}));

function Box(props) {
  const { id, contact, personalInformation, summary, skills } = props;
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <div className="head-resume">
        <div className="resume-picture">
          <img alt="" src={User}></img>
        </div>
        <div className="resume-information">
          <div className="name">
            {`${personalInformation.firstName} ${personalInformation.lastName}`}
          </div>
          <div className="date">
            <label>{`${contact.email}`}</label>
          </div>
        </div>
      </div>
      <div className="body-resume">
        <Typography component="body1" variant="body1">
          {`${summary}`}
        </Typography>
      </div>
      <div className="chip-skills">
        {skills.map((skill) => (
          <Chip className="chip" key={skill.id} label={skill.name} />
        ))}
      </div>
      <div className="resume-button">
        <Link style={{ textDecoration: "none" }} to={`/resumes/${id}`}>
          <Button color="primary" variant="contained">
            View Profile
          </Button>
        </Link>
      </div>
    </Paper>
  );
}

export default Box;
