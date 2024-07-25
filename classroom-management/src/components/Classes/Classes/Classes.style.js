import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  title: ({ hasStudents }) => ({
    ...(hasStudents && { cursor: "pointer" }),
  }),

  header: ({ isCenter, sourcePage }) => ({
    fontSize: 18,
    fontWeight: 600,
    paddingTop: 10,
 
    fontStyle: "normal",
    alignItems: "center",
 
    ...(isCenter
      ? { display: "grid", gridTemplateColumns: "38px auto 38px" }
      : { display: "flex", justifyContent: "space-between" }),
 
    ...(sourcePage && { paddingBottom: 25 }),
 
    "& p": {
      margin: 0,
      width: "fit-content"
    },
 
    "& button": {
      minWidth: "fit-content"
    }
  }),


}));

