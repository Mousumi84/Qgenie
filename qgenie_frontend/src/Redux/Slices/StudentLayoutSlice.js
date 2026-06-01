import { createSlice } from "@reduxjs/toolkit";

const StudentLayoutElementsSlices = createSlice({
    name: "dashboard",
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

export const {collapseUpdate,headingUpdate} = StudentLayoutElementsSlices.actions;

export default StudentLayoutElementsSlices;