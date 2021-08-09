import Alert from "@material-ui/lab/Alert";
import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    width: "100%",
  },
}));

export default function AlertService(props) {
  const classes = useStyles();
  const { open, setOpen, message, type } = props;

  return (
    <div className={classes.root}>
      <Snackbar
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        open={open}
      >
        <Alert onClose={() => setOpen(false)} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
