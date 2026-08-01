import { Modal } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import TimeCounter from "../../Common/TimeCounter";

const ViewAssessmentBrief = ({ id, setViewDetails }) => {
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
                url: `${import.meta.env.VITE_API_URL}/assessment/get/studentAssessment/${id}`,
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

    const durationFormat = (time) => { 
                if(time > 60) {
                    let hr = Math.floor(time / 60);
                    let min = time % 60 ;

                    return `${hr} h ${min} mins`;
                }

                return `${time} mins`;
            }

    useEffect(() => {
        fetchAssessmentDetails();
    }, []);

    return (
        <div id="viewTemp">
            <Modal title={record?.title} style={{ top: 20, left: 25 }} width="70%" centered open={record} footer={() => <></>} onCancel={() => setViewDetails(false)}>
                <div className="flex col gap-15">
                    {/* <div className="flex row gap-4 w-90 pb-2">
                        <strong>Grade Level :</strong>
                        <div>{record?.gradelevel}</div>
                    </div> */}
                    <div className="flex row gap-4 w-90 pb-2">
                        <strong>Subject :</strong>
                        <div>{record?.subject}</div>
                    </div>
                    <div className="flex row gap-4 w-90 pb-2">
                        <strong>Created By :</strong>
                        <div>{record?.createdBy?.name}</div>
                    </div>
                </div>
                <div className="flex col gap-15">
                    <div className="flex row gap-4 w-90 pb-2">
                        <strong>Total Marks :</strong>
                        <div>{record?.totalMarks}</div>
                    </div>
                    <div className="flex row gap-4 w-90 pb-2">
                        <strong>Duration :</strong>
                        <div>{durationFormat(record?.timeAllotted)}</div>
                    </div>
                </div>
                <div className="flex col gap-15">
                    <div className="flex row gap-4 w-90 pb-2">
                        <strong>Available From :</strong>
                        <div>{dayjs(record?.assessmentDate[0]).format("DD/MM/YY hh:mm A")}</div>
                    </div>
                    <div className="flex row gap-4 w-90 pb-2">
                        <strong>Submission Deadline :</strong>
                        <div>{dayjs(record?.assessmentDate[1]).format("DD/MM/YY hh:mm A")}</div>
                    </div>
                    {/* <div className="flex row gap-4 w-90 pb-2">
                        <strong>Time Remaining :</strong>
                        <TimeCounter endtime={new Date(record?.assessmentDate[1]).getTime()} />
                    </div> */}
                </div>
                {record?.description && (
                    <div>
                        <div className="flex row gap-4 w-90 pb-2">
                            <strong>Description :</strong>
                            <div>{record?.description}</div>
                        </div>
                    </div>
                )}
                <div>
                    <strong className="flex gap-4 w-90 pb-3">Questions Distribution</strong>
                    <ol type="1" start="1" >
                        {record?.template?.questionTypeTemplate.map((item) => {
                            return (
                                <li key={item?._id} className="border rounded-md border-dashed border-gray-300 p-4">
                                    <div className="flex col gap-15">
                                        <div className="flex row gap-4 w-90 pb-2">
                                            <strong>Question Type:</strong>
                                            <div>{quesTypeOpt.filter((i) => i.value === item?.type)[0]?.label}</div>
                                        </div>
                                        <div className="flex row gap-4 w-90 pb-2">
                                            <strong>Question Count :</strong>
                                            <div>{item?.questionCount}</div>
                                        </div>
                                        <div className="flex row gap-4 w-90 pb-2">
                                            <strong>Marks Per Question :</strong>
                                            <div>{item?.marksperQtn}</div>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                </div>
                <div>
                    <strong className="flex gap-4 w-90 pb-3">Instructions :</strong>
                    <ul style={{ listStyleType: "disc", marginLeft: "100px"}}>
                        <li>All questions are compulsory.</li>
                        <li>Submit before the deadline.</li>
                        <li>Do not refresh the page.</li>
                    </ul>
                </div>
            </Modal>
        </div>
    );
};

export default ViewAssessmentBrief;
