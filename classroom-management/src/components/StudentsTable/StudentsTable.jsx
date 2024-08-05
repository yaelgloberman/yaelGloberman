import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { TABLE_BODY, TABLE_HEADER } from "../../constants";
import { useStyles } from "./StudentsTable.style";

// Redux
import { deleteStudent } from "../../redux/slices/studentsSlice";

// Services
import * as sApi from "../../services/studentService";

const StudentsTable = ({
  students,
  fetchClasses,
  setSnackbarMessage,
  setStudentId,
  setOpen,
}) => {

  const classes = useStyles();
  
  const handleDeleteStudent = async (studentId) => {
    try {
      await sApi.deleteStudent(studentId);
      dispatch(deleteStudent(studentId));
      await fetchClasses();
      setSnackbarMessage({
        open: true,
        severity: "success",
        message: "Student deleted successfully.",
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete student.";
      setSnackbarMessage({
        open: true,
        severity: "error",
        message: errorMessage,
      });
    }
  };

  const handleOpen = (studentId) => {
    setStudentId(studentId);
    setOpen(true);
  };

  return (
    <TableContainer component={Paper} sx={{ width: "70vw" }}>
      <Table aria-label="students table">
        <TableHead>
          <TableRow>
            {TABLE_HEADER.map((tableHeader) => (
              <TableCell align="center" key={tableHeader}>
                {tableHeader}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              {TABLE_BODY.map((prop, index) => (
                <TableCell className={classes.cell} key={index} align="center">
                  {student[prop]}
                </TableCell>
              ))}
              <TableCell align="center">
                <Button
                  variant="outlined"
                  disabled={student.classId}
                  onClick={() => handleOpen(student.id)}
                >
                  Assign to class
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="outlined"
                  onClick={() => handleDeleteStudent(student.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default StudentsTable;