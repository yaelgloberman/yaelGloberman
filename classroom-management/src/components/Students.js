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
  const [studentId, setStudentId] = useState(null);
  const [classes, setClasses] = useState([]);

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

  const handleOpen = (studentId) => {
    setStudentId(studentId);
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
    await fetchStudents();
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await deleteStudent(studentId);
      await fetchStudents(); 
      await fetchClasses();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  useEffect(() => {
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
                  <TableCell align="center">Profession</TableCell>
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
                        disabled={student.assignToClass}
                        onClick={() => handleOpen(student.id)}
                      >
                        Assign to class
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        onClick={() => handleDeleteStudent(student.id)}
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
        handleClose={handleClose}
        onAssignmentComplete={fetchClasses}
      />
    </Box>
  );
};

export default Students;
