import React, { useEffect, useState } from "react";

// Mui
import { Box, Grid } from "@mui/material";

// Style
import { useStyles } from "./student.style";

// Services
import * as cApi from "../../services/classService";


// Components
import { ErrorSnackbar, GenericDialog, StudentsTable } from "../../components";

const Student = () => {
  const [open, setOpen] = useState(false);
  const [studentId, setStudentId] = useState(null);
  const [classes, setClasses] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState({
    open: false,
    severity: "success",
    message: "",
  });
  const classesStyle = useStyles();

 

  const fetchClasses = async () => {
    try {
      const data = await cApi.getAvailableClasses();
      setClasses(data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const handleClose = async () => {
    setOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarMessage((prevSnackbar) => ({
      ...prevSnackbar,
      open: false,
    }));
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <Box className={classesStyle.table}>
      <Grid container justifyContent="center">

        <StudentsTable
          fetchClasses={fetchClasses}
          setSnackbarMessage={setSnackbarMessage}
          setStudentId={setStudentId}
          setOpen={setOpen}
        />

      </Grid>

      <GenericDialog
        dialogName={"classes"}
        dialogTitle={"Available classes"}
        studentId={studentId}
        data={classes}
        handleClose={handleClose}
        open={open}
        onAssignmentComplete={fetchClasses}
      />

      <ErrorSnackbar
        snackbarMessage={snackbarMessage}
        handleSnackbarClose={handleSnackbarClose}
      />
    </Box>
  );
};

export default Student;
