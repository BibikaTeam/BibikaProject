<<<<<<< HEAD
import { Button, Checkbox, DatePicker, Form, Select } from "antd";
=======
import { Button, DatePicker, Select } from "antd";
>>>>>>> 1fbc4b9f71b5c86ccee32149bd08d1c777567a5a
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
<<<<<<< HEAD
import { TwitterPicker } from "react-color";

=======
>>>>>>> 1fbc4b9f71b5c86ccee32149bd08d1c777567a5a
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

<<<<<<< HEAD
  const [selectedColor, setSelectedColor] = useState<string>("");

  const [description, setDescription] = useState<string>("");

  const [price, setPrice] = useState<number>(0);

=======
  const [description, setDescription] = useState<string>("");

>>>>>>> 1fbc4b9f71b5c86ccee32149bd08d1c777567a5a
  const [gearBoxesList, setGearBoxesList] = useState<IGearBoxModel[]>([]);
  const [selectedGearBox, setSelectedGearBox] = useState<number>(0);

  const [comepleteSetsList, setCompleteSetsList] = useState<
    ICompleteSetModel[]
  >([]);
  const [selectedCompleteSet, setSelectedCompleteSet] = useState<number>(0);

<<<<<<< HEAD
  
 
=======
>>>>>>> 1fbc4b9f71b5c86ccee32149bd08d1c777567a5a
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
<<<<<<< HEAD
  
=======
>>>>>>> 1fbc4b9f71b5c86ccee32149bd08d1c777567a5a

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

<<<<<<< HEAD
  const handlePriceChange = (value: any) => {
    setPrice(value.target.value);
  };

  const handleColorChange = (color: any) => {
   
    setSelectedColor(color.hex);
    
    
  };
  
=======
>>>>>>> 1fbc4b9f71b5c86ccee32149bd08d1c777567a5a
  const ifModelSelected = () => {
    if (selectedModel == 0) {
      return "visibility-hidden";
    }
    return "steps-selects-container";
  };

  const ifYearAndGenerationSelected = () => {
    if (selectedGeneration == 0 || selectedYear == "") {
      return "visibility-hidden";
    }
    return "steps-select-container";
  };

  const ifEngineSelected = (type: number) => {
    if (selectedEngine == 0) {
      return "visibility-hidden";
    }

    // temp solution while waiting for design
    if (type == 1) {
      return "steps-secondstep-description";
    } else if (type == 2) {
      return "steps-selects-container";
    }
  };
<<<<<<< HEAD
  
=======
>>>>>>> 1fbc4b9f71b5c86ccee32149bd08d1c777567a5a

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
                });
              }}
            >
<<<<<<< HEAD
              Next
=======
              Done
>>>>>>> 1fbc4b9f71b5c86ccee32149bd08d1c777567a5a
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
              picker="year"
            />
          </div>
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
          <div className={ifYearAndGenerationSelected()}>
            Engines
            <Select className="steps-select" onChange={handleEngineChange}>
              {enginesList.map((engine: IEngineModel) => (
                <Select.Option key={engine.id}>{engine.title}</Select.Option>
              ))}
            </Select>
          </div>
        </div>
<<<<<<< HEAD

        <div className="steps-radio-container">
          <RadioGroup
            data={carBodiesList}
            title={"Car Bodies"}
            countBeforeHide={16}
            onChange={handleCarBodyChange}
          />
        </div>

=======
>>>>>>> 1fbc4b9f71b5c86ccee32149bd08d1c777567a5a
        <div className={ifEngineSelected(2)}>
          <div className="steps-select-container">
            Gearbox
            <Select className="steps-select" onChange={handleGearboxChange}>
              {gearBoxesList.map((gearBox: IGearBoxModel) => (
                <Select.Option key={gearBox.id}>{gearBox.title}</Select.Option>
              ))}
            </Select>
          </div>
          <div className="steps-select-container">
<<<<<<< HEAD
            Technical condition
            <Select></Select>
          </div>
          <div className="steps-select-container">
            Brought from
            <Select></Select>
          </div>
        </div>

        {/*   <div className="steps-select-container">
=======
>>>>>>> 1fbc4b9f71b5c86ccee32149bd08d1c777567a5a
            Car Body
            <Select className="steps-select" onChange={handleCarBodyChange}>
              {carBodiesList.map((carBody: ICarBodyModel) => (
                <Select.Option key={carBody.id}>{carBody.title}</Select.Option>
              ))}
            </Select>
<<<<<<< HEAD
          </div> */}

        {/*  <div className="steps-select-container">
=======
          </div>
          <div className="steps-select-container">
>>>>>>> 1fbc4b9f71b5c86ccee32149bd08d1c777567a5a
            Complete Set
            <Select className="steps-select" onChange={handleCompleteSetChange}>
              {comepleteSetsList.map((completeSet: ICompleteSetModel) => (
                <Select.Option key={completeSet.id}>
                  {completeSet.title}
                </Select.Option>
              ))}
            </Select>
          </div>
<<<<<<< HEAD
        </div> */}
        <div className={ifEngineSelected(2)}>
          <div className="steps-radio-container">
            <span className="title">Color</span>
            
            <div className="steps-colorpicker" >
              
              <TwitterPicker colors={["#0c0c0c", "#fc0000", "#18a16a", "#1497e9", "#f0f409", "#f1f2f3", "#ec08ca", "#e7982a", "#9900EF"]}
              triangle={"hide"}
              onChange={handleColorChange} 
             
        />
            </div>
          </div>
          
        </div>
       <div className={ifEngineSelected(1)}>
        <div className="second-line">
          <div className="from-to-container">
            <span>Price</span>
            <Form.Item name="price">
              <Input placeholder="" onChange={handlePriceChange} />
            </Form.Item>
            <span>$</span>
            <div className="checkbox">
              <Checkbox></Checkbox>
              <span className="steps-secondstep-description-text">
                Possible bargaining
              </span>
            </div>
            \
            <div>
              <Checkbox></Checkbox>
              <span className="steps-secondstep-description-text">
                Exchange is possible
              </span>
            </div>
          </div>
        </div>
        </div>

=======
        </div>
>>>>>>> 1fbc4b9f71b5c86ccee32149bd08d1c777567a5a
        <div className={ifEngineSelected(1)}>
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
