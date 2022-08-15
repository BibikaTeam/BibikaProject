import { title } from "process";

import { useEffect } from "react";
import { getRandomPost } from "./service";
import { IBannerCar } from "./types";

export interface IMainPageCarCardProps {
  car: IBannerCar;
}

const MainPageCarCard = ({ car }: IMainPageCarCardProps) => {
  // let car: IBannerCar = {
  //   title: "Tesla Model S",
  //   engine: "Electro",
  //   gearBoxTitle: "Automatic",
  //   location: "Kyiv",
  //   mainImageSrc:
  //     "https://tesla-cdn.thron.com/delivery/public/image/tesla/8a74d206-66dc-4386-8c7a-88ff32174e7d/bvlatuR/std/4096x2560/Model-S-Main-Hero-Desktop-LHD",
  //   mileage: 24000,
  //   price: 67000,
  //   year: 2020,
  //   id: 0,
  // };

  console.log("INside: ", car);
  return (
    <div className="main-car-card">
      <img src={car.mainImageSrc} alt="Car src" />
      <div className="info">
        <h4>{car.title}</h4>
        <span className="price">{car.price}$</span>
        <span className="location">{car.location}</span>
        <div className="tags-line">
          <span>{car.year}</span>
          <span>{car.mileage}km</span>
          <span>{car.engine}</span>
        </div>
      </div>
    </div>
  );
};

export default MainPageCarCard;
