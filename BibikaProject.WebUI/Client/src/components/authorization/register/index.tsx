import { useRef } from "react";
import { Link } from "react-router-dom";

import { Input, Checkbox, Button } from "antd";
import { Form, Formik, FormikProps, FormikHelpers } from "formik";
import { IRegisterModel } from "../types";

import { validationFields } from "./validation";

import { FormInput, FormButton } from "../../common/form";

import { registerUser } from "./service";

const RegisterPage = () => {
  const refFormik = useRef<FormikProps<IRegisterModel>>(null);

  const initialValues: IRegisterModel = {
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  };

  const onHandleSubmit = async (
    values: IRegisterModel,
    action: FormikHelpers<IRegisterModel>
  ) => {
    console.log("values: ", values);
    registerUser(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onHandleSubmit}
      validationSchema={validationFields}
      innerRef={refFormik}
    >
      {(props: FormikProps<IRegisterModel>) => {
        const { values, errors, touched, handleChange, handleSubmit } = props;
        return (
          <Form onSubmit={handleSubmit}>
            <FormInput
              label="Email"
              field="email"
              type="email"
              value={values.email}
              error={errors.email}
              touched={touched.email}
              onChange={handleChange}
              loading={false}
            />
            <FormInput
              label="Nickname"
              field="username"
              type="text"
              value={values.username}
              error={errors.username}
              touched={touched.username}
              onChange={handleChange}
              loading={false}
            />
            <FormInput
              label="Number"
              field="phoneNumber"
              type="text"
              value={values.phoneNumber}
              error={errors.phoneNumber}
              touched={touched.phoneNumber}
              onChange={handleChange}
              loading={false}
            />
            <FormInput
              label="Password"
              field="password"
              type="password"
              value={values.password}
              error={errors.password}
              touched={touched.password}
              onChange={handleChange}
              loading={false}
            />
            <FormInput
              label="Password confirmation"
              field="confirmPassword"
              type="password"
              value={values.confirmPassword}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              onChange={handleChange}
              loading={false}
            />
            <FormButton
              text="Submit"
              htmlType="submit"
              loading={false}
              buttonType="default"
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegisterPage;
