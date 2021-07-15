import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import React, { useState } from "react";
import { GetUser } from "./ResumeApi";
import "./ResumeDetail.css";
import { useEffect } from "react";

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

function Resume({ userId }) {
  const [user, setUser] = useState({});

  const refresh = () => {
    let userRes;
    GetUser(userId)
      .then((result) => {
        userRes = result;
      })
      .then(() => setUser(userRes));
  };
  useEffect(refresh, [userId]);

  const [readOnly, setReadOnly] = useState(true);
  const [showEdit, setShowEdit] = useState("Edit");
  const classes = useStyles();

  const edit = (event) => {
    event.preventDefault();
    setReadOnly(!readOnly);
    if (readOnly) {
      setShowEdit("Save");
      alert("You can edit");
    } else {
      setShowEdit("Edit");
      alert("Saved");
    }
  };

  return (
    <Grid container className={classes.root} spacing={5}>
      <Grid item xs={12}>
        <Typography variant="h4" color="primary">
          Resume Details
        </Typography>
      </Grid>
      <Grid className={classes.margin} item xs={12}>
        <TextField
          label="First Name"
          defaultValue={user.name}
          InputProps={{
            readOnly: readOnly,
          }}
          variant="outlined"
        />
        <TextField
          label="Last Name"
          defaultValue={user.username}
          InputProps={{
            readOnly: readOnly,
          }}
          variant="outlined"
        />
      </Grid>
      <Grid className={classes.margin} item xs={12}>
        <TextField
          label="Email"
          defaultValue={user.email}
          InputProps={{
            readOnly: readOnly,
          }}
          variant="outlined"
        />
        <TextField
          label="Contact"
          defaultValue={user.phone}
          InputProps={{
            readOnly: readOnly,
          }}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Biography"
          defaultValue={user.website}
          InputProps={{
            readOnly: readOnly,
          }}
          fullWidth
          variant="outlined"
          multiline
          rows={4}
        />
      </Grid>
      <Grid className={classes.margin} item xs={12}>
        <Button color="primary" variant="contained" onClick={edit}>
          {showEdit}
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            alert("Back");
          }}
        >
          Back
        </Button>
      </Grid>
    </Grid>
  );
}
export default Resume;
