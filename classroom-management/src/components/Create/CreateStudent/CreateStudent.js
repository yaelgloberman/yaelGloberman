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
  studentId,
  handleChangeStudentId,
  error,
  studentFirstName,
  handleChangeStudentFirstName,
  studentLastName,
  handleChangeStudentLastName,
  studentAge,
  handleChangeStudentAge,
  studentProfession,
  handleChangeStudentProfession,
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
          label="Id"
          value={studentId}
          onChange={handleChangeStudentId}
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
          label="First Name"
          value={studentFirstName}
          onChange={handleChangeStudentFirstName}
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
          label="Last Name"
          value={studentLastName}
          onChange={handleChangeStudentLastName}
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
          value={studentAge}
          onChange={handleChangeStudentAge}
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
          label="Profession"
          value={studentProfession}
          onChange={handleChangeStudentProfession}
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
