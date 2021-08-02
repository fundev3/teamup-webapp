import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Loading from "./Loading";
import NotFound from "./NotFound";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { getResume } from "./ResumesAPI.js";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./Details.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    color: theme.palette.text.secondary,
    margin: 10,
    padding: theme.spacing(2),
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
    },
  },
}));

function Details() {
  let { id } = useParams();
  id = "40b3f7e3-eaba-4b0f-bbef-5f5882af3ced";
  const classes = useStyles();
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [readOnly, setReadOnly] = useState(true);
  const [showEdit, setShowEdit] = useState("Edit");

  useEffect(() => {
    async function fetchData() {
      const response = await getResume(id);
      const data = response.data;
      const error = response.handlerError;
      setError(error);
      setData(data);
      console.log(process.env);
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
  if (error) return <NotFound />;
  return data ? (
    <Grid
      className={classes.content}
      style={{
        left: "30%",
        position: "absolute",
        top: "20%",
      }}
    >
      <Paper className={classes.paper}>
        <form autoComplete="off" className={classes.root} noValidate>
          <div>
            <TextField
              InputProps={{
                readOnly: readOnly,
              }}
              defaultValue={data.personalInformation.firstName}
              label="First Name"
              variant="standard"
            />
            <TextField
              InputProps={{
                readOnly: readOnly,
              }}
              defaultValue={data.personalInformation.lastName}
              label="Last Name"
              variant="standard"
            />
          </div>
          <div>
            <TextField
              InputProps={{
                readOnly: readOnly,
              }}
              defaultValue={data.contact.phone}
              label="Phone"
              variant="standard"
            />
            <TextField
              InputProps={{
                readOnly: readOnly,
              }}
              defaultValue={data.contact.direction}
              label="Address"
              variant="standard"
            />
          </div>
          <div>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue={data.contact.email}
              fullWidth
              label="Email"
              variant="standard"
            />
          </div>
          <div>
            <TextField
              InputProps={{
                readOnly: readOnly,
              }}
              defaultValue={data.summary}
              fullWidth
              label="Summary"
              multiline
              rows={2}
              variant="standard"
            />
          </div>
        </form>
        <Grid className={classes.field} item xs={12}>
          <Button color="primary" onClick={edit} variant="contained">
            {showEdit}
          </Button>
          <Link to="/resumes">
            <Button color="primary" variant="contained">
              Back
            </Button>
          </Link>
        </Grid>
      </Paper>
    </Grid>
  ) : (
    <Loading />
  );
}
export default Details;
