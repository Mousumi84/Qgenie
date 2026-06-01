import React from 'react';
import { Button, Form, Input, Select, Popover} from 'antd';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { headingUpdate } from "../../../../Redux/Slices/TeacherLayoutSlice";
import { useState } from 'react';

function TeacherTemplatesCreate() {
    let [qType, setQType] = useState();

    let dispatch = useDispatch();
    let gradeoption = [
        { label: "Class I", value: "class 1" },
        { label: "Class II", value: "class 2" },
        { label: "Class III", value: "class 3" },
        { label: "Class IV", value: "class 4" },
        { label: "Class V", value: "class 5" },
        { label: "Class VI", value: "class 6" },
        { label: "Class VII", value: "class 7" },
        { label: "Class VIII", value: "class 8" },
        { label: "Class IX", value: "class 9" },
        { label: "Class X", value: "class 10" },
        { label: "Class XI", value: "class 11" },
        { label: "Class XII", value: "class 12" },
    ];
    const content = (
    <div onClick={(e) => setQType(e.target?.__reactProps$64shsqux3gd?.value)}>
        <p value="mcq">Multiple Choice Question</p>
        <p value="saq">Short Answer Question</p>
        <p value="laq">Long Answer Question</p>
    </div>
    );
    // const content1 = [
    //     { label: "Multiple Choice Question", value: "Multiple Choice Question" },
    //     { label: "Short Answer Question", value: "Short Answer Question" },
    //     { label: "Long Answer Question", value: "Long Answer Question" },
    // ];

    console.log(qType);
    
    useEffect(() => {
        dispatch(headingUpdate({heading:"Create Template", subheading:"This will help you create multiple templates"}));
    },[dispatch]);

    return (
      <div id='TeacherTemplatesCreate'>
        <div className='border border-green-100 rounded-lg p-4'>
            <Form labelCol={{ span: 5 }} labelAlign="left" wrapperCol={{ span: 20 }} layout="horizontal" style={{ maxWidth: 1000 }}>
                <Form.Item name="tittle" label="Title" rules={[{ required: true }]}>
                    <Input placeholder="Enter an assessment tittle" />
                </Form.Item>
                <Form.Item name="subject" label="Subject">
                    <Input placeholder="Enter a subject" />
                </Form.Item>
                <Form.Item name="gradelevel" label="Grade Level">
                    <Select options={gradeoption} placeholder="Select an template option" />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input.TextArea placeholder="Enter an assessment description" />
                </Form.Item>
                <Popover content={content} title="Question Types" trigger="click">
                    <Button>Question Types</Button>
                </Popover>
                {/* <Select options={content1} defaultValue="Question Type" className='w-10/12'/> */}

                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </div>
      </div>
    );
}

export default TeacherTemplatesCreate;