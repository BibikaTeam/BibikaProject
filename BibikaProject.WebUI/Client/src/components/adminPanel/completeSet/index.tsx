import React, { useEffect, useRef, useState } from "react";
import { Id, toast } from "react-toastify";
import {
  IBrandModel,
  ICompleteSetAddDTO,
  ICompleteSetModel,
  IGenerationModel,
  IModelModel,
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
  getCompleteSetsByGeneration,
  addCompleteSet,
  deleteCompleteSet,
} from "./service";

import type { NotificationPlacement } from "antd/lib/notification";
import { getAllBrands } from "../brand/service";
import { getModelsByBrand } from "../model/service";
import { getGenerationsByModelId } from "../generation/service";

const Context = React.createContext({ name: "Default" });
const Option = Select.Option;

const CompleteSetPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalAdd, setModalAdd] = useState(false);
  const [searchedCompleteSets, setCompleteSets] = useState<
    Array<ICompleteSetModel>
  >([]);
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const [currentGenerationId, setCurrentGeneration] = useState<number>(-1);
  const [currentBrand, setCurrentBrand] = useState<number>(-1);
  const [currentModel, setCurrentModel] = useState<number>(-1);

  const [brands, setBrands] = useState<Array<IBrandModel>>([]);
  const [models, setModels] = useState<Array<IModelModel>>([]);
  const [generations, setGenerations] = useState<Array<IGenerationModel>>([]);

  let key = ``;

  useEffect(() => {
    (async () => {
      await handleGetAllBrands();
    })();
  }, []);

  const clearCompleteSets = () => {
    setCompleteSets([]);
  };

  const handleGetCompleteSets = async (generationId: number) => {
    setLoading(true);
    try {
      await getCompleteSetsByGeneration(generationId).then((x) =>
        setCompleteSets(x as ICompleteSetModel[])
      );
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

  const handleAddCompleteSet = async (values: ICompleteSetAddDTO) => {
    setLoading(true);
    try {
      await addCompleteSet(values);
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
  const handleCompleteSetDelete = async (value: ICompleteSetModel) => {
    setLoading(true);
    try {
      await deleteCompleteSet(value.id);
      toast.success(`Brand ${value.title} are successfully deleted`);

      setCompleteSets(searchedCompleteSets.filter((x) => x.id != value.id));
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    } finally {
      setLoading(false);
    }
  };

  const showModalAddNewEngine = () => {
    setModalAdd(true);
  };

  const handleOkModalAddNewEngine = () => {
    form.submit();
    setModalAdd(false);
  };
  const handleFormSubmit = (value: ICompleteSetAddDTO) => {
    handleAddCompleteSet(value);
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
        clearCompleteSets();
        getCompleteSetsByGeneration(currentGenerationId);
      },
    });
  };

  const handleGetAllBrands = async () => {
    try {
      await getAllBrands().then((data) => {
        setBrands(data as Array<IBrandModel>);
      });
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };
  const handleGetModelsByBrands = async (value: number) => {
    try {
      await getModelsByBrand(value).then((data) => {
        setModels(data as Array<IModelModel>);
      });
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };
  const handleGetGenerationsByModel = async (value: number) => {
    try {
      await getGenerationsByModelId(value).then((data) => {
        setGenerations(data as Array<IGenerationModel>);
      });
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };

  const onBrandHandleChange = async (value: number) => {
    setCurrentBrand(value);
    handleGetModelsByBrands(value);
  };
  const onModelHandleChange = async (value: number) => {
    setCurrentModel(value);
    handleGetGenerationsByModel(value);
  };
  const onGenerationHandleChange = async (value: number) => {
    setCurrentGeneration(value);
    getCompleteSetsByGeneration(value);
  };
  const onBrandHandleClear = async () => {};
  const onModelHandleClear = async () => {};
  const onGenerationHandleClear = async () => {};

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
      title: "Дії",
      dataIndex: "actions",
      key: "actions",
      outerWidth: "40%",
      render: (text: string, record: ICompleteSetModel) => (
        <div className="buttonGroup">
          <Popconfirm
            title={`Ви впевнені що хочете видалити цю комплектацію?`}
            onConfirm={() => handleCompleteSetDelete(record)}
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
        <Col span={16}>
          <Select
            style={{ width: 200, marginRight: 20 }}
            placeholder="Select Brand"
            allowClear
            onChange={onBrandHandleChange}
            onClear={onBrandHandleClear}
          >
            {brands.map((brand: IBrandModel) => (
              <Select.Option key={brand.id}>{brand.title}</Select.Option>
            ))}
          </Select>
          <Select
            style={{ width: 200, marginRight: 20 }}
            placeholder="Select Model"
            allowClear
            onChange={onModelHandleChange}
            onClear={onModelHandleClear}
            disabled={currentBrand === -1}
          >
            {models.map((model: IModelModel) => (
              <Select.Option key={model.id}>{model.title}</Select.Option>
            ))}
          </Select>
          <Select
            style={{ width: 200, marginRight: 20 }}
            placeholder="Select Generation"
            allowClear
            onChange={onGenerationHandleChange}
            onClear={onGenerationHandleClear}
            disabled={currentModel === -1}
          >
            {generations.map((model: IGenerationModel) => (
              <Select.Option key={model.id}>{model.title}</Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={8} style={{ textAlign: "right" }}>
          <Button
            htmlType="button"
            type="default"
            className="buttonPrimary"
            style={{ marginRight: 20 }}
            onClick={() => {
              handleGetCompleteSets(currentGenerationId);
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
            Додати нову комплектацію
          </Button>
        </Col>
      </Row>

      <FormModal
        title="Додавання нового комплектації"
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
            label="Назва комплектації"
            name="title"
            rules={[{ required: true, message: "Введіть назву комплектації" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </FormModal>
      <Table
        className="adminTable"
        size="large"
        dataSource={searchedCompleteSets}
        columns={columns}
        rowKey="id"
        loading={loading}
      />
    </Context.Provider>
  );
};

export default CompleteSetPage;
