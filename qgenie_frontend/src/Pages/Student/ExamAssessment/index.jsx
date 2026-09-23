import { FloatButton, Segmented } from "antd";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import MainBody from "../../../Components/Student/ExamLayout/MainBody";
import SideBody from "../../../Components/Student/ExamLayout/SideBody";

function ExamAssessment() {
    const [assessmentData, setAssessmentData] = useState(null);
    const [questions, setQestions] = useState([]);
    const [template, setTemplate] = useState(null);
    const [remainTime, setRemainTime] = useState(0);
    const [selectedQuestionType, setSelectedQuestionType] = useState();
    const [quesClk, setQuesClk] = useState({});

    let state = useLocation().state;
    let assessmentStartId = useLocation().state.assessmentStartId;

    let quesTypeOpt = [
        { label: "Multiple Choice Question", value: "MCQ" },
        { label: "Multiple Select Question", value: "MSQ" },
        { label: "True / False", value: "TRUE_FALSE" },
        { label: "Fill in the Blank", value: "FILL_BLANK" },
        { label: "Short Answer Question", value: "SAQ" },
        { label: "Long Answer Question", value: "LAQ" },
    ];

     const fetchAssessmentData = async () => {
        try {
            const response = await axios({
                url: `${import.meta.env.VITE_API_URL}/assessment/get/assessmentPaper/${state.id}`,
                method: "GET",
                headers: { Authorization: `${localStorage.getItem("studentToken")}` },
            });

            setTemplate(response?.data?.data?.template?.questionTypeTemplate);
            setAssessmentData(response?.data?.data);
            setQestions(response?.data?.data?.questions);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };
    
    const timeLimit = (value) => {
        if (value > 60) {
            let hours = Math.floor(value / 60);
            let minutes = value % 60;
            return `${hours} hours ${minutes} minutes`;
        }
        return `${value} minutes`;
    }

    let segmentOptions = template?.map((item) => {
        return { label: quesTypeOpt.filter((i) => i.value === item.type)[0].label, value: item.type };
    });

    useEffect(() => {
        if (!assessmentData) return;

        const storageKey = `examEndTime_${state.id}`;

        let endTime = localStorage.getItem(storageKey);

        if (!endTime) {
            // First time opening the exam
            endTime = Date.now() + assessmentData.timeAllotted * 60 * 1000;
            localStorage.setItem(storageKey, endTime);
        } else {
            endTime = Number(endTime);
        }

        const interval = setInterval(() => {
            const remaining = endTime - Date.now();

            if (remaining <= 0) {
                setRemainTime(0);
                localStorage.removeItem(storageKey);
                clearInterval(interval);
                return;
            }

            setRemainTime(remaining);
        }, 1000);

        return () => clearInterval(interval);
    }, [assessmentData, state]);

    // useEffect(() => {
    //     window.history.pushState(null, "", window.location.href);

    //     const handlePopState = () => {
    //         window.history.pushState(null, "", window.location.href);
    //     };

    //     window.addEventListener("popstate", handlePopState);

    //     return () =>
    //         window.removeEventListener("popstate", handlePopState);
    // }, []);

    useEffect(() => {
        fetchAssessmentData();
    }, []);

    useEffect(() => {

        if (!questions?.length || !template?.length) return;

        // If no section is selected, select the first section
        if (!selectedQuestionType) {
            const firstQuestionType = template[0]?.type;

            setSelectedQuestionType(firstQuestionType);
            return;
        }

        // Get questions belonging to the selected section
        const filteredQuestions = questions.filter(
            (item) => item.questionType === selectedQuestionType
        );

        console.log("Filtered Questions:", filteredQuestions);

        if (filteredQuestions.length > 0) {
            // Open the first question of this section
            setQuesClk({
                item: filteredQuestions[0],
                index: 0,
            });
        }
    }, [questions, template, selectedQuestionType]);

    if (document.hidden) {
        console.log("Document is hidden. User may have switched tabs or minimized the window.");
    }
     
    return (
        <div className="h-screen flex flex-col overflow-hidden">
            {/* HEADER */}
            <header className="bg-blue-500 flex flex-row justify-between items-center  p-1 px-5 text-blue-50 libre-baskerville h-[4vh] shrink-0">
                <div>Assessment: {assessmentData?.title}</div>
                <div className="flex flex-row gap-6">
                    <div>Total Marks: {assessmentData?.totalMarks}</div>
                    <div>Time Limit: {timeLimit(assessmentData?.timeAllotted)}</div>
                </div>
            </header>

            {/* MAIN BODY */}
            <section className="flex flex-row flex-1 min-h-0 libre-bodoni">
                {/* LEFT SIDE */}
                <main className="w-5/6 flex-1 min-h-0">
                    <div className="flex items-center gap-3 p-2 bg-gray-50 text-blue-600 shrink-0">
                        <div>Section :</div>
                        <Segmented options={segmentOptions} onChange={(value) => { setSelectedQuestionType(value) }} />
                    </div>

                    {selectedQuestionType ?
                        (<div className="flex flex-col h-full text-xl p-5 overflow-auto" >
                            <MainBody item={quesClk} setQuesClk={setQuesClk} questions={questions} selectedQuestionType={selectedQuestionType} />
                        </div>)
                        :
                        (<div className="flex flex-col items-center justify-center h-full text-2xl text-gray-400">Please select a question section to view the questions.</div>)
                    }
                </main>

                {/* RIGHT SIDE */}
                <aside className="border-l-4 border-gray-200 w-1/6 min-h-0 overflow-hidden" >
                    <SideBody assessmentStartId={assessmentStartId} selectedQuestionType={selectedQuestionType} questions={questions} remainTime={remainTime} quesClk={quesClk} setQuesClk={setQuesClk} assessmentData={assessmentData} />
                </aside>
            </section>

            {/* FOOTER */}
            <footer className="bg-blue-500 h-[4vh] shrink-0 flex items-center">
                <div>Footer</div>
            </footer>
        </div>
    );
}

export default ExamAssessment;
