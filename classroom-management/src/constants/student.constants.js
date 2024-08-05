
import {Class, Student, Create} from '../pages'

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
  class: ["/classes", Class],
  student: ["/students", Student],
  create: ["/create", Create],
};
