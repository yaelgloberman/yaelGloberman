import React from "react";
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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Delete from "@mui/icons-material/Delete";
import { deleteStudentFromClassApi } from "../services/classService";
import { useDispatch } from "react-redux";
import { deleteStudentFromClass } from "../redux/slices/classesSlice";

const DialogStudent = ({
  setData,
  data,
  handleClose,
  open,
  selectedClassId,
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
const dispatch=useDispatch()
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleDeleteStudent = async (student) => {
    try {
      await deleteStudentFromClassApi(selectedClassId,student.id );
      const updatedStudents = data.filter((stud) => stud.id !== student.id);
      dispatch(deleteStudentFromClass(selectedClassId))
      setData(updatedStudents);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div>
      <Grid container alignItems="center" justifyContent="center">
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Class students</DialogTitle>
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
    </div>
  );
};

export default DialogStudent;
