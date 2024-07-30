import React, { useState } from "react";

// Mui
import { Box, Grid } from "@mui/material";

//Validation
import { validateInput } from "../../../utils/validation";

//Component
import ErrorSnackbar from "../../ErrorSnackbar";
import CreateClass from "../CreateClass/CreateClass";
import CreateStudent from "../CreateStudent/CreateStudent";

// Services
import * as sApi from "../../../services/studentService";

const Create = () => {
 
  const [error, setError] = useState({});
  const [snackbarMessage, setSnackbarMessage] = useState({
    open: false,
    severity: "success",
    message: "",
  });


  const handleSnackbarClose = () => {
    setSnackbarMessage((prevSnackbar) => ({
      ...prevSnackbar,
      open: false,
    }));
  };

  return (
    <Box display="flex" sx={{ mt: 10 }}>
      <Grid container justifyContent="center">
        <CreateClass
          error={error}
          setError={setError}
          setSnackbarMessage={setSnackbarMessage}
        />
        <CreateStudent
          error={error}
          setError={setError}
          setSnackbarMessage={setSnackbarMessage}
        />
      </Grid>
      <ErrorSnackbar
        snackbarMessage={snackbarMessage}
        handleSnackbarClose={handleSnackbarClose}
      />
    </Box>
  );
};

export default Create;
