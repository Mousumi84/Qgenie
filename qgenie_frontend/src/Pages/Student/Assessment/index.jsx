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
            title: "Title",
            dataIndex: "title",
            key: "title",
            fixed: "start",
        },
        {
            title: "Subject",
            dataIndex: "subject",
            key: "subject",
        },
        // {
        //     title: "Description",
        //     dataIndex: "description",
        //     key: "description",
        // },
        {
            title: "Time Allotted",
            dataIndex: "timeAllotted",
            key: "timeAllotted",
        },
        {
            title: "Total Marks",
            dataIndex: "totalMarks",
            key: "totalMarks",
        },
        {
            title: "Submission Within",
            dataIndex: "assessmentDate",
            key: "assessmentDate",
            render: (assessmentDate) => {
                let endtime = new Date(assessmentDate[1]).getTime();
                
                return (<TimeCounter endtime={endtime} />)
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
                        <BiExpandAlt className="text-green-300" onClick={() => viewAssmDetails(record)} />
                        <PiExamLight className="text-blue-300" onClick={() => navigate("", { state: record })} />
                    </div>
                );
            },
        },
    ];

    const viewAssmDetails = (item) => {
        setViewDetails(!viewDetails);
        setViewAssmId(item?._id);
    };

    // Fetch Assessmnet Details
    const fetchAssessmentData = async () => {
        try {
            let response = await axios({
                url: `${import.meta.env.VITE_API_URL}/assessment/getstudent`,
                method: "GET",
                headers: { Authorization: `${localStorage.getItem("studentToken")}` },
            });

            console.log(response);
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
