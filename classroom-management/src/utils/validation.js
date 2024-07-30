const validateClassId = (value) => {
  if (isNaN(value) || value.trim() === "") {
    return "Id must be a number";
  }
  return "";
};

const validateClassName = (value) => {
  if (value.trim() === "") {
    return "Class name cannot be empty";
  }
  if (!/[a-zA-Z\u0590-\u05FF]/.test(value)) {
    return "Class Name must contain at least one letter (English or Hebrew)";
  }
  return "";
};

const validateNumberOfPlaces = (value) => {
  if (isNaN(value) || value.trim() === "" || Number(value) <= 0) {
    return "Max seats must be a positive number";
  }
  return "";
};

const validateStudentId = (value) => {
  if (isNaN(value) || value.trim() === "") {
    return "Student ID must be a number";
  }
  return "";
};

const validateStudentFirstName = (value) => {
  if (value.trim() === "") {
    return "First name cannot be empty";
  }
  if (/\d/.test(value)) {
    return "First name cannot contain numbers";
  }
  return "";
};

const validateStudentLastName = (value) => {
  if (value.trim() === "") {
    return "Last name cannot be empty";
  }
  if (/\d/.test(value)) {
    return "Last name cannot contain numbers";
  }
  return "";
};

const validateStudentAge = (value) => {
  if (isNaN(value) || value.trim() === "" || Number(value) < 0) {
    return "Age must be a non-negative number";
  }
  return "";
};

const validateStudentProfession = (value) => {
  if (value.trim() === "") {
    return "Profession cannot be empty";
  }
  if (!/[a-zA-Z\u0590-\u05FF]/.test(value)) {
    return "Profession must contain at least one letter (English or Hebrew)";
  }
  return "";
};

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
export const validateInput = (value, fieldType) => {
  const validate = validationFunctions[fieldType];
  return validate ? validate(value) : "";
};
