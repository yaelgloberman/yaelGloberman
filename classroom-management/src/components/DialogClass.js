import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { assignStudentToClassApi } from "../services/studentService";
import { useDispatch, useSelector } from "react-redux";
import { assignStudentToClass } from "../redux/slices/studentsSlice";

const DialogClass = ({
  studentId,
  data,
  handleClose,
  open,
  onAssignmentComplete,
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
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

  return (
    <div>
      <Grid container alignItems="center" justifyContent="center">
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Available classes</DialogTitle>
          <DialogContent>
            <Box
              sx={{ width: "100%", maxWidth: 300, bgcolor: "background.paper" }}
            >
              <List component="nav" aria-label="main mailbox folders">
                {data?.map((classObj, index) => (
                  <ListItemButton
                    key={classObj.id}
                    selected={selectedIndex === index}
                    onClick={(event) => handleListItemClick(event, index)}
                  >
                    <ListItemIcon>
                      <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText primary={classObj.className} />
                    <ListItemIcon>
                      <AddIcon
                        onClick={() =>
                          handleAssignToClass(studentId, classObj.id)
                        }
                      />
                    </ListItemIcon>
                  </ListItemButton>
                ))}
              </List>
              <Divider />
            </Box>
          </DialogContent>
        </Dialog>
      </Grid>
      ;
    </div>
  );
};

export default DialogClass;
