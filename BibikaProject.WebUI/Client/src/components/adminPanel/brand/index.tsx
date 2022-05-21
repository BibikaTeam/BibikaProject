import { useEffect, useRef, useState } from "react";
import { Id, toast } from "react-toastify";
import { BrandErrorType, IBrandModel } from "../types";
import { Link } from "react-router-dom";

import { FormModal } from "../../common/form";

import { Input, Form, Checkbox, Button, Popconfirm, Table } from "antd";
import { getAllBrands, addBrand, updateBrand, deleteBrand } from "./service";

const BrandPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalAdd, setModalAdd] = useState(false);
  const [isModalEdit, setModalEdit] = useState(false);
  const [brands, setBrands] = useState<Array<IBrandModel>>([]);
  //const [inputAddBrandValue, setInputAddBrandValue] = useState<IBrandModel>
  const [form] = Form.useForm();

  useEffect(() => {
    const init = async () => {
      await handleGetAllBrands();
    };
    init();
  }, []);

  const handleGetAllBrands = async () => {
    setLoading(true);
    try {
      await getAllBrands().then((data) => {
        setBrands(data);
      });
    } catch (error) {
      const errorType = error as BrandErrorType;
      errorType.errorsString.forEach((el) => {
        toast.error(el);
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddBrand = async (values: IBrandModel) => {
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
  const handleUpdateBrand = async (value: IBrandModel) => {
    setLoading(true);
    try {
      await updateBrand(value);
      toast.success(`Brand ${value.title} are successfully update`);
    } catch (error) {
      const errorType = error as BrandErrorType;
      errorType.errorsString.forEach((el) => {
        toast.error(el);
      });
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteBrand = async (value: IBrandModel) => {
    console.log("value: ", value);
    setLoading(true);
    try {
      await deleteBrand(value.id);
      toast.success(`Brand ${value.title} are successfully deleted`);

      setBrands(brands.filter((x) => x.id != value.id));
    } catch (error) {
      const errorType = error as BrandErrorType;
      errorType.errorsString.forEach((el) => {
        toast.error(el);
      });
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Назва",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Дії",
      dataIndex: "actions",
      key: "actions",
      render: (text: string, record: IBrandModel) => (
        <div className="buttonGroup">
          <Button htmlType="submit" type="default" className="buttonInfo">
            Редагувати
          </Button>
          <FormModal
            title="Редагувавання марки авто"
            visible={isModalEdit}
            onCancel={() => setModalEdit(false)}
            onSubmit={() => {}}
          >
            <Form
              name="basic"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 16 }}
              //onFinish={handleUpdateBrand}
              autoComplete="off"
            >
              <Form.Item
                label="Зміна назви марки машини"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Введіть нову назву марки машини",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}></Form.Item>
            </Form>
          </FormModal>
          &nbsp;
          <Popconfirm
            title={`Ви впевнені що хочете видалити цю марку?`}
            onConfirm={() => handleDeleteBrand(record)}
          >
            <Button type="primary" htmlType="submit" className="danger">
              Видалити
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const showModalAddNewBrand = () => {
    setModalAdd(true);
  };

  const handleOkModalAddNewBrand = () => {
    form.submit();
    setModalAdd(false);
  };
  const handleFormSubmit = (value: IBrandModel) => {
    handleAddBrand(value);
  };

  return (
    <div>
      {loading}
      <div className="text-align: center">
        <Button
          htmlType="button"
          type="default"
          className="buttonPrimary"
          onClick={showModalAddNewBrand}
        >
          Додати нову марку авто
        </Button>
        <FormModal
          title="Додавання нової марки авто"
          visible={isModalAdd}
          onCancel={() => setModalAdd(false)}
          onSubmit={handleOkModalAddNewBrand}
        >
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={handleFormSubmit}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Назва марки"
              name="title"
              rules={[{ required: true, message: "Введіть нову марку машини" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              {/* <Button
                type="default"
                htmlType="submit"
                onClick={handleCloseModalBrand}
              >
                Відмінити
              </Button>
              &nbsp;
              <Button type="primary" htmlType="submit">
                Додати
              </Button> */}
            </Form.Item>
          </Form>
        </FormModal>
      </div>
      <Table
        size="large"
        dataSource={brands}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
};

export default BrandPage;
