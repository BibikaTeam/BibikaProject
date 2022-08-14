import { queryByDisplayValue } from "@testing-library/react";
import { Button, Form, Input, Radio, Select } from "antd";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllBrands } from "../adminPanel/brand/service";
import { getGenerationsByModelId } from "../adminPanel/generation/service";
import { getModelsByBrand } from "../adminPanel/model/service";
import {
  IBrandModel,
  ICarBodyModel,
  IGenerationModel,
  IModelModel,
  IRequestError,
} from "../adminPanel/types";

import * as qs from "qs";
import { IShortSearchRespond } from "./types";

import { useNavigate } from "react-router-dom";

const SearchPanel = () => {
  const [brandList, setBrandList] = useState<Array<IBrandModel>>([]);
  const [modelList, setModelList] = useState<Array<IModelModel>>([]);
  const [generationList, setGenerationList] = useState<Array<IGenerationModel>>(
    []
  );

  const [brandLoading, setBrandLoading] = useState<boolean>(false);
  const [modelLoading, setModelLoading] = useState<boolean>(false);
  const [generationLoading, setGenerationLoading] = useState<boolean>(false);

  const [isDisable, setDisable] = useState<boolean>(true);
  const [isModelDisable, setModelDisable] = useState<boolean>(true);
  const [isGenerationDisable, setGenerationDisable] = useState<boolean>(true);

  const [selectedModel, setSelectedModel] = useState<any>(null);
  const [selectedGeneration, setSelectedGeneration] = useState<any>(null);

  const navigator = useNavigate();

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

  //selects handling
  const handleBrandChange = async (brandId: number) => {
    await setModelsByBrandId(brandId);
    setSelectedModel(0);
    setSelectedGeneration(null);
    setModelDisable(false);
    setGenerationDisable(true);
  };
  const handleModelChange = async (modelId: number) => {
    setSelectedModel(modelId);
    await setGenerationsByModelId(modelId);
    setGenerationDisable(false);
    setDisable(false);
    setSelectedGeneration(null);
  };
  const handleGenerationChange = async (generationId: number) => {
    console.log("generaiton", generationId);
  };

  const handleRadioChange = () => {};

  const handleSearch = async (values: IShortSearchRespond) => {
    const searchString = qs.stringify(values);
    navigator(`/post/search-result?${searchString}`);
  };

  return (
    <Form onFinish={handleSearch}>
      <div className="search-panel">
        <div className="radio-buttons-search">
          <Form.Item name="quality" initialValue="a">
            <Radio.Group onChange={handleRadioChange}>
              <Radio.Button value="a">All</Radio.Button>
              <Radio.Button value="b">New</Radio.Button>
              <Radio.Button value="c">Used</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </div>

        <div className="inputs-group">
          <div className="first-line">
            <div className="search-input-container">
              <Form.Item name="brand">
                <Select
                  className="search-input"
                  onChange={handleBrandChange}
                  placeholder="Brand"
                  loading={brandLoading}
                >
                  {brandList.map((brand: IBrandModel) => {
                    return (
                      <Select.Option key={brand.id}>
                        {brand.title}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className="search-input-container">
              <Form.Item name="model">
                <Select
                  className="search-input"
                  onChange={handleModelChange}
                  placeholder="Model"
                  loading={modelLoading}
                  disabled={isModelDisable}
                  value={selectedModel}
                >
                  {modelList.map((model: IModelModel) => {
                    return (
                      <Select.Option key={model.id}>
                        {model.title}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className="search-input-container">
              <Form.Item name="generation">
                <Select
                  className="search-input"
                  onChange={handleGenerationChange}
                  placeholder="Generation"
                  loading={generationLoading}
                  disabled={isGenerationDisable}
                  value={selectedGeneration}
                >
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

          <div className="second-line">
            <div className="from-to-container">
              <span>Price</span>
              <Form.Item name="priceFrom">
                <Input placeholder="From" />
              </Form.Item>
              <Form.Item name="priceTo">
                <Input placeholder="To" />
              </Form.Item>
              <span>$</span>
            </div>
            <div className="from-to-container">
              <span>Year</span>
              <Form.Item name="yearFrom">
                <Select className="from-to-select" placeholder="From">
                  {" "}
                </Select>
              </Form.Item>
              <Form.Item name="yearTo">
                <Select className="from-to-select" placeholder="To">
                  {" "}
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="third-line">
            <Button disabled={isDisable} htmlType="submit">
              {" "}
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.28486 16.2485C13.1308 16.2485 16.2485 13.1308 16.2485 9.28486C16.2485 5.43895 13.1308 2.32122 9.28486 2.32122C5.43894 2.32122 2.32121 5.43895 2.32121 9.28486C2.32121 13.1308 5.43894 16.2485 9.28486 16.2485ZM9.28486 18.5697C14.4127 18.5697 18.5697 14.4128 18.5697 9.28486C18.5697 4.15697 14.4127 0 9.28486 0C4.15697 0 0 4.15697 0 9.28486C0 14.4128 4.15697 18.5697 9.28486 18.5697Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M23.3587 25L14.2672 15.9086L15.9086 14.2672L25 23.3587L23.3587 25Z"
                  fill="white"
                />
              </svg>
              Search
            </Button>
          </div>
          <div className="fourth-line">
            <Link to="/post/detail-search">More options</Link>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default SearchPanel;
