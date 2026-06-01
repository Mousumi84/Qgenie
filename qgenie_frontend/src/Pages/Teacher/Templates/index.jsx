import { useDispatch } from "react-redux";
import { headingUpdate } from "../../../Redux/Slices/TeacherLayoutSlice";
import { useEffect } from "react";
import { Button, Table } from "antd";
import { useNavigate } from "react-router-dom";

function TeacherTemplatesPage() {
    let navigate = useNavigate();
    let dispatch = useDispatch();

    const columns = [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: 'Subject',
          dataIndex: 'subject',
          key: 'subject',
        },
        {
          title: 'Grade Level',
          dataIndex: 'grade level',
          key: 'grade level',
        },
        {
          title: 'Actions',
          dataIndex: 'actions',
          key: 'actions',
        },
    ];
    
    useEffect(() => {
        dispatch(headingUpdate({heading:"Templates", subheading:"This is the place where you can manage your templates"}));
    },[dispatch]);

    return (
        <div id="TeacherTemplates">
            <Button type="primary" className="w-2/12" onClick={() => navigate('/teacher/templates/create')}>Create Template</Button>
            <Table dataSource={[]} columns={columns} />
        </div>
    )
}

export default TeacherTemplatesPage;