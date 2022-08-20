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
  IEngineModel,
  ICompleteSetModel,
  ICarBodyModel,
  IGearboxModel,
} from "../../adminPanel/types";
import MySelect from "../../common/ownElement/select";

import { Form } from "antd";
import { ICurrentCarDetailProps } from "./types";

import { ColorChangeHandler, ColorResult, GithubPicker } from "react-color";
import {
  getCarBodiesByGeneration,
  getEnginesByGenerationId,
  getGearBoxesByGeneration,
} from "../add/service";
import { getCompleteSetsByGeneration } from "../../adminPanel/completeSet/service";
import { getMinMaxYearPriceByGeneration } from "./serivce";
import MyInput from "../../common/ownElement/input";

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
  const [fuelList, setFuelList] = useState<Array<string>>([]);
  const [engineList, setEngineList] = useState<Array<IEngineModel>>([]);
  const [completeSetList, setCompleteSetList] = useState<
    Array<ICompleteSetModel>
  >([]);
  const [carBodyList, setCarBodyList] = useState<Array<ICarBodyModel>>([]);
  const [gearBoxList, setGearBoxList] = useState<Array<IGearboxModel>>([]);
  const [minYear, setMinYear] = useState<number>(-1);
  const [maxYear, setMaxYear] = useState<number>(-1);
  const [yearsList, setYearsList] = useState<Array<number>>([]);
  const [minPrice, setMinPrice] = useState<number>(-1);
  const [maxPrice, setMaxPrice] = useState<number>(-1);

  const [brandLoading, setBrandLoading] = useState<boolean>(true);
  const [modelLoading, setModelLoading] = useState<boolean>(false);
  const [generationLoading, setGenerationLoading] = useState<boolean>(false);

  const [modelDisable, setModelDisable] = useState<boolean>(true);
  const [generationDisable, setGenerationDisable] = useState<boolean>(true);
  const [generationDependDisable, setGenerationDependDisable] =
    useState<boolean>(true);

  let filter = useRef<ICurrentCarDetailProps>({
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
    priceMin: 0,
    priceMax: 0,
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
  const setEnginesByGenerationId = async (generationId: number) => {
    try {
      let data = await getEnginesByGenerationId(generationId);
      const fuels = (data as IEngineModel[]).map((x) => x.fuel);
      setFuelList(fuels);
      setEngineList(data as IEngineModel[]);
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };
  const setCompleteSetsByGenerationId = async (generationId: number) => {
    try {
      let data = await getCompleteSetsByGeneration(generationId);
      setCompleteSetList(data as ICompleteSetModel[]);
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };
  const setCarBodiesByGenerationId = async (generationId: number) => {
    try {
      let data = await getCarBodiesByGeneration(generationId);
      setCarBodyList(data as ICarBodyModel[]);
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };
  const setGearboxByGenerationId = async (generationId: number) => {
    try {
      let data = await getGearBoxesByGeneration(generationId);
      setGearBoxList(data as IGearboxModel[]);
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };
  const setMinMaxPriceYears = async (generationId: number) => {
    try {
      let data = await getMinMaxYearPriceByGeneration(generationId);

      const minYearNumb = data ? data.minYear : 0;
      const maxYearNumb = data ? data.maxYear : 0;

      setMinYear(minYearNumb);
      setMaxYear(maxYearNumb);
      setMinPrice(data?.minPrice as number);
      setMaxPrice(data?.maxPrice as number);

      filter.current.priceMin = data?.minPrice as number;
      filter.current.priceMax = data?.maxPrice as number;

      const tmpArr: Array<number> = [];
      for (let i = minYearNumb; i <= maxYearNumb; i++) {
        tmpArr.push(i);
      }
      setYearsList(tmpArr);
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };

  //----changes---
  const onBrandChange = async (brandId: number) => {
    filter.current.brandId = brandId;
    updateCar(filter.current);
    setModelsByBrandId(brandId);
    setModelDisable(false);
  };
  const onModelChange = async (modelId: number) => {
    filter.current.modelId = modelId;
    updateCar(filter.current);
    setGenerationsByModelId(modelId);
    setGenerationDisable(false);
  };
  const onGenerationChange = async (generationId: number) => {
    setEnginesByGenerationId(generationId);
    setCompleteSetsByGenerationId(generationId);
    setCarBodiesByGenerationId(generationId);
    setGearboxByGenerationId(generationId);
    setMinMaxPriceYears(generationId);

    filter.current.generationId = generationId;
    updateCar(filter.current);

    setGenerationDependDisable(false);
  };
  const onCompleteSetChange = async (completeSetId: number) => {
    filter.current.completeSetId = completeSetId;
    updateCar(filter.current);
  };
  const onCarBodyChange = async (carBodyId: number) => {
    filter.current.carBodyId = carBodyId;
    updateCar(filter.current);
  };
  const onYearFromChange = async (yearFrom: number) => {
    // setYearsList(yearsList.slice(yearsList.findIndex((x) => x == yearFrom)));

    filter.current.yearMin = yearFrom;
    updateCar(filter.current);
  };
  const onYearToChange = async (yearTo: number) => {
    // setYearsList(
    //   yearsList.slice(0, yearsList.findIndex((x) => x == yearTo) + 1)
    // );

    filter.current.yearMax = yearTo;
    updateCar(filter.current);
  };
  const onColorChange = async (color: ColorResult, event: any) => {
    filter.current.color = color.hex;
    updateCar(filter.current);
  };
  const onFuelChange = async (fuelType: string) => {
    const tmpArr = engineList.slice();
    tmpArr.filter((x) => x.fuel === fuelType);
    setEngineList(tmpArr);
  };
  const onEngineChange = async (engineId: number) => {
    filter.current.engineId = engineId;
    updateCar(filter.current);
  };
  const onGearboxChange = async (gearboxId: number) => {
    filter.current.gearBoxId = gearboxId;
    updateCar(filter.current);
  };
  const onPriceFromChange = async (event: any) => {
    filter.current.priceMin = event.target.value;
    updateCar(filter.current);
  };
  const onPriceToChange = async (event: any) => {
    filter.current.priceMax = event.target.value;
    updateCar(filter.current);
  };

  return (
    <>
      <div className="first-line line">
        <div className="search-input-container">
          <MySelect
            placeholder={"Brand"}
            className="search-input"
            onChange={onBrandChange}
            loading={brandLoading}
            values={brandList.map((x) => ({ value: x.id, label: x.title }))}
            value={filter.current.brandId}
          />
        </div>

        <div className="search-input-container">
          <MySelect
            placeholder={"Model"}
            className="search-input"
            onChange={onModelChange}
            disabled={modelDisable}
            loading={modelLoading}
            values={modelList.map((x) => ({ value: x.id, label: x.title }))}
            value={filter.current.modelId}
          />
        </div>
        <div className="search-input-container">
          <MySelect
            placeholder={"Generation"}
            className="search-input"
            disabled={generationDisable}
            loading={generationLoading}
            onChange={onGenerationChange}
            value={filter.current.generationId}
            values={generationList.map((x) => ({
              value: x.id,
              label: x.title,
            }))}
          />
        </div>
      </div>
      <div className="second-line line">
        <div className="search-input-container">
          <MySelect
            placeholder={"Complete set"}
            className="search-input"
            onChange={onCompleteSetChange}
            disabled={generationDependDisable}
            values={completeSetList.map((x) => ({
              value: x.id,
              label: x.title,
            }))}
            value={filter.current.completeSetId}
          />
        </div>

        <div className="search-input-container">
          <MySelect
            placeholder={"Car body"}
            className="search-input"
            disabled={generationDependDisable}
            onChange={onCarBodyChange}
            values={carBodyList.map((x) => ({ value: x.id, label: x.title }))}
            value={filter.current.carBodyId}
          />
        </div>
      </div>
      <div className="third-line line">
        <div className="from-to-container">
          {/* <span>Year</span> */}
          <div className="from-to-flex">
            <div className="from-to-select-container">
              <span className="hint">from</span>
              <MySelect
                className="from-to-select"
                disabled={generationDependDisable}
                onChange={onYearFromChange}
                value={minYear === -1 ? undefined : minYear}
                values={yearsList.map((x: number) => ({ value: x, label: x }))}
              />
            </div>
            <div className="from-to-select-container">
              <span className="hint">to</span>
              <MySelect
                className="from-to-select"
                disabled={generationDependDisable}
                onChange={onYearToChange}
                value={maxYear === -1 ? undefined : maxYear}
                values={yearsList.map((x) => ({ value: x, label: x }))}
              />
            </div>
          </div>
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
          onChange={onColorChange}
        />
      </div>
      <div className="fourth-line line">
        <div className="search-input-container">
          <MySelect
            placeholder={"Fuel"}
            className="search-input"
            onChange={onFuelChange}
            disabled={generationDependDisable}
            values={fuelList.map((x) => ({ value: x, label: x }))}
          />
        </div>
        <div className="search-input-container">
          <MySelect
            placeholder={"Engine"}
            className="search-input"
            onChange={onEngineChange}
            disabled={generationDependDisable}
            values={engineList.map((x) => ({ value: x.id, label: x.title }))}
            value={filter.current.engineId}
          />
        </div>
        <div className="search-input-container">
          <MySelect
            placeholder={"Gearbox type"}
            className="search-input"
            onChange={onGearboxChange}
            disabled={generationDependDisable}
            values={gearBoxList.map((x) => ({ value: x.id, label: x.title }))}
            value={filter.current.gearBoxId}
          />
        </div>
      </div>
      <div className="fifth-line line">
        <div className="from-to-container">
          {/* <span>Price</span> */}
          <div className="from-to-flex">
            <div className="from-to-select-container">
              <span className="hint">from</span>
              <MyInput
                onChange={onPriceFromChange}
                placeholder={minPrice === -1 ? "" : minPrice.toString()}
                value={filter.current.priceMin}
              />
            </div>
            <div className="from-to-select-container">
              <span className="hint">to</span>
              <MyInput
                onChange={onPriceToChange}
                // placeholder={maxPrice === -1 ? "" : maxPrice.toString()}
                value={filter.current.priceMax}
              />
            </div>
          </div>
          {/* <span>$</span> */}
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
