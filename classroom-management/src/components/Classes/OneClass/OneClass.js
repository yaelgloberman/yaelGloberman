import { Paper, Typography,IconButton, Grid, Snackbar, Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import {  } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useStyles } from "./OneClass.style";

const OneClass = ({classItem,handleOpen,handleDeleteClass}) => {
    const style = useStyles();

    return (
    <Paper
      sx={{
        height: 150,
        width: 200,
        padding: 2,
      }}
    >
      <Typography variant="h6">{classItem.className}</Typography>
      <Typography variant="subtitle1">
        There are {classItem.remainingPlaces} seats left
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Out of {classItem.numberOfPlaces}
      </Typography>
      <Grid container sx={{ mt: 4 }}>
        <Grid item xs={10}>
          <Typography
            variant="h6"
            className={style.title}
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
