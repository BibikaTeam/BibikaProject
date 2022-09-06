import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    IBrandModel,
    IPaginationBrandModel,
    IPaginationBrandRequest,
    IPaginationModel,
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
import { getUserPostEmail } from "./service";

import type { NotificationPlacement } from "antd/lib/notification";
const Context = React.createContext({ name: "Default" });

const AdminPanelPostPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [isModalAdd, setModalAdd] = useState(false);
    const [paginatedBrands, setPaginatedBrands] =
        useState<IPaginationBrandRequest>({
            allPages: 0,
            currentPage: 0,
            data: [],
        });
    const countOnPage: number = 10;

    const [form] = Form.useForm();

    let key = ``;

    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        const init = async () => {
        };
        init();
    }, []);

    const handleGetAllPostsUser = async () => {
        const userEmail = "vaxodi1964@qqhow.com";
        setLoading(true);
        try {
            console.log("handle user email", userEmail);
            
            const userPost = await getUserPostEmail(userEmail);

            console.log("user post", userPost);
            

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

    const columns = [
        {
            title: "Назва посту",
            dataIndex: "title",
            key: "title",
            outerWidth: "30%",
        },
        {
            title: "Дії",
            dataIndex: "actions",
            key: "actions",
            outerWidth: "70%",
            render: (text: string, record: IBrandModel) => (
                <div className="buttonGroup">
                    <Button type="primary" htmlType="submit" className="danger">
                        Переглянути пост
                    </Button>
                    <Popconfirm
                        title={`Ви впевнені що хочете видалити цю марку?`}
                    //onConfirm={() => handleDeleteBrand(record)}
                    >
                        <Button type="primary" htmlType="submit" className="danger">
                            Видалити пост
                        </Button>
                    </Popconfirm>

                    <Button type="primary" htmlType="submit" className="danger">
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
                        // onChange={}
                        //onClick={}
                        style={{ width: "300px" }}
                    />
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
                    <Button
                        htmlType="button"
                        type="default"
                        className="buttonPrimary"
                    //onClick={showModalAddNewBrand}
                    >
                        Рекламувати пост
                    </Button>
                </Col>
            </Row>

            <FormModal
                title="Додавання нової марки авто"
                visible={isModalAdd}
                onCancel={() => setModalAdd(false)}
                onSubmit={() => {
                    //handleOkModalAddNewBrand
                }}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    //onFinish={handleFormSubmit}
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
                loading={loading}
            />
        </Context.Provider>
    )
}

export default AdminPanelPostPage;