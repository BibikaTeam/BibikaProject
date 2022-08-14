import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IPaginationRequest, IRequestError } from "../../adminPanel/types";
import { shortSearch } from "../../home/service";
import { IBannerCar, IShortSearchRespond } from "../../home/types";
import { likePost } from "../../userCabinet/service";
import CarCard from "./carCard";

import { keys } from "ts-transformer-keys";
import { ICurrentCarDetailProps } from "../search/types";

const SearchResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [paginatedCars, setPaginatedCars] =
    useState<IPaginationRequest<IBannerCar>>();

  let test: ICurrentCarDetailProps = {
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
  };

  const convertArrayToObject = (array: any, key: any) => {
    const initialValue = {};
    return array.reduce((obj: any, item: any) => {
      return {
        ...obj,
        [item[key]]: item,
      };
    }, initialValue);
  };

  useEffect(() => {
    (async () => {
      //@ts-ignore
      // const a: ICurrentCarDetailProps = {};
      // console.log(a);

      const keysArr = Object.keys(test);

      console.log(convertArrayToObject(["aa", "bb"], ["11", "22"]));

      // const params: IShortSearchRespond = {
      //   brand: searchParams.get("brand")
      //     ? parseInt(searchParams.get("brand") as string)
      //     : undefined,
      //   model: searchParams.get("model")
      //     ? parseInt(searchParams.get("model") as string)
      //     : undefined,
      //   generation: searchParams.get("generation")
      //     ? parseInt(searchParams.get("generation") as string)
      //     : undefined,
      //   priceFrom: searchParams.get("priceFrom")
      //     ? parseInt(searchParams.get("priceFrom") as string)
      //     : undefined,
      //   priceTo: searchParams.get("priceTo")
      //     ? parseInt(searchParams.get("priceTo") as string)
      //     : undefined,
      //   quality: searchParams.get("quality")
      //     ? searchParams.get("quality")
      //     : undefined,
      //   yearFrom: searchParams.get("yearFrom")
      //     ? parseInt(searchParams.get("yearFrom") as string)
      //     : undefined,
      //   yearTo: searchParams.get("yearTo")
      //     ? parseInt(searchParams.get("yearTo") as string)
      //     : undefined,
      // };
      // console.log("params: ", params);

      // const data = await shortSearch(params);
      // setPaginatedCars(data);
    })();
  });

  return (
    <div className="search-result">
      <h1>Search result</h1>
      {paginatedCars?.data.map((x, id) => {
        return <CarCard car={x} />;
      })}
    </div>
  );
};
export default SearchResult;
