import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const classesSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    setClasses: (state, action) => action.payload,
  },
});

export const { setClasses } = classesSlice.actions;
export default classesSlice.reducer;
