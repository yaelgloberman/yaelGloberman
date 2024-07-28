// components/OneClass.js
import React from "react";
import { Paper, Typography, IconButton, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@emotion/react";
import { useStyles } from "./OneClass1.style";

const OneClass = ({ classItem, handleOpen, handleDeleteClass }) => {
  const theme = useTheme();
  const style1 = useStyles();

  return (
    <Paper
      sx={{
        height: 150,
        width: 200,
        padding: 2,
      }}
    >
      <Typography variant="h6" className={style1.bold}>
        {classItem.className}
      </Typography>
      <Typography variant="subtitle1">
        There are {classItem.remainingPlaces} seats left
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Out of {classItem.numberOfPlaces}
      </Typography>
      <Grid container sx={{ mt: 4 }}>
        <Grid item xs={10}>
          <Typography
            className={style1.title}
            variant="h6"
            onClick={() => handleOpen(classItem.id)}
          >
            STUDENTS LIST
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <IconButton
            aria-label="delete"
            onClick={() => handleDeleteClass(classItem.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default OneClass;
