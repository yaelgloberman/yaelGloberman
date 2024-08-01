import { useState } from "react";
import { useStyles } from "./CreateClass.style";
import { Button, Grid, Typography } from "@mui/material";
import * as api from "../../../services/classService";
import FormField from "../FormField";

const CreateClass = ({ error, setError, setSnackbarMessage }) => {
  const classes = useStyles();
  const [classData, setClassData] = useState({
    id: "",
    className: "",
    numberOfPlaces: "",
  });
  const { id, className, numberOfPlaces } = classData;

  const hasClassErrors = () => {
    return (
      Object.keys(error).some((key) => key.startsWith("class") && error[key]) ||
      !(id && className && numberOfPlaces)
    );
  };

  const handleCreateClass = async () => {
    try {
      const objectDataClass = {
        id: Number(id),
        className: className,
        numberOfPlaces: Number(numberOfPlaces),
      };
      await api.createClass(objectDataClass);
      setSnackbarMessage({
        open: true,
        severity: "success",
        message: "Class created successfully.",
      });
      setClassData({ id: "", className: "", numberOfPlaces: "" });
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

  const setClassProperty = (property, value) => {
    setClassData((prevClassData) => ({
      ...prevClassData,
      [property]: value,
    }));
  };

  return (
    <Grid container alignItems="center" justifyContent="center" item xs={5}>
      <Typography variant="h4" className={classes.marginB2}>
        Create new Class
      </Typography>
      <Grid sx={{ px: 25 }}>
        <FormField
          label="* Id"
          value={id}
          property="id"
          validationType="classId"
          setData={setClassProperty}
          error={error}
          setError={setError}
        />
        <FormField
          label="* Class Name"
          value={className}
          property="className"
          validationType="className"
          setData={setClassProperty}
          error={error}
          setError={setError}
        />
        <FormField
          label="* Total Places"
          value={numberOfPlaces}
          property="numberOfPlaces"
          validationType="numberOfPlaces"
          setData={setClassProperty}
          error={error}
          setError={setError}
        />
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
