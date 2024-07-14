import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
 
  Typography,
} from "@mui/material";
import axios from "axios";

const Create = () => {
  const [classId, setClassId] = useState("");
  const [className, setClassName] = useState("");
  const [maxSeats, setMaxSeats] = useState("");
  const [studentId, setStudentId] = useState("");
  const [studentFirstName, setStudentFirstName] = useState("");
  const [studentLastName, setStudentLastName] = useState("");
  const [studentAge, setStudentAge] = useState("");
  const [studentProfession, setStudentProfession] = useState("");

  const handleCreateClass = async () => {
    await axios.post("/api/classes", {
      name: className,
      totalPlaces: Number(maxSeats),
    });
  };

  const handleCreateStudent = async () => {
    await axios.post("/api/students", {
      id: studentId,
      firstName: studentFirstName,
      lastName: studentLastName,
      age: Number(studentAge),
      profession: studentProfession,
    });
  };

  return (
    <Box display="flex" sx={{ mt: 10 }}>
      <Grid container alignItems="center" justifyContent="center">
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          item
          xs={5}
        >
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

        <Grid
          item
          container
          alignItems="center"
          justifyContent="center"
          xs={5}
        >
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
    </Box>
  );
};

export default Create;
