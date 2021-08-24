import ApplicationBox from "./ApplicationBox";
import ApplicationBoxEmpty from "./ApplicationBoxEmpty";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, DialogContent, List, Typography } from "@material-ui/core";
import "./ApplicationsModal.scss";

const applications = [
  { id: 1, name: "Pedro" },
  { id: 2, name: "Paulo" },
  { id: 3, name: "Rodrigo" },
  { id: 4, name: "Lilian" },
  { id: 5, name: "Alejandro" },
  { id: 6, name: "Freddy" },
];
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

function ApplicationsModal({ onClickModal, open }) {
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
              {applications.length > 0 ? (
                applications.map((application) => (
                  <ApplicationBox
                    application={application}
                    key={application.id}
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
