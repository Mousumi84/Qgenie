import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { headingUpdate } from "../../../Redux/Slices/StudentLayoutSlice";

function StudentDashboard() {
    let dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(headingUpdate({heading:"Dashboard", subheading:"This is the place where you can manage your dashboard"}));
    },[dispatch]);

    return (
        <div id="StudentDashboard">
            <h1>StudentDashboard</h1>
        </div>
    )
}

export default StudentDashboard;