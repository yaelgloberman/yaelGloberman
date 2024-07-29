import React from "react";

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

const CreateStudent = ({
  error,
  student,
  handleChange,
  handleCreateStudent,
  hasStudentErrors,
}) => {
  const classes = useStyles();
  return (
    <Grid container alignItems="center" justifyContent="center" item xs={5}>
      <Typography variant="h4" className={classes.marginB2}>
        Add new student
      </Typography>
      <Grid sx={{ px: 25 }}>
        <TextField
          label="* Id"
          name="id"
          value={student?.id}
          onChange={handleChange}
          className={classes.marginB2}
          fullWidth
          error={!!error.id}
        />
        {error.id && (
          <FormHelperText error className={classes.marginB2}>
            {error.id}
          </FormHelperText>
        )}
        <TextField
          label="* First Name"
          name="firstName"
          value={student?.firstName}
          onChange={handleChange}
          className={classes.marginB2}
          fullWidth
          error={!!error.firstName}
        />
        {error.firstName && (
          <FormHelperText error className={classes.marginB2}>
            {error.firstName}
          </FormHelperText>
        )}
        <TextField
          label="* Last Name"
          name="lastName"
          value={student?.lastName}
          onChange={handleChange}
          className={classes.marginB2}
          fullWidth
          error={!!error.lastName}
        />
        {error.lastName && (
          <FormHelperText error className={classes.marginB2}>
            {error.lastName}
          </FormHelperText>
        )}
        <TextField
          label="* Age"
          name="age"
          value={student?.age}
          onChange={handleChange}
          className={classes.marginB2}
          fullWidth
          error={!!error.age}
        />
        {error.age && (
          <FormHelperText error className={classes.marginB2}>
            {error.age}
          </FormHelperText>
        )}
        <TextField
          label="* Profession"
          name="profession"
          value={student?.profession}
          onChange={handleChange}
          className={classes.marginB2}
          fullWidth
          error={!!error.profession}
        />
        {error.profession && (
          <FormHelperText error className={classes.marginB2}>
            {error.profession}
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
