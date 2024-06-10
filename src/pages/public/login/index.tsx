import { Button, Flex, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { controlLoading, setAuth } from "../../../redux/slice/auth";
import request from "../../../server/request";

import "./index.scss";
import Loading from "../../../components/loading/index";
import { Fragment } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";

interface LoginValues {
  username: string;
  password: string;
}

const LoginPage = () => {
  const { loading } = useAppSelector((state:RootState) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onFinish = async (values:LoginValues) => {
    try {
      dispatch(controlLoading());
      const { data } = await request.post("auth/login", values);
      dispatch(setAuth({ ...data, navigate }));
    } finally {
      dispatch(controlLoading());
    }
  };
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <>
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
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
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
                    message: "Please input your password!",
                  },
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
                <Button
                  style={{ width: "100%" }}
                  loading={loading}
                  type="primary"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Flex>
        </>
      )}
    </Fragment>
  );
};
export default LoginPage;
