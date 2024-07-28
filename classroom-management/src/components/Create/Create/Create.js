import React, { useState } from "react";

// Mui
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

//Component
// import {CreateClass} from "./CreateClass"

//Validation
import { validateInput } from "../../../utils/validation";

// Services
import { createClass } from "../../../services/classService";
import { createStudent } from "../../../services/studentService";
import CreateClass from "../CreateClass";
import CreateStudent from "../CreateStudent";

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
      Object.keys(error).some(
        (key) => key.startsWith("student") && error[key]
      ) ||
      !(
        studentId &&
        studentFirstName &&
        studentLastName &&
        studentAge &&
        studentProfession
      )
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
      const errorMessage =
        error.response?.data?.message || "Failed to create class.";
      setSnackbarMessage(errorMessage);
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
      const errorMessage =
        error.response?.data?.message || "Failed to create student.";
      setSnackbarMessage(errorMessage);
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
      <Grid container alignItems="center" justifyContent="center">
        <CreateClass
          classId={classId}
          handleChangeClassId={handleChangeClassId}
          error={error}
          className={className}
          handleChangeClassName={handleChangeClassName}
          maxSeats={maxSeats}
          handleChangeMaxSeats={handleChangeMaxSeats}
          hasClassErrors={hasClassErrors}
          handleCreateClass={handleCreateClass}
        />
        <CreateStudent
          studentId={studentId}
          handleChangeStudentId={handleChangeStudentId}
          error={error}
          studentFirstName={studentFirstName}
          handleChangeStudentFirstName={handleChangeStudentFirstName}
          studentLastName={studentLastName}
          handleChangeStudentLastName={handleChangeStudentLastName}
          studentAge={studentAge}
          handleChangeStudentAge={handleChangeStudentAge}
          studentProfession={studentProfession}
          handleChangeStudentProfession={handleChangeStudentProfession}
          handleCreateStudent={handleCreateStudent}
          hasStudentErrors={hasStudentErrors}
        />
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
