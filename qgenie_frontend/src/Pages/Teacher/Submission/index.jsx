import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { headingUpdate } from "../../../Redux/Slices/TeacherLayoutSlice";

function TeacherSubmission() {
    let dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(headingUpdate({heading:"Submission", subheading:"View all submissions here"}));
    },[dispatch]);

    return (
        <div id="TeacherSubmission">
            <h1>TeacherSubmission</h1>
        </div>
    )
}

export default TeacherSubmission;