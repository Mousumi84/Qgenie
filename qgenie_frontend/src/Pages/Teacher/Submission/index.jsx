import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { headingUpdate } from "../../../Redux/Slices/TeacherLayoutSlice";
import { Table } from "antd";

function TeacherSubmission() {

    let dispatch = useDispatch();

    const columns = [
        {
            title: "Student",
            dataIndex: "assessment",
            key: "assessment",
        },
        {
            title: "Assessment",
            dataIndex: "assessment",
            key: "assessment",
        },
        {
            title: "Grade",
            dataIndex: "gradelevel",
            key: "gradelevel",
        },
        {
            title: "Submitted On",
            dataIndex: "submittedAt",
            key: "submittedAt",
        },
        {
            title: "Duration Used",
            dataIndex: "",
            key: "durationUsed",
        },
        {
            title: "Marks",
            dataIndex: "marks",
            key: "marks",
        },
        {
            title: "Status",               // [ "In Progress", "Submitted", "Evaluated", "Auto Submitted", "Not Attempted" ],
            dataIndex: "status",
            key: "status",
            render: (status, record) => {
                const statusColors = {
                    "Submitted": "orange",
                    "In Progress": "#0274ff",
                    "Evaluated": "#06a506",
                    "Auto Submitted": "#fff700",
                    "Not Attempted": "#ff0000",
                };
                console.log("record", record);
                return (
                    <span style={{ color: statusColors[status] }}>{status}</span>
                );
            },
        },
        {
            title: "Started At",
            dataIndex: "startedAt",
            key: "startedAt",
        },
        {
            title: "Actions",
            fixed: "end",
            key: "actions",
            width: "120px",
            render: () => {
                return (
                    <div className="flex flex-row gap-4">
                        <MdOutlineModeEditOutline />
                        <MdOutlineDeleteOutline />
                    </div>
                );
            },
        },
    ];

    useEffect(() => {
        dispatch(headingUpdate({ heading: "Submission", subheading: "View all submissions here" }));
    }, [dispatch]);

    return (
        <div id="TeacherSubmission">
            <Table scroll={{ x: "max-content" }} dataSource={[]} columns={columns} />
        </div>
    );
}

export default TeacherSubmission;
