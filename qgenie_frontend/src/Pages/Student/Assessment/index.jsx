import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { headingUpdate } from "../../../Redux/Slices/StudentLayoutSlice";
import { Table } from "antd";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { PiExamLight } from "react-icons/pi";
import { BiExpandAlt } from "react-icons/bi";
import ViewAssessmentBrief from "../../../Components/Student/Assessments/ViewAssessmentBrief";
import TimeCounter from "../../../Components/Common/TimeCounter";

function StudentAssessment() {
    const [AssmData, setAssmData] = useState();
    const [viewDetails, setViewDetails] = useState(false);
    const [viewAssmId, setViewAssmId] = useState();

    let navigate = useNavigate();
    let dispatch = useDispatch();

    const columns = [
        {
            title: "Assessment",
            dataIndex: "title",
            key: "title",
            fixed: "start",
        },
        {
            title: "Subject",
            dataIndex: "subject",
            key: "subject",
        },
        {
            title: "Teacher",
            dataIndex: ["createdBy", "name"],
            key: "teacher",
        },
        {
            title: "Duration",
            dataIndex: "timeAllotted",
            key: "timeAllotted",
            render: (time) => {
                if (time > 60) {
                    let hr = Math.floor(time / 60);
                    let min = time % 60;

                    return `${hr} h ${min} mins`;
                }

                return `${time} mins`;
            },
        },
        {
            title: "Marks",
            dataIndex: "totalMarks",
            key: "totalMarks",
        },
        {
            title: "Status", //  [ "In Progress", "Submitted", "Evaluated", "Auto Submitted", "Not Attempted" ]
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Time Remaining",
            dataIndex: "assessmentDate",
            key: "assessmentDate",
            render: (assessmentDate) => {
                let endtime = new Date(assessmentDate[1]).getTime();

                return <TimeCounter style={"text-[10px] border border-red-100 bg-red-100 p-1"} endtime={endtime} />;
            },
        },
        {
            title: "Actions",
            fixed: "end",
            key: "actions",
            width: "120px",
            render: (_, record) => {
                return (
                    <div className="flex flex-row gap-4">
                        <BiExpandAlt className="text-green-500" onClick={() => viewAssmDetails(record)} />
                        {new Date(record?.assessmentDate[1]).getTime() > Date.now() && <PiExamLight className="text-yellow-500" size={18} onClick={() => attemptAssessment(record)} />}
                    </div>
                );
            },
        },
    ];

    const viewAssmDetails = (item) => {
        setViewDetails(!viewDetails);
        setViewAssmId(item?._id);
    };

    const attemptAssessment = (item) => {
        navigate("/student/exam", { state: item._id });
        document.documentElement.requestFullscreen();
    };

    // Fetch Assessmnet Details
    const fetchAssessmentData = async () => {
        try {
            let response = await axios({
                url: `${import.meta.env.VITE_API_URL}/assessment/getStudent`,
                method: "GET",
                headers: { Authorization: `${localStorage.getItem("studentToken")}` },
            });

            setAssmData(response?.data?.data);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchAssessmentData();
    }, []);

    useEffect(() => {
        dispatch(headingUpdate({ heading: "Assessment", subheading: "Give and manage your assessments here" }));
    }, [dispatch]);

    return (
        <div id="StudentAssessment">
            <Table scroll={{ x: "max-content" }} dataSource={AssmData} columns={columns} rowKey="_id" />
            {viewDetails && <ViewAssessmentBrief id={viewAssmId} setViewDetails={setViewDetails} />}
        </div>
    );
}

export default StudentAssessment;
