import React, { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useStyles } from "./CreateStudent.style";
import * as api from "../../../services/studentService";
import FormField from "../FormField/FormField";

const CreateStudent = ({ error, setError, setSnackbarMessage }) => {
  const classes = useStyles();
  const [student, setStudent] = useState({
    id: "",
    firstName: "",
    lastName: "",
    age: "",
    profession: "",
  });
  const { id, firstName, lastName, age, profession } = student;

  const setStudentProperty = (property, value) => {
    setStudent((prevStudent) => ({
      ...prevStudent,
      [property]: value,
    }));
  };

  const hasStudentErrors = () => {
    return (
      Object.keys(error).some(
        (key) =>
          key.startsWith("student") &&
          error[key] &&
          !(
            key === "studentAge" &&
            error[key] === "Age must be a non-negative number"
          )
      ) ||
      id === "" ||
      firstName === "" ||
      lastName === "" ||
      profession === ""
    );
  };
  const handleCreateStudent = async () => {
    try {
      if (age === "" || age == null) {
        const studentWithoutAge = {
          id: id,
          firstName: firstName,
          lastName: lastName,
          profession: profession,
        };

        await api.createStudent(studentWithoutAge);
      } else {
        const objectStudentData = {
          id: id,
          firstName: firstName,
          lastName: lastName,
          age: Number(age),
          profession: profession,
        };
        await api.createStudent(objectStudentData);
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

  return (
    <Grid container justifyContent="center" item xs={2}>
      <Typography variant="h4" paddingBottom="20px">
        Add new student
      </Typography>
      <Grid width="200px">
        <FormField
          label="ID *"
          value={id}
          property="id"
          validationType="studentId"
          setData={setStudentProperty}
          error={error}
          setError={setError}
        />
        <FormField
          label="First Name *"
          value={firstName}
          property="firstName"
          validationType="studentFirstName"
          setData={setStudentProperty}
          error={error}
          setError={setError}
        />
        <FormField
          label="Last Name *"
          value={lastName}
          property="lastName"
          validationType="studentLastName"
          setData={setStudentProperty}
          error={error}
          setError={setError}
        />
        <FormField
          label="Age"
          value={age}
          property="age"
          validationType="studentAge"
          setData={setStudentProperty}
          error={error}
          setError={setError}
        />
        <FormField
          label="Profession *"
          value={profession}
          property="profession"
          validationType="studentProfession"
          setData={setStudentProperty}
          error={error}
          setError={setError}
        />
      </Grid>
      <Button
        variant="contained"
        disabled={hasStudentErrors()}
        onClick={handleCreateStudent}
      >
        ADD STUDENT
      </Button>
    </Grid>
  );
};

export default CreateStudent;
