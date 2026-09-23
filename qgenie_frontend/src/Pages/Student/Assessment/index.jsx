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
import dayjs from "dayjs";

function StudentAssessment() {
    const [AssmData, setAssmData] = useState();
    const [viewDetails, setViewDetails] = useState(false);
    const [viewAssmId, setViewAssmId] = useState();
    const [assSubmissionData, setAssSubmissionData] = useState();

    let student = JSON.parse(localStorage.getItem("studentLoginDetails"));

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
                    let min = time % 60

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
            title: "Status",             //  [ "Not Submitted", "In Progress", "Submitted", "Auto Submitted", "Evaluated", "Expired" ]
            render: (record) => {
                const statusColors = {
                    "Not Submitted": "#ff6600",
                    "In Progress": "#0d00ff",
                    "Submitted": "#a02ed1",
                    "Auto Submitted": "#ffd900",
                    "Evaluated": "#22ff00",
                    "Expired": "#ff0004",
                };
                let status = assSubmissionData?.find((item) => item?.assessmentId === record?._id) || { status: new Date(record?.assessmentDate[1]).getTime() < Date.now() ? "Expired" : "Not Submitted" };

                return (
                    <span style={{ color: statusColors[status.status] }}>
                        {status.status}
                    </span>
                )
            }
        },
        {
            title: "Time Remaining",
            dataIndex: "assessmentDate",
            key: "assessmentDate",
            render: (assessmentDate, record) => {
                let status = assSubmissionData?.find((item) => item?.assessmentId === record?._id) || { status: "Not Submitted" };
                // let status = assSubmissionData?.find((item) => item?.assessmentId === record?._id) || { status: new Date(record?.assessmentDate[1]).getTime() < Date.now() ? "Expired" : "Not Submitted" };

                let endtime = new Date(assessmentDate[1]).getTime();

                return <>
                    {(status.status === "Submitted" || status.status === "Auto Submitted") && <span className={"text-[10px] rounded-md bg-orange-100 text-orange-500 p-1"}>{`Submitted ${dayjs(status.submittedAt).format("DD/MM/YY")}`}</span>}
                    {status.status === "Not Submitted" && <TimeCounter style={"text-[10px] rounded-md bg-red-100 text-red-500 p-1"} endtime={endtime} />}
                </>;
            },
        },
        {
            title: "Actions",
            fixed: "end",
            key: "actions",
            width: "120px",
            render: (_, record) => {
                // let status = assSubmissionData?.find((item) => item?.assessmentId === record?._id) || { status: "Not Submitted" };
                let status = assSubmissionData?.find((item) => item?.assessmentId === record?._id) || { status: new Date(record?.assessmentDate[1]).getTime() < Date.now() ? "Expired" : "Not Submitted" };

                return (
                    <div className="flex flex-row gap-4">
                        <BiExpandAlt className="text-green-500" onClick={() => viewAssmDetails(record)} />
                        {/* {new Date(record?.assessmentDate[1]).getTime() > Date.now()  && <PiExamLight className="text-yellow-500" size={18} onClick={() => attemptAssessment(record)} />} */}
                        {/* {( status.status === "Submitted" && status.status === "Auto Submitted" && status.status === "In Progress" || status.status === "Evaluated" || status.status === "Expired" ) && <PiExamLight className="text-yellow-500" size={18} onClick={() => attemptAssessment(record)} />} */}
                        { status.status === "Not Submitted" && <PiExamLight className="text-yellow-500" size={18} onClick={() => attemptAssessment(record)} />}
                    </div>
                );
            },
        },
    ];

    const viewAssmDetails = (item) => {
        setViewDetails(!viewDetails);
        setViewAssmId(item?._id);
    };

    const getIPAddress = async () => {
        try {
            const response = await axios.get("https://api.ipify.org?format=json");

            return response.data.ip;
        } catch (error) {
            console.error("Unable to get IP address:", error);
            return null;
        }
    };

    const attemptAssessment = async (item) => {

        console.log("Attempting assessment:", item);

        const userAgent = navigator.userAgent;

        let deviceType = "Desktop";

        if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
            deviceType = "Tablet";
        } else if (/mobile|android|iphone|ipod/i.test(userAgent)) {
            deviceType = "Mobile";
        }

        let browser = "Unknown";

        if (/edg/i.test(userAgent)) {
            browser = "Microsoft Edge";
        } else if (/opr|opera/i.test(userAgent)) {
            browser = "Opera";
        } else if (/firefox/i.test(userAgent)) {
            browser = "Mozilla Firefox";
        } else if (/chrome/i.test(userAgent)) {
            browser = "Google Chrome";
        } else if (/safari/i.test(userAgent)) {
            browser = "Safari";
        }

        const ipAddress = await getIPAddress();

        try {
            const response = await axios({
                url: `${import.meta.env.VITE_API_URL}/submission/startExam`,
                method: "POST",
                headers: { Authorization: `${localStorage.getItem("studentToken")}` },
                data: {
                    assessmentId: item?._id,
                    studentId: student?._id,
                    totalMarks: item?.totalMarks,
                    status: "In Progress",
                    startedAt: new Date().toISOString(),
                    ipAddress: ipAddress,
                    deviceType: deviceType,
                    browser: browser,
                    autoSubmitted: false,
                },
            });

            if (response?.data?.status == 200) {
                navigate("/student/exam", { state: { id: item._id, assessmentStartId: response.data.id } });
                document.documentElement.requestFullscreen();
                toast.success(response?.data?.message);
                return;
            }

            toast.error(response?.data?.message);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
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

    const fetchStudentAssessmentSubmissionData = async () => {
        try {
            let response = await axios({
                url: `${import.meta.env.VITE_API_URL}/submission/getAll/studentAssessmentStatus/${student?._id}`,
                method: "GET",
                headers: { Authorization: `${localStorage.getItem("studentToken")}` },
            });

            setAssSubmissionData(response?.data?.data);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchAssessmentData();
        fetchStudentAssessmentSubmissionData();
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
