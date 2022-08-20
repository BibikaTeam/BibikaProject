import { Button, Checkbox, DatePicker, Select } from "antd";
// import TextArea from "antd/lib/input/TextArea";
import { Input } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import { FC, useEffect, useState } from "react";
import { getAllBrands } from "../../../adminPanel/brand/service";
import {
  IBrandModel,
  ICarBodyModel,
  ICompleteSetModel,
  IEngineModel,
  IGenerationModel,
  IModelModel,
  IRequestError,
} from "../../../adminPanel/types";
import AntdSelect from "../../../common/form/select";
import RadioGroup from "./radioGroup";
import { getModelsByBrand } from "../../../adminPanel/model/service";
import { toast } from "react-toastify";
import { getGenerationsByModelId } from "../../../adminPanel/generation/service";
import {
  getCarBodiesByGeneration,
  getEnginesByGenerationId,
  getGearBoxesByGeneration,
} from "../service";
import { IGearBoxModel } from "../types";
import { getCompleteSetsByGeneration } from "../../../adminPanel/completeSet/service";
import { ColorChangeHandler, ColorResult, GithubPicker } from "react-color";
import { number } from "yup";
const { TextArea } = Input;


interface SecondStepProps {
  onFinish: (values: any) => void;
  onBack: () => void;
}

const SecondStep: FC<SecondStepProps> = (props) => {
  const [brandsList, setBrandsList] = useState<IBrandModel[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<number>(0);

  const [modelsList, setModelsList] = useState<IModelModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<number>(0);

  const [generationList, setGenerationList] = useState<IGenerationModel[]>([]);
  const [selectedGeneration, setSelectedGeneration] = useState<number>(0);

  const [enginesList, setEnginesList] = useState<IEngineModel[]>([]);
  const [selectedEngine, setSelectedEngine] = useState<number>(0);

  const [selectedYear, setSelectedYear] = useState<string>("");

  const [carBodiesList, setCarBodiesList] = useState<ICarBodyModel[]>([]);
  const [selectedCarBody, setSelectedCarBody] = useState<number>(0);

  const [description, setDescription] = useState<string>("");

  const [gearBoxesList, setGearBoxesList] = useState<IGearBoxModel[]>([]);
  const [selectedGearBox, setSelectedGearBox] = useState<number>(0);

  const [comepleteSetsList, setCompleteSetsList] = useState<
    ICompleteSetModel[]
  >([]);
  const [selectedCompleteSet, setSelectedCompleteSet] = useState<number>(0);

  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<number>(0);

  useEffect(() => {
    setAllBrands();
  }, []);

  const setAllBrands = async () => {
    try {
      await getAllBrands().then((data) => {
        setBrandsList(data);
      });
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };

  const setModelsByBrand = async (brandId: number) => {
    try {
      await getModelsByBrand(brandId).then((data) => {
        setModelsList(data as IModelModel[]);
      });
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };

  const setGenerationsByModel = async (modelId: number) => {
    try {
      await getGenerationsByModelId(modelId).then((data) => {
        setGenerationList(data as IGenerationModel[]);
      });
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };

  const setEnginesByGenerationId = async (generationId: number) => {
    try {
      await getEnginesByGenerationId(generationId).then((data) => {
        setEnginesList(data as IEngineModel[]);
      });
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };

  const setCompleteSetsByGenerationId = async (generationId: number) => {
    try {
      await getCompleteSetsByGeneration(generationId).then((data) => {
        setCompleteSetsList(data as ICompleteSetModel[]);
      });
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };

  const setGearBoxesByGenerationId = async (generationId: number) => {
    try {
      await getGearBoxesByGeneration(generationId).then((data) => {
        setGearBoxesList(data as IGearBoxModel[]);
      });
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };

  const setCarBodiesByGenerationId = async (generationId: number) => {
    try {
      await getCarBodiesByGeneration(generationId).then((data) => {
        setCarBodiesList(data as ICarBodyModel[]);
      });
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };

  const handleBrandChange = async (value: number) => {
    setSelectedBrand(value);
    setSelectedModel(0);
    setModelsByBrand(value);
  };

  const handleModelChange = async (value: number) => {
    setSelectedModel(value);
    setSelectedGeneration(0);
    setGenerationsByModel(value);
  };

  const handleYearChange = (date: any, dateString: string) => {
    setSelectedYear(dateString);
  };

  const handleGenerationChange = (value: number) => {
    setSelectedGeneration(value);
    setSelectedEngine(0);
    setSelectedCompleteSet(0);
    setSelectedGearBox(0);
    setSelectedCarBody(0);
    setEnginesByGenerationId(value);
    setCompleteSetsByGenerationId(value);
    setGearBoxesByGenerationId(value);
    setCarBodiesByGenerationId(value);
  };

  const handleEngineChange = (value: number) => {
    setSelectedEngine(value);
  };

  const handleGearboxChange = (value: number) => {
    setSelectedGearBox(value);
  };

  const handleCarBodyChange = (value: number) => {
    setSelectedCarBody(value);
  };

  const handleCompleteSetChange = (value: number) => {
    setSelectedCompleteSet(value);
  };

  const handleDescriptionChange = (value: any) => {
    setDescription(value.target.value);
  };

  const handleColorChange = (color: ColorResult, event: any) => {
    setSelectedColor(color.hex);
  };

  const handlePriceChange = (event: any) => {
    setSelectedPrice((v) => (event.target.validity.valid ? event.target.value : v))
  }

  const ifModelSelected = () => {
    if (selectedModel == 0) {
      return "visibility-hidden";
    }

    return "steps-selects-container";
  };

  const ifGenerationSelected = (value: number) => {

    if (selectedGeneration == 0) {
        return "visibility-hidden"
    }

    if (value == 1) {
      return "steps-select-container"
    } 

    if (value == 2) {
      return "steps-secondstep-description";
    }

    if (value == 3) {
      return "color-picker-container";
    }

    if (value == 4) {
      return "steps-price-container";
    }
  }

  return (
    <div className="steps-container">
      <div className="steps-body">
        <div className="steps-header">
          <div className="steps-title-container">
            <div className="steps-title">2. Basic information</div>
            <div className="steps-description">&emsp; Describe your car</div>
          </div>

          <div className="steps-actions">
            <Button
              className="steps-action-button-back"
              onClick={() => {
                props.onBack();
              }}
            >
              Back
            </Button>
            <Button
              className="steps-action-button-done"
              onClick={() => {
                props.onFinish({
                  description,
                  selectedGeneration,
                  selectedEngine,
                  selectedYear,
                  selectedCompleteSet,
                  selectedCarBody,
                  selectedGearBox,
                  selectedColor,
                  selectedPrice,
                });
              }}
            >
              Done
            </Button>
          </div>
        </div>

        <div className="steps-radio-container">
          <RadioGroup
            data={brandsList}
            title={"Brand"}
            countBeforeHide={16}
            onChange={handleBrandChange}
          />
        </div>
        
        <div className="steps-radio-container">
          <RadioGroup
            data={modelsList}
            title={"Models"}
            countBeforeHide={0}
            onChange={handleModelChange}
          />
        </div>

        <div className={ifModelSelected()}>
          <div className="steps-select-container">
            Generation
            <Select className="steps-select" onChange={handleGenerationChange}>
              {generationList.map((generation: IGenerationModel) => (
                <Select.Option key={generation.id}>
                  {generation.title}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className={ifGenerationSelected(1)}>
            Year of manufacture
            <DatePicker
              className="steps-datepicker"
              onChange={handleYearChange}
              picker="year"
            />
          </div>       
          <div className={ifGenerationSelected(1)}>
            Engines
            <Select className="steps-select" onChange={handleEngineChange}>
              {enginesList.map((engine: IEngineModel) => (
                <Select.Option key={engine.id}>{engine.title}</Select.Option>
              ))}
            </Select>
          </div>
        </div>

        <div className={ifModelSelected()}>
          <div className={ifGenerationSelected(1)}>
            Gearbox
            <Select className="steps-select" onChange={handleGearboxChange}>
              {gearBoxesList.map((gearBox: IGearBoxModel) => (
                <Select.Option key={gearBox.id}>{gearBox.title}</Select.Option>
              ))}
            </Select>
          </div>
          <div className={ifGenerationSelected(1)}>
            Car Body
            <Select className="steps-select" onChange={handleCarBodyChange}>
              {carBodiesList.map((carBody: ICarBodyModel) => (
                <Select.Option key={carBody.id}>{carBody.title}</Select.Option>
              ))}
            </Select>
          </div>
          <div className={ifGenerationSelected(1)}>
            Complete Set
            <Select className="steps-select" onChange={handleCompleteSetChange}>
              {comepleteSetsList.map((completeSet: ICompleteSetModel) => (
                <Select.Option key={completeSet.id}>
                  {completeSet.title}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>

        <div className={ifModelSelected()}>
          <div className={ifGenerationSelected(1)}>
            Participation in a road accident
            <Select className="steps-select">
              <Select.Option key={1}>Yes</Select.Option>
              <Select.Option key={2}>No</Select.Option>
            </Select>
          </div>
          <div className={ifGenerationSelected(1)}>
            Technical condition
            <Select className="steps-select">
              <Select.Option key={1}>Ideal</Select.Option>
              <Select.Option key={2}>Needs repair</Select.Option>
              <Select.Option key={3}>For spare parts</Select.Option>
            </Select>
          </div>
          <div className={ifGenerationSelected(1)}>
            Driven from
            <Select className="steps-select">
              
            </Select>
          </div>
        </div>

      
        <div className={ifGenerationSelected(3)}>
          Color of car
          <div className="color-picker">
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
                onChange={handleColorChange}
              />
          </div>   
        </div>

        <div className={ifGenerationSelected(4)}>
          <div className="steps-price">
                <span>Price</span>
                <Input pattern="[0-9]*" onChange={handlePriceChange} value={selectedPrice}/>
                <span>$</span>
          </div>
          <div className="steps-checkbox-container">   
            <div className="checkbox-group">
              <Checkbox>
                <span className="title">Haggling</span>
              </Checkbox>
              <Checkbox>
                <span className="title">Exchange</span>
              </Checkbox>
            </div>
          </div>
        </div>
        
        <div className={ifGenerationSelected(2)}>
          <span className="steps-secondstep-description-title">
            Car description
          </span>
          <Input.TextArea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Description"
            autoSize={{ minRows: 17, maxRows: 17 }}
            className="steps-textarea"
          />
        </div>

      </div>

      <div className="steps-footer">
        <div className="steps-footer-block">
          <svg
            width="28"
            height="28"
            viewBox="0 0 38 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 18.0717L16.6696 31.0425C17.6157 32.0111 19.2306 31.7794 19.8663 30.5839L34 4"
              stroke="#219CE1"
              strokeOpacity="0.6"
              stroke-width="5"
              stroke-linecap="square"
            />
          </svg>
        </div>
        <div className="steps-footer-block-active">2. Provide information</div>
        <div className="steps-footer-block">3. Specify contacts</div>
      </div>
    </div>
  );
};

export default SecondStep;
