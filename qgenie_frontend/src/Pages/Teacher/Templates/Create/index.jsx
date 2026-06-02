import React from 'react';
import { Button, Form, Input, Select} from 'antd';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { headingUpdate } from "../../../../Redux/Slices/TeacherLayoutSlice";
import { useState } from 'react';
import { Radio } from 'antd';
import { InputNumber } from 'antd';
import QuestionType from '../../../../Components/Teacher/Templates/QuestionType';

function TeacherTemplatesCreate() {
    let [questionTypes, setQuestionTypes] = useState([]);
    let [open, setOpen] = useState(false);

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

    const addQuestionType = (type) => {
        setQuestionTypes((prev) => [
        ...prev,
        {
            id: Math.floor(Math.random() * 900) + 100, // Generate a random 3-digit ID
            type,
        },
    ]);
        setOpen(!open);
    }

    const removeQuestionType = (id) => {
        setQuestionTypes((prev) =>
            prev.filter((item) => item.id !== id)
        );
    };

    let quesTypeOpt = [
        { label: "Multiple Choice Question", value: "mcq" },
        { label: "Short Answer Question", value: "saq" },
        { label: "Long Answer Question", value: "laq" },
    ];
    const Content = () => {
        return (
        <div className='p-2 w-full border border-gray-300 rounded-md flex flex-col gap-2 cursor-pointer' name="questionType">
            {quesTypeOpt.map((option) => (
                <div key={option.value} className='hover:bg-gray-50' onClick={() => addQuestionType(option)}>
                    {option.label}
                </div>
            ))}
        </div>
        )
    }

    console.log(questionTypes,open);
    
    useEffect(() => {
        dispatch(headingUpdate({heading:"Create Template", subheading:"This will help you create multiple templates"}));
    },[dispatch]);

    return (
      <div id='TeacherTemplatesCreate'>
        <div className='border border-green-100 rounded-lg p-4'>
            <Form labelCol={{ span: 5 }} labelAlign="left" wrapperCol={{ span: 20 }} layout="horizontal" className='w-11/12 flex flex-col gap-2' onFinish={(values) => console.log(values)}>
                <Form.Item name="tittle" label="Title" rules={[{ required: true }]}>
                    <Input placeholder="Enter an assessment tittle" />
                </Form.Item>
                <Form.Item name="subject" label="Subject">
                    <Input placeholder="Enter a subject" />
                </Form.Item>
                <Form.Item name="gradelevel" label="Grade Level">
                    <Select options={gradeoption} placeholder="Select an grade option" />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input.TextArea placeholder="Enter an assessment description" />
                </Form.Item>

                <div className='flex flex-col gap-2'>
                    {open && <Content />}
                    <Button onClick={() => setOpen(!open)} type='primary' ghost>Question Types</Button> 
                </div>

                <div className="flex flex-col gap-4">
                    {questionTypes.map((item) => {
                        console.log(item);
                        
                        return (
                        <div key={item.id}>
                            <Form.Item name={`questionType_${item.id}`} hidden initialValue={item.type}>
                                <Input />
                            </Form.Item> 
                            <QuestionType type={item.type} id={item.id} onRemove={removeQuestionType} />
                        </div>
                        )
                    })}
                </div>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
      </div>
    );
}

export default TeacherTemplatesCreate;