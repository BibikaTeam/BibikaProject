import { useEffect, useRef, useState } from "react";
import { Id, toast } from "react-toastify";
import { BrandErrorType, IBrandModel } from "../types";
import { Link } from "react-router-dom";

import { Input, Form, Checkbox, Button, Popconfirm, Table, Modal } from "antd";
import { getAllBrands, addBrand, updateBrand, deleteBrand } from "./service";

const BrandPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  //const [inputAddBrandValue, setInputAddBrandValue] = useState<IBrandModel>
  const initialValues: IBrandModel = {
    id: 1,
    title: "Ford",
  };

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

  const [form] = Form.useForm();

  const dataSource = [initialValues];

  handleGetAllBrands().then(d=> { console.log(d);});


  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Назва",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "Дії",
      dataIndex: "actions",
      key: "actions",
      render: (record: IBrandModel) => (
        <div className="buttonGroup">
          <Button htmlType="submit" type="default" className="buttonInfo" onClick={showModalUpdateBrand}>
            Редагувати
          </Button>
          <Modal
            title="Редагувавання марки авто" visible={isModalVisible}
            onCancel={handleCloseModalBrand} footer={false}
          >
            <Form
              name="basic"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 16 }}
              //onFinish={handleOkModalAddNewBrand}
              autoComplete="off"
            >
              <Form.Item
                label="Зміна назви марки машини"
                name="title"
                rules={[{ required: true, message: 'Введіть нову назву марки машини'}]}
              >
                <Input />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="default" htmlType="submit" onClick={handleCloseModalBrand}>
                  Відмінити
                </Button>
                &nbsp;
                <Button type="primary" htmlType="submit">
                  Змінити
                </Button>
              </Form.Item>
            </Form>

          </Modal>
          &nbsp;
          <Popconfirm
            title={`Ви впевнені що хочете видалити цю марку?`}
          //title={`Ви впевнені що хочете видалити ${record.title }?`}
          //onConfirm={() => handleDeleteBrand(record)} 
          >
            <Button type="primary" htmlType="submit" className="danger">
              Видалити
            </Button>
          </Popconfirm>

        </div>
      )
    }
  ];

  useEffect(() => {
    handleGetAllBrands();
  }, []);

  

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

  const handleUpdateBrand = async (
    value: IBrandModel
  ) => {
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
  }

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



  const showModalAddNewBrand = () => { setIsModalVisible(true) };

  const handleOkModalAddNewBrand = (value: IBrandModel) => {
    handleAddBrand(value);
    setIsModalVisible(false);
  }

  const showModalUpdateBrand = () => {
    setIsModalVisible(true) 
  };

  const handleOkModalUpdateBrand = (value: IBrandModel) => {
    handleUpdateBrand(value);
    setIsModalVisible(false);
  }

  const handleCloseModalBrand = () => {
    setIsModalVisible(false);
  }

  

  return (
    <div>
      {loading}
      <div className="text-align: center">
        <Button htmlType="button" type="default" className="buttonPrimary" onClick={showModalAddNewBrand} >
          Додати нову марку авто
        </Button>
        <Modal
          title="Додавання нової марки авто" visible={isModalVisible}
          onCancel={handleCloseModalBrand} footer={false}
        >
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={handleOkModalAddNewBrand}
            autoComplete="off"
          >
            <Form.Item
              label="Назва марки"
              name="title"
              rules={[{ required: true, message: 'Введіть нову марку машини' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="default" htmlType="submit" onClick={handleCloseModalBrand}>
                Відмінити
              </Button>
              &nbsp;
              <Button type="primary" htmlType="submit">
                Додати
              </Button>
            </Form.Item>
          </Form>

        </Modal>
      </div>
      <Table
        size="large"
        dataSource={dataSource}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
}

export default BrandPage;