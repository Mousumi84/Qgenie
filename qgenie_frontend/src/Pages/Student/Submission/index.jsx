import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { headingUpdate } from "../../../Redux/Slices/StudentLayoutSlice";

function StudentSubmission() {
    let dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(headingUpdate({heading:"Submission", subheading:"View all submissions here"}));
    },[dispatch]);

    return (
        <div id="StudentSubmission">
            <h1>StudentSubmission</h1>
        </div>
    )
}

export default StudentSubmission;