import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { headingUpdate } from "../../../Redux/Slices/TeacherLayoutSlice";
import { Button, Table } from "antd";
import { useNavigate } from "react-router-dom";

function TeacherAssessment() {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Template",
      dataIndex: "template",
      key: "template",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  useEffect(() => {
    dispatch( headingUpdate({ heading: "Assessment", subheading: "Create and manage your assessments here"}));
  }, [dispatch]);

  return (
    <div id="TeacherAssessment" className="flex flex-col gap-5">
      <Button
        type="primary"
        className="w-2/12"
        onClick={() => navigate("/teacher/assessments/create")}
      >
        Create Assessment
      </Button>
      <Table dataSource={[]} columns={columns} />
    </div>
  );
}

export default TeacherAssessment;
