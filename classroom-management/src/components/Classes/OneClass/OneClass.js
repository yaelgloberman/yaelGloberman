import React from "react";

// Style
import { useStyles } from "./OneClass.style";

// Icon
import DeleteIcon from "@mui/icons-material/Delete";

// Mui
import { Paper, Typography, IconButton, Grid } from "@mui/material";

const OneClass = ({ classItem, handleOpen, handleDeleteClass }) => {
  const style = useStyles();

  return (
    <Paper
      sx={{
        height: 150,
        width: 200,
        padding: 2,
      }}
    >
      <Typography variant="h6" className={style.bold}>
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
            className={style.title}
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
