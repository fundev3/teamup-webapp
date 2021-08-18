import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import project from "../../assets/project-img.svg";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 800,
    width: "100%",
  },
}));

export default function InvitationsModal({ setModalInvitations }) {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        aria-labelledby="customized-dialog-title"
        onClose={() => setModalInvitations(false)}
        open={true}
      >
        <DialogTitle id="customized-dialog-title">Modal title</DialogTitle>
        <DialogContent dividers>
          <Accordion>
            <AccordionSummary
              aria-controls="panel1a-content"
              expandIcon={<ExpandMoreIcon />}
              id="panel1a-header"
            >
              <img alt="logo" class="project-logo" src={project}></img>
              <Typography className={classes.heading}>Accordion 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
                <Button color="primary" variant="outlined">
                  Accept
                </Button>
                <Button color="secondary" variant="outlined">
                  Secondary
                </Button>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </DialogContent>
      </Dialog>
    </div>
  );
}
