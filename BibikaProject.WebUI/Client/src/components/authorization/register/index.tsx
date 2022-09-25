import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Input, Checkbox, Button, Form, Spin } from "antd";
import { IRegisterModel, RegisterErrorType } from "../types";

import { registerUser } from "./service";
import { toast } from "react-toastify";
import AuthorizationLayout from "../../containers/authorizationLayout";

const RegisterPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigator = useNavigate();

  const initialValues: IRegisterModel = {
    userName: "",
    email: "",
    password: "",
  };

  const onFinish = async (values: IRegisterModel) => {
    setLoading(true);
    try {
      await registerUser(values);
      toast.success(`User ${values.userName} are successfully registered`);
      navigator("/login");
    } catch (error) {
      const errorType = error as RegisterErrorType;
      errorType.errorsString.forEach((el) => {
        toast.error(el);
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin tip="Loading..." spinning={loading} size="large">
      <AuthorizationLayout>
        <div className="register-container">
          <div className="register-header-container">
            <Link className="register-go-back-container" to="/login">
              <div className="register-go-back-icon">
                <svg
                  width="21"
                  height="13"
                  viewBox="0 0 21 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 12L10.5 2L20 12"
                    stroke="white"
                    strokeOpacity="0.5"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="register-go-back-title">Back to Login</div>
            </Link>
            <div className="register-title">Registration</div>
          </div>
          <div className="register-form-container">
            <Form
              className="register-form"
              initialValues={initialValues}
              onFinish={onFinish}
            >
              <Form.Item
                className="register-form-item"
                name="userName"
                rules={[
                  {
                    validateTrigger: ["onBlur", "onChange"],
                    required: true,
                    message: "Please input your Name!",
                  },
                ]}
              >
                <Input
                  className="register-form-input"
                  type="userName"
                  placeholder="Name"
                />
              </Form.Item>
              <Form.Item
                className="register-form-item"
                name="email"
                rules={[
                  {
                    type: "email",
                    validateTrigger: ["onBlur", "onChange"],
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}
              >
                <Input
                  className="register-form-input"
                  type="email"
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                className="register-form-item"
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  className="register-form-input"
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item
                className="register-form-item"
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(new Error("Should accept agreement")),
                  },
                ]}
              >
                <Checkbox className="register-form-checkbox">
                  I agree to the rules of use of the service
                </Checkbox>
              </Form.Item>
              <Form.Item className="register-form-item">
                <Button className="register-form-button" htmlType="submit">
                  Create Account
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </AuthorizationLayout>
    </Spin>
  );
};

export default RegisterPage;
