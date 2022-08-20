import { title } from "process";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { IRequestError } from "../adminPanel/types";
import { getImagesByPostId } from "../posts/postPage/service";
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

  const [imgSrc, setImgSrc] = useState<string>("");
  useEffect(() => {
    (async () => {
      loadImage();
    })();
  }, [imgSrc]);

  const loadImage = async () => {
    try {
      const imgName = await getImagesByPostId(car.id);
      if (imgName && imgName[0] && (imgName[0] as string)) {
        setImgSrc(`https://localhost:5001/images/${imgName[0]}_medium.png`);
      }
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };

  return (
    <div className="main-car-card">
      <Link to={`/car/post/${car.id}`}>
        <img src={imgSrc} alt="Car src" />
        <div className="info">
          <h4>{car.car.title}</h4>
          <span className="price">{car.price}$</span>
          <span className="location">{car.location}</span>
          <div className="tags-line">
            <span>{car.year}</span>
            <span>{car.mileage}km</span>
            <span>{car.car.engine.title}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MainPageCarCard;
