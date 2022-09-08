import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    IPostModel,
    IRequestError,
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
    notification,
} from "antd";
import { deletePostUser, getAllPosts, getUserPostEmail } from "./service";
import type { NotificationPlacement } from "antd/lib/notification";
const Context = React.createContext({ name: "Default" });

const AdminPanelPostPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [isModalAdvertising, setModalAdvertising] = useState(false);
    const [userId, setUserId] = useState("");
    const [userPosts, setUserPosts] = useState([]);
    const [form] = Form.useForm();

    let key = ``;

    const [api, contextHolder] = notification.useNotification();

    const handleGetAllPostsUser = async () => {
        setLoading(true);
        try {
            setUserPosts(await getUserPostEmail(userId));
        } catch (_error) {
            const error: IRequestError = _error as IRequestError;
            error.errors.forEach((e) => {
                toast.error(e);
            });
        } finally {
            setLoading(false);
            notification.close(key);
        }
    }
    
    const handleGetAllPosts = async () => {
        setLoading(true);
        try {
            console.log("get all post index", await getAllPosts());
            setUserPosts(await getAllPosts());
            console.log("user posts", userPosts);
        } catch (_error) {
            const error: IRequestError = _error as IRequestError;
            error.errors.forEach((e) => {
                toast.error(e);
            });
        } finally {
            setLoading(false);
            notification.close(key);
        }
    }

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
    }

    const showModalAdvertising = () => {
        setModalAdvertising(true);
    };

    const handleOkModalUpdadeAdvertising = () => {
        form.submit();
        setModalAdvertising(false);
    };

    const handleSearchUserEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(e.target.value);
    };

    const handleFormSubmit = () => {
        //handleAddBrand(value);
    };

    const openNotification = (placement: NotificationPlacement) => {
        key = `open${Date.now()}`;
        api.warning({
          message: `Notification ${placement}`,
          description: (
            <Context.Consumer>{() => `Hello, click on me to refresh the table!`}</Context.Consumer>
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
            title: "Назва посту",
            dataIndex: "id",
            key: "id",
            outerWidth: "60%",
        },
        {
            title: "Дії",
            dataIndex: "actions",
            key: "actions",
            outerWidth: "40%",
            render: (text: string, record: IPostModel) => (
                <div className="buttonGroup">
                    <Button type="primary" htmlType="submit" className="danger" style={{ marginRight: 20 }}>
                        Переглянути пост
                    </Button>
                    <Popconfirm
                        title={`Ви впевнені що хочете видалити цей пост?`}
                        onConfirm={() => handleDeletePost(record)}
                    >
                        <Button type="primary" htmlType="submit" className="danger" style={{ marginRight: 20 }}>
                            Видалити пост
                        </Button>
                    </Popconfirm>

                    <Button type="primary" htmlType="submit" className="danger" onClick={showModalAdvertising}>
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
                    <Button type="primary" htmlType="submit" onClick={handleGetAllPostsUser} style={{ marginLeft: 20 }}>Search</Button>
                </Col>
                <Col span={12} style={{ textAlign: "right" }}>
                    <Button
                        htmlType="button"
                        type="default"
                        className="buttonPrimary"
                        style={{ marginRight: 20 }}
                        onClick={() => {handleGetAllPostsUser();}}
                    >
                        Обновити таблицю
                    </Button>
                </Col>
            </Row>

            <FormModal
                title="Реклама посту"
                visible={isModalAdvertising}
                onCancel={() => setModalAdvertising(false)}
                onSubmit={handleOkModalUpdadeAdvertising}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={handleFormSubmit}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item
                        label="очок"
                        name="title"
                    //rules={[{ required: true, message: "Введіть нову марку машини" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="показів посту"
                        name="title"
                    //rules={[{ required: true, message: "Введіть нову марку машини" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="показів баннер"
                        name="title"
                    //rules={[{ required: true, message: "Введіть нову марку машини" }]}
                    >
                        <Input />
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
    )
}

export default AdminPanelPostPage;