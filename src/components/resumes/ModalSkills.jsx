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
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 360,
    width: "100%",
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

  const sendSkillsWithId = async (event) => {
    event.preventDefault();
    for (let i = 0; i < skillChecked.length; i++) {
      const skillCheck = skillChecked[i];
      const result = data.find((skill) => skill.name === skillCheck.name);
      if (result == null) {
        const response = await postSkillsById(idUser, skillCheck.name);
        if (!response.handlerError) {
          setData(allInfoData, allInfoData.skills.push(skillCheck));
        }
      }
    }
    setOpenModal(false);
    console.log(skillChecked);
  };

  return (
    <div>
      <Dialog
        aria-describedby="alert-dialog-description"
        aria-labelledby="alert-dialog-title"
        onClose={() => setOpenModal(false)}
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
