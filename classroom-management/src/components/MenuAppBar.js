// components/MenuAppBar.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ThemeContext } from "../themeContext";

const MenuAppBar = () => {
  const [open, setOpen] = React.useState(false);
  const { mode, toggleTheme } = useContext(ThemeContext);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {[
          { text: "Classes", path: "/classes" },
          { text: "Students", path: "/students" },
          { text: "Create", path: "/create" },
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
            sx={{ color: 'white' }} // Keep this IconButton white
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" component="div" >
            Classes Management System
          </Typography>
          <LoyaltyIcon sx={{mx:2}} onClick={toggleTheme}/>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Box>
  );
};

export default MenuAppBar;
