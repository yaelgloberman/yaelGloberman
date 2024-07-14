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
import SchoolIcon from "@mui/icons-material/School";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React from "react";
import Delete from "@mui/icons-material/Delete";
const DialogStudent = ({ data, handleClose, handleOpen, open }) => {

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  return (
    <div>
        <Grid container alignItems="center" justifyContent="center">
        <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Class students </DialogTitle>
      <DialogContent>
        <Box sx={{ width: "100%", maxWidth: 300, bgcolor: "background.paper" }}>
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
                <ListItemText primary={student.name} />
                <ListItemIcon>
                  <Delete />
                </ListItemIcon>
              </ListItemButton>
            ))}
          </List>
          <Divider />
        </Box>
      </DialogContent>
      </Dialog>
      </Grid>;
    </div>
  );
};
export default DialogStudent;
