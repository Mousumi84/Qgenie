import { Button } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { MdPerson, MdPerson2 } from "react-icons/md";

const SideBody = ({ assessmentStartId, selectedQuestionType, questions, remainTime, quesClk, setQuesClk, assessmentData }) => {
    let student = JSON.parse(localStorage.getItem("studentLoginDetails"));
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

    const time = timerFun(remainTime);

    const handleSubmitExam = async() => {
        try {
            let response = await axios({
                url: `${import.meta.env.VITE_API_URL}/submission/submitAssessment/${assessmentStartId}`,
                method: "POST",
                data: {
                    assessmentId: assessmentData?._id,
                    studentId: student?._id,
                    status: "Submitted",
                    submittedAt: new Date().toISOString(),
                    timeUsed: assessmentData?.duration - remainTime,
                    // tabSwitchCount:,
                    // copyPasteCount:,
                    autoSubmitted: assessmentData?.duration - remainTime > 0 ? false : true,
                    answers: JSON.parse(localStorage.getItem("answers")) || [],
                },
                headers: { Authorization: `${localStorage.getItem("studentToken")}` },
            });

            if(response.status === 200) {
                localStorage.removeItem("answers");
                localStorage.removeItem(`examEndTime_${assessmentData?._id}`);
                window.location.href = "/student/dashboard";
                return;
            }

            toast.error(response?.data?.message);
        } catch (error) {
            console.error(error);
            toast.error(error.message || "An error occurred while submitting the exam.");
        }
    }

    return (
        <>
            <div className="flex flex-col items-center border-b-3 border-blue-50 m-2 p-2 gap-2">
                <div className="border border-gray-100 bg-gray-100 p-1 rounded-sm ">
                    <div className="border border-gray-50 border-4 rounded-sm ">{student?.gender === "male" ? <MdPerson /> : <MdPerson2 size={70} color="white" />}</div>
                </div>
                <div className="text-xl">{student?.name}</div>
                <div className="text-sm">{student?.email}</div>
            </div>

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

            {selectedQuestionType && (
                <>
                <div className="p-3 h-80">
                    <div className="h-full border rounded-md border-gray-300 p-4 flex flex-row gap-2 flex-wrap content-start">
                        {questions?.filter((item) => item.questionType === selectedQuestionType).map((item, index) => {
                                const isActive = quesClk?.item?._id === item?._id;

                            return (
                                <div key={item?._id} className={`border border-gray-400 rounded-3xl w-10 h-10 content-center text-center bg-gray-100 ${isActive ? "bg-red-500 text-white" : "bg-gray-100"}`} onClick={() => setQuesClk({item, index})}>{index + 1}</div>
                            );
                        })}
                    </div>
                </div>
            

            <div className="flex justify-center">
                <Button type="primary" onClick={handleSubmitExam} className="w-5/6 flex justify-self-center">Submit</Button>
            </div>
            </>
            )}
        </>
    )
};

export default SideBody;