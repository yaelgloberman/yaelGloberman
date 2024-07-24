import { createSlice } from '@reduxjs/toolkit';

const initialState = {students:[]};

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setStudents: (state, action) =>  state.classes = action.payload,
    deleteStudentFromClass: (state, action) => {
      state.students = state.students.filter(stud => stud.id !== action.payload);
    },
    getAllStudentInClass:(state,action)=>{
      const classId = action.payload;
      state.students = state.students.filter(stud => stud.classId === classId);
    }

  
  },
});

export const { setStudents,deleteStudentFromClass,getAllStudentInClass } = studentsSlice.actions;
export default studentsSlice.reducer;
