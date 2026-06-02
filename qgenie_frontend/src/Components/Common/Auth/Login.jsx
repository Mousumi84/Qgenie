import { Form, Input, Button, Checkbox } from 'antd';
import { Card } from "antd";
import { useLocation, useNavigate} from 'react-router-dom';

function Login() {
    let navigate = useNavigate();
    let state = useLocation().state;
    console.log(state);

    const onFinish = values => {
      console.log('Success:', values);
    };
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };

    return (
      <div id="Login" className="p-10 flex flex-col justify-center w-150 rounded-lg shadow-xl gap-10 border border-green-200" style={{ backgroundColor: "#ffffff45" }}>
        <div className="w-6/12"><img src="/Qgenie_transparent.png" alt="Qgenie-logo"/></div>
        <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 20 }} labelAlign="left" style={{ maxWidth: 600 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off"> 
            <Form.Item label="Username" name="username" rules={[{ required: true, message: "Please input your username!" }]} >
                <Input placeholder="Enter your username" /> 
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