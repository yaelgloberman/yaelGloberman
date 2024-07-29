import { Student } from "src/students/student.entity";

export interface IClass {
  id: number;
  className: string;
  numberOfPlaces: number;
  students: Student[]
}
