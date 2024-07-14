import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import classesReducer from './slices/classesSlice';
import studentsReducer from './slices/studentsSlice';
import themeReducer from './slices/themeSlice';

const store = configureStore({
  reducer: {
    classes: classesReducer,
    students: studentsReducer,
    theme: themeReducer,
  },
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export default store;
