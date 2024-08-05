import React, { useContext } from "react";
import { Link } from "react-router-dom";

// Constants
import { PATHS } from "../../constants";

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
import LoyaltyIcon from "@mui/icons-material/Loyalty";

const MenuAppBar = () => {
  const [open, setOpen] = React.useState(false);
  const { changeModeColor } = useContext(ThemeContext);
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };
  const paths = Object.values(PATHS);

  const DrawerList = (
    <Box sx={{ width: "9rem" }} role="presentation">
      <List>
        {paths.map((item) => (
          <ListItem key={item.text} disablePadding onClick={handleClose}>
            <ListItemButton component={Link} to={item.path}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box>
      <AppBar position="static">
        <Toolbar className={classes.toolBar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setOpen(true)}
          >
            <MenuIcon className={classes.menuIcon} />
          </IconButton>
          <Typography className={classes.shobClasses} component="div">
            Shob Classes
          </Typography>
          <LoyaltyIcon className={classes.loyaltyIcon}  onClick={changeModeColor} />
        </Toolbar>
      </AppBar>

      <Drawer open={open} onClose={handleClose}>
        {DrawerList}
      </Drawer>
    </Box>
  );
};

export default MenuAppBar;
