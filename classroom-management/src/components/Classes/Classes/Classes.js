import React, { useEffect, useState } from "react";

// Mui
import { Grid } from "@mui/material";

// Components
import OneClass from "../OneClass/OneClass";
import ErrorSnackbar from "../../ErrorSnackbar";
import DialogClassStudent from "../../Dialog/Dialog";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { deleteClass, setClasses } from "../../../redux/slices/classesSlice";

// Services
import {
  deleteClassApi,
  getAllClassesApi,
} from "../../../services/classService";
import { getAllStudentsInClassApi } from "../../../services/studentService";

const Classes = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [selectedClassId, setSelectedClassId] = useState(null);
  const classes = useSelector((state) => state.classes.classes);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await getAllClassesApi();
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
    const data = await getAllStudentsInClassApi(classId);
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
          <Grid sx={{ m: 1 }} key={classItem.id} item sm={5} md={2}>
            <OneClass
              classItem={classItem}
              handleOpen={handleOpen}
              handleDeleteClass={handleDeleteClass}
            ></OneClass>
          </Grid>
        ))}
      </Grid>

      <DialogClassStudent
        dialogName={"students"}
        dialogTitle={"Class students"}
        setData={setStudents}
        data={students}
        open={open}
        handleClose={handleClose}
        selectedClassId={selectedClassId}
      />

      <ErrorSnackbar
        snackbarOpen={snackbarOpen}
        snackbarSeverity={snackbarSeverity}
        snackbarMessage={snackbarMessage}
        handleSnackbarClose={handleSnackbarClose}
      />
    </>
  );
};

export default Classes;
