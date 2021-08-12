import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Loading from "./Loading";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 360,
    width: "100%",
  },
}));

export default function ModalSkills({ dataSkills, idUser, setTrigger }) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);

    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const sendSkillsWithId = () => {
    console.log("post");
  };

  return (
    <div>
      <Dialog
        aria-describedby="alert-dialog-description"
        aria-labelledby="alert-dialog-title"
        onClose={() => setTrigger(false)}
        open={true}
      >
        <DialogTitle id="alert-dialog-title">{"Add Skills"}</DialogTitle>
        <DialogContent>
          <List className={classes.root}>
            {dataSkills.map((value) => {
              const labelId = `checkbox-list-label-${value}`;

              return (
                <ListItem
                  button
                  dense
                  key={value.id}
                  onClick={handleToggle(value)}
                  role={undefined}
                >
                  <ListItemIcon>
                    <Checkbox
                      color="primary"
                      disableRipple
                      edge="start"
                      inputProps={{ "aria-labelledby": labelId }}
                      tabIndex={-1}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={value.name} />
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => setTrigger(false)}>
            Add Skill
          </Button>
          <Button autoFocus color="primary" onClick={sendSkillsWithId()}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
