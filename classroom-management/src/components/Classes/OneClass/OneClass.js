import React from "react";

// Style
import { useStyles } from "./OneClass.style";

// Icon
import DeleteIcon from "@mui/icons-material/Delete";

// Mui
import { Paper, Typography, IconButton, Grid, Tooltip } from "@mui/material";

const OneClass = ({ classItem, handleOpen, handleDeleteClass }) => {
  const classes = useStyles({
    numberOfPlaces: classItem.numberOfPlaces,
    remainingPlaces: classItem.remainingPlaces,
  });

  return (
    <Paper
    className={classes.paper}
    >
      <Typography variant="h6" className={classes.bold}>
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
          <Tooltip
            title={
              classItem.remainingPlaces - classItem.numberOfPlaces === 0
                ? "There are no students assigned for the class"
                : "Click to open students list"
            }
          >
            <Typography
              className={classes.title}
              variant="h6"
              onClick={() => handleOpen(classItem.id)}
            >
              STUDENTS LIST
            </Typography>
          </Tooltip>
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
