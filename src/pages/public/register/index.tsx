import { Button, Flex, Form, Input } from "antd";
import request from "../../../server/request";
import { useDispatch, useSelector } from "react-redux";
import { controlLoading, setAuth } from "../../../redux/slice/auth";
import { useNavigate } from "react-router-dom";


const RegisterPage = () => {
  const {loading} = useSelector(state => state.auth); 
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try{
        dispatch(controlLoading())
        const {data} = await request.post('auth/register' , values )
        dispatch(setAuth({...data ,navigate}))
    }finally{
        dispatch(controlLoading());
    }
  };
  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <Form
        name="basic"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Firstname"
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please fill !",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Lastname"
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please fill !",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please fill !",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please fill !",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 0,
            span: 24,
          }}
        >
          <Button style={{width:"100%"}} loading={loading} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};
export default RegisterPage;
