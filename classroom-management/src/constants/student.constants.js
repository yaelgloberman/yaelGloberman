import Classes from "../components/Classes/Classes/Classes";
import Create from "../components/Create/Create/Create";
import Students from "../components/Students/Students/Students";

export const TABLE_HEADER = [
  "ID",
  "First Name",
  "Last Name",
  "Age",
  "Profession",
  "Assign",
  "Delete",
];
export const TABLE_BODY = ["id", "firstName", "lastName", "age", "profession"];

export const ROUTES = {
  class: ["/classes", Classes],
  student: ["/students", Students],
  create: ["/create", Create],
};
