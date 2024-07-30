import {
  validateClassId,
  validateClassName,
  validateNumberOfPlaces,
  validateStudentId,
  validateStudentFirstName,
  validateStudentLastName,
  validateStudentAge,
  validateStudentProfession,
} from "../utils/validation";

const validationFunctions = {
  classId: validateClassId,
  className: validateClassName,
  numberOfPlaces: validateNumberOfPlaces,
  studentId: validateStudentId,
  studentFirstName: validateStudentFirstName,
  studentLastName: validateStudentLastName,
  studentAge: validateStudentAge,
  studentProfession: validateStudentProfession,
};
