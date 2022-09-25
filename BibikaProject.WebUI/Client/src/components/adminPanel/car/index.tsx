import * as React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllBrands } from "../brand/service";
import { getGenerationsByModelId } from "../generation/service";
import { getModelsByBrand } from "../model/service";
import { FormModal } from "../../common/form";
import {
  IBrandModel,
  ICarBodyModel,
  ICarModel,
  ICompleteSetModel,
  IEngineModel,
  IGearboxModel,
  IGenerationModel,
  IModelModel,
  IPaginationCarModel,
  IPaginationRequest,
  IRequestError,
} from "../types";
import {
  addCar,
  deleteCar,
  getAllCarBodies,
  getAllGearboxes,
  getCarsByPaginationModel,
} from "./service";

import { Table, notification, Popconfirm, Button, Select, Row, Col, Form } from "antd";
import type { NotificationPlacement } from "antd/lib/notification";
import { getAllEngines } from "../engine/service";
import { getAllCompleteSets } from "../completeSet/service";

const Context = React.createContext({ name: "Default" });

const CarPage = () => {
  const countOnPage: number = 100;
  const [api, contextHolder] = notification.useNotification();

  const [loading, setLoading] = useState<boolean>(false);
  const [isModalAdd, setModalAdd] = useState(false);

  const [brands, setBrands] = useState<Array<IBrandModel>>([]);
  const [models, setModels] = useState<Array<IModelModel>>([]);
  const [generations, setGenerations] = useState<Array<IGenerationModel>>([]);
  const [engines, setEngines] = useState<Array<IEngineModel>>([]);
  const [carBodies, setCarBodies] = useState<Array<ICarBodyModel>>([]);
  const [completeSets, setCompleteSets] = useState<Array<ICompleteSetModel>>([]);
  const [gearboxes, setGearboxes] = useState<Array<IGearboxModel>>([]);

  const [currentBrand, setCurrentBrand] = useState<number>(0);
  const [currentModel, setCurrentModel] = useState<number>(0);

  const [form] = Form.useForm();

  const defaultPaginationModel = {
    page: 1,
    search: "",
    countOnPage: countOnPage,
    engineId: null,
    gearboxId: null,
    generationId: null,
    carBodyId: null,
    completeSetId: null,
  };
  const [paginationModel, setPaginationModel] = useState<IPaginationCarModel>(
    defaultPaginationModel
  );

  const [paginatedCars, setPaginatedCars] =
    useState<IPaginationRequest<ICarModel>>();

  let key = ``;

  useEffect(() => {
    (async () => {
      await setAllBrands();
      await updateCars();
      await setAllEngines();
      await setAllCarBodies();
      await setAllCopleteSets();
      await setAllGearboxes();
    })();
  }, []);

  //main
  const updateCars = async () => {
    try {
      await getCarsByPaginationModel(paginationModel).then((data) => {
        setPaginatedCars(data);
      });
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };
  const updateCarsByProp = async (paginationModel: IPaginationCarModel) => {
    try {
      await getCarsByPaginationModel(paginationModel).then((data) => {
        setPaginatedCars(data);
      });
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };

  const setAllBrands = async () => {
    try {
      await getAllBrands().then((data) => {
        setBrands(data);
      });
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };
  const setModelsByBrand = async (id: number) => {
    try {
      await getModelsByBrand(id).then((data) => {
        setModels(data as IModelModel[]);
      });
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };
  const setGenerationsByModel = async (id: number) => {
    try {
      await getGenerationsByModelId(id).then((data) => {
        setGenerations(data as IGenerationModel[]);
      });
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };
  const setAllEngines = async () => {
    try {
      await getAllEngines().then((data) => {
        setEngines(data as IEngineModel[]);
      });
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };
  const setAllCarBodies = async () => {
    try {
      await getAllCarBodies().then((data) => {
        setCarBodies(data as ICarBodyModel[]);
      });
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };

  const setAllCopleteSets = async () => {
    try {
      await getAllCompleteSets().then((data) => {
        setCompleteSets(data as ICompleteSetModel[]);
      })
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  }

  const setAllGearboxes = async () => {
    try {
      await getAllGearboxes().then((data) => {
        setGearboxes(data as IGearboxModel[]);
      });
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  }

  const handleUpdateCars = async () => {
    setLoading(true);
    try {
      await getCarsByPaginationModel(defaultPaginationModel).then((data) => {
      setPaginatedCars(data)});
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddCar = async (values: ICarModel) => {
    setLoading(true);
    try {
      await addCar(values);
      toast.success("Car are successfully added");
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

  //Delete
  const handleDeleteCar = async (record: ICarModel) => {
    try {
      await deleteCar(record.id);
      toast.success("Deleted car");
      handleUpdateCars();
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };

  //handles
  const handleBrandAddCar = async (value: number) => {
    if (value !== undefined) {
      setModelsByBrand(value);
    }
  };
  const handleModelAddCar = async (value: number) => {
    if (value !== undefined) {
      setGenerationsByModel(value);
    }
  };
  const handleGenerationAddCar = async (value: number) => {
    if (value !== undefined) {
      const tmpModel = { ...paginationModel, generationId: value };
      setPaginationModel(tmpModel);
    }
  };

  //handles changes
  const handleBrandChange = async (value: number) => {
    if (value !== undefined) {
      setCurrentBrand(value);
      setModelsByBrand(value);
    }
  };
  const handleModelChange = async (value: number) => {
    if (value !== undefined) {
      setCurrentModel(value);
      setGenerationsByModel(value);
    }
  };
  const handleGenerationChange = async (value: number) => {
    if (value !== undefined) {
      const tmpModel = { ...paginationModel, generationId: value };
      setPaginationModel(tmpModel);
      await updateCarsByProp(tmpModel);
    }
  };
  const handleEngineChange = async (value: number) => {
    const tmp = { ...paginationModel, engineId: value };
    setPaginationModel(tmp);
    await updateCarsByProp(tmp);
  };
  //handle clear
  const handleBrandClear = async () => {
    setCurrentBrand(0);
    setCurrentModel(0);
    const tmp = { ...paginationModel, generationId: 0 };
    setPaginationModel(tmp);
    await updateCarsByProp(tmp);
    setModels([]);
    setGenerations([]);
  };
  const handleModelClear = async () => {
    setCurrentModel(0);
    const tmp = { ...paginationModel, generationId: 0 };
    setPaginationModel(tmp);
    await updateCarsByProp(tmp);
    setModels([]);
    setGenerations([]);
  };
  const handleGenerationClear = async () => {
    const tmp = { ...paginationModel, generationId: 0 };
    setPaginationModel(tmp);
    await updateCarsByProp(tmp);
    setGenerations([]);
  };

  const handleOkModalAddNewCar = () => {
    form.submit();
    setModalAdd(false);
  };

  const handleFormSubmit = (value: ICarModel) => {
    handleAddCar(value);
  }

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
        handleUpdateCars();
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
      outerWidth: "15%",
    },
    {
      title: "Двигун",
      dataIndex: "engine.capacity",
      key: "engine.capacity",
      outerWidth: "15%",
    },
    {
      title: "Тип кузова",
      dataIndex: "carBodyTitle",
      key: "carBodyTitle",
      outerWidth: "15%",
    },
    {
      title: "Комплектація",
      dataIndex: "completeSetTitle",
      key: "completeSetTitle",
      outerWidth: "15%",
    },
    {
      title: "Трансмісія",
      dataIndex: "gearBoxTitle",
      key: "gearBoxTitle",
      outerWidth: "15%",
    },
    {
      title: "Дії",
      dataIndex: "actions",
      key: "actions",
      outerWidth: "15%",
      render: (text: string, record: ICarModel) => (
        <div className="buttonGroup">
          <Popconfirm
            title={`Ви впевнені що хочете видалити цю машину?`}
            onConfirm={() => handleDeleteCar(record)}
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
        <Col span={18}>
          <Select
            style={{ width: 200, marginRight: 20 }}
            placeholder="Select Brand"
            allowClear
            onChange={handleBrandChange}
            onClear={handleBrandClear}
          >
            {brands.map((brand: IBrandModel) => (
              <Select.Option key={brand.id}>{brand.title}</Select.Option>
            ))}
          </Select>
          <Select
            style={{ width: 200, marginRight: 20 }}
            placeholder="Select Model"
            allowClear
            onChange={handleModelChange}
            onClear={handleModelClear}
            disabled={currentBrand === 0 || currentBrand === undefined}
          >
            {models.map((model: IModelModel) => (
              <Select.Option key={model.id}>{model.title}</Select.Option>
            ))}
          </Select>
          <Select
            style={{ width: 200, marginRight: 20 }}
            placeholder="Select Generation"
            allowClear
            onChange={handleGenerationChange}
            onClear={handleGenerationClear}
            disabled={currentModel === 0 || currentModel === undefined}
          >
            {generations.map((model: IGenerationModel) => (
              <Select.Option key={model.id}>{model.title}</Select.Option>
            ))}
          </Select>
          {/* ---- */}
          <Select
            style={{ width: 200, marginRight: 20 }}
            placeholder="Select Engine"
            allowClear
            onChange={handleEngineChange}
          >
            {engines.map((model: IEngineModel) => (
              <Select.Option key={model.id}>{model.capacity} см³, {model.kwPower} kw, {model.fuel}</Select.Option>
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
              handleUpdateCars();
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
            Додати нове авто
          </Button>
        </Col>
      </Row>
      <FormModal
        title="Додавання нової збірки авто"
        visible={isModalAdd}
        onCancel={() => setModalAdd(false)}
        onSubmit={handleOkModalAddNewCar}
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
            label="Brand"
            name="brandId"
            rules={[{ required: true, message: "Виберіть марку машини" }]}
          >
            <Select
              placeholder="Select brand"
              onChange={handleBrandAddCar}
            >
              {brands.map((model: IBrandModel) => (
                <Select.Option key={model.id}>{model.title}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Model"
            name="modelId"
            rules={[{ required: true, message: "Виберіть модель машини" }]}
          >
            <Select
              placeholder="Select model"
              onChange={handleModelAddCar}
            >
              {models.map((model: IModelModel) => (
                <Select.Option key={model.id}>{model.title}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Generation"
            name="generationId"
            rules={[{ required: true, message: "Виберіть генерацію для машини" }]}
          >
            <Select
              placeholder="Select generation"
              onChange={handleGenerationAddCar}
            >
              {generations.map((model: IGenerationModel) => (
                <Select.Option key={model.id}>{model.title}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Engine"
            name="engineId"
            rules={[{ required: true, message: "Виберіть двигун для машини" }]}
          >
            <Select placeholder="Select engine">
              {engines.map((model: IEngineModel) => (
                <Select.Option key={model.id}>{model.capacity} см³, {model.kwPower} kw, {model.fuel}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Car body"
            name="carBodyId"
            rules={[{ required: true, message: "Виберіть тип кузова для машини" }]}
          >
            <Select placeholder="Select car body">
              {carBodies.map((model: ICarBodyModel) => (
                <Select.Option key={model.id}>{model.title}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Complete set"
            name="completeSetId"
            rules={[{ required: true, message: "Виберіть комплектацію для машини" }]}
          >
            <Select placeholder="Select complete set">
              {completeSets.map((model: ICompleteSetModel) => (
                <Select.Option key={model.id}>{model.title}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Gear box"
            name="gearBoxId"
            rules={[{ required: true, message: "Виберіть тип коробки передач для машини" }]}
          >
            <Select placeholder="Select gear box">
              {gearboxes.map((model: IGearboxModel) => (
                <Select.Option key={model.id}>{model.title}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </FormModal>
      <Table
        className="adminTable"
        size="large"
        dataSource={paginatedCars?.data}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: countOnPage,
          total: paginatedCars?.allPages,
          onChange: handleUpdateCars,
          current: paginatedCars?.currentPage,
        }}
      />
    </Context.Provider>
  );
};

export default CarPage;
