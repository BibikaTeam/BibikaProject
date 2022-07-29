import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IPaginationRequest } from "../../adminPanel/types";
import { shortSearch } from "../../home/service";
import { IBannerCar, IShortSearchRespond } from "../../home/types";
import CarCard from "./carCard";

const SearchResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const car: IBannerCar = {
    gearBoxTitle: "Automatic",
    engine: "Disel",
    year: 2022,
    mileage: 2000,
    location: "Lviv",
    title: "Audi Q8",
    mainImageSrc:
      "https://usaautoonline.azurewebsites.net/media/1256/audi-q8.jpg",
    price: 85000,
    id: 0,
    description:
      "Авто у оригінальній комплектації. Пригнав з Німечинни. Стан нового.Авто у оригінальній комплектації. Пригнав з Німечинни. Стан нового.Авто у оригінальній комплектації. Пригнав з Німечинни. Стан нового.Авто у оригінальній комплектації. Пригнав з Німечинни. Стан нового.Авто у оригінальній комплектації. Пригнав з Німечинни. Стан нового.Авто у оригінальній комплектації. Пригнав з Німечинни. Стан нового.Авто у оригінальній комплектації. Пригнав з Німечинни. Стан нового.Авто у оригінальній комплектації. Пригнав з Німечинни. Стан нового.Авто у оригінальній комплектації. Пригнав з Німечинни. Стан нового.Авто у оригінальній комплектації. Пригнав з Німечинни. Стан нового.Авто у оригінальній комплектації. Пригнав з Німечинни. Стан нового.Авто у оригінальній комплектації. Пригнав з Німечинни. Стан нового.Авто у оригінальній комплектації. Пригнав з Німечинни. Стан нового.",
  };

  const [paginatedCars, setPaginatedCars] =
    useState<IPaginationRequest<IBannerCar>>();

  useEffect(() => {
    (async () => {
      const params: IShortSearchRespond = {
        brand: searchParams.get("brand")
          ? parseInt(searchParams.get("brand") as string)
          : undefined,
        model: searchParams.get("model")
          ? parseInt(searchParams.get("model") as string)
          : undefined,
        generation: searchParams.get("generation")
          ? parseInt(searchParams.get("generation") as string)
          : undefined,
        priceFrom: searchParams.get("priceFrom")
          ? parseInt(searchParams.get("priceFrom") as string)
          : undefined,
        priceTo: searchParams.get("priceTo")
          ? parseInt(searchParams.get("priceTo") as string)
          : undefined,
        quality: searchParams.get("quality")
          ? searchParams.get("quality")
          : undefined,
        yearFrom: searchParams.get("yearFrom")
          ? parseInt(searchParams.get("yearFrom") as string)
          : undefined,
        yearTo: searchParams.get("yearTo")
          ? parseInt(searchParams.get("yearTo") as string)
          : undefined,
      };
      console.log("params: ", params);

      const data = await shortSearch(params);
      setPaginatedCars(data);
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
