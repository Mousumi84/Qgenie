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

function StudentAssessment() {
	const [AssmData, setAssmData] = useState();
    const [viewDetails, setViewDetails] = useState(false);
    const [viewAssmId, setViewAssmId] = useState();

    let navigate = useNavigate();
    let dispatch = useDispatch();

// {
//     "createdBy": {
//         "name": "Teacher",
//         "username": "T5691673"
//     },
//     "_id": "6a6739c1d9e6128fc38eeeae",
//     "title": "Math Exam - CA1",
//     "subject": "Math",
//     "gradelevel": "Class 2",
//     "publishedAt": "2026-07-29T18:30:00.000Z",
//     "totalMarks": 10,
//     "timeAllotted": 15,
//     "lastDateAt": "2026-07-29T18:30:00.000Z"
// }

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
        // {
        //     title: "Description",
        //     dataIndex: "description",
        //     key: "description",
        // },
        {
            title: "Published On",
            dataIndex: "publishedAt",
            key: "publishedAt",
            render: (publishedAt) => {
                const date = new Date(publishedAt);

                const day = String(date.getDate()).padStart(2, "0");
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const year = String(date.getFullYear()).slice(-2);

                return publishedAt !== null ? `${day}/${month}/${year}` : "----";
            },
        },
        {
            title: "Last Date",
            dataIndex: "lastDateAt",
            key: "lastDateAt",
            render: (lastDateAt) => {
                const date = new Date(lastDateAt);

                const day = String(date.getDate()).padStart(2, "0");
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const year = String(date.getFullYear()).slice(-2);

                return lastDateAt !== null ? `${day}/${month}/${year}` : "----";
            },
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
            <Table dataSource={AssmData} columns={columns} rowKey="_id" />
            {viewDetails && <ViewAssessmentBrief id={viewAssmId} setViewDetails={setViewDetails} />}
        </div>
    );
}

export default StudentAssessment;
