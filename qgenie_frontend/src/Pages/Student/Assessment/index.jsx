import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { headingUpdate } from "../../../Redux/Slices/StudentLayoutSlice";
import { Table } from "antd";

function StudentAssessment() {
  let dispatch = useDispatch();

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  useEffect(() => {
    dispatch(
      headingUpdate({
        heading: "Assessment",
        subheading: "Give and manage your assessments here",
      }),
    );
  }, [dispatch]);

  return (
    <div id="StudentAssessment">
      <Table dataSource={[]} columns={columns} />
    </div>
  );
}

export default StudentAssessment;
