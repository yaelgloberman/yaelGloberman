import { Alert, Snackbar } from "@mui/material";

const ErrorSnackbar = ({
  snackbarOpen,
  snackbarSeverity,
  snackbarMessage,
  handleSnackbarClose,
}) => {
  return (
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
  );
};
export default ErrorSnackbar;
