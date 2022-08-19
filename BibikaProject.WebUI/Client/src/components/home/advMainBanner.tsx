import { Link } from "react-router-dom";
import { IBannerCar } from "./types";

export interface IMainBannerProps {
  car: IBannerCar;
}

const AdvMainBanner = () => {
  const car: IBannerCar = {
    car: {
      carBodyTitle: "",
      completeSetTitle: "",
      engine: {
        title: "Disel",
        capacity: "1488",
        fuel: "Disel",
        id: 0,
        kwPower: 1,
      },
      gearBoxTitle: "Automatic",
      id: 1,
      title: "Audi Q8",
    },
    color: "blue",
    likes: 10,
    sellerName: "Eduard",
    viewes: 1000,
    year: 2022,
    mileage: 2000,
    location: "Lviv",
    price: 85000,
    id: 51,
    description: "",
  };

  return (
    <div
      className="adv-main-banner"
      style={{
        backgroundImage: `url(${"https://usaautoonline.azurewebsites.net/media/1256/audi-q8.jpg"})`,
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
  );
  return <h1>Chuj</h1>;
};

export default AdvMainBanner;
