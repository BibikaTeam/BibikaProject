import React, { useEffect, useRef, useState } from "react";
import { Id, toast } from "react-toastify";
import {
  BrandErrorType,
  IBrandModel,
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
} from "antd";
import {
  getAllBrands,
  addBrand,
  updateBrand,
  deleteBrand,
  getPaginatedBrands,
} from "./service";

const BrandPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalAdd, setModalAdd] = useState(false);
  const [isModalEdit, setModalEdit] = useState(false);
  const [paginatedBrands, setPaginatedBrands] = useState<IPaginationRequest>({
    allPages: 0,
    currentPage: 0,
    data: [],
  });
  const countOnPage: number = 3;
  const [form] = Form.useForm();
  const [editableValue, setEditableValue] = useState<IBrandModel>({
    id: 0,
    title: "",
  });

  useEffect(() => {
    const init = async () => {
      await handleGetAllBrands();
    };
    init();
  }, []);

  const handleGetAllBrands = async () => {
    setLoading(true);
    try {
      const paginationModel: IPaginationModel = {
        search: "",
        page: 1,
        countOnPage: countOnPage,
      };
      await getPaginatedBrands(paginationModel).then((data) => {
        setPaginatedBrands(data as IPaginationRequest);
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

  const handleAddBrand = async (values: IBrandModel) => {
    setLoading(true);
    try {
      await addBrand(values);
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
  const handleUpdateBrand = async (value: IBrandModel) => {
    value.id = editableValue.id;
    setLoading(true);
    try {
      await updateBrand(value);
      toast.success(`Brand ${value.title} are successfully update`);
      setModalEdit(false);

      const tmpArr = paginatedBrands.data.slice();
      tmpArr[tmpArr.findIndex((x) => x.id === value.id)].title = value.title;
      setPaginatedBrands({
        ...paginatedBrands,
        data: tmpArr,
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
  const handleDeleteBrand = async (value: IBrandModel) => {
    console.log("value: ", value);
    setLoading(true);
    try {
      await deleteBrand(value.id);
      toast.success(`Brand ${value.title} are successfully deleted`);

      setPaginatedBrands({
        ...paginatedBrands,
        data: paginatedBrands.data.filter((x) => x.id != value.id),
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
  const handleEditClick = async (record: IBrandModel) => {
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
      title: "Дії",
      dataIndex: "actions",
      key: "actions",
      outerWidth: "40%",
      render: (text: string, record: IBrandModel) => (
        <div className="buttonGroup">
          <Button
            htmlType="submit"
            type="default"
            className="buttonInfo"
            onClick={() => handleEditClick(record)}
          >
            Редагувати
          </Button>
          <FormModal
            title="Редагувавання марки авто"
            visible={isModalEdit}
            onCancel={() => {
              setModalEdit(false);
              setEditableValue({ id: 0, title: "" });
            }}
            onSubmit={() => {
              form.submit();
            }}
          >
            <Form
              name="basic"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 16 }}
              onFinish={handleUpdateBrand}
              autoComplete="off"
              form={form}
            >
              <Form.Item
                label="Зміна назви марки машини"
                name="title"
                initialValue={editableValue.title}
                rules={[
                  {
                    required: true,
                    message: "Введіть нову назву марки машини",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}></Form.Item>
            </Form>
          </FormModal>
          &nbsp;
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

  const showModalAddNewBrand = () => {
    setModalAdd(true);
  };

  const handleOkModalAddNewBrand = () => {
    form.submit();
    setModalAdd(false);
  };
  const handleFormSubmit = (value: IBrandModel) => {
    handleAddBrand(value);
  };
  const onHandlePaginationChanged = async (page: number, pageSize: number) => {
    const paginationModel: IPaginationModel = {
      search: "",
      page: page,
      countOnPage: pageSize,
    };
    await getPaginatedBrands(paginationModel).then((data) => {
      setPaginatedBrands(data as IPaginationRequest);
    });
  };
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const paginationModel: IPaginationModel = {
      search: e.target.value,
      page: 1,
      countOnPage: countOnPage,
    };
    await getPaginatedBrands(paginationModel).then((data) => {
      setPaginatedBrands(data as IPaginationRequest);
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
        pagination={{
          pageSize: countOnPage,
          total: paginatedBrands.allPages * countOnPage,
          onChange: onHandlePaginationChanged,
        }}
      />
    </div>
  );
};

export default BrandPage;
