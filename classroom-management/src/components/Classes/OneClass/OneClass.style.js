import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  studentListClose: {
    fontWeight: "400 !important",
    fontSize: "1.3rem !important",
    paddingTop: "5px !important",
  },

  studentListOpen: {
    fontWeight: "400 !important",
    cursor: "pointer",
    fontSize: "1.3rem !important",
    paddingTop: "5px !important",
  },

  bold: {
    fontWeight: "900 !important",
  },

  paper: {
    height: "11.75rem",
    width: "12.5rem",
    padding: "1.25rem",
    margin: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },

  className: {
    fontWeight: "900 !important",
    fontSize: "1.25rem !important",
    marginBottom: "0.5rem !important"
  },

  remainingPlaces: {
    fontSize: "1rem !important",
    marginBottom: "0.25rem !important"
  },

  maxPlaces: {
    fontSize: "0.875rem !important",
  },
}));
