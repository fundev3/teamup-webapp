import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import React, { useState } from "react";
import useFetch from "./ResumeApi";
import "./ResumeDetail.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
  },
  margin: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
//resumeId = resume api link
function Resume({ resumeId }) {
  const classes = useStyles();
  const { data, error } = useFetch(resumeId);
  const [readOnly, setReadOnly] = useState(true);
  const [showEdit, setShowEdit] = useState("Edit");

  const edit = (event) => {
    event.preventDefault();
    setReadOnly(!readOnly);
    if (readOnly) {
      setShowEdit("Save");
      alert("You can edit"); //change alert message
    } else {
      setShowEdit("Edit");
      alert("Saved"); //change alert message
    }
  };
  if (error) return <div>ERROR!!! Resume not found</div>;
  return data ? (
    <Grid container className={classes.root} spacing={5}>
      <Grid item xs={12}>
        <Typography variant="h4" color="primary">
          Resume Details
        </Typography>
      </Grid>

      <Grid className={classes.margin} item xs={12}>
        <TextField
          defaultValue={data.firstName}
          InputProps={{
            readOnly: readOnly,
          }}
          label="First Name"
          variant="outlined"
        />
        <TextField
          defaultValue={data.lastName}
          InputProps={{
            readOnly: readOnly,
          }}
          label="Last Name"
          variant="outlined"
        />
      </Grid>
      <Grid className={classes.margin} item xs={12}>
        <TextField
          defaultValue={data.email}
          InputProps={{
            readOnly: readOnly,
          }}
          label="Email"
          variant="outlined"
        />
        <TextField
          defaultValue={data.phone}
          InputProps={{
            readOnly: readOnly,
          }}
          label="Contact"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          defaultValue={data.summary}
          fullWidth
          InputProps={{
            readOnly: readOnly,
          }}
          label="Biography"
          multiline
          rows={4}
          variant="outlined"
        />
      </Grid>
      <Grid className={classes.margin} item xs={12}>
        <Button color="primary" onClick={edit} variant="contained">
          {showEdit}
        </Button>
        <Button
          color="primary"
          onClick={() => {
            alert("Back");
          }}
          variant="contained"
        >
          Back
        </Button>
      </Grid>
    </Grid>
  ) : (
    <div>Loading</div>
  );
}
export default Resume;
