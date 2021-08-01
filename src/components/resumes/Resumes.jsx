import Box from "./Box";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import { getResumes } from "./ResumesAPI.js";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import "./Resumes.css";

const useStyles = makeStyles({
  table: {
    maxWidth: "100%",
  },
});

function ResumeList() {
  const classes = useStyles();
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    async function data() {
      const response = await getResumes();
      setResumes(response);
    }
    data();
  }, []);

  return (
    <div className="Resumes-Container">
      <Button color="secondary" variant="outlined">
        Create Resume
      </Button>
      <div className="Resume-List">
        <TableContainer component={Paper}>
          <Table aria-label="simple table" className={classes.table}>
            <TableBody>
              {resumes.length > 0
                ? resumes.map((resume) => (
                    <TableRow key={resume.id}>
                      <TableCell component="th" scope="row">
                        <Box {...resume} />
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default ResumeList;
