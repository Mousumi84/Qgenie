import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { headingUpdate } from "../../../Redux/Slices/TeacherLayout";

function TeacherDashboard() {
    let dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(headingUpdate({heading:"Dashboard", subheading:"This is the place where you can manage your dashboard"}));
    },[dispatch]);

    return (
        <div id="TeacherDashboard">
            <h1>TeacherDashboard</h1>
        </div>
    )
}

export default TeacherDashboard;