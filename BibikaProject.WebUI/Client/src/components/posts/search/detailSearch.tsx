import { useNavigate } from "react-router";
import { Button } from "antd";
import qs from "qs";
import { useState } from "react";
import CurrentCarDetailSearch from "./currentCarDetailSearch";
import { getDetailPaginatedPosts } from "./serivce";
import { ICurrentCarDetailProps, IDetailSearchProps } from "./types";

const DetailSearch = () => {
  const navigator = useNavigate();
  const [carModel, setCarModel] = useState<IDetailSearchProps>({
    filters: [
      {
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
      },
    ],
    countOnPage: 10,
    page: 1,
    search: "",
  });

  const updateCar = async (carModelFromOutside: ICurrentCarDetailProps) => {
    setCarModel({ ...carModel, filters: [carModelFromOutside] });
  };
  const onSearchClick = () => {
    const searchString = qs.stringify(carModel.filters[0]);
    navigator(`/post/search-result?${searchString}`);
  };
  return (
    <div className="detail-search-panel">
      <div className="darker-back">
        <h1>
          {" "}
          <svg
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.5132 20.1482C16.2822 20.1482 20.1481 16.2822 20.1481 11.5132C20.1481 6.74429 16.2822 2.87831 11.5132 2.87831C6.74429 2.87831 2.87831 6.74429 2.87831 11.5132C2.87831 16.2822 6.74429 20.1482 11.5132 20.1482ZM11.5132 23.0265C17.8718 23.0265 23.0264 17.8718 23.0264 11.5132C23.0264 5.15465 17.8718 0 11.5132 0C5.15465 0 0 5.15465 0 11.5132C0 17.8718 5.15465 23.0265 11.5132 23.0265Z"
              fill="#414141"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M28.9647 31L17.6914 19.7266L19.7266 17.6914L31 28.9647L28.9647 31Z"
              fill="#414141"
            />
          </svg>{" "}
          Detail search
        </h1>
        <CurrentCarDetailSearch updateCar={updateCar} />

        <button className="mainSearchBtn" onClick={onSearchClick}>
          Search
        </button>
      </div>
    </div>
  );
};

export default DetailSearch;
