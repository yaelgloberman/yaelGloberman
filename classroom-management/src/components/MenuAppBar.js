import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, List, ListItem, ListItemButton, ListItemText, Button } from "@mui/material";
import { ThemeContext } from "../themeContext";

export default function ButtonAppBar() {
  const [open, setOpen] = React.useState(false);
  const { toggleTheme } = useContext(ThemeContext);  // Use the ThemeContext

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {[
          { text: "Classes", path: "/classes" },
          { text: "Students", path: "/students" },
          { text: "Create", path: "/create" }
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Classes Management System
          </Typography>
          <Button color="inherit" onClick={toggleTheme}>Toggle Theme</Button> {/* Add theme toggle button */}
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Box>
  );
}
