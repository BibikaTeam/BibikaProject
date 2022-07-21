import { Link } from "react-router-dom";
import { IBannerCar } from "./types";

export interface IMainBannerProps {
  car: IBannerCar;
}

const AdvMainBanner = () => {
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
    description: "",
  };

  return (
    <div
      className="adv-main-banner"
      style={{ backgroundImage: `url(${car.mainImageSrc})` }}
    >
      {/* <img src={car.mainImageSrc} alt="Main image" /> */}
      <div className="main-adv-info">
        <h2>{car.title}</h2>
        <h3>{car.price}$</h3>
        <span className="location">{car.location}</span>
        <span>
          {car.year} | {car.mileage}km
        </span>
        <span>
          {car.engine} | {car.gearBoxTitle}
        </span>
        <Link to="#" className="more-btn">
          More
        </Link>
      </div>
    </div>
  );
};

export default AdvMainBanner;
