import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { deleteStudent, getAllStudents } from "../services/studentService";
import { getAvailableClasses } from "../services/classService";

import DialogClass from "./DialogClass";

const Students = () => {
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState([]);
  const [classes, setClasses] = useState([]);

  const handleOpen = (studentId) => {
    setStudentId(studentId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAllStudents();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    const fetchClasses = async () => {
      try {
        const data = await getAvailableClasses();
        setClasses(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchStudents();
    fetchClasses();
  }, []);
  return (
    <Box>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 10 }}
      >
        <div>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">First Name</TableCell>
                  <TableCell align="center">Last Name</TableCell>
                  <TableCell align="center">Age</TableCell>
                  <TableCell align="center">Proffesion</TableCell>
                  <TableCell align="center">Assign</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow
                    key={student.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{student.id}</TableCell>
                    <TableCell align="center">{student.firstName}</TableCell>
                    <TableCell align="center">{student.lastName}</TableCell>
                    <TableCell align="center">{student.age}</TableCell>
                    <TableCell align="center">{student.profession}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        onClick={() => handleOpen(student.id)}
                      >
                        Assign to class
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        onClick={() => {
                          deleteStudent(student.id);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Grid>

      <DialogClass
        studentId={studentId}
        data={classes}
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default Students;
