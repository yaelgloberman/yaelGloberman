import React, { useEffect, useState } from "react";

// Components
import DialogStudent from "../../DialogStudent";

// Mui
import {
  Grid,
  IconButton,
  Paper,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { deleteClass, setClasses } from "../../../redux/slices/classesSlice";

// Services
import { getAllStudentsInClass } from "../../../services/studentService";
import { deleteClassApi, getAllClasses } from "../../../services/classService";
import { useStyles } from "./Classes.style";
import OneClass from "../OneClass/OneClass";

const Classes = () => {
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [selectedClassId, setSelectedClassId] = useState(null);
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.classes.classes);
  const style = useStyles({ hasStudents: students.length > 0 });

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await getAllClasses();
        dispatch(setClasses(data));
      } catch (error) {
        setSnackbarMessage("Failed to fetch classes.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    };

    fetchClasses();
  }, [dispatch]);

  const handleOpen = async (classId) => {
    setSelectedClassId(classId);
    const data = await getAllStudentsInClass(classId);
    if (data.length > 0) {
      setStudents(data);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedClassId(null);
  };

  const handleDeleteClass = async (classId) => {
    try {
      await deleteClassApi(classId);
      dispatch(deleteClass(classId));
      setSnackbarMessage("Class deleted successfully.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete class.";
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  console.log(students);

  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 5 }}
        spacing={2}
      >
        {classes.map((classItem) => (
          <Grid sx={{m:1}} key={classItem.id} item sm={5} md={2}>
          <OneClass classItem={classItem} handleOpen={handleOpen} handleDeleteClass={handleDeleteClass}></OneClass>
          </Grid>
        ))}
      </Grid>
      <DialogStudent
        setData={setStudents}
        data={students}
        open={open}
        handleClose={handleClose}
        selectedClassId={selectedClassId}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Classes;
