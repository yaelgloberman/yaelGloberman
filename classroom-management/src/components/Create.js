import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Snackbar,
  Alert,
  FormHelperText,
} from "@mui/material";
import { createClass } from "../services/classService";
import { createStudent } from "../services/studentService";
import { validateInput } from "../utils/validation";

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
  const [error, setError] = useState({});

  const hasStudentErrors = () => {
    return (
      Object.keys(error).some((key) => key.startsWith("student") && error[key]) ||
      !(studentId && studentFirstName && studentLastName && studentAge && studentProfession)
    );
  };

  const hasClassErrors = () => {
    return (
      Object.keys(error).some((key) => key.startsWith("class") && error[key]) ||
      !(classId && className && maxSeats)
    );
  };

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

  const handleChangeClassId = (e) => {
    const value = e.target.value;
    setClassId(value);
    setError((prevErrors) => ({
      ...prevErrors,
      classId: validateInput(value, "classId"),
    }));
  };

  const handleChangeClassName = (e) => {
    const value = e.target.value;
    setClassName(value);
    setError((prevErrors) => ({
      ...prevErrors,
      className: validateInput(value, "className"),
    }));
  };

  const handleChangeMaxSeats = (e) => {
    const value = e.target.value;
    setMaxSeats(value);
    setError((prevErrors) => ({
      ...prevErrors,
      maxSeats: validateInput(value, "maxSeats"),
    }));
  };

  const handleChangeStudentId = (e) => {
    const value = e.target.value;
    setStudentId(value);
    setError((prevErrors) => ({
      ...prevErrors,
      studentId: validateInput(value, "studentId"),
    }));
  };

  const handleChangeStudentFirstName = (e) => {
    const value = e.target.value;
    setStudentFirstName(value);
    setError((prevErrors) => ({
      ...prevErrors,
      studentFirstName: validateInput(value, "studentFirstName"),
    }));
  };

  const handleChangeStudentLastName = (e) => {
    const value = e.target.value;
    setStudentLastName(value);
    setError((prevErrors) => ({
      ...prevErrors,
      studentLastName: validateInput(value, "studentLastName"),
    }));
  };

  const handleChangeStudentAge = (e) => {
    const value = e.target.value;
    setStudentAge(value);
    setError((prevErrors) => ({
      ...prevErrors,
      studentAge: validateInput(value, "studentAge"),
    }));
  };

  const handleChangeStudentProfession = (e) => {
    const value = e.target.value;
    setStudentProfession(value);
    setError((prevErrors) => ({
      ...prevErrors,
      studentProfession: validateInput(value, "studentProfession"),
    }));
  };

  return (
    <Box display="flex" sx={{ mt: 10 }}>
      <Grid container alignItems="center" justifyContent="center" >
        <Grid container alignItems="center" justifyContent="center" item xs={5} >
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            Create new Class
          </Typography>
          <Grid sx={{ px: 25 }}>
            <TextField
              label="Id"
              value={classId}
              onChange={handleChangeClassId}
              sx={{ marginBottom: 2 }}
              fullWidth
              error={!!error.classId}
            />
            {error.classId && (
              <FormHelperText error sx={{ marginTop: 0, marginBottom: 2 }}>
                {error.classId}
              </FormHelperText>
            )}
            <TextField
              label="Class Name"
              value={className}
              onChange={handleChangeClassName}
              sx={{ marginBottom: 2 }}
              fullWidth
              error={!!error.className}
            />
            {error.className && (
              <FormHelperText error sx={{ marginTop: 0, marginBottom: 2 }}>
                {error.className}
              </FormHelperText>
            )}
            <TextField
              label="Total Places"
              value={maxSeats}
              onChange={handleChangeMaxSeats}
              sx={{ marginBottom: 2 }}
              fullWidth
              error={!!error.maxSeats}
            />
            {error.maxSeats && (
              <FormHelperText error sx={{ marginTop: 0, marginBottom: 2 }}>
                {error.maxSeats}
              </FormHelperText>
            )}
          </Grid>
          <Button
            variant="contained"
            disabled={hasClassErrors()}
            onClick={handleCreateClass}
          >
            Create Class
          </Button>
        </Grid>

        <Grid container alignItems="center" justifyContent="center" item xs={5}>
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            Add new student
          </Typography>
          <Grid sx={{ px: 25 }}>
            <TextField
              label="Id"
              value={studentId}
              onChange={handleChangeStudentId}
              sx={{ marginBottom: 2 }}
              fullWidth
              error={!!error.studentId}
            />
            {error.studentId && (
              <FormHelperText error sx={{ marginTop: 0, marginBottom: 2 }}>
                {error.studentId}
              </FormHelperText>
            )}
            <TextField
              label="First Name"
              value={studentFirstName}
              onChange={handleChangeStudentFirstName}
              sx={{ marginBottom: 2 }}
              fullWidth
              error={!!error.studentFirstName}
            />
            {error.studentFirstName && (
              <FormHelperText error sx={{ marginTop: 0, marginBottom: 2 }}>
                {error.studentFirstName}
              </FormHelperText>
            )}
            <TextField
              label="Last Name"
              value={studentLastName}
              onChange={handleChangeStudentLastName}
              sx={{ marginBottom: 2 }}
              fullWidth
              error={!!error.studentLastName}
            />
            {error.studentLastName && (
              <FormHelperText error sx={{ marginTop: 0, marginBottom: 2 }}>
                {error.studentLastName}
              </FormHelperText>
            )}
            <TextField
              label="Age"
              value={studentAge}
              onChange={handleChangeStudentAge}
              sx={{ marginBottom: 2 }}
              fullWidth
              error={!!error.studentAge}
            />
            {error.studentAge && (
              <FormHelperText error sx={{ marginTop: 0, marginBottom: 2 }}>
                {error.studentAge}
              </FormHelperText>
            )}
            <TextField
              label="Profession"
              value={studentProfession}
              onChange={handleChangeStudentProfession}
              sx={{ marginBottom: 2 }}
              fullWidth
              error={!!error.studentProfession}
            />
            {error.studentProfession && (
              <FormHelperText error sx={{ marginTop: 0, marginBottom: 2 }}>
                {error.studentProfession}
              </FormHelperText>
            )}
          </Grid>
          <Button
            variant="contained"
            disabled={hasStudentErrors()}
            onClick={handleCreateStudent}
          >
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
