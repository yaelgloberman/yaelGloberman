import { createSlice } from "@reduxjs/toolkit";

const initialState = { classes: [] };

const classesSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {
    setClasses: (state, action) => {
      state.classes = action.payload;
    },
    addClass: (state, action) => {
      state.classes.push(action.payload);
    },
    deleteClass: (state, action) => {
      state.classes = state.classes.filter((cls) => cls.id !== action.payload);
    },
    deleteStudentFromClass: (state, action) => {
      const classId = action.payload;
      const classObj = state.classes.find((cls) => cls.id === classId);
      if (classObj) {
        classObj.remainingPlaces = classObj.remainingPlaces + 1;
      }
    },
  },
});

export const { setClasses, addClass, deleteClass, deleteStudentFromClass } =
  classesSlice.actions;
export default classesSlice.reducer;
