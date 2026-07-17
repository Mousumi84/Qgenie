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


    let {confirm} = Modal;

function TeacherAssessmentPage() {
    const [AssmData, setAssmData] = useState();
    const [viewDetails, setViewDetails] = useState(false);
    const [viewAssmId, setViewAssmId] = useState();
    const [selectedAssessment, setSelectedAssessment] = useState(null);
    const [publishedDate, setPublishedDate] = useState();
    const [dateError, setDateError] = useState("");
    const [statusPopOpen, setStatusPopOpen] = useState(false);

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
            dataIndex: "status",    // ["Pending", "Published", "Done", "Cancel"]
            key: "status",
            render: (status,record) => {
                const statusColors = {
                    Pending: "orange",
                    Published: "blue",
                    Done: "green",
                    Cancel: "red",
                };
                return <span style={{ color: statusColors[status] }} onClick={() => {
                    setSelectedAssessment(record);

                    if (record.publishedAt) {
                        setPublishedDate(dayjs(record.publishedAt));
                    } else {
                        setPublishedDate(null);
                    }

                    setDateError("");
                    setStatusPopOpen(true);
                }}>{status}</span>;   
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

    const onChange = (date, dateString) => {
        console.log(date, dateString);
        setPublishedDate(date);

        if (date) {
            setDateError("");
        }
    };

    const statusPublished = async () => {
        console.log(publishedDate,dateError,selectedAssessment);
        
        if(!publishedDate) {
            setDateError("Published date is required");
            return;
        }

        try {
            let response = await axios({
                url: `${import.meta.env.VITE_API_URL}/assessment/updateStatus/${selectedAssessment._id}`,
                method: "POST",
                data: { status: "Published", publishedAt: publishedDate },
                headers: { Authorization: `${localStorage.getItem("teacherToken")}` },
            });
            console.log(response);

            if (response?.data?.status == 200) {
                toast.success(response?.data?.message);
                fetchAssessmentData();
                setStatusPopOpen(false);
                setSelectedAssessment(null);
                setPublishedDate(null);
                setDateError("");
            }else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } 
    }

    const closeModal = () => {
        setStatusPopOpen(false);
        setSelectedAssessment(null);
        setPublishedDate(null);
        setDateError("");
    };

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

    const fetchAssessmentData = async () => {
        try {
            let response = await axios({
                url: `${import.meta.env.VITE_API_URL}/assessment/getAll`,
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
            <Button type="primary" className="w-2/12" onClick={() => navigate("/teacher/assessments/create")}>Create Assessment</Button>
            <Table columns={columns} dataSource={AssmData} rowKey="_id" />
            <Modal
                closeIcon
                title={ <div className="flex items-center gap-2">
                            <TbExclamationCircleFilled style={{ color: "#faad14", fontSize: 20 }} />
                            <span>Are you sure you want to publish this assessment?</span>
                        </div>}
                open={statusPopOpen}
                onOk={statusPublished}
                okText="Publish"
                okType="primary"
                cancelText="Cancel"
                onCancel={closeModal}
            >
                <div className="flex flex-col gap-5 p-3">
                    <p>Once published, the assessment will be visible to students and cannot be edited.</p>
                    <div>
                        <span>Select Date: </span>
                        <DatePicker format='YYYY-MM-DD' onChange={onChange} value={publishedDate}/>
                    </div>
                    {dateError && ( <div className="text-red-500 text-xs mt-1">{dateError}</div>)}
                </div>
            </Modal>
            {viewDetails && <ViewAssessmentDetails id={viewAssmId} setViewDetails={setViewDetails} />}
        </div>
    );
}

export default TeacherAssessmentPage;