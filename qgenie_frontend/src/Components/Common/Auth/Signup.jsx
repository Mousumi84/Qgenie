import { Form, Input, Button, Checkbox, Radio, Select, DatePicker } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
    let navigate = useNavigate();
    let state = useLocation().state;
    let [role, setRole] = useState(state?.role || "");
    let randomId = (Math.floor(Math.random() * 9000000) + 1000000).toString();
    let username = role == "teacher" ? `T${randomId}` : `S${randomId}`;

    let gradeOptions = [
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

    let genderOptions = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
    ];

    const subjectOptions = [
        { label: "English", value: "english" },
        { label: "Hindi", value: "hindi" },
        { label: "Bengali", value: "bengali" },
        { label: "Sanskrit", value: "sanskrit" },
        { label: "Urdu", value: "urdu" },
        { label: "French", value: "french" },
        { label: "German", value: "german" },
        { label: "Spanish", value: "spanish" },
    
        { label: "Mathematics", value: "mathematics" },
        { label: "Science", value: "science" },
        { label: "Environmental Studies (EVS)", value: "evs" },
    
        { label: "Physics", value: "physics" },
        { label: "Chemistry", value: "chemistry" },
        { label: "Biology", value: "biology" },
    
        { label: "Social Science", value: "social_science" },
        { label: "History", value: "history" },
        { label: "Geography", value: "geography" },
        { label: "Political Science", value: "political_science" },
        { label: "Economics", value: "economics" },
    
        { label: "Computer Science", value: "computer_science" },
        { label: "Information Technology", value: "information_technology" },
        { label: "Artificial Intelligence", value: "artificial_intelligence" },
    
        { label: "Accountancy", value: "accountancy" },
        { label: "Business Studies", value: "business_studies" },
        { label: "Entrepreneurship", value: "entrepreneurship" },
    
        { label: "Physical Education", value: "physical_education" },
        { label: "General Knowledge", value: "general_knowledge" },
        { label: "Moral Science", value: "moral_science" },
        { label: "Art & Craft", value: "art_craft" },
        { label: "Music", value: "music" },
        { label: "Dance", value: "dance" },
        { label: "Health & Wellness", value: "health_wellness" },
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
                <Form.Item name="username" label="Username" rules={[{ required: true, message: "Please input your username!" }]} initialValue={username}>
                    <Input placeholder="Enter your username" disabled />
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
                            <Select mode="multiple" placeholder="Select your subject expertise" options={subjectOptions} />
                        </Form.Item>
                        <Form.Item name="institution" label="Institution Name">
                            <Input placeholder="Enter your institution name" />
                        </Form.Item>
                        <Form.Item name="doj" label="Date of Joining">
                            <DatePicker className="w-full" placeholder="Select your date of joining" />
                        </Form.Item>
                        <Form.Item name="gender" label="Gender">
                            <Select options={genderOptions} placeholder="Select your gender" />
                        </Form.Item>
                    </>
                ) : (
                    <>
                        <Form.Item name="gradelevel" label="Grade Level">
                            <Select options={gradeOptions} placeholder="Select an grade option" />
                        </Form.Item>
                        <Form.Item name="institution" label="Institution Name">
                            <Input placeholder="Enter your institution name" />
                        </Form.Item>
                        <Form.Item name="dob" label="Date of Birth">
                            <DatePicker className="w-full" placeholder="Select your date of birth" />
                        </Form.Item>
                        <Form.Item name="gender" label="Gender">
                            <Select options={genderOptions} placeholder="Select your gender" />
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
