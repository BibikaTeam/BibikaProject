import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IBannerCar } from "./types";
import loadingImage from "../../assets/loading.gif";
import { IMAGES_PATH } from "../../constants";
import { IRequestError } from "../adminPanel/types";
import { toast } from "react-toastify";
import defaultImage from "../../assets/defaultImage.png";
import { getImagesByPostId } from "../posts/postPage/service";
import { Button } from "antd";
import loadingImg from "../../assets/loading.gif";

export interface IMainBannerProps {
  car: IBannerCar;
  scale: number;
  loading: boolean;
}

const AdvMainBanner = ({ car, scale, loading }: IMainBannerProps) => {
  // const car: IBannerCar = {
  //   car: {
  //     carBodyTitle: "",
  //     completeSetTitle: "",
  //     engine: {
  //       title: "Disel",
  //       capacity: "1488",
  //       fuel: "Disel",
  //       id: 0,
  //       kwPower: 1,
  //     },
  //     gearBoxTitle: "Automatic",
  //     id: 1,
  //     title: "Audi Q8",
  //   },
  //   color: "blue",
  //   likes: 10,
  //   sellerName: "Eduard",
  //   viewes: 1000,
  //   year: 2022,
  //   mileage: 2000,
  //   location: "Lviv",
  //   price: 85000,
  //   id: 51,
  //   description: "",
  //   sellerEmail: "",
  //   sellerId: "",
  // };

  const [imgSrc, setImgSrc] = useState<string>("");
  const [loadingImage, setLoadingImage] = useState<string>("");

  useEffect(() => {
    (async () => {
      loadImage();
    })();
  }, [car]);

  const loadImage = async () => {
    try {
      setImgSrc(loadingImage);
      const imgName = await getImagesByPostId(car.id);
      if (imgName && imgName[0] && (imgName[0] as string)) {
        setImgSrc(`${IMAGES_PATH}/${imgName[0]}.png`);
      } else {
        setImgSrc(defaultImage);
      }
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      if (error && error.errors) {
        error.errors.forEach((e) => {
          toast.error(e);
        });
      }
      setImgSrc(defaultImage);
    }
  };

  return loading ? (
    <div
      className="adv-main-banner"
      style={{
        backgroundImage: `url(${imgSrc})`,
      }}
    >
      {/* <img src={car.mainImageSrc} alt="Main image" /> */}
      <div className="main-adv-info">
        <h2>{car.car.title}</h2>
        <h3>{car.price}$</h3>
        <span className="location">{car.location}</span>
        <span>
          {car.year} | {car.mileage}km
        </span>
        <span>
          {car.car.engine.title} | {car.car.gearBoxTitle}
        </span>
        <Link to={`/post/${car.id}`} className="more-btn">
          More
        </Link>
      </div>
    </div>
  ) : (
    <div className="adv-main-banner" style={{ position: "relative" }}>
      <img
        style={{ width: 200, position: "absolute", top: "48%", left: "42%" }}
        src={loadingImg}
        alt=""
      />
    </div>
  );
};

AdvMainBanner.defaultProps = {
  scale: 1,
  loading: false,
};

export default AdvMainBanner;
