import projects from "./ProjectsAPI.js";
import Button from "@material-ui/core/Button";
import Card from "./Card";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function ProjectList() {
  const classes = useStyles();

  return (
    <>
      <Button variant="outlined" color="primary">
        New Project
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            {projects.map((project) => (
              <TableRow>
                <TableCell component="th" scope="row">
                  <Card {...project} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ProjectList;
