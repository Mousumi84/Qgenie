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

function TeacherAssessmentPage() {
    const [AssmData, setAssmData] = useState();
    const [viewDetails, setViewDetails] = useState(false);
    const [viewAssmId, setViewAssmId] = useState();
    const [selectedAssessment, setSelectedAssessment] = useState(null);
    const [publishedDate, setPublishedDate] = useState();
    const [dateError, setDateError] = useState("");
    const [statusPendingPopOpen, setStatusPendingPopOpen] = useState(false);
    const [statusDoneCancelPopOpen, setStatusDoneCancelPopOpen] = useState(false);

    let navigate = useNavigate();
    let dispatch = useDispatch();

    const columns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Grade Level",
            dataIndex: "gradelevel",
            key: "gradelevel",
        },
        {
            title: "Subject",
            dataIndex: "subject",
            key: "subject",
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
            title: "Status",
            dataIndex: "status", // ["Pending", "Published", "Done", "Cancel"]
            key: "status",
            render: (status, record) => {
                const statusColors = {
                    Pending: "orange",
                    Published: "#0274ff",
                    Done: "#06a506",
                    Cancel: "red",
                };
                return (
                    <span
                        style={{ color: statusColors[status] }}
                        onClick={() => {
                            setSelectedAssessment(record);

                            if (record.publishedAt) {
                                setPublishedDate(dayjs(record.publishedAt));
                            } else {
                                setPublishedDate(null);
                            }

                            setDateError("");
                            console.log(status, status == "Published ");
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
            render: (publishedAt) => {
                const date = new Date(publishedAt);

                const day = String(date.getDate()).padStart(2, "0");
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const year = String(date.getFullYear()).slice(-2);

                return publishedAt !== null ? `${day}/${month}/${year}` : "----";
            },
        },
        {
            title: "Created On",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (createdAt) => {
                const date = new Date(createdAt);

                const day = String(date.getDate()).padStart(2, "0");
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const year = String(date.getFullYear()).slice(-2);

                return `${day}/${month}/${year}`;
            },
        },
        {
            title: "Actions",
            key: "actions",
            width: "120px",
            render: (_, record) => {
                return (
                    <div className="flex flex-row gap-4">
                        <BiExpandAlt className="text-green-300" onClick={() => viewAssmDetails(record)} />
                        <MdEdit className="text-blue-300" onClick={() => navigate("/teacher/assessments/create", { state: record })} />
                        <MdDelete className="text-red-300" onClick={() => showDeleteConfirm(record)} />
                    </div>
                );
            },
        },
    ];

    const viewAssmDetails = (item) => {
        setViewDetails(!viewDetails);
        setViewAssmId(item?._id);
    };

    // Change Published Date
    const onChange = (date, dateString) => {
        console.log(date, dateString);
        setPublishedDate(date);

        if (date) {
            setDateError("");
        }
    };

    // On click of Published button
    const statusPublished = async (e) => {
        console.log(e, e.target.innerHTML);
        // console.log(publishedDate,dateError,selectedAssessment, e.target.value);

        let statusValue = e.target.innerHTML === "Publish" ? "Published" : e.target.innerHTML;

        if (statusValue === "Published" && !publishedDate) {
            setDateError("Published date is required");
            return;
        }

        try {
            let response = await axios({
                url: `${import.meta.env.VITE_API_URL}/teacher/assessment/updateStatus/${selectedAssessment._id}`,
                method: "POST",
                data: { status: statusValue, publishedAt: publishedDate },
                headers: { Authorization: `${localStorage.getItem("teacherToken")}` },
            });
            console.log(response);

            if (response?.data?.status == 200) {
                toast.success(response?.data?.message);
                fetchAssessmentData();
                setStatusPendingPopOpen(false);
                setStatusDoneCancelPopOpen(false);
                setSelectedAssessment(null);
                setPublishedDate(null);
                setDateError("");
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
        setPublishedDate(null);
        setDateError("");
    };

    // Close Status modal2
    const closeModal2 = () => {
        setStatusDoneCancelPopOpen(false);
        setSelectedAssessment(null);
        setPublishedDate(null);
        setDateError("");
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
                        url: `${import.meta.env.VITE_API_URL}/teacher/assessment/delete/${item._id}`,
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
        try {
            let response = await axios({
                url: `${import.meta.env.VITE_API_URL}/teacher/assessment/getAll`,
                method: "GET",
                headers: { Authorization: `${localStorage.getItem("teacherToken")}` },
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
        dispatch(headingUpdate({ heading: "Assessment", subheading: "Create and manage your assessments here" }));
    }, [dispatch]);

    return (
        <div id="TeacherAssessment" className="flex flex-col gap-5">
            <Button type="primary" className="w-2/12" onClick={() => navigate("/teacher/assessments/create")}>
                Create Assessment
            </Button>
            <Table columns={columns} dataSource={AssmData} rowKey="_id" />
            <Modal
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
                            Publish
                        </button>
                    </div>
                )}
            >
                <div className="flex flex-col gap-5 p-3">
                    <p>Once published, the assessment will be visible to students and cannot be edited.</p>
                    <div>
                        <span>Select Date: </span>
                        <DatePicker format="YYYY-MM-DD" onChange={onChange} value={publishedDate} />
                    </div>
                    {dateError && <div className="text-red-500 text-xs mt-1">{dateError}</div>}
                </div>
            </Modal>

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
                            Cancel
                        </button>
                        <button
                            style={{ backgroundColor: "#06a506", color: "white", width: "80px", height: "30px", outline: "1px solid #12121226", borderRadius: "5px" }}
                            onClick={(e) => statusPublished(e)}
                        >
                            Done
                        </button>
                        <button
                            style={{ backgroundColor: "#0274ff", color: "white", width: "80px", height: "30px", outline: "1px solid #12121226", borderRadius: "5px" }}
                            onClick={(e) => statusPublished(e)}
                        >
                            Publish
                        </button>
                    </div>
                )}
            >
                <div className="flex flex-col gap-5 p-3">
                    <p></p>
                    <div>
                        <span>Change Date: </span>
                        <DatePicker format="YYYY-MM-DD" onChange={onChange} value={publishedDate} />
                    </div>
                    {dateError && <div className="text-red-500 text-xs mt-1">{dateError}</div>}
                </div>
            </Modal>
            {viewDetails && <ViewAssessmentDetails id={viewAssmId} setViewDetails={setViewDetails} />}
        </div>
    );
}

export default TeacherAssessmentPage;
