import { Modal } from "antd";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";

const ViewTemplateDetails = ({id, setViewDetails}) => {
    const [record, setRecord] = useState();

    let quesTypeOpt = [
        { label: "Multiple Choice Question", value: "MCQ" },
        { label: "Multiple Select Question", value: "MSQ" },
        { label: "True / False", value: "TRUE_FALSE" },
        { label: "Fill in the Blank", value: "FILL_BLANK" },
        { label: "Short Answer Question", value: "SAQ" },
        { label: "Long Answer Question", value: "LAQ" }, 
    ];
    
    const fetchTemplateDetails = async () => {
        try {
            let response = await axios({
                url: `${import.meta.env.VITE_API_URL}/template/get/${id}`,
                method: "GET",
                headers: { Authorization: `${localStorage.getItem("teacherToken")}` }
            })
            console.log(response);

            if(response.data.status == 200) {
                setRecord(response.data.data);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        fetchTemplateDetails();
    },[]);

    return (
        <div id="viewTemp">
            <Modal title={record?.title} width="60%" centered open={record} footer={() => (<></>)} onCancel={() => setViewDetails(false)}>
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
                <div>
                    <div className="flex row gap-4 w-90 pb-2">
                        <strong>Description :</strong>
                        <div>{record?.description}</div>
                    </div>
                </div>
                <div>
                    <strong className="flex gap-4 w-90 pb-3">Question Types</strong>
                    <div>
                        {record?.questionTypeTemplate.map((item,index) => {
                        return(
                            <div key={item?._id} className="border rounded-md border-dashed border-gray-300 p-4">
                                <div className="flex gap-5 font-medium pb-5">
                                    <span className="text-gray-400 text-2xl italic qwigley-regular ">{index + 1}.</span>
                                    <strong>{quesTypeOpt.filter((i) => i.value === item.type)[0].label}</strong>
                                </div>
                                <div className="flex col gap-15">
                                    <div className="flex row gap-4 w-90 pb-2">
                                        <strong>Question Count :</strong>
                                        <div>{item?.questionCount}</div>
                                    </div>
                                    <div className="flex row gap-4 w-90 pb-2">
                                        <strong>Marks Per Question :</strong>
                                        <div>{item?.marksperQtn}</div>
                                    </div>
                                    <div className="flex row gap-4 w-90 pb-2">
                                        <strong>Difficulty Level :</strong>
                                        <div className={item?.difficultyLevel === 'easy' ? "text-green-400" : item?.difficultyLevel === 'medium' ? "text-yellow-400" : "text-red-400" }>{item?.difficultyLevel}</div>
                                    </div>
                                </div>
                                <div className="flex col gap-15">
                                    <div className="flex row gap-4 w-90 pb-2">
                                        <strong>Include Hints :</strong>
                                        <div className={item?.options.includes("IH") ? "text-blue-600" : "text-red-600"}>{item?.options.includes("IH") ? "Yes" : "No"}</div>
                                    </div>
                                    <div className="flex row gap-4 w-90 pb-2">
                                        <strong>Include Explanations :</strong>
                                        <div className={item?.options.includes("IE") ? "text-blue-600" : "text-red-600"}>{item?.options.includes("IE") ? "Yes" : "No"}</div>
                                    </div>
                                </div>
                                <div className="flex col gap-15">
                                    <div className="flex row gap-4 w-90 pb-2">
                                        <strong>Shuffle Options :</strong>
                                        <div className={item?.options.includes("SO") ? "text-blue-600" : "text-red-600"}>{item?.options.includes("SO") ? "Yes" : "No"}</div>
                                    </div>
                                    <div className="flex row gap-4 w-90 pb-2">
                                        <strong>Enable Negative Marking :</strong>
                                        <div className={item?.options.includes("ENM") ? "text-blue-600" : "text-red-600"}>{item?.options.includes("ENM") ? "Yes" : "No"}</div>
                                    </div>
                                </div>
                                { item?.aiprompt && <div>
                                                        <div className="flex row gap-4">
                                                            <strong>AI Prompt :</strong>
                                                            <div>{item?.aiprompt}</div>
                                                        </div>
                                                    </div>
                                }
                            </div>
                        )
                    })}
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ViewTemplateDetails;