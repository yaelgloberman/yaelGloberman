import React from "react";

// Mui
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

// Redux
import { useDispatch } from "react-redux";
import {
  assignStudentToClass,
  unAssignStudentToClass,
} from "../../redux/slices/studentsSlice";
import { useStyles } from "./GenericDialog.style";

// Service
import * as sApi from "../../services/studentService";

// Mui icon
import AddIcon from "@mui/icons-material/Add";
import SchoolIcon from "@mui/icons-material/School";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";


const GenericDialog = ({
  dialogName,
  dialogTitle,
  studentId,
  data,
  handleClose,
  open,
  onAssignmentComplete,
  onUnassignStudent,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleAssignToClass = async (classId, studentId) => {
    try {
      await sApi.assignStudentToClass(classId, studentId);
      dispatch(assignStudentToClass({ classId, studentId }));
      if (onAssignmentComplete) {
        onAssignmentComplete();
      }
      handleClose();
    } catch (error) {
      console.error("Error assigning student to class:", error);
    }
  };

  const handleDeleteStudent = async (student) => {
    try {
      await sApi.unAssignStudentFromClass(student.id);
      const studentId = student.id;
      dispatch(unAssignStudentToClass({ studentId }));
      if (onUnassignStudent) {
        onUnassignStudent();
      }
      handleClose();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div>
      <Grid container sx={{ display: "flex" }}>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            <Typography variant="h6" align="center" className={classes.title}>
              {dialogTitle}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ width: "14.25rem", bgcolor: "background.paper" }}>
              <List component="nav">
                {dialogName === "classes"
                  ? data.map((classObj) => (
                      <ListItemButton key={classObj.id}>
                        <ListItemIcon>
                          <SchoolIcon />
                        </ListItemIcon>
                        <ListItemText
                          className={classes.center}
                          primary={classObj.className}
                        />
                        <ListItemIcon className={classes.end}>
                          <IconButton color="primary">
                            <AddIcon
                              onClick={(event) => {
                                handleAssignToClass(studentId, classObj.id);
                              }}
                            />
                          </IconButton>
                        </ListItemIcon>
                      </ListItemButton>
                    ))
                  : data.map((student, index) => (
                      <ListItemButton key={student.id}>
                        <ListItemIcon>
                          <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText
                          className={classes.center}
                          primary={`${student.firstName} ${student.lastName}`}
                        />
                        <ListItemIcon className={classes.end}>
                          <IconButton>
                            <DeleteIcon
                              aria-label="delete"
                              onClick={() => handleDeleteStudent(student)}
                            />
                          </IconButton>
                        </ListItemIcon>
                      </ListItemButton>
                    ))}
              </List>
              <Divider />
            </Box>
          </DialogContent>
        </Dialog>
      </Grid>
    </div>
  );
};

export default GenericDialog;
