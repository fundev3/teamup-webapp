import Button from "@material-ui/core/Button";
import Card from "./Card";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import getProjects from "./ProjectsAPI.js";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import "./Projects.scss";

const useStyles = makeStyles({
  table: {
    maxWidth: 1010,
    minWidth: 200,
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

      <Button color="primary" variant="outlined">
        New Project
      </Button>

      <div className="Projects-List">
        <TableContainer component={Paper}>
          <Table aria-label="simple table" className={classes.table}>
            <TableBody>
              {Object.keys(projects).length === 0 ? (
                <TableRow key="1">
                  <TableCell component="th" scope="row">
                    <img
                      alt=""
                      className="empty-file"
                      src="https://static.thenounproject.com/png/469473-200.png"
                    />
                  </TableCell>
                </TableRow>
              ) : (
                projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell component="th" scope="row">
                      <Card {...project} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default ProjectList;
