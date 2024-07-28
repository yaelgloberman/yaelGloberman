import { Button, FormHelperText, Grid, TextField, Typography } from "@mui/material";

const CreateStudent = ({studentId,handleChangeStudentId,error,studentFirstName,handleChangeStudentFirstName,studentLastName,handleChangeStudentLastName,studentAge,handleChangeStudentAge,studentProfession,handleChangeStudentProfession,handleCreateStudent,hasStudentErrors}) => {

    return (
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
    );
}

export default CreateStudent;
