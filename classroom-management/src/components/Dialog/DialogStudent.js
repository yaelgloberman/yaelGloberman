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
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// Service
import { deleteStudentFromClassApi } from "../../services/classService";

// Redux
import { useDispatch } from "react-redux";
import { deleteStudentFromClass } from "../../redux/slices/classesSlice";


const DialogStudent = ({
  setData,
  data,
  handleClose,
  open,
  selectedClassId,
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const dispatch = useDispatch();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
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

export default DialogStudent;
