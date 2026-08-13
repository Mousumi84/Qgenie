import { createSlice } from "@reduxjs/toolkit";

const StudentLayoutElementsSlices = createSlice({
    name: "student",
    initialState: {
        collapse: JSON.parse(localStorage.getItem("Collapsed"))|| "true",
        heading: "",
        subheading: ""
    },
    reducers: {
        collapseUpdate: (state) => {
            state.collapse = !state.collapse;
            console.log("Collapse ",state.collapse)

            localStorage.setItem("Collapsed", JSON.stringify(state.collapse));
        },
        headingUpdate: (state,action) => {
            state.heading = action.payload.heading;
            state.subheading = action.payload.subheading;
        }
    }
});

export const {collapseUpdate,headingUpdate} = StudentLayoutElementsSlices.actions;

export default StudentLayoutElementsSlices;