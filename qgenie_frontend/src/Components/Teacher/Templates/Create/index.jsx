import { useDispatch } from "react-redux";
import { headingUpdate } from "../../../../Redux/Slices/TeacherLayout";
import { useEffect } from "react";
import InputLabel from "./InputLabel";

function CreateTemplatePage() {
    let dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(headingUpdate({heading:"Templates", subheading:"This is the place where you can manage your templates"}));
    },[dispatch]);

    return (
        <div id="CreateTemplatePage">
            <h1>CreateTemplatePage</h1>
            <InputLabel type={"radio"} value={"name"} label={"Name"} />
        </div>
    )    
}

export default CreateTemplatePage;