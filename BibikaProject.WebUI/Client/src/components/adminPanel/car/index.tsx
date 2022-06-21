import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { getAllBrands } from "../brand/service";
import { getGenerationsByModelId } from "../generation/service";
import { getModelsByBrand } from "../model/service";
import {
  IBrandModel,
  ICarBodyModel,
  ICarModel,
  IEngineModel,
  IGenerationModel,
  IModelModel,
  IPaginationCarModel,
  IPaginationRequest,
  IRequestError,
} from "../types";
import {
  deleteCar,
  getAllCarBodies,
  getCarsByPaginationModel,
} from "./service";

import { Table, notification, Popconfirm, Button } from "antd";
import type { NotificationPlacement } from "antd/lib/notification";
import { getAllEngines } from "../engine/service";

const Context = React.createContext({ name: "Default" });
const [api, contextHolder] = notification.useNotification();

const AdminPanelPage = () => {
  const pageSize = 3;

  const [loading, setLoading] = useState<boolean>(false);

  const [brands, setBrands] = useState<Array<IBrandModel>>([]);
  const [models, setModels] = useState<Array<IModelModel>>([]);
  const [generations, setGenerations] = useState<Array<IGenerationModel>>([]);
  const [engines, setEngines] = useState<Array<IEngineModel>>([]);
  const [carBodies, setCarBodies] = useState<Array<ICarBodyModel>>([]);

  const defaultPaginationModel = {
    page: 1,
    search: "",
    countOnPage: pageSize,
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

  useEffect(() => {
    (async () => {
      await setAllBrands();
      await updateCars();
    })();
  });

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
  const setGenerationsByBrand = async (id: number) => {
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
  const updateCars = async () => {
    try {
      await getCarsByPaginationModel(
        paginationModel as IPaginationCarModel
      ).then((data) => {
        setPaginatedCars(data);
      });
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };
  const handleCompleteSetDelete = async (record: ICarModel) => {
    try {
      await deleteCar(record.id);
      toast.success("Deleted");
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
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
            title={`Ви впевнені що хочете видалити цю комплектацію?`}
            onConfirm={() => handleCompleteSetDelete(record)}
          >
            <Button type="primary" htmlType="submit" className="danger">
              Видалити
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return () => {
    <Context.Provider value={{ name: "Ant Design" }}>
      {contextHolder}
      {loading}

      <Table
        className="adminTable"
        size="large"
        dataSource={paginatedCars?.data}
        columns={columns}
        rowKey="id"
        loading={loading}
      />
    </Context.Provider>;
  };
};

export default AdminPanelPage;
