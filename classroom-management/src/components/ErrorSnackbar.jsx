import { Alert, Snackbar } from "@mui/material";

const ErrorSnackbar = ({
  snackbarMessage,
  handleSnackbarClose,
}) => {
  return (
    <Snackbar
      open={snackbarMessage.open}
      autoHideDuration={6000}
      onClose={handleSnackbarClose}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity={snackbarMessage.severity}
        sx={{ width: "100%" }}
      >
        {snackbarMessage.message}
      </Alert>
    </Snackbar>
  );
};
export default ErrorSnackbar;
