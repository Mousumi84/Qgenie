import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { headingUpdate } from "../../../Redux/Slices/StudentLayoutSlice";

function StudentAssessment() {
    let dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(headingUpdate({heading:"Assessment", subheading:"Give and manage your assessments here"}));
    },[dispatch]);

    return (
        <div id="StudentAssessment">
            <h1>StudentAssessment</h1>
        </div>
    )
}

export default StudentAssessment;