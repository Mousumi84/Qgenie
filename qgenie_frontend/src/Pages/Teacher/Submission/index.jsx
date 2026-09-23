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
            title: "Status",             //  [ "Not Submitted", "In Progress", "Submitted", "Auto Submitted", "Evaluated", "Expired" ]
            dataIndex: "status",
            key: "status",
            render: (record) => {
                const statusColors = {
                    "Not Submitted": "#ff6600",
                    "In Progress": "#0d00ff",
                    "Submitted": "#a02ed1",
                    "Auto Submitted": "#ffd900",
                    "Evaluated": "#22ff00",
                    "Expired": "#ff0004",
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
