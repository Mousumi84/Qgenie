import { Modal } from "antd";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";

const ViewTemplateDetails = ({id, setViewDetails}) => {
    const [record, setRecord] = useState();

    // let optionsOptn = [
    //     { label: "Include Hints", value: "IH" },
    //     { label: "Include Explanations", value: "IE" },
    //     { label: "Shuffle Options", value: "SO" },
    //     { label: "Enable Negative Marking", value: "ENM" },
    // ];

    let quesTypeOpt = [
        { label: "Multiple Choice Question", value: "MCQ" },
        { label: "Multiple Select Question", value: "MSQ" },
        { label: "True / False", value: "TRUE_FALSE" },
        { label: "Fill in the Blank", value: "FILL_BLANK" },
        { label: "Short Answer Question", value: "SAQ" },
        { label: "Long Answer Question", value: "LAQ" }, 
    ];
    
    const fetchtemplateDetails = async () => {
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
        fetchtemplateDetails();
    },[]);

    console.log(record)

    /*
{
    "_id": "6a37f48b8204fa172b93b61d",
    "title": "English Test",
    "subject": "English",
    "gradelevel": "Class 3",
    "questionTypeTemplate": [
        {
            "type": "TRUE_FALSE",
            "questionCount": 10,
            "marksperQtn": 1,
            "difficultyLevel": "easy",
            "aiprompt": "Easy question",
            "options": [
                "IH",
                "ENM"
            ],
            "_id": "6a3d53df15b214eb1b03ea57"
        }
    ],
    "createdAt": "2026-06-21T14:26:19.608Z",
    "updatedAt": "2026-06-25T16:14:23.830Z",
    "__v": 0,
    "description": "English Chapter 1 Class test "
}

*/




    return (
        <div id="viewTemp">
            <Modal title={record?.title} width="60%" centered open={record} footer={() => (<></>)} onCancel={() => setViewDetails(false)}>
                <div className="flex col gap-15">
                    <div className="flex row gap-4 w-90 pb-2">
                        <strong>Subject :</strong>
                        <div>{record?.subject}</div>
                    </div>
                    <div className="flex row gap-4 w-90 pb-2">
                        <strong>Grade Level :</strong>
                        <div>{record?.gradelevel}</div>
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
                        {record?.questionTypeTemplate.map((item) => {
                        return(
                            <div key={item?._id} className="border rounded-md border-dashed border-gray-300 p-4">
                                <div className="font-medium pb-5">{quesTypeOpt.filter((i) => i.value === item.type)[0].label}</div>
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
                                {/* <div>
                                    <div className="flex row gap-4">
                                        <strong>Description :</strong>
                                        <div>{item?.aiprompt}</div>
                                    </div>
                                </div> */}
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