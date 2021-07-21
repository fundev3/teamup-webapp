import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import React, { useEffect, useState } from "react";
import GetResume from "./ResumeListAPI.js";
import Box from "./Box";
import "./ResumeList.css";

const useStyles = makeStyles({
  table: {
    minWidth: 200,
    maxWidth: 1010,
  },
});

function ResumeList() {
  const classes = useStyles();
  const [resumes, setResumes] = useState([]);

  const refresh = () => {
    let list = [];
    GetResume()
      .then((result) => {
        list = result;
      })
      .then(() => setResumes(list));
  };
  useEffect(refresh, []);

  return (
    <div className="Resumes-Container">
      <div className="Title">Resumes</div>
      <Button variant="outlined" color="primary">
        New Resume
      </Button>
      <div className="Resume-List">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableBody>
              {resumes.length > 0
                ? resumes.map((resume) => <Box {...resume} />)
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default ResumeList;
