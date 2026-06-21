import { createSlice } from "@reduxjs/toolkit";
import APIStatus from "../../Utils/APIStats";

const TeacherLayoutElementsSlices = createSlice({
    name: "teacher",
    initialState: {
        collapse: true,
        heading: "",
        subheading: ""
    },
    reducers: {
        collapseUpdate: (state,action) => {
            state.collapse = action.payload ?? !state.collapse;
        },
        headingUpdate: (state,action) => {
            state.heading = action.payload.heading;
            state.subheading = action.payload.subheading;
        }
    }
});

export const {collapseUpdate,headingUpdate} = TeacherLayoutElementsSlices.actions;

export default TeacherLayoutElementsSlices;