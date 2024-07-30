import React, { useEffect, useState } from "react";

// Mui
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

// Components
import ErrorSnackbar from "../../ErrorSnackbar";
import GenericDialog from "../../GenericDialog/GenericDialog";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  deleteStudent,
  setStudents,
} from "../../../redux/slices/studentsSlice";

// CONSTANTS
import { TABLE_BODY, TABLE_HEADER } from "../../../constants";

// Services
import * as cApi from "../../../services/classService";
import * as sApi from "../../../services/studentService";

const Students = () => {
  const [open, setOpen] = useState(false);
  const [studentId, setStudentId] = useState(null);
  const [classes, setClasses] = useState([]);
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  const [snackbarMessage, setSnackbarMessage] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await sApi.getAllStudents();
        dispatch(setStudents(data));
      } catch (error) {
        setSnackbarMessage({
          open: true,
          severity: "error",
          message: "Failed to fetch students.",
        });
      }
    };

    fetchStudents();
  }, [dispatch]);

  const fetchClasses = async () => {
    try {
      const data = await cApi.getAvailableClasses();
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
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await sApi.deleteStudent(studentId);
      dispatch(deleteStudent(studentId));
      await fetchClasses();
      setSnackbarMessage({
        open: true,
        severity: "success",
        message: "Student deleted successfully.",
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete student.";
      setSnackbarMessage({
        open: true,
        severity: "error",
        message: errorMessage,
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarMessage((prevSnackbar) => ({
      ...prevSnackbar,
      open: false,
    }));
  };

  useEffect(() => {
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
          <TableContainer
            component={Paper}
            sx={{ width: "70vw", margin: "auto" }}
          >
            <Table aria-label="students table">
              <TableHead>
                <TableRow>
                  {TABLE_HEADER.map((tableHeader) => (
                    <TableCell align="center">{tableHeader}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    {TABLE_BODY.map((prop, index) => (
                      <TableCell key={index} align="center">
                        {student[prop]}
                      </TableCell>
                    ))}
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        disabled={student.classId}
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

      <GenericDialog
        dialogName={"classes"}
        dialogTitle={"Available classes"}
        studentId={studentId}
        data={classes}
        handleClose={handleClose}
        open={open}
        onAssignmentComplete={fetchClasses}
      />

      <ErrorSnackbar
        snackbarMessage={snackbarMessage}
        handleSnackbarClose={handleSnackbarClose}
      />
    </Box>
  );
};

export default Students;
