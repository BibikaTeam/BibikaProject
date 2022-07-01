import React, { useEffect, useRef, useState } from "react";
import { Id, toast } from "react-toastify";
import {
  IEngineModel,
  IPaginationModel,
  IPaginationRequest,
  IRequestError,
} from "../types";
import { Link } from "react-router-dom";

import { FormModal } from "../../common/form";

import {
  Input,
  Form,
  Button,
  Popconfirm,
  Table,
  Pagination,
  Row,
  Col,
  Select,
  notification,
} from "antd";
import {
  getAllEngines,
  addEngine,
  getPaginatedEngines,
  deleteEngine,
} from "./service";

import type { NotificationPlacement } from "antd/lib/notification";

const Context = React.createContext({ name: "Default" });
const Option = Select.Option;

const EnginePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalAdd, setModalAdd] = useState(false);
  const [isModalEdit, setModalEdit] = useState(false);
  const [paginatedEngines, setPaginatedEngines] = useState<
    IPaginationRequest<IEngineModel>
  >({
    allPages: 0,
    currentPage: 0,
    data: [],
  });
  const countOnPage: number = 3;
  const [form] = Form.useForm();
  const defaultValue: IEngineModel = {
    capacity: "",
    fuel: "",
    id: 0,
    kWPower: 0,
    title: "",
  };
  const [editableValue, setEditableValue] =
    useState<IEngineModel>(defaultValue);
  const [api, contextHolder] = notification.useNotification();

  let key = ``;

  useEffect(() => {
    const init = async () => {
      await handleGetAllEngines();
    };
    init();
  }, []);

  const handleGetAllEngines = async () => {
    setLoading(true);
    try {
      const paginationModel: IPaginationModel = {
        search: "",
        page: 1,
        countOnPage: countOnPage,
      };
      await getPaginatedEngines(paginationModel).then((data) => {
        setPaginatedEngines(data as IPaginationRequest<IEngineModel>);
      });
      notification.close(key);
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    } finally {
      setLoading(false);
    }
  };
  const handleGetAllEnginesByPaginationModel = async (
    paginationModel: IPaginationModel
  ) => {
    setLoading(true);
    try {
      await getPaginatedEngines(paginationModel).then((data) => {
        setPaginatedEngines(data as IPaginationRequest<IEngineModel>);
      });
      notification.close(key);
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddEngine = async (values: IEngineModel) => {
    setLoading(true);
    try {
      await addEngine(values);
      toast.success(`Brand ${values.title} are successfully added`);
      form.resetFields();
      openNotification("bottomRight");
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteEngine = async (value: IEngineModel) => {
    console.log("value: ", value);
    setLoading(true);
    try {
      await deleteEngine(value.id);
      toast.success(`Brand ${value.title} are successfully deleted`);

      setPaginatedEngines({
        ...paginatedEngines,
        data: paginatedEngines.data.filter((x) => x.id != value.id),
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
  const handleEditClick = async (record: IEngineModel) => {
    setModalEdit(true);
    setEditableValue(record);
  };

  const showModalAddNewEngine = () => {
    setModalAdd(true);
  };

  const handleOkModalAddNewEngine = () => {
    form.submit();
    setModalAdd(false);
  };
  const handleFormSubmit = (value: IEngineModel) => {
    handleAddEngine(value);
  };
  const onHandlePaginationChanged = async (page: number, pageSize: number) => {
    const paginationModel: IPaginationModel = {
      search: "",
      page: page,
      countOnPage: pageSize,
    };
    handleGetAllEnginesByPaginationModel(paginationModel);
  };
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const paginationModel: IPaginationModel = {
      search: e.target.value,
      page: 1,
      countOnPage: countOnPage,
    };
    handleGetAllEnginesByPaginationModel(paginationModel);
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
        handleGetAllEngines();
      },
    });
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
      outerWidth: "80%",
    },
    {
      title: "Об'єм (см³)",
      dataIndex: "capacity",
      key: "capacity",
      outerWidth: "20%",
    },
    {
      title: "Потужність у kw",
      dataIndex: "kwPower",
      key: "kwPower",
      outerWidth: "30%",
    },
    {
      title: "Тип палива",
      dataIndex: "fuel",
      key: "fuel",
      outerWidth: "20%",
    },
    {
      title: "Дії",
      dataIndex: "actions",
      key: "actions",
      outerWidth: "40%",
      render: (text: string, record: IEngineModel) => (
        <div className="buttonGroup">
          <Popconfirm
            title={`Ви впевнені що хочете видалити цей двигун?`}
            onConfirm={() => handleDeleteEngine(record)}
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
            placeholder="Input engine title"
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
              handleGetAllEngines();
            }}
          >
            Обновити таблицю
          </Button>
          <Button
            htmlType="button"
            type="default"
            className="buttonPrimary"
            onClick={showModalAddNewEngine}
          >
            Додати новий двигун
          </Button>
        </Col>
      </Row>

      <FormModal
        title="Додавання нового двигуна"
        visible={isModalAdd}
        onCancel={() => setModalAdd(false)}
        onSubmit={handleOkModalAddNewEngine}
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
            label="Назва двигуна"
            name="title"
            rules={[{ required: true, message: "Введіть назву двигуна" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Об'єм двигуна (см³)"
            name="capacity"
            rules={[{ required: true, message: "Введіть об'єм двигуна" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Потужність у kw"
            name="kWPower"
            rules={[{ required: true, message: "Введіть потужність двигуна" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="fuel"
            label="Тип палива"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select type fuel" allowClear>
              <Option value="Дизель">Дизель</Option>
              <Option value="Бензин">Бензин</Option>
              <Option value="Газ">Газ</Option>
              <Option value="Електричний">Електричний</Option>
            </Select>
          </Form.Item>
        </Form>
      </FormModal>
      <Table
        className="adminTable"
        size="large"
        dataSource={paginatedEngines.data}
        columns={columns}
        rowKey="id"
        pagination={{
          pageSize: countOnPage,
          total: paginatedEngines.allPages * countOnPage,
          onChange: onHandlePaginationChanged,
          current: paginatedEngines.currentPage,
        }}
        loading={loading}
      />
    </Context.Provider>
  );
};

export default EnginePage;
