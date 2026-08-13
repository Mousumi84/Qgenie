import { FloatButton, Segmented } from "antd";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

function ExamAssessment() {
    const [assessmentData, setAssessmentData] = useState(null);
    const [questions, setQestions] = useState ([]);
    const [template, setTemplate] = useState(null);
    const [remainTime, setRemainTime] = useState(0);
    const [selectedQuestionType, setSelectedQuestionType] = useState();

    let state = useLocation().state;

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
            url: `${import.meta.env.VITE_API_URL}/assessment/get/assessmentPaper/${state}`,
            method: "GET",
            headers: { Authorization: `${localStorage.getItem("studentToken")}`},
        });

           setTemplate(response?.data?.data?.template?.questionTypeTemplate);
           setAssessmentData(response?.data?.data);
           setQestions(response?.data?.data?.questions);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // const timeLimit = (value) => {
    //     if(value > 60) {
    //         let hours = Math.floor(value / 60);
    //         let minutes = value % 60;
    //         return `${hours} hours ${minutes} minutes`;
    //     }
    //     return `${value} minutes`;
    // }

    let segmentOptions = template?.map((item) => {
        return { label: quesTypeOpt.filter((i) => i.value === item.type)[0].label, value: item.type };
    });

    const timerFun = (ms) => {
        if (ms <= 0) {
            return {
                hours: "00",
                minutes: "00",
                seconds: "00",
            };
        }
    
        const hours = Math.floor(ms / (60 * 60 * 1000));
        ms %= 60 * 60 * 1000;
    
        const minutes = Math.floor(ms / (60 * 1000));
        ms %= 60 * 1000;
    
        const seconds = Math.floor(ms / 1000);
    
        return {
            hours: String(hours).padStart(2, "0"),
            minutes: String(minutes).padStart(2, "0"),
            seconds: String(seconds).padStart(2, "0"),
        };
    };

    useEffect(() => {
        if (!assessmentData) return;
    
        const storageKey = `examEndTime_${state}`;

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

    const time = timerFun(remainTime);

    return (
        <div className="flex flex-col ">
            <header className="bg-blue-500 flex flex-row justify-between p-1 px-5 text-blue-50 libre-baskerville">
                <div>Assessment - {assessmentData?.title}</div>
                <div className="flex flex-row gap-6">
                    <div>Total Marks - {assessmentData?.totalMarks}</div>
                    {/* <div>Time Limit - {timeLimit(assessmentData?.timeAllotted)}</div> */}
                </div>
            </header>

            <section className="flex flex-row libre-bodoni" style={{ height: "92vh" }}> 
                <main className="w-5/6">
                    <div className="flex items-center gap-3 p-2 bg-gray-50 text-blue-600">
                        <div>Section :</div>
                        <Segmented options={segmentOptions} onChange={(value) => {
                            setSelectedQuestionType(value)
                        }}/>
                    </div>

                    {selectedQuestionType ? (<div></div>) : 
                    (<div className="flex flex-col items-center justify-center h-full text-2xl text-gray-400">Please select a question section to view the questions.
                    </div>)
                    }
                </main>
                
                <aside className="border-l-4 border-gray-200 w-1/6">
                    <div className="flex flex-col items-center border-b-3 border-blue-50 m-2 p-2 gap-2">
                        <div className="text-xl">Time Left</div>
                        <div className="flex flex-row justify-between w-19/20 p-2">
                            <div>
                                <strong>{time.hours}</strong>
                                <div>Hours</div>
                            </div>
                            <div>:</div>
                            <div>
                                <strong>{time.minutes}</strong>
                                <div>Minutes</div>
                            </div>
                            <div>:</div>
                            <div>
                                <strong>{time.seconds}</strong>
                                <div>Seconds</div>
                            </div>
                        </div>
                    </div>

                    {selectedQuestionType && <div className="p-3 h-90">
                        <div className="h-full border rounded-md border-gray-300 p-4 flex flex-row gap-2 flex-wrap content-start">
                            {questions?.filter((item) => item.questionType === selectedQuestionType).map((item, index) => {
                                return (
                                    <div key={item?._id} className={`border border-gray-400 rounded-3xl w-10 h-10 content-center text-center`}>{index + 1}</div>
                                );
                            })}
                        </div>
                    </div>
                    }
                </aside>
            </section> 

            <footer className="bg-blue-500">
                <div>Footer</div>
            </footer>     
        </div>
    );
}

export default ExamAssessment;
