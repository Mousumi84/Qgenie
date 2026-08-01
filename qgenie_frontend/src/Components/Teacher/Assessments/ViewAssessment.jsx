import { Modal } from "antd";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";

const ViewAssessmentDetails = ({ id, setViewDetails }) => {
    const [record, setRecord] = useState();

    let quesTypeOpt = [
        { label: "Multiple Choice Question", value: "MCQ" },
        { label: "Multiple Select Question", value: "MSQ" },
        { label: "True / False", value: "TRUE_FALSE" },
        { label: "Fill in the Blank", value: "FILL_BLANK" },
        { label: "Short Answer Question", value: "SAQ" },
        { label: "Long Answer Question", value: "LAQ" },
    ];

    const fetchAssessmentDetails = async () => {
        try {
            let response = await axios({
                url: `${import.meta.env.VITE_API_URL}/assessment/get/${id}`,
                method: "GET",
                headers: { Authorization: `${localStorage.getItem("teacherToken")}` },
            });
            console.log(response);

            if (response.data.status == 200) {
                setRecord(response.data.data);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchAssessmentDetails();
    }, []);

    return (
        <div id="viewTemp">
            <Modal title={record?.title} style={{ top: 20, left: 25 }} width="70%" centered open={record} footer={() => <></>} onCancel={() => setViewDetails(false)}>
                <div className="flex col gap-15">
                    <div className="flex row gap-4 w-90 pb-2">
                        <strong>Grade Level :</strong>
                        <div>{record?.gradelevel}</div>
                    </div>
                    <div className="flex row gap-4 w-90 pb-2">
                        <strong>Subject :</strong>
                        <div>{record?.subject}</div>
                    </div>
                </div>
                <div className="flex col gap-15">
                    <div className="flex row gap-4 w-90 pb-2">
                        <strong>Total Marks :</strong>
                        <div>{record?.totalMarks}</div>
                    </div>
                    <div className="flex row gap-4 w-90 pb-2">
                        <strong>Duration :</strong>
                        <div>{record?.timeAllotted}</div>
                    </div>
                </div>
                <div>
                    <div className="flex row gap-4 w-90 pb-2">
                        <strong>Description :</strong>
                        <div>{record?.description}</div>
                    </div>
                </div>
                <div>
                    <strong className="flex gap-4 w-90 pb-3">Questions</strong>
                    <div>
                        {record?.questions.map((item, index) => {
                            return (
                                <div key={item?._id} className="border rounded-md border-dashed border-gray-300 p-4">
                                    <div className="flex font-medium pb-5 gap-5">
                                        <span className="text-gray-400 text-2xl italic qwigley-regular ">Q. {index + 1}.</span>
                                        <strong>{item?.question}</strong>
                                    </div>

                                    {item?.questionType === "TRUE_FALSE" && (
                                        <div className="flex row gap-4 w-90 pb-2">
                                            <strong>Answer :</strong>
                                            <div className="text-blue-700">{item.sampleAnswer === true ? "True" : "False"}</div>
                                        </div>
                                    )}

                                    {(item?.questionType === "FILL_BLANK" || item?.questionType === "SAQ" || item?.questionType === "LAQ") && (
                                        <div className="flex row gap-4 w-90 pb-2">
                                            <strong>Answer :</strong>
                                            <div className="text-blue-700">{item?.sampleAnswer}</div>
                                        </div>
                                    )}

                                    {(item?.questionType === "MCQ" || item?.questionType === "MSQ") && (
                                        <div>
                                            <strong>Options :</strong>
                                            <div className="grid grid-cols-2 ">
                                                {item?.sampleOptions.map((opt, index) => {
                                                    return (
                                                        <div key={opt._id} className="flex gap-5">
                                                            <span className="text-gray-400 text-2xl italic qwigley-regular ">{index + 1}.</span>
                                                            <span className="text-blue-700">{opt.label}</span>
                                                            {opt.isCorrect && <span className="text-green-600"> (Correct Answer)</span>}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex col gap-15">
                                        <div className="flex row gap-4 w-90 pb-2">
                                            <strong>Question Type:</strong>
                                            <div>{quesTypeOpt.filter((i) => i.value === item?.questionType)[0]?.label}</div>
                                        </div>
                                        <div className="flex row gap-4 w-90 pb-2">
                                            <strong>Difficulty Level :</strong>
                                            <div className={item?.difficultyLevel === "easy" ? "text-green-400" : item?.difficultyLevel === "medium" ? "text-yellow-400" : "text-red-400"}>
                                                {item?.difficultyLevel}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex col gap-15">
                                        <div className="flex row gap-4 w-90 pb-2">
                                            <strong>Marks :</strong>
                                            <div>{item?.marks}</div>
                                        </div>
                                        <div className="flex row gap-4 w-90 pb-2">
                                            <strong>Negative Marks :</strong>
                                            <div className="text-red-400">{item?.negativeMarks}</div>
                                        </div>
                                    </div>

                                    {item?.hints && (
                                        <div className="flex row gap-4 w-90 pb-2">
                                            <strong>Include Hints :</strong>
                                            <div>{item?.hints}</div>
                                        </div>
                                    )}

                                    {item?.explanation && (
                                        <div className="flex row gap-4 w-90 pb-2">
                                            <strong>Include Explanations :</strong>
                                            <div>{item?.explanation}</div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ViewAssessmentDetails;
