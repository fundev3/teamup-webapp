import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
  },
}));

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress
        style={{
          height: "100px",
          marginTop: "150px",
          width: "100px",
        }}
      />
    </div>
  );
}
