import { Form, Input, Button, Checkbox, Radio, Select, DatePicker } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
    let navigate = useNavigate();
    let state = useLocation().state;
    let [role, setRole] = useState(state?.role || "");

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

    let genderoption = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
    ];

    const passwordValidator = ({ getFieldValue }) => {
        return {
            validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error("The new password that you entered do not match!"));
            },
        };
    };

    const onSignupClick = async (values) => {
        console.log(values);
        values.code = (Math.floor(Math.random() * 900) + 100).toString();
        

        try {
            let response = await axios({
                url: `${import.meta.env.VITE_API_URL}/${role}/signup`,
                method: "POST",
                data: values,
            });

            console.log(response);

            if (response?.data?.status == 201) {
                toast.success(response?.data?.message);
                navigate("/login", { state: { role: role || "" } });
                return;
            }

            toast.error(response?.data?.message);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    let textcolor = role == "teacher" ? `text-green-500` : `text-indigo-600`;

    return (
        <div id="Signup" className="p-10 flex flex-col justify-center w-150 rounded-lg shadow-xl gap-10 border border-green-200" style={{ backgroundColor: "#ffffff45" }}>
            <div className="w-6/12">
                <img src="/Qgenie_transparent.png" alt="Qgenie-logo" />
            </div>
            <div className={`text-2xl font-bold text-center ${textcolor}`}>Sign up</div>
            <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 20 }} labelAlign="left" style={{ maxWidth: 600 }} onFinish={onSignupClick} initialValues={{ role: role }} autoComplete="off">
                <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please input your name!" }]}>
                    <Input placeholder="Enter your name" />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[ { type: "email", message: "The input is not valid Email!" }, { required: true, message: "Please input your Email!" } ]}>
                    <Input placeholder="Enter your email" />
                </Form.Item>
                <Form.Item name="username" label="Username" rules={[{ required: true, message: "Please input your username!" }]}>
                    <Input placeholder="Enter your username" />
                </Form.Item>
                <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please input your password!" }]} hasFeedback>
                    <Input.Password placeholder="Enter your password" />
                </Form.Item>
                <Form.Item name="confirm" label="Confirm Password" dependencies={["password"]} hasFeedback rules={[{ required: true, message: "Please confirm your password!" }, passwordValidator]}>
                    <Input.Password placeholder="Confirm your password" />
                </Form.Item>
                <Form.Item name="role" label="Role" rules={[{ required: true, message: "Please select your role!" }]}>
                    <Radio.Group onChange={(e) => setRole(e.target.value)}>
                        <Radio.Button value="student">Student</Radio.Button>
                        <Radio.Button value="teacher">Teacher</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                {role === "teacher" ? (
                    <>
                        <Form.Item name="subject" label="Subject Expertise">
                            <Input placeholder="Enter your subject expertise" />
                        </Form.Item>
                        <Form.Item name="institution" label="Institution Name">
                            <Input placeholder="Enter your institution name" />
                        </Form.Item>
                        <Form.Item name="doj" label="Date of Joining">
                            <DatePicker className="w-full" placeholder="Select your date of joining" />
                        </Form.Item>
                        <Form.Item name="gender" label="Gender">
                            <Select options={genderoption} placeholder="Select your gender" />
                        </Form.Item>
                    </>
                ) : (
                    <>
                        <Form.Item name="gradelevel" label="Grade Level">
                            <Select options={gradeoption} placeholder="Select an grade option" />
                        </Form.Item>
                        <Form.Item name="institution" label="Institution Name">
                            <Input placeholder="Enter your institution name" />
                        </Form.Item>
                        <Form.Item name="dob" label="Date of Birth">
                            <DatePicker className="w-full" placeholder="Select your date of birth" />
                        </Form.Item>
                        <Form.Item name="gender" label="Gender">
                            <Select options={genderoption} placeholder="Select your gender" />
                        </Form.Item>
                    </>
                )}

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
            <div>Already have an account?{" "}<span onClick={() => navigate("/login", { state: { role: role || "" } })} className="text-sm text-blue-500 cursor-pointer underline">Log in</span></div>
        </div>
    );
}

export default Signup;
