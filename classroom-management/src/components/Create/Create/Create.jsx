import React, { useState } from "react";

// Mui
import { Box, Grid } from "@mui/material";

//Component
import ErrorSnackbar from "../../ErrorSnackbar";
import CreateClass from "../CreateClass/CreateClass";
import CreateStudent from "../CreateStudent/CreateStudent";

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
    <Box display="flex" sx={{ marginTop: "3.125rem" }}  >
      <Grid container justifyContent="space-around" >
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
