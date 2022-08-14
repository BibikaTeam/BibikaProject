import { Checkbox, Collapse, Input, Select } from "antd";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { getAllBrands } from "../../adminPanel/brand/service";
import { getGenerationsByModelId } from "../../adminPanel/generation/service";
import { getModelsByBrand } from "../../adminPanel/model/service";
import {
  IBrandModel,
  IModelModel,
  IGenerationModel,
  IRequestError,
} from "../../adminPanel/types";

import { Form } from "antd";
import { ICurrentCarDetailProps } from "./types";

import { TwitterPicker, GithubPicker } from "react-color";
// import Github from "react-color/lib/components/github/Github";

const { Panel } = Collapse;

export interface ICurrentCarSearchPanelProps {
  updateCar: (carModel: ICurrentCarDetailProps) => void;
}

const CurrentCarDetailSearch = ({ updateCar }: ICurrentCarSearchPanelProps) => {
  const [brandList, setBrandList] = useState<Array<IBrandModel>>([]);
  const [modelList, setModelList] = useState<Array<IModelModel>>([]);
  const [generationList, setGenerationList] = useState<Array<IGenerationModel>>(
    []
  );

  const [brandLoading, setBrandLoading] = useState<boolean>(true);
  const [modelLoading, setModelLoading] = useState<boolean>(false);
  const [generationLoading, setGenerationLoading] = useState<boolean>(false);

  let test = useRef<ICurrentCarDetailProps>({
    brandId: 0,
    carBodyId: 0,
    color: "",
    completeSetId: 0,
    engineId: 0,
    gearBoxId: 0,
    generationId: 0,
    location: "",
    modelId: 0,
    yearMax: 0,
    yearMin: 0,
    priceFrom: 0,
    priceTo: 0,
  });

  useEffect(() => {
    (async () => {
      await setAllBrands();
    })();
  }, []);

  //service reading
  const setAllBrands = async () => {
    setBrandLoading(true);
    try {
      let data = await getAllBrands();
      setBrandList(data);
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    } finally {
      setBrandLoading(false);
    }
  };
  const setModelsByBrandId = async (modelId: number) => {
    setModelLoading(true);
    try {
      let data = await getModelsByBrand(modelId);
      setModelList(data as IModelModel[]);
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    } finally {
      setModelLoading(false);
    }
  };
  const setGenerationsByModelId = async (modelId: number) => {
    setGenerationLoading(true);
    try {
      let data = await getGenerationsByModelId(modelId);
      setGenerationList(data as IGenerationModel[]);
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    } finally {
      setGenerationLoading(false);
    }
  };

  const onBrandChange = async (brandId: number) => {
    test.current.brandId = brandId;
    updateCar(test.current);
    setModelsByBrandId(brandId);
  };
  const onModelChange = async (modelId: number) => {
    test.current.modelId = modelId;
    updateCar(test.current);
    setGenerationsByModelId(modelId);
  };
  const onGenerationChange = async (generationId: number) => {
    test.current.generationId = generationId;
    updateCar(test.current);
  };
  const onCompleteSetChange = async (completeSetId: number) => {
    test.current.completeSetId = completeSetId;
    updateCar(test.current);
  };
  const onCarBodyChange = async (carBodyId: number) => {
    test.current.carBodyId = carBodyId;
    updateCar(test.current);
  };
  const onYearFromChange = async (yearFrom: number) => {
    test.current.yearMin = yearFrom;
    updateCar(test.current);
  };
  const onYearToChange = async (yearTo: number) => {
    test.current.yearMax = yearTo;
    updateCar(test.current);
  };
  const onColorChange = async (color: string, event: any) => {
    test.current.color = color;
    updateCar(test.current);
  };
  const onFuelChange = async (fuelType: string) => {
    updateCar(test.current);
  };
  const onEngineChange = async (engineId: number) => {
    test.current.engineId = engineId;
    updateCar(test.current);
  };
  const onGearboxChange = async (gearboxId: number) => {
    test.current.gearBoxId = gearboxId;
    updateCar(test.current);
  };
  const onPriceFromChange = async (priceFrom: number) => {
    test.current.priceFrom = priceFrom;
    updateCar(test.current);
  };
  const onPriceToChange = async (priceTo: number) => {
    test.current.priceTo = priceTo;
    updateCar(test.current);
  };

  return (
    <>
      <div className="first-line line">
        <div className="search-input-container">
          <Form.Item name={"brand"}>
            <Select
              placeholder={"Brand"}
              className="search-input"
              onChange={onBrandChange}
            >
              {brandList.map((brand: IBrandModel) => {
                return (
                  <Select.Option key={brand.id}>{brand.title}</Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </div>

        <div className="search-input-container">
          <Form.Item name={"brand"}>
            <Select
              placeholder={"Model"}
              className="search-input"
              onChange={onModelChange}
            >
              {modelList.map((model: IModelModel) => {
                return (
                  <Select.Option key={model.id}>{model.title}</Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </div>
        <div className="search-input-container">
          <Form.Item name={"brand"}>
            <Select placeholder={"Generation"} className="search-input">
              {generationList.map((generation: IGenerationModel) => {
                return (
                  <Select.Option key={generation.id}>
                    {generation.title}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </div>
      </div>
      <div className="second-line line">
        <div className="search-input-container">
          <Form.Item name={"completeSet"}>
            <Select
              placeholder={"Complete set"}
              className="search-input"
              onChange={onGenerationChange}
            >
              {brandList.map((brand: IBrandModel) => {
                return (
                  <Select.Option key={brand.id}>{brand.title}</Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </div>

        <div className="search-input-container">
          <Form.Item name={"carBody"}>
            <Select placeholder={"Car body"} className="search-input">
              {modelList.map((model: IModelModel) => {
                return (
                  <Select.Option key={model.id}>{model.title}</Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </div>
      </div>
      <div className="third-line line">
        <div className="from-to-container">
          <span>Year</span>
          <Form.Item name="yearFrom">
            <span className="hint">from</span>
            <Select className="from-to-select"> </Select>
          </Form.Item>
          <Form.Item name="yearTo">
            <span className="hint">to</span>
            <Select className="from-to-select"> </Select>
          </Form.Item>
        </div>
        <GithubPicker
          colors={[
            "#CACACA",
            "#2F2F2F",
            "#FFFFFF",
            "#2A27A6",
            "#E7A423",
            "#E72323",
            "#45CD2F",
            "#23A0E7",
          ]}
          triangle={"hide"}
        />
      </div>
      <div className="fourth-line line">
        <div className="search-input-container">
          <Form.Item name={"fuelType"}>
            <Select
              placeholder={"Fuel"}
              className="search-input"
              onChange={onBrandChange}
            >
              {brandList.map((brand: IBrandModel) => {
                return (
                  <Select.Option key={brand.id}>{brand.title}</Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </div>
        <div className="search-input-container">
          <Form.Item name={"engine"}>
            <Select
              placeholder={"Engine"}
              className="search-input"
              onChange={onEngineChange}
            >
              {brandList.map((brand: IBrandModel) => {
                return (
                  <Select.Option key={brand.id}>{brand.title}</Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </div>
        <div className="search-input-container">
          <Form.Item name={"gearboxType"}>
            <Select
              placeholder={"Gearbox type"}
              className="search-input"
              onChange={onBrandChange}
            >
              {brandList.map((brand: IBrandModel) => {
                return (
                  <Select.Option key={brand.id}>{brand.title}</Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </div>
      </div>
      <div className="fifth-line line">
        <div className="from-to-container">
          <span>Price</span>
          <Form.Item name="priceFrom">
            <span className="hint">from</span>
            <Input />
          </Form.Item>
          <Form.Item name="priceTo">
            <span className="hint">to</span>
            <Input />
          </Form.Item>
          <span>$</span>
        </div>
        <div className="checkbox-group">
          <Checkbox>
            <span className="title">Haggling</span>
          </Checkbox>
          <Checkbox>
            <span className="title">Exchange</span>
          </Checkbox>
        </div>
      </div>
    </>
  );
};

export default CurrentCarDetailSearch;
