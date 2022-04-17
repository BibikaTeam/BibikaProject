import { useRef } from "react";
import { Link } from "react-router-dom";

import { Input, Checkbox, Button } from "antd";
import { Form, Formik, FormikProps, FormikHelpers } from "formik";
import { ILoginModel } from "../types";

import { validationFields } from "./validation";

import { FormInput, FormButton } from "../../common/form";

import { useActions } from "../../../hooks/useActions";

const LoginPage = () => {
  const refFormik = useRef<FormikProps<ILoginModel>>(null);

  const { loginUser } = useActions();

  const initialValues: ILoginModel = {
    email: "",
    password: "",
  };

  const onHandleSubmit = async (
    values: ILoginModel,
    action: FormikHelpers<ILoginModel>
  ) => {
    console.log("values: ", values);
    loginUser(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onHandleSubmit}
      validationSchema={validationFields}
      innerRef={refFormik}
    >
      {(props: FormikProps<ILoginModel>) => {
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
              label="Password"
              field="password"
              type="password"
              value={values.password}
              error={errors.password}
              touched={touched.password}
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

export default LoginPage;
