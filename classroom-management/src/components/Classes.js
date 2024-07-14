import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Grid, IconButton, Paper, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogStudent from "./DialogStudent";

const fetchUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
};

const Classes = () => {
  const { data, isLoading, error } = useQuery("classes", fetchUsers);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading classes</div>;

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{ mt: 5 }}
      spacing={2}
    >
      {data.map((classItem) => (
        <Grid key={classItem.id} item sm={6} md={2}>
          <Paper
            sx={{
              height: 150,
              width: 200,
              padding: 2,
            }}
          >
            <Typography variant="h6">{classItem.username}</Typography>
            <Typography variant="subtitle1">
              There are {classItem.id} seats left
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Out of {classItem.id}
            </Typography>
            <Grid container sx={{ mt: 4 }}>
              <Grid item xs={10}>
                <Typography variant="h6" onClick={handleOpen}>
                  STUDENTS LIST
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Paper>
          <DialogStudent
            data={data}
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Classes;
