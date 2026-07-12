import React from "react";
import { Button, Input, Form, Select, Radio } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { headingUpdate } from "../../../../Redux/Slices/TeacherLayoutSlice";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import MCQQuestions from "../../../../Components/Teacher/Assessments/MCQQuestions.jsx";
import MSQQuestions from "../../../../Components/Teacher/Assessments/MSQQuestions.jsx";
import TFQQuestions from "../../../../Components/Teacher/Assessments/TFQuestions.jsx";
import FUQuestions from "../../../../Components/Teacher/Assessments/FillUpQuestions.jsx";
import SAQQuestions from "../../../../Components/Teacher/Assessments/SAQQuestions.jsx";
import LAQQuestions from "../../../../Components/Teacher/Assessments/LAQQuestions.jsx";

function TeacherAssessmentCreate() {
    let location = useLocation();
    let state = location.state || null;
    let isEdit = state?._id ? true : false;

    let [tempDropdownOptions, setTempDropdownOptions] = useState([]);
    let [tempSelect, setTempSelect] = useState();

    let navigate = useNavigate();
    let dispatch = useDispatch();
  
    const templateDropdown = async () => {
        try {
            let response = await axios({
                url: `${import.meta.env.VITE_API_URL}/template/getAll`,
                method: "GET",
                headers: { Authorization: `${localStorage.getItem("teacherToken")}` }
            });
            
            let opt = [];
            response.data.data.map((item) => {
                opt.push({label: item.title, value: item._id});
            })

            console.log(opt)
            setTempDropdownOptions(opt);
          
        } catch (error) {
            console.log(error);
        }
    }

    const selectTempFun = async (id) => {
        console.log(id);
        try {
           let response = await axios({
                url: `${import.meta.env.VITE_API_URL}/template/get/${id}`,
                method: "GET",
                headers: { Authorization: `${localStorage.getItem("teacherToken")}` }
            });

            setTempSelect(response.data.data);
        } catch (error) {
            console.log(error);
        }

    }

    const createAssessment = async (values) => {
        let totalMarks = 0;

        values.questions.map((item) => {
            totalMarks += item.marks;
        });

        values.totalMarks = totalMarks;

        console.log(values)

        try {
            let response = await axios({
                url: `${import.meta.env.VITE_API_URL}/assessment/create`,
                method: "POST",
                data: values,
                headers: { Authorization: `${localStorage.getItem("teacherToken")}` }
            })

            console.log(response);

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
  
    const editAssessment = async (values) => {
        try {
            let response = await axios({
                url: `${import.meta.env.VITE_API_URL}/assessment/edit/${state?._id}`,
                method: "POST",
                data: values,
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
        templateDropdown();
    }, []);
  
    useEffect(() => { 
        dispatch( headingUpdate({ heading: "Create Assessment", subheading: "This will help you create multiple assesments" }));
    }, [dispatch]);

    console.log(tempSelect)

    let questionCount = 0;
    let prevCount = 0;

    return (
        <div id="TeacherAssessmentCreate">
            <div className="border border-green-100 rounded-lg p-4">
                <Form labelCol={{ span: 5 }} labelAlign="left" wrapperCol={{ span: 20 }} layout="horizontal" className="w-11/12 flex flex-col gap-2" onFinish={isEdit ? editAssessment : createAssessment} >
                    {/* Title */}
                    <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                        <Input placeholder="Enter an assessment title" />
                    </Form.Item>
                    
                    {/* Template */}
                    <Form.Item name="template" label="Template">
                        <Select options={tempDropdownOptions} placeholder="Select an template option" onSelect={(e) => selectTempFun(e)}/>
                    </Form.Item>

                    {/* Description */}
                    <Form.Item name="description" label="Description">
                        <Input.TextArea placeholder="Enter an assessment description" />
                    </Form.Item>

                    <div className="flex flex-col gap-4">
                        {tempSelect?.questionTypeTemplate?.map((item,index) => {  
                            prevCount = questionCount;
                            questionCount += item.questionCount;
            
                            return (
                                <div key={item?._id}>
                                    {item.type == "MCQ" && <MCQQuestions item={item} index={index} count={questionCount} n={prevCount} />}
                                    {item.type == "MSQ" && <MSQQuestions item={item} index={index} count={questionCount} n={prevCount} />}
                                    {item.type == "TRUE_FALSE" && <TFQQuestions item={item} index={index} count={questionCount} n={prevCount} />}
                                    {item.type == "FILL_BLANK" && <FUQuestions item={item} index={index} count={questionCount} n={prevCount} />}
                                    {item.type == "SAQ" && <SAQQuestions item={item} index={index} count={questionCount} n={prevCount} />}
                                    {item.type == "LAQ" && <LAQQuestions item={item} index={index} count={questionCount} n={prevCount} />}
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

export default TeacherAssessmentCreate;