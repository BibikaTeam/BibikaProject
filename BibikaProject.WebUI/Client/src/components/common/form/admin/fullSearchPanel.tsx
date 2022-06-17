import * as React from "react";
import { useState, useEffect } from "react";

import { Select } from "antd";
import {
  IBrandModel,
  IGenerationModel,
  IModelModel,
  IRequestError,
} from "../../../adminPanel/types";
import { getModelsByBrand } from "../../../adminPanel/model/service";
import { toast } from "react-toastify";
import { getAllBrands } from "../../../adminPanel/brand/service";
import { getGenerationsByModelId } from "../../../adminPanel/generation/service";

export interface IAdminSearchProps {
  getDataByBrand: (value: number) => {};
  getDataByModel: (value: number) => {};
  getDataByGeneration: (value: number) => {};
  clearData: () => void;
}

const FullAdminSearchPanel = ({
  getDataByBrand,
  getDataByModel,
  getDataByGeneration,
  clearData,
}: IAdminSearchProps) => {
  const [currentGenerationId, setCurrentGeneration] = useState<number>(-1);
  const [currentBrand, setCurrentBrand] = useState<number>(-1);
  const [currentModel, setCurrentModel] = useState<number>(-1);

  const [brands, setBrands] = useState<Array<IBrandModel>>([]);
  const [models, setModels] = useState<Array<IModelModel>>([]);
  const [generations, setGenerations] = useState<Array<IGenerationModel>>([]);

  useEffect(() => {
    (async () => {
      await handleGetAllBrands();
    })();
  }, []);

  const handleBrandChange = async (value: number) => {
    if (value !== undefined) {
      await getDataByBrand(value);
      setCurrentBrand(value);
      handleGetModelsByBrands(value);
    }
  };
  const handleModelChange = async (value: number) => {
    if (value !== undefined) {
      await getDataByModel(value);
      setCurrentModel(value);
      handleGetGenerationsByModel(value);
    }
  };
  const handleGenerationChange = async (value: number) => {
    if (value !== undefined) {
      setCurrentGeneration(value);
      await getDataByGeneration(value);
    }
  };
  const handleBrandClear = async () => {
    setCurrentBrand(-1);
    setCurrentGeneration(-1);
    setCurrentModel(-1);
    setModels([]);
    setGenerations([]);
    clearData();
  };
  const handleModelClear = async () => {
    await getDataByBrand(currentBrand);
    setCurrentGeneration(-1);
    setCurrentModel(-1);
    setModels([]);
    setGenerations([]);
  };
  const handleGenerationClear = async () => {
    await getDataByModel(currentModel);
    setCurrentGeneration(-1);
    setGenerations([]);
    clearData();
  };

  const handleGetAllBrands = async () => {
    try {
      await getAllBrands().then((data) => {
        setBrands(data as Array<IBrandModel>);
      });
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };
  const handleGetModelsByBrands = async (value: number) => {
    try {
      await getModelsByBrand(value).then((data) => {
        setModels(data as Array<IModelModel>);
      });
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };
  const handleGetGenerationsByModel = async (value: number) => {
    try {
      await getGenerationsByModelId(value).then((data) => {
        setGenerations(data as Array<IGenerationModel>);
      });
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };

  return (
    <>
      <Select
        style={{ width: 200, marginRight: 20 }}
        placeholder="Select Brand"
        allowClear
        onChange={handleBrandChange}
        onClear={handleBrandClear}
      >
        {brands.map((brand: IBrandModel) => (
          <Select.Option key={brand.id}>{brand.title}</Select.Option>
        ))}
      </Select>
      <Select
        style={{ width: 200, marginRight: 20 }}
        placeholder="Select Model"
        allowClear
        onChange={handleModelChange}
        onClear={handleModelClear}
        disabled={currentBrand === -1 || currentBrand === undefined}
      >
        {models.map((model: IModelModel) => (
          <Select.Option key={model.id}>{model.title}</Select.Option>
        ))}
      </Select>
      <Select
        style={{ width: 200, marginRight: 20 }}
        placeholder="Select Generation"
        allowClear
        onChange={handleGenerationChange}
        onClear={handleGenerationClear}
        disabled={currentModel === -1 || currentModel === undefined}
      >
        {generations.map((model: IGenerationModel) => (
          <Select.Option key={model.id}>{model.title}</Select.Option>
        ))}
      </Select>
    </>
  );
};
export default FullAdminSearchPanel;
