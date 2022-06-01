import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  IModelModel,
  IAddModelModel,
  ModelErrorType,
  IPaginationModel,
  IPaginationModelRequest,
  IBrandModel
} from "../types";

import {
  FormModal,
  AntdSelect
} from "../../common/form";

import {
  Input,
  Form,
  Button,
  Popconfirm,
  Table,
  Pagination,
  Select,
  Row,
  Col,
} from "antd";

import {
  getAllModel,
  addModel,
  updateModel,
  deleteModal,
  getPaginatedModels
} from "./service";

import {
  getAllBrands
} from "../brand/service"

const { Option } = Select;

const ModelPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [brandLoading, setBrandLoading] = useState<boolean>(false);
  const [isModalAdd, setModalAdd] = useState(false);
  const [isModalEdit, setModalEdit] = useState(false);
  const [paginatedModels, setPaginatedModels] = useState<IPaginationModelRequest>({
    allPages: 0,
    currentPage: 0,
    data: [],
  })
  const [selectedBrand, setSelectedBrand] = useState<number>(0);
  const [selectedEditBrand, setSelectedEditBrand] = useState<string>("");
  const [editableValue, setEditableValue] = useState<IModelModel>({
    id: 0,
    title: "",
    brandTitle: "",
  })
  const [brandsList, setBrandsList] = useState<Array<IBrandModel>>([]);
  const countOnPage: number = 3;
  const [form] = Form.useForm();

  useEffect(() => {
    const init = async () => {
      await handleGetAllModels();
    };
    const initBrandsList = async () => {
      await getAllBrands().then((data) => {
        setBrandsList(data);
      })
    }
    init();
    initBrandsList();
  }, []);

  const handleGetAllModels = async () => {
    setLoading(true);
    try {
      const paginationModel: IPaginationModel = {
        search: "",
        page: 1,
        countOnPage: countOnPage,
      };
      await getPaginatedModels(paginationModel).then((data) => {
        setPaginatedModels(data as IPaginationModelRequest);
      });
    } catch (error) {
      const errorType = error as ModelErrorType;
      errorType.errorsString.forEach((el) => {
        toast.error(el);
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddModel = async (values: IAddModelModel) => {
    setLoading(true);
    try {
      await addModel(values);
      toast.success(`Model ${values.title} are successfully added`);
    } catch (error) {
      const errorType = error as ModelErrorType;
      errorType.errorsString.forEach((el) => {
        toast.error(el);
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateModel = async (value: IModelModel) => {
    console.log("edit value", value);
    console.log("select edit brand", selectedEditBrand);
    
    value.brandTitle = selectedEditBrand;
    console.log("edit value update", value);
    setLoading(true);
    try {
      await updateModel(value);
      toast.success(`Model ${value.title} are successfully update`);
    } catch (error) {
      const errorType = error as ModelErrorType;
      errorType.errorsString.forEach((el) => {
        toast.error(el);
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteModel = async (value: IModelModel) => {
    console.log("value: ", value);
    setLoading(true);
    try {
      await deleteModal(value.id);
      toast.success(`Model ${value.title} are successfully deleted`);

      setPaginatedModels({
        ...paginatedModels,
        data: paginatedModels.data.filter((x) => x.id != value.id)
      });
    } catch (error) {
      const errorType = error as ModelErrorType;
      errorType.errorsString.forEach((el) => {
        toast.error(el);
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBrandChange = (value: number) => {
    setSelectedBrand(value);
  };

  const handleBrandTitleChange = (value: string) => {
    setSelectedEditBrand(value);
    console.log("value brand title", value);
    
  };

  const handleEditClick = async (record: IModelModel) => {
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
      title: "Назва моделі",
      dataIndex: "title",
      key: "title",
      outerWidth: "30%",
    },
    {
      title: "Назва марки",
      dataIndex: "brandTitle",
      key: "brandTitle",
      outerWidth: "30%",
    },
    {
      title: "Дії",
      dataIndex: "actions",
      key: "actions",
      outerWidth: "30%",
      render: (text: string, record: IModelModel) => (
        <div className="buttonGroup">
          <Button
            htmlType="submit"
            type="default"
            className="buttonInfo"
            onClick={() => { handleEditClick(record) }}
          >
            Редагувати
          </Button>
          <FormModal
            title="Редагувавання моделі авто"
            visible={isModalEdit}
            onCancel={() => {
              setModalEdit(false)
              setEditableValue({
                id: 0,
                title: "",
                brandTitle: "",
              });
            }}
            onSubmit={() => { 
              form.submit();
              setModalEdit(false) 
            }}
          >
            <Form
              name="basic"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 16 }}
              onFinish={handleUpdateModel}
              autoComplete="off"
              form={form}
            >
              <Form.Item
                label="Зміна назви моделі машини"
                name="title"
                initialValue={editableValue.title}
                rules={[
                  {
                    required: true,
                    message: "Введіть нову назву моделі машини",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Виберіть марку авто"
                name="brandTitle"
                initialValue={editableValue.brandTitle}
                rules={[{ required: true, message: "Виберіть модель машини" }]}
              >
                <AntdSelect
                  value={selectedEditBrand}
                  onChange={handleBrandTitleChange}
                  options={brandsList}
                  placeholder="Select brand"
                  loading={brandLoading}
                  disabled={false}
                />
              </Form.Item>
            </Form>
          </FormModal>
          &nbsp;
          <Popconfirm
            title={`Ви впевнені що хочете видалити цю модель?`}
            onConfirm={() => handleDeleteModel(record)}
          >
            <Button type="primary" htmlType="submit" className="danger">
              Видалити
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const showModalAddNewModal = () => {
    setModalAdd(true);
  };

  const handleOkModalAddNewModel = () => {
    form.submit();
    setModalAdd(false);
  };
  const handleFormSubmit = (value: IModelModel) => {
    const newModel: IAddModelModel = {
      title: value.title,
      brandId: selectedBrand,
    }
    handleAddModel(newModel);
  };

  const onHandlePaginationChanged = async (page: number, pageSize: number) => {
    const paginationModel: IPaginationModel = {
      search: "",
      page: page,
      countOnPage: pageSize,
    };
    await getPaginatedModels(paginationModel).then((data) => {
      setPaginatedModels(data as IPaginationModelRequest);
    });
  };
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const paginationModel: IPaginationModel = {
      search: e.target.value,
      page: 1,
      countOnPage: countOnPage,
    };
    await getPaginatedModels(paginationModel).then((data) => {
      setPaginatedModels(data as IPaginationModelRequest);
    });
  };

  return (
    <div>
      {loading}

      <Row>
        <Col span={12}>
          <Input
            placeholder="Input model name"
            onChange={handleSearchChange}
            style={{ width: "300px" }}
          />
          &nbsp;
          <AntdSelect
            value={undefined}
            onChange={handleBrandChange}
            options={brandsList}
            placeholder="Select brand"
            loading={brandLoading}
            disabled={false} 
            // filterOption={(input, option) =>
            //   (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
            // }
          />
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Button
            htmlType="button"
            type="default"
            className="buttonPrimary"
            onClick={showModalAddNewModal}
          >
            Додати нову модель авто
          </Button>
        </Col>
      </Row>
      <FormModal
        title="Додавання нової моделі авто"
        visible={isModalAdd}
        onCancel={() => setModalAdd(false)}
        onSubmit={handleOkModalAddNewModel}
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
            label="Назва моделі"
            name="title"
            rules={[{ required: true, message: "Введіть нову модель машини" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Виберіть марку авто"
            name="brandTitle"
            rules={[{ required: true, message: "Виберіть марку машини" }]}
          >
            <AntdSelect
              value={selectedBrand}
              onChange={handleBrandChange}
              options={brandsList}
              placeholder="Select brand"
              loading={brandLoading}
              disabled={false}
            />
          </Form.Item>
        </Form>
      </FormModal>

      <Table
        className="adminTable"
        size="large"
        dataSource={paginatedModels.data}
        columns={columns}
        rowKey="id"
        pagination={{
          pageSize: countOnPage,
          total: paginatedModels.allPages * countOnPage,
          onChange: onHandlePaginationChanged,
        }}
      />
    </div>
  );
};

export default ModelPage;
