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
import { createClassApi } from "../../../services/classService";
import { createStudentApi } from "../../../services/studentService";

const Create = () => {
  const [classId, setClassId] = useState("");
  const [className, setClassName] = useState("");
  const [maxSeats, setMaxSeats] = useState("");

  const [student, setStudent] = useState({
    id: "",
    firstName: "",
    lastName: "",
    age: "",
    profession: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [error, setError] = useState({});

  const hasStudentErrors = () => {
    return (
      Object.keys(error).some(
        (key) => key.startsWith("student") && error[key]
      ) || !student
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
      await createClassApi(classData);
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
    const studentData = { student };
    try {
      await createStudentApi(studentData);
      setSnackbarMessage("Student created successfully.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setStudent("");
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

  const validateInput = (value, fieldName) => {
    if (value.trim() === "") {
      return `${fieldName} is required`;
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
    setError((prevErrors) => ({
      ...prevErrors,
      [name]: validateInput(value, name),
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
            error={error}
            student={student}
            handleChange={handleChange}
            handleCreateStudent={handleCreateStudent}
            hasStudentErrors={hasStudentErrors}
          />
        
      </Grid>
      <ErrorSnackbar
        snackbarOpen={snackbarOpen}
        snackbarSeverity={snackbarSeverity}
        snackbarMessage={snackbarMessage}
        handleSnackbarClose={handleSnackbarClose}
      />
    </Box>
  );
};

export default Create;
