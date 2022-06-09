import React, { useEffect, useRef, useState } from "react";
import { Id, toast } from "react-toastify";
import {
  BrandErrorType,
  IEngineModel,
  IPaginationModel,
  IPaginationRequest,
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
} from "antd";
import {
  getAllEngines,
  addEngine,
  getPaginatedEngines,
  deleteEngine,
} from "./service";
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
    } catch (error) {
      const errorType = error as BrandErrorType;
      errorType.errorsString.forEach((el) => {
        toast.error(el);
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
    } catch (error) {
      const errorType = error as BrandErrorType;
      errorType.errorsString.forEach((el) => {
        toast.error(el);
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
    } catch (error) {
      const errorType = error as BrandErrorType;
      errorType.errorsString.forEach((el) => {
        toast.error(el);
      });
    } finally {
      setLoading(false);
    }
  };
  const handleEditClick = async (record: IEngineModel) => {
    setModalEdit(true);
    setEditableValue(record);
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
      title: "Назва",
      dataIndex: "capacity",
      key: "capacity",
      outerWidth: "50%",
    },
    {
      title: "Назва",
      dataIndex: "kWPower",
      key: "kWPower",
      outerWidth: "50%",
    },
    {
      title: "Назва",
      dataIndex: "fuel",
      key: "fuel",
      outerWidth: "50%",
    },
    {
      title: "Дії",
      dataIndex: "actions",
      key: "actions",
      outerWidth: "40%",
      render: (text: string, record: IEngineModel) => (
        <div className="buttonGroup">
          <Button
            htmlType="submit"
            type="default"
            className="buttonInfo"
            onClick={() => handleEditClick(record)}
          >
            Редагувати
          </Button>
          &nbsp;
          <Popconfirm
            title={`Ви впевнені що хочете видалити цю марку?`}
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
    await getPaginatedEngines(paginationModel).then((data) => {
      setPaginatedEngines(data as IPaginationRequest<IEngineModel>);
    });
  };
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const paginationModel: IPaginationModel = {
      search: e.target.value,
      page: 1,
      countOnPage: countOnPage,
    };
    await getPaginatedEngines(paginationModel).then((data) => {
      setPaginatedEngines(data as IPaginationRequest<IEngineModel>);
    });
  };

  return (
    <div>
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
            onClick={showModalAddNewEngine}
          >
            Додати нову марку авто
          </Button>
        </Col>
      </Row>

      <FormModal
        title="Додавання нової марки авто"
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
            rules={[{ required: true, message: "Введіть нову марку машини" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Об'єм двигуна (см³)"
            name="capacity"
            rules={[{ required: true, message: "Введіть нову марку машини" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Потужність у kw"
            name="kWPower"
            rules={[{ required: true, message: "Введіть нову марку машини" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="fuel"
            label="Тип палива"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select a option and change input text above"
              allowClear
            >
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
        }}
      />
    </div>
  );
};

export default EnginePage;
