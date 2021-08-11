import Alert from "@material-ui/lab/Alert";
import { Slide } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import { selectAlert } from "../../store/selectors.js";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    width: "100%",
  },
}));

export default function AlertService() {
  const classes = useStyles();
  const alert = useSelector(selectAlert);
  const [open, setOpen] = useState(alert.showAlert);

  useEffect(() => {
    setOpen(alert.showAlert);
  }, [alert]);

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  return (
    <div className={classes.root}>
      <Snackbar
        TransitionComponent={TransitionLeft}
        autoHideDuration={2500}
        onClose={() => setOpen(false)}
        open={open}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={alert.type}
          variant="filled"
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
