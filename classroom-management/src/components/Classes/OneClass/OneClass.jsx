import React, { useMemo } from "react";

// Style
import { useStyles } from "./OneClass.style";

// Icon
import DeleteIcon from "@mui/icons-material/Delete";

// Mui
import { Paper, Typography, IconButton, Grid, Tooltip } from "@mui/material";

const OneClass = ({ classItem, handleOpen, handleDeleteClass }) => {
  const { remainingPlaces, isStudent } = useMemo(() => {
    const remainingPlaces =
      classItem.numberOfPlaces - classItem.students.length;

    const isStudent = classItem.students.length > 0;
    return { remainingPlaces, isStudent };
  }, [classItem]);

  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid>
        <Typography className={classes.className}>
          {classItem.className}
        </Typography>
        <Typography variant="subtitle1" className={classes.remainingPlaces}>
          There are {remainingPlaces} seats left
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.maxPlaces}
        >
          Out of {classItem.numberOfPlaces}
        </Typography>
      </Grid>
      <Grid container sx={{ justifyContent: "space-around" }}>
        <Grid>
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
        <Grid>
          <IconButton
            className={classes.deleteIcon}
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
