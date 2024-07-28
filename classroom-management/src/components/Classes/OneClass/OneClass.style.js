import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  title: (props) => ({
    cursor:
      props.numberOfPlaces - props.remainingPlaces !== 0
        ? "pointer"
        : "default",
    fontWeight: "400 !important",
  }),
  bold: {
    fontWeight: "900 !important",
  },
  paper: {
    height: '150px',
    width: '200px',
    padding: '16px',
  },
}));
