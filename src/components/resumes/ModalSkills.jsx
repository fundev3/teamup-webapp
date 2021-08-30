import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { postSkillsById } from "./ResumesAPI.js";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 400,
    width: 400,
  },
}));

export default function ModalSkills({
  allInfoData,
  dataSkills,
  idUser,
  setOpenModal,
  data,
  setData,
}) {
  const classes = useStyles();
  const [skillChecked, setSkillChecked] = React.useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = skillChecked.indexOf(value);
    const newChecked = [...skillChecked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setSkillChecked(newChecked);
  };

  const sendSkillsWithId = () => {
    for (let i = 0; i < skillChecked.length; i++) {
      const skillCheck = skillChecked[i];
      const result = data.find((skill) => skill.name === skillCheck.name);
      if (result == null) {
        setData(allInfoData, allInfoData.skills.push(skillCheck));
      }
    }
    setOpenModal(false);
  };

  return (
    <div>
      <Dialog
        aria-describedby="alert-dialog-description"
        aria-labelledby="alert-dialog-title"
        open={true}
      >
        <DialogTitle className="alert-dialog-title">
          <div className="dialog-header">
            <Typography color="primary" gutterBottom variant="h6">
              Skills
            </Typography>
            <CloseIcon
              className={classes.modalCloseIcon}
              onClick={() => setOpenModal(false)}
            />
          </div>
        </DialogTitle>
        <Divider />
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
          <Button color="primary" onClick={sendSkillsWithId}>
            Add Skill
          </Button>
          <Button autoFocus color="primary" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
