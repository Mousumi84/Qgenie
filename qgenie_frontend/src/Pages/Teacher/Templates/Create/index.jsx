import React from "react";
import { Button, Form, Input, Select } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { headingUpdate } from "../../../../Redux/Slices/TeacherLayoutSlice";
import { useState } from "react";
import { Radio } from "antd";
import { InputNumber } from "antd";
import QuestionType from "../../../../Components/Teacher/Templates/QuestionType";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

function TeacherTemplatesCreate() {
    let location = useLocation();
    let state = location.state || null;
    let isEdit = state?._id ? true : false;
    // console.log(isEdit,state)

    let [questionTypes, setQuestionTypes] = useState(state?.questionTypeTemplate || []);
    let [open, setOpen] = useState(false);

    // let randomId = Math.floor(Math.random() * 900) + 100;   // Generate a random 3-digit number

    let dispatch = useDispatch();
    let navigate = useNavigate();
  
    let gradeoption = [
        { label: "Class I", value: "Class 1" },
        { label: "Class II", value: "Class 2" },
        { label: "Class III", value: "Class 3" },
        { label: "Class IV", value: "Class 4" },
        { label: "Class V", value: "Class 5" },
        { label: "Class VI", value: "Class 6" },
        { label: "Class VII", value: "Class 7" },
        { label: "Class VIII", value: "Class 8" },
        { label: "Class IX", value: "Class 9" },
        { label: "Class X", value: "Class 10" },
        { label: "Class XI", value: "Class 11" },
        { label: "Class XII", value: "Class 12" },
    ];

    let quesTypeOpt = [
        { label: "Multiple Choice Question", value: "MCQ" },
        { label: "Multiple Select Question", value: "MSQ" },
        { label: "True / False", value: "TRUE_FALSE" },
        { label: "Fill in the Blank", value: "FILL_BLANK" },
        { label: "Short Answer Question", value: "SAQ" },
        { label: "Long Answer Question", value: "LAQ" }, 
    ];
  
    const addQuestionType = (type) => {
        setQuestionTypes((prev) => [
            ...prev,
            {
                type : type.value,
                _id: (Math.floor(Math.random() * 900) + 100).toString(),
            },
        ]);
        setOpen(!open);
    };

    const [form] = Form.useForm();
  
    const removeQuestionType = (id) => {
        console.log("remove",id);
        // setQuestionTypes((prev) => prev.filter((item) => item._id !== id));

        const removedIndex = questionTypes.findIndex(item => item._id === id);

        const updated = questionTypes.filter(item => item._id !== id);

        setQuestionTypes(updated);
    
        const values = form.getFieldValue("questionTypeTemplate") || [];
        console.log("values=>",values);
    
        values.splice(removedIndex, 1);
    
        form.setFieldsValue({questionTypeTemplate: values});
    };
  
    const Content = () => {
        return (
            <div className="p-2 w-full border border-gray-300 rounded-md flex flex-col gap-2 cursor-pointer" name="questionType">
                {quesTypeOpt.map((option) => (
                    <div key={option.value} className="hover:bg-gray-50" onClick={() => addQuestionType(option)} >
                        {option.label}
                    </div>
                ))}
            </div>
        );
    };
  
    const createTemplate = async (values) => {

        console.log(values);
        try {
            let response = await axios({
                url: `${import.meta.env.VITE_API_URL}/template/create`,
                method: "POST",
                data: values,
                headers: { Authorization: `${localStorage.getItem("teacherToken")}` }
            })

            // console.log(response);

            if(response?.data?.status == 201) {
                toast.success(response?.data?.message);
                navigate(-1);
                return;
            }

            toast.error(response?.data?.message);
        } catch (error) {
            // console.log(error);
            toast.error(error.message);
        }
    }
  
    const editTemplate = async (values) => {
        let data = form.getFieldsValue(true);
        console.log(values);

        try {
            let response = await axios({
                url: `${import.meta.env.VITE_API_URL}/template/edit/${state?._id}`,
                method: "POST",
                data: data,
                headers: { Authorization: `${localStorage.getItem("teacherToken")}` }
            })

            // console.log(response);

            if(response?.data?.status == 200) {
                toast.success(response?.data?.message);
                navigate(-1);
                return;
            }

            toast.error(response?.data?.message);
        } catch (error) {
            // console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        dispatch(headingUpdate({ heading: "Create Template", subheading: "This will help you create multiple templates"}));
    },[dispatch]);
  
    return (
      <div id="TeacherTemplatesCreate">
        <div className="border border-green-100 rounded-lg p-4">
            <Form form={form} labelCol={{ span: 5 }} labelAlign="left" wrapperCol={{ span: 20 }} layout="horizontal" className="w-11/12 flex flex-col gap-2" onFinish={isEdit ? editTemplate : createTemplate} 
            initialValues={ isEdit ? {
                title: state.title,
                subject: state.subject,
                gradelevel: state.gradelevel,
                description: state.description,
                questionTypeTemplate: state.questionTypeTemplate,
            } : {}}>
                {/* Title */}
                <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                    <Input placeholder="Enter template title" />
                </Form.Item>

                {/* Subject */}
                <Form.Item name="subject" label="Subject">
                    <Input placeholder="Enter a subject" />
                </Form.Item>

                {/* Grade Level */}
                <Form.Item name="gradelevel" label="Grade Level">
                    <Select options={gradeoption} placeholder="Select an grade option"/>
                </Form.Item>
                
                {/* Description */}
                <Form.Item name="description" label="Description">
                    <Input.TextArea placeholder="Enter template description" />
                </Form.Item>
    
                <div className="flex flex-col gap-2">
                    {open && <Content />}
                    <Button onClick={() => setOpen(!open)} type="primary" ghost>Question Types</Button>
                </div>
    
                <div className="flex flex-col gap-4">
                    {questionTypes.map((item, index) => {
                    //   console.log(item,index);   
        
                        return (
                            <div key={item?._id}>
                                <Form.Item name={["questionTypeTemplate", index, "type"]} hidden initialValue={item?.type}>
                                    <Input />
                                </Form.Item>
                                <QuestionType index={index} type={item?.type} id={item?._id} onRemove={() => {removeQuestionType(item?._id)}} />
                            </div>
                        );
                    })}
                </div>
    
                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </div>
      </div>
    );
}

export default TeacherTemplatesCreate;
