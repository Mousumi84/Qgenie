import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { headingUpdate } from "../../../Redux/Slices/StudentLayoutSlice";
import { Table } from "antd";

function StudentSubmission() {
    let dispatch = useDispatch();

    const columns = [
        {
          title: 'Assessment',
          dataIndex: 'assessment',
          key: 'assessment',
        },
        {
          title: 'Subject',
          dataIndex: 'subject',
          key: 'subject',
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
          title: 'Score',
          dataIndex: 'score',
          key: 'score',
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
        <div id="StudentSubmission">
            <Table dataSource={[]} columns={columns} />
        </div>
    )
}

export default StudentSubmission;