import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  IBrandModel,
  IPaginationBrandModel,
  IPaginationBrandRequest,
  IPaginationModel,
  IPaginationRequest,
  IRequestError,
} from "../types";

import { FormModal } from "../../common/form";

import {
  Input,
  Form,
  Button,
  Popconfirm,
  Table,
  Row,
  Col,
  notification,
} from "antd";
import { addBrand, deleteBrand, getPaginatedBrands } from "./service";

import type { NotificationPlacement } from "antd/lib/notification";
const Context = React.createContext({ name: "Default" });

const BrandPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalAdd, setModalAdd] = useState(false);
  const [paginatedBrands, setPaginatedBrands] =
    useState<IPaginationBrandRequest>({
      allPages: 0,
      currentPage: 0,
      data: [],
    });
  const countOnPage: number = 10;

  const [form] = Form.useForm();

  let key = ``;

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const init = async () => {
      await handleGetAllBrands();
    };
    init();
  }, []);

  //Service calling
  const handleGetAllBrands = async () => {
    setLoading(true);
    try {
      const paginationModel: IPaginationBrandModel = {
        search: "",
        page: 1,
        countOnPage: countOnPage,
      };
      let data = await getPaginatedBrands(paginationModel);
      setPaginatedBrands(data as IPaginationBrandRequest);
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    } finally {
      setLoading(false);
      notification.close(key);
    }
  };
  const handleGetAllBrandsByModel = async (
    paginationModel: IPaginationModel
  ) => {
    setLoading(true);
    try {
      let data = await getPaginatedBrands(paginationModel);
      setPaginatedBrands(data as IPaginationBrandRequest);
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    } finally {
      setLoading(false);
      notification.close(key);
    }
  };
  const handleAddBrand = async (values: IBrandModel) => {
    setLoading(true);
    try {
      await addBrand(values);
      toast.success(`Brand ${values.title} are successfully added`);
      openNotification("bottomRight");
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    } finally {
      setLoading(false);
      form.resetFields();
    }
  };
  const handleDeleteBrand = async (value: IBrandModel) => {
    setLoading(true);
    try {
      await deleteBrand(value.id);
      toast.success(`Brand ${value.title} are successfully deleted`);

      setPaginatedBrands({
        ...paginatedBrands,
        data: paginatedBrands.data.filter((x) => x.id != value.id),
      });
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    } finally {
      setLoading(false);
    }
  };

  //Handles
  const handleOkModalAddNewBrand = () => {
    form.submit();
    setModalAdd(false);
  };
  const handleFormSubmit = (value: IBrandModel) => {
    handleAddBrand(value);
  };
  const openNotification = (placement: NotificationPlacement) => {
    key = `open${Date.now()}`;
    api.warning({
      message: `Notification ${placement}`,
      description: (
        <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>
      ),
      placement,
      duration: 0,
      key: key,
      onClick: () => {
        console.log("key: ", key);
        notification.close(key);
        handleGetAllBrands();
      },
    });
  };

  const showModalAddNewBrand = () => {
    setModalAdd(true);
  };
  const onHandlePaginationChanged = async (page: number, pageSize: number) => {
    const paginationModel: IPaginationModel = {
      search: "",
      page: page,
      countOnPage: pageSize,
    };
    await handleGetAllBrandsByModel(paginationModel);
  };
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const paginationModel: IPaginationModel = {
      search: e.target.value,
      page: 1,
      countOnPage: countOnPage,
    };
    await handleGetAllBrandsByModel(paginationModel);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      outerWidth: "10%",
    },
    {
      title: "Назва",
      dataIndex: "title",
      key: "title",
      outerWidth: "50%",
    },
    {
      title: "Дії",
      dataIndex: "actions",
      key: "actions",
      outerWidth: "40%",
      render: (text: string, record: IBrandModel) => (
        <div className="buttonGroup">
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

  return (
    <Context.Provider value={{ name: "Ant Design" }}>
      {contextHolder}
      {loading}

      <Row>
        <Col span={12}>
          <Input
            placeholder="Input brand name"
            onChange={handleSearchChange}
            style={{ width: "300px" }}
          />
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Button
            htmlType="button"
            type="default"
            className="buttonPrimary"
            style={{ marginRight: 20 }}
            onClick={() => {
              handleGetAllBrands();
            }}
          >
            Обновити таблицю
          </Button>
          <Button
            htmlType="button"
            type="default"
            className="buttonPrimary"
            onClick={showModalAddNewBrand}
          >
            Додати нову марку авто
          </Button>
        </Col>
      </Row>

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
        </Form>
      </FormModal>
      <Table
        className="adminTable"
        size="large"
        dataSource={paginatedBrands.data}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: countOnPage,
          total: paginatedBrands.allPages * countOnPage,
          onChange: onHandlePaginationChanged,
          current: paginatedBrands.currentPage,
        }}
      />
    </Context.Provider>
  );
};

export default BrandPage;
