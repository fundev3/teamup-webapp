import React, { useEffect, useState } from "react";
import GetProjects from "./ProjectsAPI.js";
import Card from "./Card";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 900,
  },
});

function ProjectList() {
  const classes = useStyles();

  const [projects, setProjects] = useState([]);

  const refresh = () => {
    let list = [];
    GetProjects()
      .then((result) => {
        list = result;
      })
      .then(() => setProjects(list));
  };
  useEffect(refresh, []);

  return (
    <>
      <Button variant="outlined" color="primary">
        New Project
      </Button>
      <br />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            {projects.length > 0
              ? projects.map((project) => (
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <Card {...project} />
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ProjectList;
