import React, { useContext } from "react";
import { Link } from "react-router-dom";

// Style
import { useStyles } from "./MenuAppBar.style";

// Context
import { ThemeContext } from "../../themeContext";

// Mui
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// Mui icon
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import LoyaltyIcon from '@mui/icons-material/Loyalty';


const MenuAppBar = () => {
  const [open, setOpen] = React.useState(false);
  const { toggleTheme } = useContext(ThemeContext);
  const classes = useStyles();

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
            sx={{ color: 'white' }} 
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" component="div" >
            Classes Management System
          </Typography>
          <LoyaltyIcon className={classes.margin}  onClick={toggleTheme}/>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Box>
  );
};

export default MenuAppBar;
