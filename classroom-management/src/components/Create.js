import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { createClass } from "../services/classService";
import { createStudent } from "../services/studentService"; // Correct import

const Create = () => {
  const [classId, setClassId] = useState("");
  const [className, setClassName] = useState("");
  const [maxSeats, setMaxSeats] = useState("");
  const [studentId, setStudentId] = useState("");
  const [studentFirstName, setStudentFirstName] = useState("");
  const [studentLastName, setStudentLastName] = useState("");
  const [studentAge, setStudentAge] = useState("");
  const [studentProfession, setStudentProfession] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleCreateClass = async () => {
    const classData = {
      id: classId,
      className: className,
      numberOfPlaces: Number(maxSeats),
      remainingPlaces: Number(maxSeats),
    };
    try {
      await createClass(classData);
      setSnackbarMessage("Class created successfully.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setClassId("");
      setClassName("");
      setMaxSeats("");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setSnackbarMessage("Class already exists.");
      } else {
        setSnackbarMessage("Failed to create class.");
      }
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleCreateStudent = async () => {
    const studentData = {
      id: studentId,
      firstName: studentFirstName,
      lastName: studentLastName,
      age: Number(studentAge),
      profession: studentProfession,
    };
    try {
      await createStudent(studentData);
      setSnackbarMessage("Student created successfully.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setStudentId("");
      setStudentFirstName("");
      setStudentLastName("");
      setStudentAge("");
      setStudentProfession("");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setSnackbarMessage("Student already exists.");
      } else {
        setSnackbarMessage("Failed to create student.");
      }
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };


  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box display="flex" sx={{ mt: 10 }}>
      <Grid container alignItems="center" justifyContent="center">
        <Grid container alignItems="center" justifyContent="center" item xs={5}>
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            Create new Class
          </Typography>
          <Grid sx={{ px: 25 }}>
            <TextField
              label="Id"
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              sx={{ marginBottom: 2 }}
              fullWidth
            />
            <TextField
              label="Class Name"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              sx={{ marginBottom: 2 }}
              fullWidth
            />
            <TextField
              label="Total Places"
              value={maxSeats}
              onChange={(e) => setMaxSeats(e.target.value)}
              sx={{ marginBottom: 2 }}
              fullWidth
            />
          </Grid>
          <Button variant="contained" onClick={handleCreateClass}>
            Create Class
          </Button>
        </Grid>

        <Grid item container alignItems="center" justifyContent="center" xs={5}>
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            Add new student
          </Typography>
          <Grid sx={{ px: 25 }}>
            <TextField
              label="Id"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              sx={{ marginBottom: 2 }}
              fullWidth
            />
            <TextField
              label="First Name"
              value={studentFirstName}
              onChange={(e) => setStudentFirstName(e.target.value)}
              sx={{ marginBottom: 2 }}
              fullWidth
            />
            <TextField
              label="Last Name"
              value={studentLastName}
              onChange={(e) => setStudentLastName(e.target.value)}
              sx={{ marginBottom: 2 }}
              fullWidth
            />
            <TextField
              label="Age"
              value={studentAge}
              onChange={(e) => setStudentAge(e.target.value)}
              sx={{ marginBottom: 2 }}
              fullWidth
            />
            <TextField
              label="Profession"
              value={studentProfession}
              onChange={(e) => setStudentProfession(e.target.value)}
              sx={{ marginBottom: 2 }}
              fullWidth
            />
          </Grid>
          <Button variant="contained" onClick={handleCreateStudent}>
            Create Student
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Create;
