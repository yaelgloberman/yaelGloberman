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
} from "@mui/material";

// Mui icon
import SchoolIcon from "@mui/icons-material/School";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// Service
import { assignStudentToClassApi } from "../../services/studentService";
import { deleteStudentFromClassApi } from "../../services/classService";

// Redux
import { useDispatch } from "react-redux";
import { assignStudentToClass } from "../../redux/slices/studentsSlice";
import { deleteStudentFromClass } from "../../redux/slices/classesSlice";
import DialogIten from "./DialogItem";

const DialogClassStudent = ({
  dialogName,
  studentId,
  data,
  handleClose,
  open,
  onAssignmentComplete,
  setData,
  selectedClassId,
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const dispatch = useDispatch();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleAssignToClass = async (classId, studentId) => {
    try {
      await assignStudentToClassApi(classId, studentId);
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
      await deleteStudentFromClassApi(selectedClassId, student.id);
      const updatedStudents = data.filter((stud) => stud.id !== student.id);
      dispatch(deleteStudentFromClass(selectedClassId));
      setData(updatedStudents);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div>
      <Grid container alignItems="center" justifyContent="center">
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            {dialogName === "classes" ? "available classes" : " class students"}
          </DialogTitle>
          <DialogContent>
            <Box
              sx={{ width: "100%", maxWidth: 300, bgcolor: "background.paper" }}
            >
              <List component="nav" aria-label="main mailbox folders">
                <DialogIten data={data} handleListItemClick={handleListItemClick} handleAssignToClass={handleAssignToClass} SchoolIcon={SchoolIcon} AddIcon={AddIcon}  />
                {dialogName === "classes"
                  ? data.map((classObj, index) => (
                      <ListItemButton
                        key={classObj.id}
                        selected={selectedIndex === index}
                      >
                        <ListItemIcon>
                          <SchoolIcon />
                        </ListItemIcon>

                        <ListItemText primary={classObj.className} />

                        <ListItemIcon>
                          <IconButton color="primary">
                            <AddIcon
                              onClick={(event) => {
                                handleListItemClick(event, index);
                                handleAssignToClass(studentId, classObj.id);
                              }}
                            />
                          </IconButton>
                        </ListItemIcon>
                      </ListItemButton>
                    ))
                  : data.map((student, index) => (
                      <ListItemButton
                        key={student.id}
                        selected={selectedIndex === index}
                      >
                        <ListItemIcon>
                          <AccountCircleIcon />
                        </ListItemIcon>

                        <ListItemText
                          primary={`${student.firstName} ${student.lastName}`}
                        />
                        <ListItemIcon>
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

export default DialogClassStudent;
