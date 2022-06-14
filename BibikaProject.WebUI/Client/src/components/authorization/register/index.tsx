import { useState } from "react";
import { Link } from "react-router-dom";

import { Input, Checkbox, Button, Form, Spin } from "antd";
import { IRegisterModel, RegisterErrorType } from "../types";

import { registerUser } from "./service";
import { toast } from "react-toastify";
import AuthorizationLayout from "../../containers/authorizationLayout";

const RegisterPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues: IRegisterModel = {
    userName: "",
    email: "",
    password: ""
  };

  const onFinish = async (values: IRegisterModel) => {
    setLoading(true);
    try {
      await registerUser(values);
      toast.success(`User ${values.userName} are successfully registered`);
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
                <svg width="21" height="13" viewBox="0 0 21 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 12L10.5 2L20 12" stroke="white" stroke-opacity="0.5" stroke-width="2"/>
                </svg>
              </div>
              <div className="register-go-back-title">
                Back to Login
              </div>       
            </Link>
            <div className="register-title">
              Registration
            </div>
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
                  rules={[{ validateTrigger: ['onBlur', 'onChange'], required: true, message: 'Please input your Name!' }]}>
                  <Input 
                    className="register-form-input"
                    type="userName"
                    placeholder="Name" />
                </Form.Item>
                <Form.Item
                  className="register-form-item"
                  name="email"
                  rules={[{ type:'email', validateTrigger: ['onBlur', 'onChange'], required: true, message: 'Please input your Email!' }]}>
                  <Input 
                    className="register-form-input"
                    type="email"
                    placeholder="Email" />
                </Form.Item>
                <Form.Item
                  className="register-form-item"
                  name="password"
                  rules={[{ required: true, message: 'Please input your Password!' }]}>
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
                  rules={[{validator: (_, value) =>value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),},]}>
                  <Checkbox className="register-form-checkbox">
                    I agree to the rules of use of the service
                  </Checkbox>
                </Form.Item>
                <Form.Item
                  className="register-form-item">
                  <Button
                    className="register-form-button"
                    htmlType="submit">
                    Create Account
                  </Button>
                </Form.Item>
                <div className="login-form-external-container">
                  <Button
                    className="register-form-button-external-google">
                    <svg className="register-external-logo" width="25" height="27" viewBox="0 0 33 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32.16 13.9364C32.3503 15.0774 32.4452 16.2335 32.4436 17.3915C32.4436 22.5636 30.6685 26.9367 27.5795 29.8968H27.5836C24.8823 32.4956 21.1689 34 16.766 34C12.437 34 8.28535 32.209 5.22431 29.021C2.16328 25.833 0.443604 21.5091 0.443604 17.0006C0.443604 12.492 2.16328 8.16816 5.22431 4.98014C8.28535 1.79213 12.437 0.00112172 16.766 0.00112172C20.8179 -0.0483006 24.731 1.53709 27.6856 4.42523L23.0256 9.27857C21.3411 7.60619 19.0929 6.69038 16.766 6.72865C12.5079 6.72865 8.89042 9.72055 7.60096 13.7494C6.91727 15.8605 6.91727 18.1469 7.60096 20.2581H7.60708C8.90267 24.2806 12.514 27.2725 16.7721 27.2725C18.9715 27.2725 20.8608 26.686 22.3258 25.649H22.3196C23.1703 25.0621 23.8979 24.3018 24.4586 23.414C25.0193 22.5262 25.4015 21.5292 25.5821 20.4833H16.766V13.9385H32.16V13.9364Z"/>
                    </svg>
                    &ensp;
                    Login with Google        
                  </Button>                
                  <Button
                    className="register-form-button-external-facebook">
                    <svg className="register-external-logo" width="25" height="27" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32.7664 16.098C32.7664 7.2071 25.6033 0 16.7684 0C7.92946 0.00199975 0.766357 7.2071 0.766357 16.1C0.766357 24.133 6.61763 30.7922 14.2647 32V20.7514H10.2052V16.1H14.2687V12.5504C14.2687 8.51694 16.6584 6.28921 20.3119 6.28921C22.0637 6.28921 23.8935 6.60318 23.8935 6.60318V10.5627H21.8757C19.89 10.5627 19.27 11.8045 19.27 13.0784V16.098H23.7055L22.9976 20.7494H19.268V31.998C26.9151 30.7902 32.7664 24.131 32.7664 16.098Z"/>
                    </svg>
                    &ensp;
                    Login with Facebook
                  </Button>
                </div>     
              </Form>
          </div>  
        </div>
      </AuthorizationLayout>
    </Spin>
  );
};

export default RegisterPage;
