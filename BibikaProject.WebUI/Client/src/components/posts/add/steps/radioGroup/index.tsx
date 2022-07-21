import { Button, Radio, RadioChangeEvent, Select } from "antd";
import { FC, useEffect, useRef, useState } from "react";
import { IRadioGroupDataType } from "../../types";

interface RadioGroupProps {
  data: IRadioGroupDataType[];  
  countBeforeHide: number;
  title: string;
  onChange: (value: number) => void;
}

const RadioGroup: FC<RadioGroupProps> = (props) => {
  const [count, setCount] = useState<number>(props.countBeforeHide);
  const [currentValue, setCurrentValue] = useState<any>();

  const handleRadioChange = (value: RadioChangeEvent) => {
    props.onChange(value.target.value.id);
    setCurrentValue(value.target.value);
  }

  if (props.data.length == 0)
  {
    return <></>;
  }

  const handleSelectChange = (value: any) => {
    props.onChange(value);
    setCurrentValue(0);
  }

  if (props.countBeforeHide == 0) {
    return (
      <div className="radiogroup-container">
        <div className="radiogroup-title">{props.title}</div>
        <Radio.Group onChange={handleRadioChange}>
          {props.data.map((value, index) => (
            <Radio.Button
              className="radiogroup-button"
              key={index}
              value={value}
            >
              {value.title}
            </Radio.Button>
          ))}
        </Radio.Group>
      </div>
    );
  }

  return (
    <div className="radiogroup-container">
      <div className="radiogroup-title">{props.title}</div>
      <Radio.Group onChange={handleRadioChange} value={currentValue}>
        {props.data.slice(0, count).map((value, index) => (
          <Radio.Button className="radiogroup-button" key={index} value={value}>
            {value.title}
          </Radio.Button>
        ))}

        <Select className="radiogroup-button" onChange={handleSelectChange} placeholder="Other">
          {props.data.slice(props.countBeforeHide).map((data: IRadioGroupDataType) => (
            <Select.Option key={data.id}>
                {data.title}
            </Select.Option>
          ))}
        </Select>
      </Radio.Group>
    </div>
  );
};

export default RadioGroup;
