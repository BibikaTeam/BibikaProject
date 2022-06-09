import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  BrandErrorType,
  IBrandModel,
  IPaginationBrandModel,
  IPaginationBrandRequest,
} from "../types";

import { FormModal } from "../../common/form";

import {
  Input,
  Form,
  Button,
  Popconfirm,
  Table,
  Row,
  Col,
} from "antd";
import {
  addBrand,
  deleteBrand,
  getPaginatedBrands,
} from "./service";

const BrandPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalAdd, setModalAdd] = useState(false);
  const [paginatedBrands, setPaginatedBrands] = useState<IPaginationBrandRequest>({
    allPages: 0,
    currentPage: 0,
    data: [],
  });
  const countOnPage: number = 3;
  const [form] = Form.useForm();

  useEffect(() => {
    const init = async () => {
      await handleGetAllBrands();
    };
    init();
  }, []);

  const handleGetAllBrands = async () => {
    setLoading(true);
    try {
      const paginationModel: IPaginationBrandModel = {
        search: "",
        page: 1,
        countOnPage: countOnPage,
      };
      await getPaginatedBrands(paginationModel).then((data) => {
        setPaginatedBrands(data as IPaginationBrandRequest);
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
    const paginationModel: IPaginationBrandModel = {
      search: "",
      page: page,
      countOnPage: pageSize,
    };
    await getPaginatedBrands(paginationModel).then((data) => {
      setPaginatedBrands(data as IPaginationBrandRequest);
    });
  };
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const paginationModel: IPaginationBrandModel = {
      search: e.target.value,
      page: 1,
      countOnPage: countOnPage,
    };
    await getPaginatedBrands(paginationModel).then((data) => {
      setPaginatedBrands(data as IPaginationBrandRequest);
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
