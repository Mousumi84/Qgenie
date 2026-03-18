import {configureStore} from '@reduxjs/toolkit';
import TeacherLayoutElementsSlices from './Slices/TeacherLayout';

export const store = configureStore({
    reducer: {
        teacher: TeacherLayoutElementsSlices.reducer,
    }
});