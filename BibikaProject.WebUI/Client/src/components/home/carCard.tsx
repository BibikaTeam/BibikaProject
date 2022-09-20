import { title } from "process";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { IRequestError } from "../adminPanel/types";
import CarCardLoader from "../common/ownElement/carCardLoader";
import { getImagesByPostId } from "../posts/postPage/service";
import { getRandomPost } from "./service";
import { IBannerCar } from "./types";

import loadingImage from "../../assets/loading.gif";
import defaultImage from "../../assets/defaultImage.png";
import { IMAGES_PATH } from "../../constants";

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
    if (car) {
      (async () => {
        loadImage();
      })();
    }
  }, [car]);

  const loadImage = async () => {
    try {
      setImgSrc(loadingImage);
      const imgName = await getImagesByPostId(car.id);
      if (imgName && imgName[0] && (imgName[0] as string)) {
        setImgSrc(`${IMAGES_PATH}/${imgName[0]}_medium.png`);
      } else {
        setImgSrc(defaultImage);
      }
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
      setImgSrc(defaultImage);
    }
  };

  const handleImgError = (ev: any) => {
    setImgSrc(defaultImage);
  };

  return (
    <>
      {car && car != undefined ? (
        <div className="main-car-card">
          <Link to={`/post/${car.id}`}>
            <img src={imgSrc} alt="Car src" onError={handleImgError} />
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
      ) : (
        <CarCardLoader />
      )}
    </>
  );
};

export default MainPageCarCard;
