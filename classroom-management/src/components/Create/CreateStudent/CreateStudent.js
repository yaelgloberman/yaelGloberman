import React, { useEffect, useState } from "react";

// Mui
import {
  Button,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

// Style
import { useStyles } from "./CreateStudent.style";

// Service
import * as api from "../../../services/studentService";

// Function
import { validateInput } from "../../../utils/validation";

const CreateStudent = ({ error, setError, setSnackbarMessage }) => {
  const classes = useStyles();
  const [student, setStudent] = useState({
    id: "",
    firstName: "",
    lastName: "",
    age: "",
    profession: "",
  });

  const setStudentProperty = (property, value) => {
    setStudent((prevStudent) => ({
      ...prevStudent,
      [property]: value,
    }));
  };

  const hasStudentErrors = () => {
    return (
      Object.keys(error).some(
        (key) => key.startsWith("student") && error[key]
      ) ||
      student.id === "" ||
      student.firstName === "" ||
      student.lastName === "" ||
      student.profession === ""
    );
  };

  const handleCreateStudent = async () => {
    try {
      if (student.age === "" || student.age == null) {
        const studentWithoutAge = {
          id: student.id,
          firstName: student.firstName,
          lastName: student.lastName,
          profession: student.profession,
        };
        await api.createStudent(studentWithoutAge);
      } else {
        await api.createStudent(student);
      }
      setSnackbarMessage({
        open: true,
        severity: "success",
        message: "Student created successfully.",
      });
      setStudent({
        id: "",
        firstName: "",
        lastName: "",
        age: "",
        profession: "",
      });
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

  const handleChange = (property, validationType) => (e) => {
    const value = e.target.value;
    if (property === "age") {
      setStudentProperty(property, Number(value));
    } else {
      setStudentProperty(property, value);
    }
    setError((prevErrors) => ({
      ...prevErrors,
      [validationType]: validateInput(value, validationType),
    }));
  };

  return (
    <Grid container alignItems="center" justifyContent="center" item xs={5}>
      <Typography variant="h4" className={classes.marginB2}>
        Add new student
      </Typography>
      <Grid sx={{ px: 25 }}>
        <TextField
          label="* Id"
          value={student.id}
          onChange={handleChange("id", "studentId")}
          className={classes.marginB2}
          fullWidth
          error={!!error.studentId}
        />
         {error.studentId && (
          <FormHelperText error className={classes.marginB2}>
            {error.studentId}
          </FormHelperText>
        )}
        <TextField
          label="* First Name"
          value={student.firstName}
          onChange={handleChange("firstName", "studentFirstName")}
          className={classes.marginB2}
          fullWidth
          error={!!error.studentFirstName}
        />
        {error.studentFirstName && (
          <FormHelperText error className={classes.marginB2}>
            {error.studentFirstName}
          </FormHelperText>
        )}
        <TextField
          label="* Last Name"
          value={student.lastName}
          onChange={handleChange("lastName", "studentLastName")}
          className={classes.marginB2}
          fullWidth
          error={!!error.studentLastName}
        />
        {error.studentLastName && (
          <FormHelperText error className={classes.marginB2}>
            {error.studentLastName}
          </FormHelperText>
        )}
        <TextField
          label="Age"
          value={student.age}
          onChange={handleChange("age", "studentAge")}
          className={classes.marginB2}
          fullWidth
          error={!!error.studentAge}
        />
        {error.studentAge && (
          <FormHelperText error className={classes.marginB2}>
            {error.studentAge}
          </FormHelperText>
        )}
        <TextField
          label="* Profession"
          value={student.profession}
          onChange={handleChange("profession", "studentProfession")}
          className={classes.marginB2}
          fullWidth
          error={!!error.studentProfession}
        />
       

        {error.studentProfession && (
          <FormHelperText error className={classes.marginB2}>
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
  );
};

export default CreateStudent;
