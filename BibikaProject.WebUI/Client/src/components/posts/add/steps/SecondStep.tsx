import { Button, DatePicker, Select } from "antd";
// import TextArea from "antd/lib/input/TextArea";
import { Input } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import { FC, useEffect, useState } from "react";
import { getAllBrands } from "../../../adminPanel/brand/service";
import {
  IBrandModel,
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
import { getEnginesByGenerationId } from "../service";
const { TextArea } = Input;

interface SecondStepProps {
  onFinish: (values: any) => void;
  onBack: () => void;
}

const SecondStep: FC<SecondStepProps> = (props) => {
  const [brandsList, setBrandsList] = useState<IBrandModel[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<number>(0);
  const [modelsList, setModelsList] = useState<IModelModel[]>([]);
  const [generationList, setGenerationList] = useState<IGenerationModel[]>([]);
  const [enginesList, setEnginesList] = useState<IEngineModel[]>([]);
  const [selectedEngine, setSelectedEngine] = useState<number>(0);
  const [selectedModel, setSelectedModel] = useState<number>(0);
  const [selectedGeneration, setSelectedGeneration] = useState<number>(0);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [modelLoading, setModelLoading] = useState<boolean>(false);
  //const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedCarBody, setSelectedCarBody] = useState<string>("");
  const [description, setDescription] = useState<string>("");

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
    }  catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      })
    }
  }

  const setEnginesByGenerationId = async (generationId: number) => {
    try {
      await getEnginesByGenerationId(generationId).then((data) => {
        setEnginesList(data as IEngineModel[]);
      });
    }  catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      })
    }
  }

  const handleBrandChange = async (value: number) => {
    setSelectedBrand(value);
    setSelectedModel(0);
    setModelsByBrand(value);
  };

  const handleModelChange = async (value: number) => {
    setSelectedModel(value);
    setSelectedGeneration(0);
    setGenerationsByModel(value);
  }

  const handleYearChange = (date: any, dateString: string) => {
    setSelectedYear(dateString);
  }

  const handleGenerationChange = (value: number) => {
    setSelectedGeneration(value);
    setSelectedEngine(0);
    setEnginesByGenerationId(value);
  }

  const handleEngineChange = (value: number) => {
    setSelectedEngine(value);
  }

  const handleDescriptionChange = (value: any) => {
    setDescription(value.target.value);
  }

  const ifModelSelected = () => {
    if (selectedModel == 0) {
      return "visibility-hidden";
  }
    return "steps-selects-container"
  }

  const ifYearAndGenerationSelected = () => {
    if (selectedGeneration == 0 || selectedYear == "") {
     return "visibility-hidden";
    }
     return "steps-select-container"
 }

 const ifEngineSelected = () => {
  if (selectedEngine == 0) {
    return "visibility-hidden";
   }
    return "steps-secondstep-description"
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
                props.onFinish("On Finish from SecondStep");
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
            Year of manufacture
            <DatePicker
              className="steps-datepicker"
              onChange={handleYearChange}
              mode="year"
              picker="year"
              format="YYYY"
            />
          </div>
          <div className="steps-select-container">
            Generation
            <Select className="steps-select"
             onChange={handleGenerationChange}>
              {generationList.map((generation: IGenerationModel) => (
                <Select.Option key={generation.id}>
                  {generation.title}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className={ifYearAndGenerationSelected()}>
            Engines
            <Select className="steps-select"
             onChange={handleEngineChange}>
              {enginesList.map((engine: IEngineModel) => (
                <Select.Option key={engine.id}>
                  {engine.title}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        <div className={ifEngineSelected()}>
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
              stroke-opacity="0.6"
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
