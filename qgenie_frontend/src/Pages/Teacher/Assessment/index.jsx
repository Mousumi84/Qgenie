import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { headingUpdate } from "../../../Redux/Slices/TeacherLayoutSlice";
import { Button, Table, Modal, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BiExpandAlt } from "react-icons/bi";
import { MdDelete, MdEdit } from "react-icons/md";
import ViewAssessmentDetails from "../../../Components/Teacher/Assessments/ViewAssessment";
import dayjs from "dayjs";
import { TbExclamationCircleFilled } from "react-icons/tb";

let { confirm } = Modal;
let { RangePicker } = DatePicker;

function TeacherAssessmentPage() {
    const [assRecord, setAssRecord] = useState();
    const [viewDetails, setViewDetails] = useState(false);
    const [viewAssmId, setViewAssmId] = useState();
    const [selectedAssessment, setSelectedAssessment] = useState(null);
    const [assDate, setAssDate] = useState(null);
    const [assDateError, setAssDateError] = useState("");
    const [statusPendingPopOpen, setStatusPendingPopOpen] = useState(false);
    const [statusDoneCancelPopOpen, setStatusDoneCancelPopOpen] = useState(false);

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
            title: "Grade",
            dataIndex: "gradelevel",
            key: "gradelevel",
        },
        {
            title: "Subject",
            dataIndex: "subject",
            key: "subject",
        },
        {
            title: "Duration",
            dataIndex: "timeAllotted",
            key: "timeAllotted",
        },
        {
            title: "Marks",
            dataIndex: "totalMarks",
            key: "totalMarks",
        },
        {
            title: "Available From",
            dataIndex: "assessmentDate",
            key: "assessmentDate",
            render: (assessmentDate, record) => {
                if (!assessmentDate || assessmentDate.length === 0) {
                    return "----";
                }
                return dayjs(record.assessmentDate[0]).format("DD/MM/YY hh:mm A");
            },
        },
        {
            title: "Available Until",
            dataIndex: "assessmentDate",
            key: "assessmentDate",
            render: (assessmentDate, record) => {
                if (!assessmentDate || assessmentDate.length === 0) {
                    return "----";
                }

                return dayjs(record.assessmentDate[1]).format("DD/MM/YY hh:mm A");
            },
        },
        {
            title: "Attempts",
            dataIndex: "attempts",
            key: "attempts",
        },
        // {
        //     title: "Average Score",
        //     dataIndex: "attempts",
        //     key: "attempts",
        // },
        {
            title: "Status",
            dataIndex: "status", // ["Pending", "Published", "Completed", "Cancelled"]
            key: "status",
            render: (status, record) => {
                const statusColors = {
                    Pending: "orange",
                    Published: "#0274ff",
                    Completed: "#06a506",
                    Cancelled: "red",
                };
                return (
                    <span
                        style={{ color: statusColors[status] }}
                        onClick={() => {
                            setSelectedAssessment(record);
                            if (record.publishedAt) {
                                setAssDate([dayjs(record.assessmentDate[0]), dayjs(record.assessmentDate[1])]);
                            } else {
                                setAssDate(null);
                            }

                            setAssDateError("");
                            status == "Published" ? setStatusDoneCancelPopOpen(true) : setStatusPendingPopOpen(true);
                        }}
                    >
                        {status}
                    </span>
                );
            },
        },
        {
            title: "Published On",
            dataIndex: "publishedAt",
            key: "publishedAt",
            render: (publishedAt) => dayjs(publishedAt).format("DD/MM/YY hh:mm A"),
        },
        {
            title: "Created On",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (createdAt) => dayjs(createdAt).format("DD/MM/YY"),
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
                        <MdEdit className="text-blue-400" onClick={() => navigate("/teacher/assessments/create", { state: record })} />
                        <MdDelete className="text-red-400" onClick={() => showDeleteConfirm(record)} />
                    </div>
                );
            },
        },
    ];

    const viewAssmDetails = (item) => {
        setViewDetails(!viewDetails);
        setViewAssmId(item?._id);
    };

    const assessmentChange = (dates) => {
        console.log(dates);
        setAssDate(dates);

        if (dates) {
            setAssDateError("");
        }
    };

    // On click of Published button
    const statusPublished = async (e) => {
        let statusValue = e.target.innerHTML;
        const now = new Date();

        if (statusValue === "Published" && !assDate) {
            setAssDateError("Select Assessment Start & End Dates");
            return;
        }

        try {
            let response = await axios({
                url: `${import.meta.env.VITE_API_URL}/assessment/updateStatus/${selectedAssessment._id}`,
                method: "POST",
                data: {
                    status: statusValue,
                    publishedAt: statusValue === "Published" ? now : null,
                    assessmentDate: assDate && assDate.length === 2 ? assDate : null,
                },
                headers: { Authorization: `${localStorage.getItem("teacherToken")}` },
            });
            console.log(response);

            if (response?.data?.status == 200) {
                toast.success(response?.data?.message);
                fetchAssessmentData();
                setStatusPendingPopOpen(false);
                setStatusDoneCancelPopOpen(false);
                setSelectedAssessment(null);
                setAssDate(null);
                setAssDateError("");
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // Close Status modal
    const closeModal = () => {
        setStatusPendingPopOpen(false);
        setSelectedAssessment(null);
        setAssDate(null);
        setAssDateError("");
    };

    // Close Status modal2
    const closeModal2 = () => {
        setStatusDoneCancelPopOpen(false);
        setSelectedAssessment(null);
        setAssDate(null);
        setAssDateError("");
    };

    // Delete Assessment
    const showDeleteConfirm = (item) => {
        confirm({
            title: "Are you sure you want to delete this assessment?",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            async onOk() {
                try {
                    let response = await axios({
                        url: `${import.meta.env.VITE_API_URL}/assessment/delete/${item._id}`,
                        method: "POST",
                        headers: { Authorization: `${localStorage.getItem("teacherToken")}` },
                    });

                    console.log(response);

                    if (response?.data?.status == 200) {
                        toast.success(response?.data?.message);
                        fetchAssessmentData();
                        return;
                    }

                    toast.error(response?.data?.message);
                } catch (error) {
                    console.log(error);
                    toast.error(error.message);
                }
            },
        });
    };

    // Fetch Assessmnet Details
    const fetchAssessmentData = async () => {
        let teacherUsername = JSON.parse(localStorage.getItem("teacherLoginDetails")).username;

        try {
            let response = await axios({
                url: `${import.meta.env.VITE_API_URL}/assessment/getTeacher/${teacherUsername}`,
                method: "GET",
                headers: { Authorization: `${localStorage.getItem("teacherToken")}` },
            });

            // console.log(response);
            setAssRecord(response?.data?.data);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchAssessmentData();
    }, []);

    useEffect(() => {
        dispatch(headingUpdate({ heading: "Assessment", subheading: "Create and manage your assessments here" }));
    }, [dispatch]);

    return (
        <div id="TeacherAssessment" className="flex flex-col gap-5">
            <Button type="primary" className="w-2/12" onClick={() => navigate("/teacher/assessments/create")}>
                Create Assessment
            </Button>
            <Table scroll={{ x: "max-content" }} columns={columns} dataSource={assRecord} rowKey="_id" />

            {/* Modal 1 */}
            <Modal
                width={600}
                title={
                    <div className="flex items-center gap-2">
                        <TbExclamationCircleFilled style={{ color: "#faad14", fontSize: 20 }} />
                        <span>Are you sure you want to publish this assessment?</span>
                    </div>
                }
                open={statusPendingPopOpen}
                onCancel={closeModal}
                footer={() => (
                    <div className="flex flex-row-reverse gap-2">
                        <button style={{ width: "80px", height: "30px", outline: "1px solid #12121226", borderRadius: "5px" }} onClick={closeModal}>
                            Close
                        </button>
                        <button
                            style={{ backgroundColor: "#0274ff", color: "white", width: "80px", height: "30px", outline: "1px solid #12121226", borderRadius: "5px" }}
                            onClick={(e) => statusPublished(e)}
                        >
                            Published
                        </button>
                    </div>
                )}
            >
                <div className="flex flex-col gap-5 p-3">
                    <p>Once published, the assessment will be visible to students.</p>
                    <div>
                        <span>Assessment: </span>
                        <RangePicker showTime onChange={assessmentChange} value={assDate} />
                        {assDateError && <div className="text-red-500 text-xs pl-30">{assDateError}</div>}
                    </div>
                </div>
            </Modal>

            {/* Modal 2 */}
            <Modal
                width={600}
                title={
                    <div className="flex items-center gap-2">
                        <TbExclamationCircleFilled style={{ color: "#faad14", fontSize: 20 }} />
                        <span>Are you sure you want to change the status of this assessment?</span>
                    </div>
                }
                open={statusDoneCancelPopOpen}
                onCancel={closeModal2}
                footer={() => (
                    <div className="flex flex-row-reverse gap-2">
                        <button style={{ width: "80px", height: "30px", outline: "1px solid #12121226", borderRadius: "5px" }} onClick={closeModal2}>
                            Close
                        </button>
                        <button
                            style={{ backgroundColor: "red", color: "white", width: "80px", height: "30px", outline: "1px solid #12121226", borderRadius: "5px" }}
                            onClick={(e) => statusPublished(e)}
                        >
                            Cancelled
                        </button>
                        <button
                            style={{ backgroundColor: "#06a506", color: "white", width: "80px", height: "30px", outline: "1px solid #12121226", borderRadius: "5px" }}
                            onClick={(e) => statusPublished(e)}
                        >
                            Completed
                        </button>
                        <button
                            style={{ backgroundColor: "#0274ff", color: "white", width: "80px", height: "30px", outline: "1px solid #12121226", borderRadius: "5px" }}
                            onClick={(e) => statusPublished(e)}
                        >
                            Published
                        </button>
                    </div>
                )}
            >
                <div className="flex flex-col gap-5 p-3">
                    <p></p>
                    <div>
                        <span>Change Dates: </span>
                        <RangePicker showTime onChange={assessmentChange} value={assDate} />
                        {assDateError && <div className="text-red-500 text-xs pl-30">{assDateError}</div>}
                    </div>
                </div>
            </Modal>
            {viewDetails && <ViewAssessmentDetails id={viewAssmId} setViewDetails={setViewDetails} />}
        </div>
    );
}

export default TeacherAssessmentPage;
