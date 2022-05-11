import { useEffect, useState } from "react";
import { Id, toast } from "react-toastify";
import { BrandErrorType, IBrandModel } from "../types";
import { Link } from "react-router-dom";

import { Input, Checkbox, Button, Popconfirm, Table } from "antd";
//import { FormInput, FormButton } from "../../common/form";
//import { Form, Formik, FormikProps, FormikHelpers } from "formik";
import { getAllBrands, addBrand, updateBrand, deleteBrand } from "./service";
import { async } from "q";
import { Value } from "sass";

const BrandPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const initialValues: IBrandModel = {
    id: 0,
    title: "",
  };

  const columnsForTable = [
    {
      id: "Id",
      dataIndex: "id"
    },
    {
      title: "Назва",
      dataIndex: "title"
    },
    {
      title: "Дії",
      dataIndex: "actions",
      render: (a: any, record: IBrandModel) => {
        <div className="buttonGroup">
          <Popconfirm
            title={`Ви впевнені що хочете видалити ${record.title}?`}
            onConfirm={() => handleDeleteBrand(record)} >
            <Button htmlType="button" type="default" className="buttonDanger">
              Видалити
            </Button>
          </Popconfirm>
          <Popconfirm
            title={"Редагування марки"} >
            <Button htmlType="button" type="default" className="buttonInfo">
              Редагувати
            </Button>
          </Popconfirm>
        </div>
      }
    }
  ];

  useEffect(() => {
      handleGetAllBrands();
  }, []);

  const handleGetAllBrands = async () => {
    setLoading(true);
    try {
      await getAllBrands();
    } catch (error) {
      const errorType = error as BrandErrorType;
      errorType.errorsString.forEach((el) => {
        toast.error(el);
      });
    } finally {
      setLoading(false);
    }
  }

  const handleAddBrand = async (
    values: IBrandModel,
  ) => {
    setLoading(true);
    try {
      await addBrand(values);
      toast.success(`Brand ${values.title} are successfully added`);
    } catch (error) {
      const errorType = error as BrandErrorType;
      errorType.errorsString.forEach((el) => {
        toast.error(el);
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBrand = async (
    value: IBrandModel
  ) => {
    setLoading(true);
    try {
      await deleteBrand(value.id);
      toast.warning(`Brand ${value.title} are successfully deleted`);
    } catch (error) {
      const errorType = error as BrandErrorType;
      errorType.errorsString.forEach((el) => {
        toast.error(el);
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {loading}
      <div className="text-align: center">
      <Button htmlType="button" type="default" className="buttonPrimary">
              Додати нову марку авто
      </Button>
      </div>
      <Table
        size = "large"
        //columns={columnsForTable}
        rowKey="id"
        pagination={false}
        />
    </div>


    // <Formik
    //   initialValues={initialValues}
    //   onSubmit={onHandleSubmit}
    //   innerRef={refFormik}
    // >
    //   {(props: FormikProps<IBrandModel>) => {
    //     const { values, errors, touched, handleChange, handleSubmit } = props;
    //     return (
    //       <div className="container">
    //       <Form onSubmit={handleSubmit} className="container">
    //         <FormInput
    //           label="Title"
    //           field="title"
    //           type="text"
    //           value={values.title}
    //           error={errors.title}
    //           touched={touched.title}
    //           onChange={handleChange}
    //           loading={false}
    //         />
    //         <FormButton
    //           text="Submit"
    //           htmlType="submit"
    //           loading={loading}
    //           buttonType="default"
    //         />
    //       </Form>
    //       </div>
    //     );
    //   }}
    // </Formik>
  );
}

export default BrandPage;