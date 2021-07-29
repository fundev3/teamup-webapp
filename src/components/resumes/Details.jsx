import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { getResume } from "./ResumesAPI.js";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
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

function Details() {
  const { id } = useParams();
  const classes = useStyles();
  const [data, setData] = useState();
  const [readOnly, setReadOnly] = useState(true);
  const [showEdit, setShowEdit] = useState("Edit");

  useEffect(() => {
    async function fetchData() {
      const id = "dd05d77a-ca64-401a-be39-8e1ea84e2f83";
      const response = await getResume(id);
      setData(response);
      console.log(response);
    }
    fetchData();
  }, [id]);

  const edit = (event) => {
    event.preventDefault();
    setReadOnly(!readOnly);
    if (readOnly) {
      setShowEdit("Save");
    } else {
      setShowEdit("Edit");
    }
  };
  return data ? (
    <Grid className={classes.root} container spacing={5}>
      <Grid className={classes.margin} item xs={12}>
        <div>creation date: {data.creationDate}</div>
        <div>last update: {data.lastUpdate}</div>
      </Grid>

      <Grid className={classes.margin} item xs={18}>
        <TextField
          InputProps={{
            readOnly: readOnly,
          }}
          defaultValue={data.personalInformation.firstName}
          label="First Name"
          variant="outlined"
        />
        <TextField
          InputProps={{
            readOnly: readOnly,
          }}
          defaultValue={data.personalInformation.lastName}
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
          defaultValue={data.contact.email}
          label="Email"
          variant="outlined"
        />
        <TextField
          InputProps={{
            readOnly: readOnly,
          }}
          defaultValue={data.contact.phone}
          label="Phone"
          variant="outlined"
        />
        <TextField
          InputProps={{
            readOnly: readOnly,
          }}
          defaultValue={data.contact.direction}
          label="Address"
          variant="outlined"
        />
      </Grid>
      <Grid className={classes.margin} item xs={12}>
        <TextField
          InputProps={{
            readOnly: readOnly,
          }}
          defaultValue={data.summary}
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
        <Link to="/resumes">
          <Button color="primary" variant="contained">
            Back
          </Button>
        </Link>
      </Grid>
    </Grid>
  ) : (
    <div>Loading</div>
  );
}
export default Details;
