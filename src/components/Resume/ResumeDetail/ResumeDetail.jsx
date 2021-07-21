import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import useFetch from "./useFetch";
import React, { useState } from "react";
import "./ResumeDetail.css";

const useStyles = makeStyles((theme) => ({
  margin: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  root: {
    margin: 30,
    width: 500,
  },
}));

function Resume({ resumeId }) {
  const classes = useStyles();
  const { data, error } = useFetch(resumeId);
  console.log(data);
  const [readOnly, setReadOnly] = useState(true);
  const [showEdit, setShowEdit] = useState("Edit");

  const edit = (event) => {
    event.preventDefault();
    setReadOnly(!readOnly);
    if (readOnly) {
      setShowEdit("Save");
    } else {
      setShowEdit("Edit");
    }
  };
  if (error) return <div>ERROR!!! Resume not found</div>;
  return data ? (
    <Grid className={classes.root} container spacing={5}>
      <Grid item xs={12}>
        <Typography color="primary" variant="h4">
          Resume Details
        </Typography>
      </Grid>

      <Grid className={classes.margin} item xs={12}>
        <TextField
          InputProps={{
            readOnly: readOnly,
          }}
          defaultValue={data.firstName}
          label="First Name"
          variant="outlined"
        />
        <TextField
          InputProps={{
            readOnly: readOnly,
          }}
          defaultValue={data.lastName}
          label="Last Name"
          variant="outlined"
        />
      </Grid>
      <Grid className={classes.margin} item xs={12}>
        <TextField
          InputProps={{
            readOnly: readOnly,
          }}
          defaultValue={data.email}
          label="Email"
          variant="outlined"
        />
        <TextField
          InputProps={{
            readOnly: readOnly,
          }}
          defaultValue={data.phone}
          label="Contact"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          InputProps={{
            readOnly: readOnly,
          }}
          defaultValue={data.summary}
          fullWidth
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
