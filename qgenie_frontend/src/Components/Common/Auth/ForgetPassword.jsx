import { Button, Input } from "antd";
import { Form } from "antd";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";

function ForgetPassword() {
    const [credentialConfirmation, setCredentialConfirmation] = useState(false);

    const navigate = useNavigate();
    const token = localStorage.getItem("Token");

    let state = useLocation().state;
    console.log(state.role);

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

    const confirmAccess = async (values) => {
        console.log(values);

        try {
            const response = await axios({
                url: `${import.meta.env.VITE_API_URL}/${state.role}/confirmAccess`,
                method: "POST",
                data: values,
                headers: { Authorization: token },
            });
            console.log(response);

            if (response.data.status === 200) {
                setCredentialConfirmation(true);
                localStorage.setItem("ConfirmationToken", response.data.jwtToken);
                toast.success(response?.data?.message);
                return;
            }

            toast.error(response?.data?.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const updatePassword = async (values) => {
        try {
            const response = await axios({
                url: `${import.meta.env.VITE_API_URL}/${state.role}/resetPassword`,
                method: "POST",
                data: {
                    token: localStorage.getItem("ConfirmationToken"),
                    password: values.password,
                    userId: values.userId,
                },
                headers: { Authorization: token },
            });
            console.log(response);

            if (response.data.status == 200) {
                localStorage.removeItem("ConfirmationToken");
                localStorage.removeItem("AccessUserId");
                toast.success(response?.data?.message);
                navigate("/");
                return;
            }

            toast.error(response?.data?.message);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    let textcolor = state.role == "teacher" ? `text-green-500` : `text-indigo-600`;

    return (
        <div id="forgetpassword" className="p-10 flex flex-col justify-center w-150 rounded-lg shadow-xl gap-10 border border-green-200" style={{ backgroundColor: "#ffffff45" }}>
            <div className="w-6/12">
                <img src="/Qgenie_transparent.png" alt="Qgenie-logo" />
            </div>
            <div className={`text-2xl font-bold text-center ${textcolor}`}>Forget Password</div>
            <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 20 }} labelAlign="left" style={{ maxWidth: 600 }} autoComplete="off" onFinish={credentialConfirmation ? updatePassword : confirmAccess} >
                <Form.Item label="UserId" name="userId" rules={[{ required: true, message: "Please input your username or email!" }]}>
                    <Input placeholder="Enter your username or email" />
                </Form.Item>
                {credentialConfirmation ? (
                    <>
                        <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please input your password!" }]} hasFeedback>
                            <Input.Password placeholder="Enter your password" />
                        </Form.Item>
                        <Form.Item name="confirm" label="Confirm Password" dependencies={["password"]} hasFeedback rules={[{ required: true, message: "Please confirm your password!" }, passwordValidator]} >
                            <Input.Password placeholder="Confirm your password" />
                        </Form.Item>
                        <Form.Item label={null}>
                            <Button type="primary" htmlType="submit">Change Password</Button>
                        </Form.Item>
                    </>
                ) : (
                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">Confirm</Button>
                    </Form.Item>
                )}
            </Form>

            <div className="mb-3">
                <div>Don't have an account?{" "}<span onClick={() => navigate("/signup", { state: { role: state?.role || "" } })} className="text-sm text-blue-500 cursor-pointer underline">Sign up</span></div>
                <div>Already have an account?{" "}<span onClick={() => navigate("/login", { state: { role: state?.role || "" } })} className="text-sm text-blue-500 cursor-pointer underline">Log in</span></div>
            </div>
        </div>
    );
}

export default ForgetPassword;
