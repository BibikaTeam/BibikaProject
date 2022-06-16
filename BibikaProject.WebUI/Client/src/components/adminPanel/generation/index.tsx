import { Button, Col, Form, Popconfirm, Result, Row, Select, Table } from "antd";
import Input from "antd/lib/input/Input";
import { useEffect, useState, FC, useRef } from "react";
import { toast } from "react-toastify";
import { number } from "yup";
import { FormModal } from "../../common/form";
import { getAllBrands } from "../brand/service";
import { GenerationErrorType, IGenerationAddModel, IGenerationModel, IPaginationModel, IPaginationRequest, IBrandModel, BrandErrorType, IModelModel, ModelErrorType, IPaginationGenerationModel } from "../types";
import { addGeneration, deleteGeneration,  getModelsByBrand, getPaginatedGenerations } from "./service";

const GenerationPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalAdd, setModalAdd] = useState(false);
  const [form] = Form.useForm();
  const [paginatedGenerations, setPaginatedGenerations] = useState<IPaginationRequest<IGenerationModel>>({
    allPages: 0,
    currentPage: 0,
    data: [],
  });

  const [brands, setBrands] = useState<Array<IBrandModel>>([]);
  const [selectedBrand, setSelectedBrand] = useState<number>(0);
  const [models, setModels] = useState<Array<IModelModel>>([]);
  const [selectedModel, setSelectedModel] = useState<number>(0);

  const columns = [
      {
        title: "Id",
        dataIndex: "id",
        key: "id",
        outerWidth: "10%",
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
        title: "Генерація",
        dataIndex: "title",
        key: "title",
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

  const countOnPage: number = 3;

  const handleGetModelsByBrand = async (id: number) => {
    try {
      await getModelsByBrand(id).then((data) => {
        setModels(data as Array<IModelModel>);
      });
    } catch(error) {
      const errorType = error as ModelErrorType;
      errorType.errorsString.forEach((el) => {
        toast.error(el);
      });
    }
  }

  const handleGetAllBrands = async () => {
    try {
      await getAllBrands().then((data) => {
        setBrands(data as Array<IBrandModel>);
      });
    } catch(error) {
      const errorType = error as GenerationErrorType;
      errorType.errorsString.forEach((el) => {
        toast.error(el);
      });
    }
  }

  const handleBrandSelect = async (value: number) => {
    await handleGetModelsByBrand(value);  
    setSelectedBrand(value);
    let model: IPaginationGenerationModel = {
      search: "",
      page: 1,
      countOnPage: countOnPage,
      brandId: value,
      modelId: 0
    };
    await handleGetAllGenerations(model);
    }

    const handleBrandModalSelect = async (value: number) => {
      await handleGetModelsByBrand(value);  
    }

  const handleModelSelect = async (value: number) => {
    setSelectedModel(value);
    let model: IPaginationGenerationModel = {
      search: "",
      page: 1,
      countOnPage: countOnPage,
      brandId: selectedBrand,
      modelId: value
    };

    await handleGetAllGenerations(model);   
  }

  const handleBrandOnClear = async () => {
    let model: IPaginationGenerationModel = {
      search: "",
      page: 1,
      countOnPage: countOnPage,
      brandId: 0,
      modelId: 0
    };

    await handleGetAllGenerations(model); 

    setSelectedBrand(0);
  }

  const handleModeleOnClear = async () => {
    let model: IPaginationGenerationModel = {
      search: "",
      page: 1,
      countOnPage: countOnPage,
      brandId: selectedBrand,
      modelId: 0
    };

    await handleGetAllGenerations(model); 
  }
  
  const handleGetAllGenerations = async (model: IPaginationGenerationModel) => {
    setLoading(true);
    try {
      await getPaginatedGenerations(model).then((data) => {
        setPaginatedGenerations(data as IPaginationRequest<IGenerationModel>);
      });
    } catch (error) {
      const errorType = error as GenerationErrorType;
      errorType.errorsString.forEach((el) => {
        toast.error(el);
      });
    } finally {
      setLoading(false);
    }
  };

  const onHandlePaginationChanged = async (page: number, pageSize: number) => {
    const paginationModel: IPaginationGenerationModel = {
      search: "",
      page: page,
      countOnPage: pageSize,
      brandId: selectedBrand,
      modelId: selectedModel
    };
    await getPaginatedGenerations(paginationModel).then((data) => {
          setPaginatedGenerations(data as IPaginationRequest<IGenerationModel>);
    });
  };

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const paginationModel: IPaginationGenerationModel = {
      search: e.target.value,
      page: 1,
      countOnPage: countOnPage,
      brandId: selectedBrand,
      modelId: selectedModel
    };
    await getPaginatedGenerations(paginationModel).then((data) => {
      setPaginatedGenerations(data as IPaginationRequest<IGenerationModel>);
    });
  };

  const handleDeleteGeneration = async (value: IGenerationModel) => {
    console.log("value: ", value);
    setLoading(true);
    try {
      await deleteGeneration(value.id);
      toast.success(`Generation ${value.title} are successfully deleted`);

      setPaginatedGenerations({
        ...paginatedGenerations,
        data: paginatedGenerations.data.filter((x) => x.id != value.id),
      });
    } catch (error) {
      const errorType = error as GenerationErrorType;
      errorType.errorsString.forEach((el) => {
        toast.error(el);
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOkModalAddNewGeneration = () => {
    form.submit();
    setModalAdd(false);
  };

  const handleFormSubmit = (value: IGenerationAddModel) => {
    handleAddGeneration(value);
  };

  const handleAddGeneration = async (values: IGenerationAddModel) => {
    console.log(values);
    setLoading(true);
    try {
      await addGeneration(values);
      toast.success(`Generation ${values.title} are successfully added`);
    } catch (error) {
      const errorType = error as GenerationErrorType;
      errorType.errorsString.forEach((el) => {
        toast.error(el);
      });
    } finally {
      setLoading(false);
    }
  };

  const showModalAddNewGeneration = () => {
    setModalAdd(true);

  };

  useEffect(() => {
    const init = async () => {
      let model: IPaginationGenerationModel = {
        search: "",
        page: 1,
        countOnPage: countOnPage,
        brandId: selectedBrand,
        modelId: selectedModel
      };
      await handleGetAllGenerations(model);
      await handleGetAllBrands();
    };
    init();
  }, []);

  return (
    <div>
        <Row>
          <Col span={6}>
            <Input
              placeholder="Input generation name"
              onChange={handleSearchChange}
              style={{ width: "300px" }}
            />
          </Col>
          <Col span={6}>
            <Select
              placeholder="Select Brand"
              allowClear
              onChange={handleBrandSelect}
              onClear={handleBrandOnClear}
              >
              {
                brands.map((brand: IBrandModel) => <Select.Option key={brand.id}>{brand.title}</Select.Option>)
              }
            </Select>
          </Col>
          <Col span={6}>
            <Select
              disabled = { selectedBrand == 0 ? true : false }
              placeholder="Select Model"
              allowClear
              onChange={handleModelSelect}
              onClear={handleModeleOnClear}
              >
              {
                models.map((model: IModelModel) => <Select.Option key={model.id}>{model.title}</Select.Option>)
              }
            </Select>
          </Col>
          <Col span={6} style={{ textAlign: "right" }}>
          <Button
            htmlType="button"
            type="default"
            className="buttonPrimary"
            onClick={showModalAddNewGeneration}
          >
            Додати нову марку авто
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
            rules={[{ required: true, message: "Введіть нову генерацію машини" }]}
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
              {
                brands.map((brand: IBrandModel) => <Select.Option key={brand.id}>{brand.title}</Select.Option>)
              }
            </Select>
          </Form.Item>
          <Form.Item
            label="Model"
            name="modelId"
            rules={[{ required: true, message: "Введіть модель для машини" }]}
          >
             <Select
              placeholder="Select Model"
              >
              {
                models.map((model: IModelModel) => <Select.Option key={model.id}>{model.title}</Select.Option>)
              }
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
          pagination={{
            pageSize: countOnPage,
            total: paginatedGenerations.allPages * countOnPage,
            onChange: onHandlePaginationChanged,
          }}
        />
    </div>
  )
}

export default GenerationPage;
