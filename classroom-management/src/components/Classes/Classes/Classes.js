import React, { useEffect, useState } from "react";

// Mui
import { Grid } from "@mui/material";

// Services
import {
  deleteClassApi,
  getAllClassesApi,
} from "../../../services/classService";

// Components
import OneClass from "../OneClass/OneClass";
import ErrorSnackbar from "../../ErrorSnackbar";
import DialogClassStudent from "../../Dialog/Dialog";



// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  deleteClass,
  setClasses,
} from "../../../redux/slices/classesSlice";

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

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await getAllClassesApi();
        dispatch(setClasses(data));
      } catch (error) {
        setSnackbarMessage({
          open: true,
          severity: "error",
          message: "Failed to fetch classes.",
        });
      }
    };

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
      await deleteClassApi(classId);
      dispatch(deleteClass(classId));
      setSnackbarMessage({
        open: true,
        severity: "error",
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
        sx={{ mt: 5 }}
        spacing={2}
      >
        {classes.map((classItem) => (
          <Grid sx={{ m: 1 }} key={classItem.id} item>
            <OneClass
              classItem={classItem}
              handleOpen={()=>handleOpen(classItem)}
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
        snackbarMessage={snackbarMessage}
        handleSnackbarClose={handleSnackbarClose}
      />
    </>
  );
};

export default Classes;
