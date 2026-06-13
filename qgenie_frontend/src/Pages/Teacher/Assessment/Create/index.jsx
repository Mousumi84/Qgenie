import React from "react";
import { Button, Input, Form, Select } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { headingUpdate } from "../../../../Redux/Slices/TeacherLayoutSlice";


function TeacherAssessmentCreate() {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      headingUpdate({
        heading: "Create Assessment",
        subheading: "This will help you create multiple assesments",
      }),
    );
  }, [dispatch]);

  return (
    <div id="TeacherAssessmentCreate">
      <div className="border border-green-100 rounded-lg p-4">
        <Form labelCol={{ span: 5 }} labelAlign="left" wrapperCol={{ span: 20 }} layout="horizontal" style={{ maxWidth: 1000 }} >
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input placeholder="Enter an assessment title" />
          </Form.Item>
          <Form.Item name="template" label="Template">
            <Select options={[{ label: "Demo", value: "demo" }]} placeholder="Select an template option" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea placeholder="Enter an assessment description" />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default TeacherAssessmentCreate;
