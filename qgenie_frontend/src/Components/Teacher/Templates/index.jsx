import { useDispatch, useSelector } from "react-redux";
import { headingUpdate } from "../../../Redux/Slices/TeacherLayout";
import { useEffect } from "react";

function TeacherTemplatesPage() {
    let dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(headingUpdate({heading:"Templates", subheading:"This is the place where you can manage your templates"}));
    },[dispatch]);

    return (
        <div id="TeacherTemplatesPage">
            <h1>TeacherTemplatesPage</h1>
        </div>
    )
}

export default TeacherTemplatesPage;