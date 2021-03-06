import ApplicationBox from "./ApplicationBox";
import ApplicationBoxEmpty from "./ApplicationBoxEmpty";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import { Dialog, DialogContent, List, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { updatePostulation, updateProject } from "./ApplicationAPI";
import "./ApplicationsModal.scss";

const Accordion = withStyles({
  expanded: {},
  root: {
    "&$expanded": {
      margin: "auto",
    },
    "&:before": {
      display: "none",
    },
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    boxShadow: "none",
  },
})(MuiAccordion);

const AccordionDetails = withStyles((theme) => ({
  buttons: {
    display: "flex",
  },
  root: {
    padding: 5,
  },
}))(MuiAccordionDetails);

const AccordionSummary = withStyles({
  content: {
    "&$expanded": {
      margin: "12px 0px",
    },
  },
  expanded: {},
  root: {
    "&$expanded": {
      minHeight: 56,
    },
    marginBottom: -1,
    minHeight: 56,
  },
})(MuiAccordionSummary);

const useStyles = makeStyles((theme) => ({
  dialog: {
    width: "450px",
  },
  dialogContent: {
    overflow: "hidden",
    padding: "0px",
    width: "450px",
  },
  modalCloseIcon: {
    color: "#4350af",
    cursor: "pointer",
    fontSize: "30px",
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: "0px",
  },
}));

function ApplicationsModal({ onClickModal, open, postulations, projectId }) {
  const classes = useStyles();

  async function handleAccept(projectId, resumeID, resumeName, postulationId) {
    await updatePostulation(postulationId, "Accepted");
    await updateProject(projectId, resumeID, resumeName);
    onClickModal();
  }

  async function handleReject(postulationId) {
    await updatePostulation(postulationId, "Rejected");
    onClickModal();
  }

  return (
    <div>
      <Dialog onClose={onClickModal} open={open}>
        <div className="dialog-content" style={{ width: "450px" }}>
          <div className="dialog-header">
            <Typography color="primary" variant="h6">
              Projects postulations
            </Typography>
            <CloseIcon
              className={classes.modalCloseIcon}
              onClick={onClickModal}
            />
          </div>
          <DialogContent
            className={classes.dialogContent}
            style={{ width: "400px" }}
          >
            <List className={classes.root} style={{ paddingRight: "15px" }}>
              {postulations.length > 0 ? (
                postulations.map((postulation) => (
                  <>
                    <Accordion>
                      <AccordionSummary
                        aria-controls="panel1a-content"
                        button
                        className={classes.summary}
                        expandIcon={<ExpandMoreIcon />}
                        id="panel1a-header"
                        style={{ margin: "0px", padding: "0px" }}
                      >
                        <ApplicationBox
                          key={postulation.id}
                          postulation={postulation}
                        />
                      </AccordionSummary>
                      <AccordionDetails>
                        <div style={{ display: "flex", marginBottom: "3%" }}>
                          <Button
                            color="primary"
                            onClick={() =>
                              handleAccept(
                                projectId,
                                postulation.resumeId,
                                postulation.resumeName,
                                postulation.id
                              )
                            }
                            style={{ fontSize: "10px", marginLeft: "40%" }}
                            variant="outlined"
                          >
                            Accept
                          </Button>
                          <Button
                            color="secondary"
                            onClick={() => handleReject(postulation.id)}
                            style={{ fontSize: "10px", marginLeft: "10%" }}
                            variant="outlined"
                          >
                            Reject
                          </Button>
                        </div>
                      </AccordionDetails>
                      <Divider />
                    </Accordion>
                  </>
                ))
              ) : (
                <ApplicationBoxEmpty />
              )}
            </List>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
export default ApplicationsModal;
