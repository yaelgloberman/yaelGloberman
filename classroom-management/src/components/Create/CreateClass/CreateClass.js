// Style
import { useState } from "react";
import { useStyles } from "./CreateClass.style";

// Mui
import {
  Button,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { validateInput } from "../../../utils/validation";
import * as api  from "../../../services/classService";

const CreateClass = ({ error, setError, setSnackbarMessage }) => {
  const classes = useStyles();
  const [classId, setClassId] = useState("");
  const [className, setClassName] = useState("");
  const [maxSeats, setMaxSeats] = useState("");
  const hasClassErrors = () => {
    return (
      Object.keys(error).some((key) => key.startsWith("class") && error[key]) ||
      !(classId && className && maxSeats)
    );
  };
  const handleCreateClass = async () => {
    const classData = {
      id: Number(classId),
      className: className,
      numberOfPlaces: Number(maxSeats),
      remainingPlaces: Number(maxSeats),
    };
    try {
      await api.createClass(classData);
      setSnackbarMessage({
        open: true,
        severity: "success",
        message: "Class created successfully.",
      });
      setClassId("");
      setClassName("");
      setMaxSeats("");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to create class.";
      setSnackbarMessage({
        open: true,
        severity: "error",
        message: errorMessage,
      });
    }
  };
  const handleChangeClassId = (e) => {
    const value = e.target.value;
    setClassId(value);
    setError((prevErrors) => ({
      ...prevErrors,
      classId: validateInput(value, "classId"),
    }));
  };

  const handleChangeClassName = (e) => {
    const value = e.target.value;
    setClassName(value);
    setError((prevErrors) => ({
      ...prevErrors,
      className: validateInput(value, "className"),
    }));
  };

  const handleChangeMaxSeats = (e) => {
    const value = e.target.value;
    setMaxSeats(value);
    setError((prevErrors) => ({
      ...prevErrors,
      maxSeats: validateInput(value, "maxSeats"),
    }));
  };

  return (
    <Grid container alignItems="center" justifyContent="center" item xs={5}>
      <Typography variant="h4" className={classes.marginB2}>
        Create new Class
      </Typography>
      <Grid sx={{ px: 25 }}>
        <TextField
          label="* Id"
          value={classId}
          onChange={handleChangeClassId}
          sx={{ marginBottom: 2 }}
          fullWidth
          error={!!error.classId}
        />
        {error.classId && (
          <FormHelperText error className={classes.marginB2}>
            {error.classId}
          </FormHelperText>
        )}
        <TextField
          label="* Class Name"
          value={className}
          onChange={handleChangeClassName}
          sx={{ marginBottom: 2 }}
          fullWidth
          error={!!error.className}
        />
        {error.className && (
          <FormHelperText error className={classes.marginB2}>
            {error.className}
          </FormHelperText>
        )}
        <TextField
          label="* Total Places"
          value={maxSeats}
          onChange={handleChangeMaxSeats}
          sx={{ marginBottom: 2 }}
          fullWidth
          error={!!error.maxSeats}
        />
        {error.maxSeats && (
          <FormHelperText error className={classes.marginB2}>
            {error.maxSeats}
          </FormHelperText>
        )}
      </Grid>
      <Button
        variant="contained"
        disabled={hasClassErrors()}
        onClick={handleCreateClass}
      >
        Create Class
      </Button>
    </Grid>
  );
};

export default CreateClass;
