import { Radio, Select } from "antd";
import { useState } from "react";
import { ICarBodyModel } from "../adminPanel/types";

const SearchPanel = () => {
  const [carBodiesList, setCarBodiesList] = useState<Array<ICarBodyModel>>([
    { id: 0, title: "Car" },
  ]);

  const handleCarBodyChange = () => {};
  const handleRadioChange = () => {};

  return (
    <div className="search-panel">
      <div className="radio-buttons-search">
        <Radio.Group onChange={handleRadioChange} defaultValue="a">
          <Radio.Button value="a">All</Radio.Button>
          <Radio.Button value="b">New</Radio.Button>
          <Radio.Button value="c">Used</Radio.Button>
        </Radio.Group>
      </div>

      <div className="inputs-group">
        <div className="first-line">
          <div className="search-input-container">
            <Select className="search-input" onChange={handleCarBodyChange}>
              {carBodiesList.map((carBody: ICarBodyModel) => {
                return (
                  <Select.Option key={carBody.id}>
                    {carBody.title}
                  </Select.Option>
                );
              })}
            </Select>
          </div>
          <div className="search-input-container">
            <Select className="search-input" onChange={handleCarBodyChange}>
              {carBodiesList.map((carBody: ICarBodyModel) => {
                return (
                  <Select.Option key={carBody.id}>
                    {carBody.title}
                  </Select.Option>
                );
              })}
            </Select>
          </div>
          <div className="search-input-container">
            <Select className="search-input" onChange={handleCarBodyChange}>
              {carBodiesList.map((carBody: ICarBodyModel) => {
                return (
                  <Select.Option key={carBody.id}>
                    {carBody.title}
                  </Select.Option>
                );
              })}
            </Select>
          </div>
        </div>
      </div>

      <div className="second-line">
        <div></div>
      </div>
    </div>
  );
};

export default SearchPanel;
