import React, { useEffect, useState } from "react";
import getProjects from "./ProjectsAPI.js";
import Card from "./Card";
import "./Projects.scss";

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
    minWidth: 200,
    maxWidth: 1010,
  },
});

function ProjectList() {
  const classes = useStyles();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function data() {
      const response = await getProjects();
      setProjects(response);
    }
    data();
  }, []);

  return (
    <div className="Projects-Container">
      <div className="Title">PROJECTS</div>

      <Button variant="outlined" color="primary">
        New Project
      </Button>

      <div className="Projects-List">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell component="th" scope="row">
                    <Card {...project} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default ProjectList;
