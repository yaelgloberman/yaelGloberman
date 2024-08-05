import React, { useEffect, useState } from "react";

// Mui
import { Box, Grid } from "@mui/material";

// Style
import { useStyles } from "./Students.style";

// Services
import * as cApi from "../../services/classService";
import * as sApi from "../../services/studentService";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setStudents } from "../../redux/slices/studentsSlice";

// Components
import { ErrorSnackbar, GenericDialog, StudentsTable } from "../../components";

const Students = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [studentId, setStudentId] = useState(null);
  const [classes, setClasses] = useState([]);
  const students = useSelector((state) => state.students.students);
  const [snackbarMessage, setSnackbarMessage] = useState({
    open: false,
    severity: "success",
    message: "",
  });
  const classesStyle = useStyles();

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

  const handleClose = async () => {
    setOpen(false);
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
    <Box className={classesStyle.table}>
      <Grid container justifyContent="center">
        <StudentsTable
          students={students}
          fetchClasses={fetchClasses}
          setSnackbarMessage={setSnackbarMessage}
          setStudentId={setStudentId}
          setOpen={setOpen}
        />
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
