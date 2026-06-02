import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { headingUpdate } from "../../../Redux/Slices/TeacherLayoutSlice";
import { Table } from "antd";

function TeacherSubmission() {
    let dispatch = useDispatch();

    const columns = [
        {
          title: 'Assessment',
          dataIndex: 'assessment',
          key: 'assessment',
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
        },
        {
          title: 'Started At',
          dataIndex: 'startedAt',
          key: 'startedAt',
        },
        {
          title: 'Submitted At',
          dataIndex: 'submittedAt',
          key: 'submittedAt',
        },
        {
          title: 'Actions',
          dataIndex: 'actions',
          key: 'actions',
        },
    ];
    
    useEffect(() => {
        dispatch(headingUpdate({heading:"Submission", subheading:"View all submissions here"}));
    },[dispatch]);

    return (
        <div id="TeacherSubmission">
            <Table dataSource={[]} columns={columns} />
        </div>
    )
}



export default TeacherSubmission;