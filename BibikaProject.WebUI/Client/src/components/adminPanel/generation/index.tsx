import * as React from "react";
import {
  Button,
  Col,
  Form,
  Popconfirm,
  Result,
  Row,
  Select,
  Table,
  notification,
} from "antd";
import Input from "antd/lib/input/Input";
import { useEffect, useState, FC, useRef } from "react";
import { toast } from "react-toastify";
import { number } from "yup";
import { FormModal } from "../../common/form";
import {
  IGenerationAddModel,
  IGenerationModel,
  IPaginationModel,
  IPaginationRequest,
  IBrandModel,
  IModelModel,
  IPaginationGenerationModel,
  IRequestError,
} from "../types";
import {
  addGeneration,
  deleteGeneration,
  getPaginatedGenerations,
} from "./service";
import { getAllBrands } from "../brand/service";
import { getModelsByBrand } from "../model/service";

import type { NotificationPlacement } from "antd/lib/notification";
const Context = React.createContext({ name: "Default" });

const GenerationPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalAdd, setModalAdd] = useState(false);
  const [form] = Form.useForm();
  const [paginatedGenerations, setPaginatedGenerations] = useState<
    IPaginationRequest<IGenerationModel>
  >({
    allPages: 0,
    currentPage: 0,
    data: [],
  });

  const [brands, setBrands] = useState<Array<IBrandModel>>([]);
  const [selectedBrand, setSelectedBrand] = useState<number>(0);
  const [models, setModels] = useState<Array<IModelModel>>([]);
  const [selectedModel, setSelectedModel] = useState<number>(0);
  const countOnPage: number = 3;

  const defaultPaginationRequest: IPaginationGenerationModel = {
    page: 1,
    countOnPage: countOnPage,
    search: "",
    brandId: 0,
    modelId: 0,
  };

  let paginationRequest: IPaginationGenerationModel = {
    ...defaultPaginationRequest,
  };

  const [api, contextHolder] = notification.useNotification();
  let key = ``;

  useEffect(() => {
    const init = async () => {
      await handleGetAllGenerations(defaultPaginationRequest);
      await handleGetAllBrands();
    };
    init();
  }, []);

  const handleGetModelsByBrand = async (id: number) => {
    try {
      await getModelsByBrand(id).then((data) => {
        setModels(data as Array<IModelModel>);
      });
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
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

  const handleBrandSelect = async (value: number) => {
    await handleGetModelsByBrand(value);
    setSelectedBrand(value);

    paginationRequest = { ...defaultPaginationRequest, brandId: value };

    await handleGetAllGenerations(paginationRequest);
  };

  const handleBrandModalSelect = async (value: number) => {
    await handleGetModelsByBrand(value);
  };

  const handleModelSelect = async (value: number) => {
    setSelectedModel(value);

    paginationRequest = {
      ...defaultPaginationRequest,
      brandId: selectedBrand,
      modelId: value,
    };

    await handleGetAllGenerations(paginationRequest);
  };

  const handleBrandOnClear = async () => {
    setSelectedBrand(0);

    paginationRequest = { ...defaultPaginationRequest };

    await handleGetAllGenerations(paginationRequest);
  };
  const handleModeleOnClear = async () => {
    paginationRequest = { ...defaultPaginationRequest, brandId: selectedBrand };

    await handleGetAllGenerations(paginationRequest);
  };

  const handleGetAllGenerations = async (model: IPaginationGenerationModel) => {
    setLoading(true);
    try {
      await getPaginatedGenerations(model).then((data) => {
        setPaginatedGenerations(data as IPaginationRequest<IGenerationModel>);
      });
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

  const onHandlePaginationChanged = async (page: number, pageSize: number) => {
    paginationRequest = {
      ...defaultPaginationRequest,
      page: page,
      brandId: selectedBrand,
      modelId: selectedModel,
    };
    await handleGetAllGenerations(paginationRequest);
  };

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    paginationRequest = {
      ...defaultPaginationRequest,
      search: e.target.value,
      brandId: selectedBrand,
      modelId: selectedModel,
    };

    await handleGetAllGenerations(paginationRequest);
  };

  const handleDeleteGeneration = async (value: IGenerationModel) => {
    setLoading(true);
    try {
      await deleteGeneration(value.id);
      toast.success(`Generation ${value.title} are successfully deleted`);

      setPaginatedGenerations({
        ...paginatedGenerations,
        data: paginatedGenerations.data.filter((x) => x.id != value.id),
      });
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
    setLoading(false);
  };

  const handleOkModalAddNewGeneration = () => {
    form.submit();
    setModalAdd(false);
  };

  const handleFormSubmit = (value: IGenerationAddModel) => {
    handleAddGeneration(value);
  };

  const handleAddGeneration = async (values: IGenerationAddModel) => {
    setLoading(true);
    try {
      await addGeneration(values);
      toast.success(`Generation ${values.title} are successfully added`);
      openNotification("bottomRight");
      form.resetFields();
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    } finally {
      setLoading(false);
    }
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
        notification.close(key);
        handleGetAllGenerations(defaultPaginationRequest);
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
      title: "Генерація",
      dataIndex: "title",
      key: "title",
      outerWidth: "20%",
    },
    {
      title: "Марка",
      dataIndex: "brandTitle",
      key: "brandTitle",
      outerWidth: "20%",
    },
    {
      title: "Модель",
      dataIndex: "modelTitle",
      key: "modelTitle",
      outerWidth: "20%",
    },
    {
      title: "Дії",
      dataIndex: "actions",
      key: "actions",
      outerWidth: "30%",
      render: (text: string, record: IGenerationModel) => (
        <div className="buttonGroup">
          &nbsp;
          <Popconfirm
            title={`Ви впевнені що хочете видалити цю марку?`}
            onConfirm={() => handleDeleteGeneration(record)}
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
      <Row>
        <Col span={18}>
          <Input
            placeholder="Input generation name"
            onChange={handleSearchChange}
            style={{ width: 300, marginRight: 20 }}
          />
          <Select
            style={{ width: 200, marginRight: 20 }}
            placeholder="Select Brand"
            allowClear
            onChange={handleBrandSelect}
            onClear={handleBrandOnClear}
          >
            {brands.map((brand: IBrandModel) => (
              <Select.Option key={brand.id}>{brand.title}</Select.Option>
            ))}
          </Select>
          <Select
            style={{ width: 200 }}
            disabled={selectedBrand == 0 ? true : false}
            placeholder="Select Model"
            allowClear
            onChange={handleModelSelect}
            onClear={handleModeleOnClear}
          >
            {models.map((model: IModelModel) => (
              <Select.Option key={model.id}>{model.title}</Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={6} style={{ textAlign: "right" }}>
          <Button
            htmlType="button"
            type="default"
            className="buttonPrimary"
            style={{ marginRight: 20 }}
            onClick={() => {
              handleGetAllGenerations(defaultPaginationRequest);
            }}
          >
            Обновити таблицю
          </Button>
          <Button
            htmlType="button"
            type="default"
            className="buttonPrimary"
            onClick={() => setModalAdd(true)}
          >
            Додати нову генерацію авто
          </Button>
        </Col>
      </Row>
      <FormModal
        title="Додавання нової генерації авто"
        visible={isModalAdd}
        onCancel={() => setModalAdd(false)}
        onSubmit={handleOkModalAddNewGeneration}
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
            label="Назва генерації"
            name="title"
            rules={[
              { required: true, message: "Введіть нову генерацію машини" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Brand"
            name="brandId"
            rules={[{ required: true, message: "Введіть марку для машини" }]}
          >
            <Select
              placeholder="Select Brand"
              onChange={handleBrandModalSelect}
            >
              {brands.map((brand: IBrandModel) => (
                <Select.Option key={brand.id}>{brand.title}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Model"
            name="modelId"
            rules={[{ required: true, message: "Введіть модель для машини" }]}
          >
            <Select placeholder="Select Model">
              {models.map((model: IModelModel) => (
                <Select.Option key={model.id}>{model.title}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </FormModal>
      <Table
        className="adminTable"
        size="large"
        dataSource={paginatedGenerations.data}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: countOnPage,
          total: paginatedGenerations.allPages * countOnPage,
          onChange: onHandlePaginationChanged,
          current: paginatedGenerations.currentPage,
        }}
      />
    </Context.Provider>
  );
};

export default GenerationPage;
