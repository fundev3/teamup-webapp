import ApplicationBox from "./ApplicationBox";
import ApplicationBoxEmpty from "./ApplicationBoxEmpty";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, DialogContent, List, Typography } from "@material-ui/core";
import "./ApplicationsModal.scss";

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    padding: "0px",
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

function ApplicationsModal({ onClickModal, open, postulations }) {
  const classes = useStyles();
  return (
    <div className={classes.dialog}>
      <Dialog onClose={onClickModal} open={open}>
        <div className="dialog-content">
          <div className="dialog-header">
            <Typography color="primary" variant="h6">
              Projects postulations
            </Typography>
            <CloseIcon
              className={classes.modalCloseIcon}
              onClick={onClickModal}
            />
          </div>
          <DialogContent className={classes.dialogContent}>
            <List className={classes.root}>
              {postulations.length > 0 ? (
                postulations.map((postulation) => (
                  <ApplicationBox
                    key={postulation.id}
                    postulation={postulation}
                  />
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
