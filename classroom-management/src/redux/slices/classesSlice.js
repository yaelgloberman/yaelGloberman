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
    
  },
});

export const { setClasses, addClass, deleteClass } =
  classesSlice.actions;
export default classesSlice.reducer;
