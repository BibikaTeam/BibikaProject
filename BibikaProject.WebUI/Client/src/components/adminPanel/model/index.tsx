import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  IModelModel,
  IAddModelModel,
  ModelErrorType,
  IPaginationModelModel,
  IPaginationModelRequest,
  IBrandModel,
} from "../types";

import { FormModal, AntdSelect } from "../../common/form";

import {
  Input,
  Form,
  Button,
  Popconfirm,
  Table,
  Select,
  Row,
  Col,
  notification,
} from "antd";

import { addModel, deleteModal, getPaginatedModels } from "./service";

import { getAllBrands } from "../brand/service";

import type { NotificationPlacement } from "antd/lib/notification";
const Context = React.createContext({ name: "Default" });

const { Option } = Select;

const ModelPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [brandLoading, setBrandLoading] = useState<boolean>(false);
  const [isModalAdd, setModalAdd] = useState(false);
  const [paginatedModels, setPaginatedModels] =
    useState<IPaginationModelRequest>({
      allPages: 0,
      currentPage: 0,
      data: [],
    });
  const [selectedBrand, setSelectedBrand] = useState<number>(0);
  const [brandsList, setBrandsList] = useState<Array<IBrandModel>>([]);
  const countOnPage: number = 3;
  const [form] = Form.useForm();

  const [api, contextHolder] = notification.useNotification();

  let key = ``;

  useEffect(() => {
    const init = async () => {
      await handleGetAllModels();
    };
    const initBrandsList = async () => {
      await getAllBrands().then((data) => {
        setBrandsList(data);
      });
    };
    init();
    initBrandsList();
  }, []);

  const handleGetAllModels = async () => {
    setLoading(true);
    try {
      const paginationModel: IPaginationModelModel = {
        brandId: 0,
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
      openNotification("bottomRight");
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
        data: paginatedModels.data.filter((x) => x.id != value.id),
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
    };
    handleAddModel(newModel);
  };

  const onHandlePaginationChanged = async (page: number, pageSize: number) => {
    const paginationModel: IPaginationModelModel = {
      brandId: 0,
      search: "",
      page: page,
      countOnPage: pageSize,
    };
    await getPaginatedModels(paginationModel).then((data) => {
      setPaginatedModels(data as IPaginationModelRequest);
    });
  };
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const paginationModel: IPaginationModelModel = {
      brandId: 0,
      search: e.target.value,
      page: 1,
      countOnPage: countOnPage,
    };
    await getPaginatedModels(paginationModel).then((data) => {
      setPaginatedModels(data as IPaginationModelRequest);
    });
  };
  ///////////////////////////////////////////////////////////////////////////////////////////
  const handleSearchBrandChange = async (e: number) => {
    const paginationModel: IPaginationModelModel = {
      brandId: e,
      search: "",
      page: 1,
      countOnPage: countOnPage,
    };
    await getPaginatedModels(paginationModel).then((data) => {
      setPaginatedModels(data as IPaginationModelRequest);
    });
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
        handleGetAllModels();
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
        <div>
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
  ////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <Context.Provider value={{ name: "Ant Design" }}>
      {contextHolder}
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
            onChange={handleSearchBrandChange}
            options={brandsList}
            placeholder="Select brand"
            loading={brandLoading}
            disabled={false}
            allowClear={true}
          />
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Button
            htmlType="button"
            type="default"
            className="buttonPrimary"
            style={{ marginRight: 20 }}
            onClick={() => {
              handleGetAllModels();
            }}
          >
            Обновити таблицю
          </Button>
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
        loading={loading}
        pagination={{
          pageSize: countOnPage,
          total: paginatedModels.allPages * countOnPage,
          onChange: onHandlePaginationChanged,
        }}
      />
    </Context.Provider>
  );
};

export default ModelPage;
