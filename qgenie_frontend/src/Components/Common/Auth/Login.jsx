import { Form, Input, Button, Checkbox } from 'antd';
import { Card } from "antd";
import { useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Login() {
    let navigate = useNavigate();
    let state = useLocation().state;
    console.log(state.role)

    const onLoginClick = async (values) => {
        try {
        
            let response = await axios({
                url: state.role == "teacher" ? `${import.meta.env.VITE_API_URL}/teacher/login` : `${import.meta.env.VITE_API_URL}/student/login`,
                method: "POST",
                data: values
            });
        
            console.log(response);
        
            if(response?.data?.status == 200) {
                localStorage.setItem("teacherToken",response?.data?.teacherToken);
                toast.success(response?.data?.message);
                navigate("/teacher/dashboard")
                return;
            }
            
            toast.error(response?.data?.message); 
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // const onFinishFailed = errorInfo => {
    //   console.log('Failed:', errorInfo);
    // };

    let textcolor = state.role == "teacher" ? `text-green-500` : `text-indigo-600`;

    return (
      <div id="Login" className="p-10 flex flex-col justify-center w-150 rounded-lg shadow-xl gap-10 border border-green-200" style={{ backgroundColor: "#ffffff45" }}>
        <div className="w-6/12"><img src="/Qgenie_transparent.png" alt="Qgenie-logo"/></div>
        <div className={`text-2xl font-bold text-center ${textcolor}`}>Log in</div>
          <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 20 }} labelAlign="left" style={{ maxWidth: 600 }} initialValues={{ remember: true }} onFinish={onLoginClick} autoComplete="off">  {/* onFinishFailed={onFinishFailed} */}
            <Form.Item label="UserId" name="userId" rules={[{ required: true, message: "Please input your username or email!" }]} >
                <Input placeholder="Enter your username or email" /> 
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please input your password!" }]} >
                <Input.Password placeholder="Enter your password" /> 
            </Form.Item>
            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">Submit</Button> 
            </Form.Item>
        </Form>
        <p onClick={() => navigate("/signup", { state: { role: state?.role || "" } })} className="text-sm text-blue-500">Don't have an account? Sign up</p>
      </div>
    );
}

export default Login;