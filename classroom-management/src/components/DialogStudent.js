import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React from "react";
import Delete from "@mui/icons-material/Delete";
import { deleteStudentFromClass } from "../services/classService";
const DialogStudent = ({ setData, data, handleClose, open, onClassUpdated}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const handleDeleteStudent = (student) => {
    deleteStudentFromClass(student.assignToClass, student.id);
    const updatedStudents = data.filter((student1) => student1.id !== student.id);
    setData(updatedStudents);
    onClassUpdated();
  };

  return (
    <div>
      <Grid container alignItems="center" justifyContent="center">
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Class students </DialogTitle>
          <DialogContent>
            <Box
              sx={{ width: "100%", maxWidth: 300, bgcolor: "background.paper" }}
            >
              <List component="nav" aria-label="main mailbox folders">
                {data?.map((student, index) => (
                  <ListItemButton
                    key={student.id}
                    selected={selectedIndex === index}
                    onClick={(event) => handleListItemClick(event, index)}
                  >
                    <ListItemIcon>
                      <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary={student.firstName} />
                    <ListItemIcon>
                      <Delete onClick={() => handleDeleteStudent(student)} />
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
export default DialogStudent;
