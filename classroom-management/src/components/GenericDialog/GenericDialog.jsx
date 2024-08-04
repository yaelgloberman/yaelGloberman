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


// Service
import * as sApi from "../../services/studentService";
import * as cApi from "../../services/classService";

// Mui icon
import AddIcon from "@mui/icons-material/Add";
import SchoolIcon from "@mui/icons-material/School";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// Redux
import { useDispatch } from "react-redux";
import { useStyles } from "./GenericDialog.style";
import { assignStudentToClass } from "../../redux/slices/studentsSlice";

const GenericDialog = ({
  dialogName,
  dialogTitle,
  studentId,
  data,
  handleClose,
  open,
  onAssignmentComplete,
  setData,
  selectedClassId,
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
      await cApi.deleteStudentFromClass(selectedClassId, student.id);
      const updatedStudents = data.filter((stud) => stud.id !== student.id);
      setData(updatedStudents);
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
              <List component="nav" aria-label="main mailbox folders">
                {dialogName === "classes"
                  ? data.map((classObj, index) => (
                      <ListItemButton key={classObj.id}>
                        <ListItemIcon>
                          <SchoolIcon />
                        </ListItemIcon>
                        <ListItemText primary={classObj.className} />
                        <ListItemIcon sx={{ justifyContent: "flex-end" }}>
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
                          primary={`${student.firstName} ${student.lastName}`}
                        />
                        <ListItemIcon sx={{ justifyContent: "flex-end" }}>
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleDeleteStudent(student)}
                          >
                            <DeleteIcon />
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
