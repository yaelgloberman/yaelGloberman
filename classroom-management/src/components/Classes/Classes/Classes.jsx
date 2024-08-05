import React, { useEffect, useState } from "react";

// Mui
import { Grid } from "@mui/material";


// Components
import OneClass from "../OneClass/OneClass";
import ErrorSnackbar from "../../ErrorSnackbar";
import {GenericDialog} from '../../../components'

// Services
import * as api from "../../../services/classService";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { deleteClass, setClasses } from "../../../redux/slices/classesSlice";
const Classes = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const classes = useSelector((state) => state.classes.classes);
  const [snackbarMessage, setSnackbarMessage] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const fetchClasses = async () => {
    try {
      const data = await api.getAllClasses();
      dispatch(setClasses(data));
    } catch (error) {
      setSnackbarMessage({
        open: true,
        severity: "error",
        message: "Failed to fetch classes.",
      });
    }
  };
  useEffect(() => {
    fetchClasses();
  }, [dispatch]);

  const handleOpen = async (classItem) => {
    setSelectedClassId(classItem.id);
    if (classItem.students.length > 0) {
      setStudents(classItem.students);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedClassId(null);
  };

  const handleDeleteClass = async (classId) => {
    try {
      await api.deleteClass(classId);
      dispatch(deleteClass(classId));
      setSnackbarMessage({
        open: true,
        severity: "success",
        message: "Class deleted successfully.",
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete class.";
      setSnackbarMessage({
        open: true,
        severity: "error",
        message: errorMessage,
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarMessage((prevSnackbar) => ({
      ...prevSnackbar,
      open: false,
    }));
  };

  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 5, px: 2 }}
        spacing={2}
      >
        {classes.map((classItem) => (
          <Grid sx={{ m: 1 }} key={classItem.id} item>
            <OneClass
              classItem={classItem}
              handleOpen={() => handleOpen(classItem)}
              handleDeleteClass={handleDeleteClass}
            ></OneClass>
          </Grid>
        ))}
      </Grid>

      <GenericDialog
        dialogName={"students"}
        dialogTitle={"Class students"}
        data={students}
        open={open}
        handleClose={handleClose}
        selectedClassId={selectedClassId}
        onUnassignStudent={fetchClasses}
      />

      <ErrorSnackbar
        snackbarMessage={snackbarMessage}
        handleSnackbarClose={handleSnackbarClose}
      />
    </>
  );
};

export default Classes;
