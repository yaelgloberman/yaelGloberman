import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  title: ({ hasStudents }) => ({
    ...(hasStudents && { cursor: "pointer" }),
  }),


}));

