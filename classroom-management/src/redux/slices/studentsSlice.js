import { createSlice } from "@reduxjs/toolkit";

const initialState = { students: [] };

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setStudents: (state, action) => {
      state.students = action.payload;
    },
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter(
        (stud) => stud.id !== action.payload
      );
    },
    assignStudentToClass: (state, action) => {
      const {studentId ,classId} = action.payload;
      const student = state.students.find(stud => stud.id === classId);
      if (student) {
        student.classId = studentId;
      }
    },
    unAssignStudentToClass: (state, action) => {
      const { studentId } = action.payload;
      const student = state.students.find(stud => stud.id === studentId);
      if (student) {
        student.classId = null; 
      }
    },
  },
});

export const { setStudents, addStudent, deleteStudent, assignStudentToClass ,unAssignStudentToClass} = studentsSlice.actions;
export default studentsSlice.reducer;
