import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import useFetch from "./useFetch";
import React, { useState } from "react";
import "./Details.css";

const useStyles = makeStyles((theme) => ({
  margin: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  root: {
    margin: 30,
    width: 760,
  },
}));

function Details({ resumeId }) {
  const classes = useStyles();
  const { data, error } = useFetch(resumeId);
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
      <Grid className={classes.margin} item xs={12}>
        <Typography color="primary" variant="h4">
          {data.name} {data.username}
        </Typography>
        <div>creation date</div>
        <div>last update</div>
      </Grid>

      <Grid className={classes.margin} item xs={18}>
        <TextField
          InputProps={{
            readOnly: readOnly,
          }}
          defaultValue={data.name}
          label="First Name"
          variant="outlined"
        />
        <TextField
          InputProps={{
            readOnly: readOnly,
          }}
          defaultValue={data.username}
          label="Last Name"
          variant="outlined"
        />
        <TextField
          InputProps={{
            readOnly: readOnly,
          }}
          defaultValue="2017-05-24"
          label="Birthdate"
          type="date"
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
          label="Phone"
          variant="outlined"
        />
        <TextField
          InputProps={{
            readOnly: readOnly,
          }}
          defaultValue={data.address.street}
          label="Address"
          variant="outlined"
        />
      </Grid>
      <Grid className={classes.margin} item xs={12}>
        <TextField
          InputProps={{
            readOnly: readOnly,
          }}
          defaultValue={data.website}
          fullWidth
          label="Summary"
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
export default Details;
