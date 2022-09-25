import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IDataAdvertisingPost, IPostModel, IRequestError } from "../types";

import { FormModal } from "../../common/form";

import {
  Input,
  Form,
  Button,
  Popconfirm,
  Table,
  Row,
  Col,
  notification,
} from "antd";
import {
  addBannerShows,
  addTrendShows,
  deletePostUser,
  getAllPosts,
  getBannerViewsPost,
  getPointsPost,
  getTrendViewsPost,
  getUserPostsById,
} from "./service";
import type { NotificationPlacement } from "antd/lib/notification";
import { Link } from "react-router-dom";
const Context = React.createContext({ name: "Default" });

const AdminPanelPostPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalAdvertising, setModalAdvertising] = useState(false);
  const [userId, setUserId] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  const [dataAdvertisingPost, setDataAdvertisingPost] =
    useState<IDataAdvertisingPost>();
  const [form] = Form.useForm();

  let key = ``;

  //e4363ebc-40ff-422e-b394-89ec6cadacc3

  const [api, contextHolder] = notification.useNotification();

  const handleGetAllPostsUser = async () => {
    setLoading(true);
    try {
      setUserPosts(await getUserPostsById(userId));
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

  const handleAddTrendShows = async (postId: number, amount: number) => {
    setLoading(true);
    try {
      //await addTrendShows(postId, amount);
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

  const handleAddBannerShows = async (postId: number, amount: number) => {
    setLoading(true);
    try {
      //await addBannerShows(postId, amount);
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

  const handleDeletePost = async (post: IPostModel) => {
    setLoading(true);
    try {
      await deletePostUser(post.id);
      toast.success(`Brand ${post.id} are successfully deleted`);
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

  const showModalAdvertising = async (post: IPostModel) => {
    setLoading(true);
    try {
      const pointsTmp = await getPointsPost(post.id);
      const trendShowTmp = await getTrendViewsPost(post.id);
      const bannerShowTmp = await getBannerViewsPost(post.id);

      const advertisingPostTmp: IDataAdvertisingPost = {
        postId: post.id,
        points: pointsTmp,
        showTernd: trendShowTmp,
        showBanner: bannerShowTmp,
      };

      setDataAdvertisingPost(advertisingPostTmp);
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    } finally {
      setLoading(false);
      setModalAdvertising(true);
    }
  };

  const handleOkModalUpdadeAdvertising = () => {
    form.submit();
    setModalAdvertising(false);
  };

  const handleSearchUserEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserId(e.target.value);
  };

  const handleFormSubmit = (values: IDataAdvertisingPost) => {
    form.resetFields();
    if (values.showBanner !== undefined) {
      handleAddBannerShows(values.postId, values.showBanner);
    }
    if (values.showTernd !== undefined) {
      handleAddTrendShows(values.postId, values.showTernd);
    }
    form.resetFields();
  };

  const openNotification = (placement: NotificationPlacement) => {
    key = `open${Date.now()}`;
    api.warning({
      message: `Notification ${placement}`,
      description: (
        <Context.Consumer>
          {() => `Hello, click on me to refresh the table!`}
        </Context.Consumer>
      ),
      placement,
      duration: 0,
      key: key,
      onClick: () => {
        notification.close(key);
        handleGetAllPostsUser();
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
      title: "Назва посту",
      dataIndex: "car.title",
      key: "car.title",
      outerWidth: "50%",
    },
    {
      title: "Дії",
      dataIndex: "actions",
      key: "actions",
      outerWidth: "40%",
      render: (text: string, record: IPostModel) => (
        <div className="buttonGroup">
          <Link to={`/post/id=${record.id}`}>
            <Button
              type="primary"
              htmlType="submit"
              className="danger"
              style={{ marginRight: 20 }}
            >
              Переглянути пост
            </Button>
          </Link>
          <Popconfirm
            title={`Ви впевнені що хочете видалити цей пост?`}
            onConfirm={() => handleDeletePost(record)}
          >
            <Button
              type="primary"
              htmlType="submit"
              className="danger"
              style={{ marginRight: 20 }}
            >
              Видалити пост
            </Button>
          </Popconfirm>

          <Button
            type="primary"
            htmlType="submit"
            className="danger"
            onClick={() => showModalAdvertising(record)}
          >
            Рекламувати пост
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Context.Provider value={{ name: "Ant Design" }}>
      {contextHolder}
      {loading}
      <Row>
        <Col span={12}>
          <Input
            placeholder="Input user id"
            onChange={handleSearchUserEmailChange}
            style={{ width: "350px" }}
          />
          <Button
            type="primary"
            htmlType="submit"
            onClick={handleGetAllPostsUser}
            style={{ marginLeft: 20 }}
          >
            Search
          </Button>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Button
            htmlType="button"
            type="default"
            className="buttonPrimary"
            style={{ marginRight: 20 }}
            onClick={() => {
              handleGetAllPostsUser();
            }}
          >
            Обновити таблицю
          </Button>
        </Col>
      </Row>

      <FormModal
        title="Реклама посту"
        visible={isModalAdvertising}
        onCancel={() => setModalAdvertising(false)}
        onSubmit={handleOkModalUpdadeAdvertising}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={handleFormSubmit}
          autoComplete="off"
          form={form}
        >
          <Form.Item label="очок" name="points">
            <Input
              defaultValue={dataAdvertisingPost?.points}
              value={dataAdvertisingPost?.points}
            ></Input>
          </Form.Item>
          <Form.Item
            label="показів тренд"
            name="showTrends"
            //rules={[{ required: true, message: "Введіть нову марку машини" }]}
          >
            <Input
              defaultValue={dataAdvertisingPost?.showTernd}
              value={dataAdvertisingPost?.showTernd}
            />
          </Form.Item>
          <Form.Item
            label="показів баннер"
            name="showBanner"
            //rules={[{ required: true, message: "Введіть нову марку машини" }]}
          >
            <Input
              defaultValue={dataAdvertisingPost?.showBanner}
              value={dataAdvertisingPost?.showBanner}
            />
          </Form.Item>
        </Form>
      </FormModal>
      <Table
        className="adminTable"
        size="large"
        dataSource={userPosts}
        columns={columns}
        rowKey="id"
        loading={loading}
      />
    </Context.Provider>
  );
};

export default AdminPanelPostPage;
