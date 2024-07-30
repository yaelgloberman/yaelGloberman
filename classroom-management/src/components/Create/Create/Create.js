import React, { useState } from "react";

// Mui
import { Box, Grid } from "@mui/material";

//Validation
import { validateInput } from "../../../utils/validation";

//Component
import ErrorSnackbar from "../../ErrorSnackbar";
import CreateClass from "../CreateClass/CreateClass";
import CreateStudent from "../CreateStudent/CreateStudent";

// Services
import * as cApi  from "../../../services/classService";
import * as sApi   from "../../../services/studentService";

const Create = () => {
  const [classId, setClassId] = useState("");
  const [className, setClassName] = useState("");
  const [maxSeats, setMaxSeats] = useState("");

  const [studentId, setStudentId] = useState("");
  const [studentFirstName, setStudentFirstName] = useState("");
  const [studentLastName, setStudentLastName] = useState("");
  const [studentAge, setStudentAge] = useState("");
  const [studentProfession, setStudentProfession] = useState("");
  const [error, setError] = useState({});
  const [snackbarMessage, setSnackbarMessage] = useState({
    open: false,
    severity: "success",
    message: "",
  });

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
      id: Number(classId),
      className: className,
      numberOfPlaces: Number(maxSeats),
      remainingPlaces: Number(maxSeats),
    };
    try {
      await cApi.createClass(classData);
      setSnackbarMessage({
        open: true,
        severity: "success",
        message: "Class created successfully.",
      });
      setClassId("");
      setClassName("");
      setMaxSeats("");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to create class.";
        setSnackbarMessage({
          open: true,
          severity: "error",
          message: errorMessage,
        });
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
      await sApi.createStudent(studentData);
      setSnackbarMessage({
        open: true,
        severity: "success",
        message: "Student created successfully.",
      });
      setStudentId("");
      setStudentFirstName("");
      setStudentLastName("");
      setStudentAge("");
      setStudentProfession("");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to create student.";

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
      <Grid container justifyContent="center">
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
      <ErrorSnackbar
        snackbarMessage={snackbarMessage}
        handleSnackbarClose={handleSnackbarClose}
      />
    </Box>
  );
};

export default Create;
