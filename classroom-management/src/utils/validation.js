export const validateInput = (value, fieldType) => {
  switch (fieldType) {
    // Class validation
    case "classId":
      if (isNaN(value) || value.trim() === "") {
        return "Id must be a number";
      }
      break;
    case "className":
      if (value.trim() === "") {
        return "Class name cannot be empty";
      }

      if (!/[a-zA-Z]/.test(value)) {
        return "Class Name must contain at least one letter";
      }
      break;
    case "maxSeats":
      if (isNaN(value) || value.trim() === "" || Number(value) < 0) {
        return "Max seats must be a non-negative number";
      }
      break;
    // Student validation
    case "studentId":
      if (isNaN(value) || value.trim() === "") {
        return "Student ID must be a number";
      }
      break;
    case "studentFirstName":
      if (value.trim() === "") {
        return "First name cannot be empty";
      }
      if (/\d/.test(value)) {
        return "First name cannot contain numbers";
      }
      break;
    case "studentLastName":
      if (value.trim() === "") {
        return "Last name cannot be empty";
      }
      if (/\d/.test(value)) {
        return "Last name cannot contain numbers";
      }
      break;
    case "studentAge":
      if (isNaN(value) || value.trim() === "" || Number(value) < 0) {
        return "Age must be a non-negative number";
      }
      break;
    case "studentProfession":
      if (value.trim() === "") {
        return "Profession cannot be empty";
      }
      if (!/[a-zA-Z]/.test(value)) {
        return "Profession must contain at least one letter";
      }
      break;
    default:
      return "";
  }
  return "";
};
