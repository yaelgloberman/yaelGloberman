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
import AddIcon from "@mui/icons-material/Add";
const DialogClass = ({ data, handleClose, handleOpen, open }) => {

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  return (
    <div>
        <Grid container alignItems="center" justifyContent="center">
        <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Available classes</DialogTitle>
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
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText primary={student.name} />
                <ListItemIcon>
                  <AddIcon />
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
export default DialogClass;
