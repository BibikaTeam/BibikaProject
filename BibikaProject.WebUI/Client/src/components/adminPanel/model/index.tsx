import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { 
  IModelModel, 
  ModelErrorType, 
  IBrandModel, 
  BrandErrorType
 } from "../types";

import { FormModal } from "../../common/form";

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
import { getAllModel, addModel, updateModel, deleteModal } from "./service";
const { Option } = Select;

const onChange = (value: string) => {
  console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
  console.log('search:', value);
};

const ModelPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalAdd, setModalAdd] = useState(false);
  const [isModalEdit, setModalEdit] = useState(false);
  const [models, setModels] = useState<Array<IModelModel>>([]);
  // const [brands, setBrands] = useState<Array<IBrandModel>>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const init = async () => {
      await handleGetAllModels();
    };
    init();
  }, []);

  const handleGetAllModels = async () => {
    setLoading(true);
    try {
      await getAllModel().then((data) => {
        setModels(data);
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

  const handleAddModel = async (values: IModelModel) => {
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

      setModels(models.filter((x) => x.id != value.id));
    } catch (error) {
      const errorType = error as ModelErrorType;
      errorType.errorsString.forEach((el) => {
        toast.error(el);
      });
    } finally {
      setLoading(false);
    }
  };

  const showModalUpdateModel = () => {
    setModalEdit(true);
  };

  const handleOkModalUpdateModel = () => {
    form.submit();
    setModalEdit(false);
  };
  const handleUpdateFormSubmit = (value: IModelModel) => {
    handleUpdateModel(value);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Назва моделі",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Назва марки",
      dataIndex: "brandTitle",
      key: "brandTitle",
    },
    {
      title: "Дії",
      dataIndex: "actions",
      key: "actions",
      render: (text: string, record: IModelModel) => (
        <div className="buttonGroup">
          <Button htmlType="submit" type="default" className="buttonInfo" onClick={showModalUpdateModel}>
            Редагувати
          </Button>
          <FormModal
            title="Редагувавання моделі авто"
            visible={isModalEdit}
            onCancel={() => setModalEdit(false)}
            onSubmit={handleOkModalUpdateModel}
          >
            <Form
              name="basic"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 16 }}
              onFinish={handleUpdateFormSubmit}
              autoComplete="off"
              form={form}
            >
              <Form.Item
                label="Зміна назви моделі машини"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Введіть нову назву моделі машини",
                  },
                ]}
              >
                <Input defaultValue={record.title} />
              </Form.Item>
              <Form.Item
                label="Виберіть марку авто"
                name="brandTitle"
                rules={[{ required: true, message: "Виберіть марку машини" }]}
              >
                <Select
                  showSearch
                  placeholder="Виберіть марку авто"
                  optionFilterProp="children"
                  onChange={onChange}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                  }
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
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
    handleAddModel(value);
  };

  return (
    <div>
      {loading}
      <Row>
        <Col span={12}>
          <Input
            placeholder="Input brand name"
            //onChange={handleSearchChange}
            style={{ width: "300px" }}
          />
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Button
            htmlType="button"
            type="default"
            className="buttonPrimary"
            //onClick={showModalAddNewBrand}
          >
            Додати нову марку авто
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
            label="Виберіть марку авто"
            name="brandTitle"
            rules={[{ required: true, message: "Виберіть марку машини" }]}
          >
            <Select
              showSearch
              placeholder="Виберіть марку авто"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) =>
                (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
              }
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Назва моделі"
            name="title"
            rules={[{ required: true, message: "Введіть нову модель машини" }]}
          >
            <Input />
          </Form.Item>

        </Form>
      </FormModal>

      <Table
        size="large"
        dataSource={models}
        columns={columns}
        rowKey="id"
      />
    </div>
  );
};

export default ModelPage;
