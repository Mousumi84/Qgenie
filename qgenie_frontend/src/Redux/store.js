import { configureStore } from '@reduxjs/toolkit';
import TeacherLayoutElementsSlices from './Slices/TeacherLayoutSlice';
import StudentLayoutElementsSlices from './Slices/StudentLayoutSlice';

export const store = configureStore({
    reducer: {
        teacher: TeacherLayoutElementsSlices.reducer,
        student: StudentLayoutElementsSlices.reducer,
    }
});