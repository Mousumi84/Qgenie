import { useEffect } from "react";

function ExamAssessment() {

    useEffect(() => {
        window.history.pushState(null, "", window.location.href);
    
        const handlePopState = () => {
            window.history.pushState(null, "", window.location.href);
        };
    
        window.addEventListener("popstate", handlePopState);
    
        return () =>
            window.removeEventListener("popstate", handlePopState);
    }, []);
    
    return (
        <div>
            <h1>Exam Assessment Page</h1>
        </div>
    );
}

export default ExamAssessment;