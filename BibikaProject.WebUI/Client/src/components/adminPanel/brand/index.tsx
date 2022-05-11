import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { BrandErrorType, IBrandModel } from "../types";
import { Link } from "react-router-dom";

import { Input, Checkbox, Button } from "antd";
import { FormInput, FormButton } from "../../common/form";
import { Form, Formik, FormikProps, FormikHelpers } from "formik";
import { brandAdds } from "./service";

const BrandPage = () => {

  const refFormik = useRef<FormikProps<IBrandModel>>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues: IBrandModel = {
    id: 0,
    title: "",
  };

  const onHandleSubmit = async (
    values: IBrandModel,
    action: FormikHelpers<IBrandModel>
  ) => {
    setLoading(true);
    try {
      await brandAdds(values);
      toast.success(`Brand ${values.title} are successfully added`);
    } catch (error) {
      const errorType = error as BrandErrorType;
      errorType.errorsString.forEach((el) => {
        toast.error(el);
      });
      console.log(error);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onHandleSubmit}
      innerRef={refFormik}
    >
      {(props: FormikProps<IBrandModel>) => {
        const { values, errors, touched, handleChange, handleSubmit } = props;
        return (
          <Form onSubmit={handleSubmit}>
            <FormInput
              label="Title"
              field="title"
              type="text"
              value={values.title}
              error={errors.title}
              touched={touched.title}
              onChange={handleChange}
              loading={false}
            />
            <FormButton
              text="Submit"
              htmlType="submit"
              loading={loading}
              buttonType="default"
            />
          </Form>
        );
      }}
    </Formik>
  );
}

export default BrandPage;