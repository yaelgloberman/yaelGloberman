import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Grid, IconButton, Paper, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogStudent from "./DialogStudent";
import { getAllStudents, getAllStudentsInClass } from "../services/studentService";
import { getAvailableClasses } from "../services/classService";

const Classes = () => {
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    // const fetchStudents = async () => {
    //   try {
    //     const data = await getAllStudents();
    //     setStudents(data);
    //   } catch (error) {
    //     console.error("Error fetching students:", error);
    //   }
    // };
    const fetchClasses = async () => {
      try {
        const data = await getAvailableClasses();
        setClasses(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    // fetchStudents();
    fetchClasses();
  }, []);
  const handleOpen =async (classId) => { 
    const data = await getAllStudentsInClass(classId);
    setStudents(data);
    setOpen(true);
  };

  const handleClose =  () => {
   
    setOpen(false);
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{ mt: 5 }}
      spacing={2}
    >
      {classes.map((classItem) => (
        <Grid key={classItem.id} item sm={6} md={2}>
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
                  onClick={() => handleOpen(classItem.id)}
                >
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
            data={students}
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
