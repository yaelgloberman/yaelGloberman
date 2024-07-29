import React, { useMemo } from "react";

// Style
import { useStyles } from "./OneClass.style";

// Icon
import DeleteIcon from "@mui/icons-material/Delete";

// Mui
import { Paper, Typography, IconButton, Grid, Tooltip } from "@mui/material";

const OneClass = ({ classItem, handleOpen, handleDeleteClass }) => {

  const { remainingPlaces, isStudent } = useMemo(() => {
    const remainingPlaces = classItem.numberOfPlaces - classItem.students.length;
    const isStudent = remainingPlaces !== 0;
    return { remainingPlaces, isStudent };
  }, [classItem]);
  
  const classes = useStyles({
    numberOfPlaces: classItem.numberOfPlaces,
  });

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" className={classes.bold}>
        {classItem.className}
      </Typography>
      <Typography variant="subtitle1">
        There are {remainingPlaces} seats
        left
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Out of {classItem.numberOfPlaces}
      </Typography>
      <Grid container sx={{ mt: 4 }}>
        <Grid item xs={10}>
          <Tooltip
            title={
              isStudent ? "" : "There are no students assigned for the class"
            }
          >
            <Typography
              className={
                isStudent ? classes.studentListOpen : classes.studentListClose
              }
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
