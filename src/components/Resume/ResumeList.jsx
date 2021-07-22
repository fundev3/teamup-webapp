import Box from "./Box";
import Button from "@material-ui/core/Button";
import GetResume from "./ResumeListAPI.js";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import "./ResumeList.css";

const useStyles = makeStyles({
  table: {
    maxWidth: 900,
    minWidth: 150,
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
      <div className="Title">
        <h1>Resume List</h1>
      </div>
      <Button color="secondary" variant="contained">
        Create Resume
      </Button>
      <div className="Resume-List">
        <TableContainer>
          <Table aria-label="simple table" className={classes.table}>
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
