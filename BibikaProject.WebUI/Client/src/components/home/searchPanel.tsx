import { Button, Input, Radio, Select } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
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
            <Select
              className="search-input"
              onChange={handleCarBodyChange}
              placeholder="Brand"
            >
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
            <Select
              className="search-input"
              onChange={handleCarBodyChange}
              placeholder="Model"
            >
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
            <Select
              className="search-input"
              onChange={handleCarBodyChange}
              placeholder="Generation"
            >
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

        <div className="second-line">
          <div className="from-to-container">
            <span>Price</span>
            <Input placeholder="From" />
            <Input placeholder="To" />
            <span>$</span>
          </div>
          <div className="from-to-container">
            <span>Year</span>
            <Select className="from-to-select" placeholder="From">
              {" "}
            </Select>
            <Select className="from-to-select" placeholder="To">
              {" "}
            </Select>
          </div>
        </div>
        <div className="third-line">
          <Button>
            {" "}
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.28486 16.2485C13.1308 16.2485 16.2485 13.1308 16.2485 9.28486C16.2485 5.43895 13.1308 2.32122 9.28486 2.32122C5.43894 2.32122 2.32121 5.43895 2.32121 9.28486C2.32121 13.1308 5.43894 16.2485 9.28486 16.2485ZM9.28486 18.5697C14.4127 18.5697 18.5697 14.4128 18.5697 9.28486C18.5697 4.15697 14.4127 0 9.28486 0C4.15697 0 0 4.15697 0 9.28486C0 14.4128 4.15697 18.5697 9.28486 18.5697Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M23.3587 25L14.2672 15.9086L15.9086 14.2672L25 23.3587L23.3587 25Z"
                fill="white"
              />
            </svg>
            Search
          </Button>
        </div>
        <div className="fourth-line">
          <Link to="#">More options</Link>
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;
