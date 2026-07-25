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

function StudentAssessment() {
	const [AssmData, setAssmData] = useState();

    let navigate = useNavigate();
    let dispatch = useDispatch();

    const columns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Subject",
            dataIndex: "subject",
            key: "subject",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
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
			title: "Actions",
			key: "actions",
			width: "120px",
			render: (_, record) => {
				return (
					<div className="flex flex-row gap-4">
						<PiExamLight className="text-blue-300" onClick={() => navigate("", { state: record })} />
					</div>
				);
			},
		},
    ];

    // Fetch Assessmnet Details
    const fetchAssessmentData = async () => {
		console.log(JSON.parse(localStorage.getItem("studentLoginDetails")).gradelevel )
        try {
            let response = await axios({
                url: `${import.meta.env.VITE_API_URL}/assessment/getAll/studentAssessment`,
                method: "GET",
                headers: { Authorization: `${localStorage.getItem("studentToken")}` },
            });

            // console.log(response);
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
            <Table dataSource={AssmData} columns={columns} rowKey="_id" />
        </div>
    );
}

export default StudentAssessment;
