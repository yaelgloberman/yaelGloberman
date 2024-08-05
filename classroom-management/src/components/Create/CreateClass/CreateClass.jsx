import { useState } from "react";

// Component
import FormField from "../FormField/FormField";

// Style
import { useStyles } from "./CreateClass.style";

// Service
import * as api from "../../../services/classService";

// Mui
import { Button, Grid, Typography } from "@mui/material";


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
      <Grid container justifyContent="center" height="20rem" item xs={2}>
      <Typography variant="h4" paddingBottom="1.25rem">Create new class</Typography>
        <Grid width="14rem" >
          <FormField
            label="Class ID *"
            value={id}
            property="id"
            validationType="classId"
            setData={setClassProperty}
            error={error}
            setError={setError}
          />

          <FormField
            label="Name *"
            value={className}
            property="className"
            validationType="className"
            setData={setClassProperty}
            error={error}
            setError={setError}
          />
          <FormField
            label="Max Seats *"
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
          className={classes.buttom}
          disabled={hasClassErrors()}
          onClick={handleCreateClass}
        >
          CREATE CLASS
        </Button>
      </Grid>
  );
};

export default CreateClass;
